import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Featured game card highlights the first planned game without implementing gameplay.
export function FeaturedGameCard() {
  return (
    <section id="featured" className="bg-[#f7f8f3]">
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Featured game</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-950">LoopForge</h2>
          </div>
          <span className="text-sm text-stone-500">Foundation ready</span>
        </div>

        <article className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-8">
              <p className="max-w-2xl text-base leading-7 text-stone-600">
                The first game space for LoopForge. This card is ready to connect to a future play experience while
                staying free of temporary game logic for now.
              </p>
              <Link
                to="/play"
                className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-md bg-stone-950 px-4 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                View play route
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <div className="min-h-56 bg-[linear-gradient(135deg,#14532d_0%,#10b981_48%,#facc15_100%)] p-6">
              <div className="flex h-full min-h-44 flex-col justify-between rounded-md border border-white/30 bg-white/15 p-5 text-white backdrop-blur-sm">
                <span className="text-sm font-medium">LoopForge</span>
                <span className="text-4xl font-bold">01</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
