import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/cms";
import { useLanguage } from "@/i18n/LanguageContext";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
}

export const ImageUpload = ({ value, onChange, folder }: Props) => {
  const { t } = useLanguage();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-full max-w-sm">
          <img src={value} alt="" className="w-full h-48 object-cover rounded-lg border" />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => onChange(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
      <label className="inline-flex">
        <input type="file" accept="image/*" className="sr-only" onChange={handleFile} disabled={uploading} />
        <Button type="button" variant="outline" disabled={uploading} asChild>
          <span className="cursor-pointer">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? t("crud.uploading") : t("crud.upload")}
          </span>
        </Button>
      </label>
    </div>
  );
};

export const MultiImageUpload = ({
  value,
  onChange,
  folder,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  folder: string;
}) => {
  const { t } = useLanguage();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadImage(file, folder));
      }
      onChange([...value, ...urls]);
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, idx) => (
            <div key={url} className="relative">
              <img src={url} alt="" className="w-full h-32 object-cover rounded-lg border" />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 h-7 w-7"
                onClick={() => onChange(value.filter((_, i) => i !== idx))}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <label className="inline-flex">
        <input type="file" accept="image/*" multiple className="sr-only" onChange={handleFile} disabled={uploading} />
        <Button type="button" variant="outline" disabled={uploading} asChild>
          <span className="cursor-pointer">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? t("crud.uploading") : t("crud.upload")}
          </span>
        </Button>
      </label>
    </div>
  );
};
