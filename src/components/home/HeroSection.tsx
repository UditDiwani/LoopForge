import { ButtonLink } from '../ui/ButtonLink';

// Hero introduces the app hub and points to future-ready routes only.
export function HeroSection() {
  return (
    <section className="bg-[#f7f8f3]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Frontend foundation</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold text-stone-950 sm:text-6xl">
            LoopForge
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
            A clean, expandable hub for browser games, player spaces, and future community features.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/play">Explore Play</ButtonLink>
            <ButtonLink to="/dashboard" variant="secondary">
              View Dashboard
            </ButtonLink>
          </div>
        </div>

        <div className="relative min-h-80 overflow-hidden rounded-lg border border-stone-200 bg-stone-950 p-6 text-white shadow-sm">
          <div className="absolute inset-x-6 top-6 h-px bg-white/20" />
          <div className="grid h-full min-h-68 grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="rounded-md border border-white/10 bg-white/[0.06]"
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-md bg-white p-4 text-stone-950">
            <span className="text-sm font-semibold">Application hub</span>
            <span className="text-sm text-stone-500">v0.1</span>
          </div>
        </div>
      </div>
    </section>
  );
}
