import { Lock } from 'lucide-react';

const futureGames = ['Puzzle Arena', 'Forge Runner', 'Tactics Lab'];

// Future game cards reserve layout space without pretending features already exist.
export function FutureGamesSection() {
  return (
    <section id="games" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Coming later</p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-950">Future games</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {futureGames.map((game) => (
            <article
              key={game}
              aria-disabled="true"
              className="min-h-44 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-5 text-stone-500"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-stone-700">{game}</h3>
                <Lock aria-hidden="true" size={18} />
              </div>
              <p className="mt-8 text-sm">Reserved for a future game release.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
