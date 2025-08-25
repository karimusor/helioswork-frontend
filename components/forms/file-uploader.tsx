"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { validateFile } from "@/lib/validation";
export type UploadResult = { ok: boolean; url?: string; error?: string };
export default function FileUploader({ onUploaded }: { onUploaded: (res: UploadResult) => void }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const { push } = useToast();
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0]; if (!f) return;
    const v = validateFile(f);
    if (!v.ok) { push({ title: "Fichier invalide", description: v.error }); return; }
    setFile(f);
  }, [push]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
    }
  });
  function upload() {
    if (!file) return;
    setUploading(true); setProgress(0);
    const form = new FormData(); form.append("cv", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/candidates");
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100)); };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        setUploading(false);
        try {
          const res = JSON.parse(xhr.responseText || "{}");
          if (xhr.status >= 200 && xhr.status < 300) { push({ title: "CV envoyé", description: "Merci !" }); onUploaded({ ok: true, url: res?.url }); }
          else { push({ title: "Erreur d'upload", description: res?.error || "Veuillez réessayer" }); onUploaded({ ok: false, error: res?.error }); }
        } catch { onUploaded({ ok: xhr.status < 300 }); }
      }
    };
    xhr.send(form);
  }
  return (
    <div className="space-y-3">
      <div {...getRootProps({ className: "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:bg-gray-100 focus:outline-none" })} aria-label="Zone de dépôt du CV" role="group" tabIndex={0}>
        <input {...getInputProps()} aria-label="Sélectionner un fichier" />
        <p className="text-sm text-gray-700">
          {isDragActive ? "Déposez le fichier ici…" : (file ? `Sélectionné: ${file.name}` : "Déposez votre CV (PDF, DOC, DOCX — 5MB max)")}
        </p>
      </div>
      {uploading && <Progress value={progress} />}
      <div className="flex gap-2">
        <Button type="button" onClick={upload} disabled={!file || uploading}>Téléverser</Button>
        {file && !uploading && <Button type="button" variant="outline" onClick={() => setFile(null)}>Changer de fichier</Button>}
      </div>
    </div>
  );
}