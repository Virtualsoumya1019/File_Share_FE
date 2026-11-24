"use client";

import { useRef, useState } from "react";

import { formatFileName, formatFileSize } from "./fileDisplay";
import UploadStepper from "./UploadStepper";

export default function FilePicker() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  function removeSelectedFile() {
  const input = fileInputRef.current;

  if (input) {
    input.value = "";
    input.focus();
  }

  setSelectedFile(null);
}
  return (
    <section className="rounded-2xl border border-neutral-200 bg-surface p-4 tracking-normal normal-case shadow-sm sm:p-6">
      <UploadStepper currentStep="Choose file" />
      <div className="group flex flex-col items-stretch gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 transition-colors hover:border-neutral-400 focus-within:border-neutral-400 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
        <div className="flex min-w-0 items-center gap-3 text-sm text-muted">
          <span
            aria-hidden="true"
            className="relative grid h-8 w-6 shrink-0 place-content-center gap-1 rounded-sm border border-neutral-400 bg-surface shadow-sm motion-safe:transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-6 motion-safe:group-focus-within:-translate-y-1 motion-safe:group-focus-within:rotate-6"
          >
            <span className="h-px w-2.5 bg-neutral-400" />
            <span className="h-px w-2 bg-neutral-400" />
          </span>
          <div aria-live="polite" className="min-w-0">
            {selectedFile ? (
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <p
                  title={selectedFile.name}
                  className="min-w-0 text-sm leading-snug font-medium text-neutral-600 [overflow-wrap:anywhere]"
                >
                  {formatFileName(selectedFile.name)}
                </p>
                <span className="shrink-0 rounded-md bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600 tabular-nums">
                  {formatFileSize(selectedFile.size)}
                </span>
              </div>
            ) : (
              <span className="text-neutral-600">Add a file from your device</span>
            )}
          </div>
        </div>
        <label
          htmlFor="file"
          className="relative inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary"
        >
          Browse files
          <input
            id="file"
            type="file"
            ref={fileInputRef}
            aria-describedby="file-picker-hint"
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            onChange={(event) => {
              setSelectedFile(event.currentTarget.files?.item(0) ?? null);
            }}
          />
        </label>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p id="file-picker-hint" className="text-sm text-muted">
          One file per link
        </p>

        {selectedFile && (
          <button
            type="button"
            onClick={removeSelectedFile}
            className="min-h-11 rounded-md px-2 text-sm font-medium text-muted underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Remove file
          </button>
        )}
      </div>
    </section>
  );
}
