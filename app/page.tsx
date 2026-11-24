import Image from "next/image";
import FilePicker from "@/features/upload/FilePicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-transparent sm:border-b-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-6 lg:px-10 xl:max-w-[96rem] xl:px-16">
          <span className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-[0.16em] sm:gap-3">
            <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-white">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            </span>
            File Share
          </span>
          <span className="text-right text-[10px] font-semibold tracking-[0.16em] text-muted sm:text-xs">
            Made for temporary sharing
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-8 lg:px-10 lg:pt-16 xl:max-w-[96rem] xl:px-16 xl:pt-20">
        <div className="grid items-center gap-6 min-[640px]:landscape:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] min-[900px]:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] min-[900px]:gap-12 xl:grid-cols-2 xl:gap-16">
          <div className="mx-auto w-full max-w-2xl min-[900px]:mx-0 min-[900px]:max-w-none">
            <div className="mb-8 sm:mb-10">
              <h1 className="text-2xl leading-tight font-semibold tracking-[0.04em] sm:text-3xl lg:text-4xl xl:text-[clamp(2.5rem,3.3vw,3.5rem)]">
                Share a file. Let it go.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 tracking-normal text-muted normal-case">
                Create a link that expires after a set time, a download limit, or whichever comes first.
              </p>
            </div>
            <FilePicker />
          </div>
          <div className="flex min-w-0 justify-center">
            <Image
              src="/sharing-knowledge-animated.svg"
              alt="Two people passing a document between them"
              width={800}
              height={727}
              unoptimized
              loading="eager"
              className="share-illustration h-auto w-full"
            />
          </div>
        </div>
        <p className="mt-6 text-center text-[10px] leading-6 tracking-[0.15em] text-muted min-[900px]:text-left">
          Share thoughtfully · Links are temporary
        </p>
      </main>
    </div>
  );
}
