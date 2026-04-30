// Grants admin role to a user by their email. Caller must already be an admin.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: cErr } = await userClient.auth.getClaims(token);
    if (cErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const callerId = claims.claims.sub as string;

    const admin = createClient(SUPABASE_URL, SERVICE);

    // verify caller is admin
    const { data: roleRow } = await admin
      .from("user_roles").select("role").eq("user_id", callerId).eq("role", "admin").maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const action = body.action as "grant" | "revoke" | "list";

    if (action === "list") {
      const { data: roles } = await admin.from("user_roles").select("user_id, role, created_at").eq("role", "admin");
      const userIds = (roles || []).map((r: any) => r.user_id);
      const { data: usersList } = await admin.auth.admin.listUsers();
      const map = new Map((usersList?.users || []).map((u: any) => [u.id, u.email]));
      const result = (roles || []).map((r: any) => ({
        user_id: r.user_id, email: map.get(r.user_id) || null, created_at: r.created_at,
      }));
      return new Response(JSON.stringify({ admins: result }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const email = String(body.email || "").trim().toLowerCase();
    if (!email) {
      return new Response(JSON.stringify({ error: "email required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: usersList } = await admin.auth.admin.listUsers();
    const target = (usersList?.users || []).find((u: any) => (u.email || "").toLowerCase() === email);
    if (!target) {
      return new Response(JSON.stringify({ error: "user_not_found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "grant") {
      const { error } = await admin.from("user_roles").insert({ user_id: target.id, role: "admin" });
      if (error && !error.message.includes("duplicate")) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "revoke") {
      if (target.id === callerId) {
        return new Response(JSON.stringify({ error: "cannot_revoke_self" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      await admin.from("user_roles").delete().eq("user_id", target.id).eq("role", "admin");
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "unknown_action" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
