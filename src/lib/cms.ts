import { supabase } from "@/integrations/supabase/client";

export const BUCKET = "cms-media";

export async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function formatDate(d: string | null | undefined, lang: "ar" | "en") {
  if (!d) return "";
  return new Date(d).toLocaleDateString(lang === "ar" ? "ar-LY" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function pickLocalized<T extends Record<string, any>>(
  row: T,
  field: string,
  lang: "ar" | "en"
): string {
  const localized = row[`${field}_${lang}`];
  if (localized && String(localized).trim()) return localized;
  return row[`${field}_ar`] || row[`${field}_en`] || "";
}
