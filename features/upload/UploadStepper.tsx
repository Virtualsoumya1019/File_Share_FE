const uploadSteps = ["Choose file", "Set expiry", "Upload", "Share link"] as const;

type UploadStepperProps = {
  currentStep: (typeof uploadSteps)[number];
};

export default function UploadStepper({ currentStep }: UploadStepperProps) {
  return (
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
  );
}
