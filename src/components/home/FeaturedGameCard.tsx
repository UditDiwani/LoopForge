import { ArrowRight, Gamepad2, Sparkle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Featured game card highlights the first planned game without implementing gameplay.
export function FeaturedGameCard() {
  return (
    <section id="featured" className="relative px-4 pb-8 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <article className="relative overflow-hidden rounded-[28px] border-4 border-[#ffec9e] bg-[#271a5f]/78 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-7">
          <div className="absolute right-8 top-6 size-3 rounded-full bg-[#ff82c8] shadow-[0_0_20px_6px_rgba(255,130,200,0.35)]" aria-hidden="true" />
          <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#ffe68a] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#35215d]">
                <Gamepad2 aria-hidden="true" size={16} />
                Featured portal
              </p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Puzzle worlds are warming up.</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#d9dcff]">
                The play room is ready to become the first LoopForge game space, with room for more modes,
                achievements, and multiplayer portals later.
              </p>
              <Link
                to="/play"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border-4 border-[#2b1745] bg-[#ff82c8] px-5 text-sm font-black text-[#2b1745] shadow-[0_7px_0_#2b1745] transition hover:-translate-y-1 hover:bg-[#ff9ed5] hover:shadow-[0_10px_0_#2b1745]"
              >
                Open play room
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
            <div className="grid min-h-56 grid-cols-4 gap-3 rounded-[24px] border-4 border-white/20 bg-[#0d1640]/80 p-4">
              {Array.from({ length: 16 }).map((_, index) => (
                <span
                  key={index}
                  className="grid aspect-square place-items-center rounded-xl border-2 border-white/15 bg-[linear-gradient(145deg,#7fd5ff,#a778ff)] shadow-[inset_0_2px_0_rgba(255,255,255,0.45)]"
                  aria-hidden="true"
                >
                  {index % 5 === 0 ? <Sparkle size={15} className="text-[#ffe68a]" /> : null}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
