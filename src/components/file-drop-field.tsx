"use client";

import { FileCheck2, UploadCloud, X } from "lucide-react";

interface FileDropFieldProps {
  id: string;
  title: string;
  description: string;
  accept: string;
  files: string[];
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  onRemove: (name: string) => void;
}

export function FileDropField({ id, title, description, accept, files, multiple = true, onFiles, onRemove }: FileDropFieldProps) {
  return (
    <div className="file-drop-field">
      <input id={id} type="file" accept={accept} multiple={multiple} onChange={(event) => onFiles(Array.from(event.target.files ?? []))} />
      <label htmlFor={id}><UploadCloud /><strong>{title}</strong><span>{description}</span><b>Choose files</b></label>
      {files.length > 0 && <ul className="file-list">{files.map((name) => <li key={name}><FileCheck2 size={16} /><span>{name}</span><button type="button" onClick={() => onRemove(name)} aria-label={`Remove ${name}`}><X size={14} /></button></li>)}</ul>}
    </div>
  );
}
