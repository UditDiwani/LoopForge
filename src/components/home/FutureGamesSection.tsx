import { Crown, Lock, Puzzle, Swords } from 'lucide-react';

const futureGames = [
  { name: 'Puzzle Arena', icon: Puzzle, color: 'from-[#84e7ff] to-[#a778ff]' },
  { name: 'Forge Runner', icon: Swords, color: 'from-[#ff82c8] to-[#ffe68a]' },
  { name: 'Tactics Lab', icon: Crown, color: 'from-[#9dffcf] to-[#7fd5ff]' },
];

// Future game cards reserve layout space without pretending features already exist.
export function FutureGamesSection() {
  return (
    <section id="games" className="relative px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black text-[#fff7ca] sm:text-3xl">Locked worlds</h2>
          <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-[#d9dcff] backdrop-blur">
            Coming later
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {futureGames.map((game, index) => {
            const Icon = game.icon;

            return (
            <article
              key={game.name}
              aria-disabled="true"
              className="float-slow min-h-44 rounded-[26px] border-4 border-white/20 bg-[#151f4f]/76 p-5 text-white shadow-[0_18px_36px_rgba(0,0,0,0.28)] backdrop-blur-md"
              style={{ animationDelay: `${index * 0.45}s` }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${game.color} text-[#27133f] shadow-[0_7px_0_rgba(0,0,0,0.25)]`}>
                  <Icon aria-hidden="true" size={27} />
                </span>
                <Lock aria-hidden="true" size={20} className="text-[#ffe68a]" />
              </div>
              <h3 className="mt-6 text-lg font-black">{game.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#cfd6ff]">A future portal slot for new puzzles and modes.</p>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
