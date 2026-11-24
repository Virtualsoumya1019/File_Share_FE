"use client";

import { useState } from "react";

const uploadSteps = ["Choose file", "Set expiry", "Upload", "Share link"];
const currentStep = "Choose file";

const fileSizeFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
});

const screenshotDateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function formatFileName(name: string) {
  const screenshot = /^Screenshot (\d{4}-\d{2}-\d{2}) at (\d{1,2})\.(\d{2})\.\d{2}\s*([AP]M)\.(png|jpe?g)$/i.exec(name);
  if (!screenshot) return name;

  const [, date, hour, minute, period, extension] = screenshot;
  const timestamp = Date.parse(date);
  if (!Number.isFinite(timestamp)) return name;

  return `Screenshot · ${screenshotDateFormatter.format(timestamp)} · ${hour}:${minute} ${period.toUpperCase()} · ${extension.toUpperCase()}`;
}

function formatFileSize(bytes: number) {
  if (bytes >= 1_000_000_000) return `${fileSizeFormatter.format(bytes / 1_000_000_000)} GB`;
  if (bytes >= 1_000_000) return `${fileSizeFormatter.format(bytes / 1_000_000)} MB`;
  if (bytes >= 1_000) return `${fileSizeFormatter.format(bytes / 1_000)} KB`;
  return `${bytes} ${bytes === 1 ? "byte" : "bytes"}`;
}

export default function FilePicker() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  return (
    <section className="rounded-2xl border border-neutral-200 bg-surface p-4 tracking-normal normal-case shadow-sm sm:p-6">
      <ol
        aria-label="File sharing steps"
        className="relative mb-5 grid grid-cols-4 rounded-xl border border-neutral-200 bg-neutral-50 px-1 pt-8 pb-4 before:pointer-events-none before:absolute before:inset-x-[13%] before:top-12 before:border-t before:border-neutral-300 before:content-[''] sm:px-2"
      >
        {uploadSteps.map((step, index) => {
          const isCurrent = step === currentStep;

          return (
            <li
              key={step}
              aria-current={isCurrent ? "step" : undefined}
              className="relative flex min-w-0 flex-col items-center gap-2 px-1 text-center text-xs leading-tight text-muted aria-[current=step]:font-semibold aria-[current=step]:text-primary"
            >
              <span
                aria-hidden="true"
                className={`relative grid size-8 shrink-0 place-items-center rounded-full border font-semibold tabular-nums ${isCurrent ? "-translate-y-2 scale-125 border-primary bg-primary text-white ring-2 ring-neutral-400 ring-offset-2 shadow-[0_5px_8px_#0005]" : "border-neutral-300 bg-surface text-muted"}`}
              >
                {isCurrent && (
                  <span className="pointer-events-none absolute -inset-1 rounded-full border-2 border-primary opacity-0 motion-safe:animate-[file-step-pulse_1.5s_ease-out_3]" />
                )}
                {index + 1}
              </span>
              {step}
              {isCurrent && (
                <span
                  aria-hidden="true"
                  className="text-[10px] font-medium text-muted"
                >
                  Current step
                </span>
              )}
            </li>
          );
        })}
      </ol>
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
            aria-describedby="file-picker-hint"
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            onChange={(event) => {
              setSelectedFile(event.currentTarget.files?.item(0) ?? null);
            }}
          />
        </label>
      </div>
      <p id="file-picker-hint" className="mt-3 text-sm text-muted">
        One file per link
      </p>
    </section>
  );
}
