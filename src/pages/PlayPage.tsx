import { CalendarDays, Lightbulb, RotateCcw, Sparkles, Timer, Trophy, Undo2, Redo2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { GuestBanner } from '../components/auth/AuthFlow';
import {
  AchievementBadge,
  FilterTabs,
  GlassPanel,
  GradientButton,
  PageShell,
  ProgressBar,
  SectionHeader,
  StatCard,
} from '../components/ui/AppPrimitives';

const cells = Array.from({ length: 49 }, (_, index) => index);
const boardSize = 7;
const dots = Array.from({ length: (boardSize + 1) * (boardSize + 1) }, (_, index) => index);
const horizontalEdges = Array.from({ length: (boardSize + 1) * boardSize }, (_, index) => index);
const verticalEdges = Array.from({ length: boardSize * (boardSize + 1) }, (_, index) => index);
const difficulties = ['Gentle', 'Classic', 'Tricky', 'Expert'];

export function PlayPage() {
  const [searchParams] = useSearchParams();
  const isGuestMode = searchParams.get('mode') === 'guest';

  return (
    <PageShell
      eyebrow="Slitherlink room"
      title="Trace the quiet loop."
      description="A polished puzzle table for the first LoopForge game. Everything here is visual placeholder content until the real Slitherlink engine arrives."
      actions={<GradientButton variant="pink">New puzzle</GradientButton>}
    >
      {isGuestMode ? <GuestBanner /> : null}
      <div className="grid gap-6 pb-10 xl:grid-cols-[1fr_360px]">
        <GlassPanel glow="gold" className="overflow-hidden">
          <SectionHeader
            eyebrow="Puzzle board"
            title="Moonlit 7 x 7 practice grid"
            action={<AchievementBadge label="42% complete" tone="gold" />}
          />
          <div className="mx-auto aspect-square w-full max-w-[680px] rounded-[30px] border-4 border-[#ffe68a]/50 bg-[#0d1640]/82 p-6 shadow-[inset_0_0_40px_rgba(127,213,255,0.12)]">
            <div className="relative size-full rounded-[24px] bg-white/[0.025]">
              {cells.map((cell) => {
                const row = Math.floor(cell / boardSize);
                const column = cell % boardSize;

                return (
                  <div
                    key={cell}
                    className="pointer-events-none absolute grid place-items-center text-xl font-black text-[#fff7ca] drop-shadow-[0_0_12px_rgba(255,230,138,0.35)] sm:text-2xl"
                    style={{
                      left: `${(column + 0.5) * (100 / boardSize)}%`,
                      top: `${(row + 0.5) * (100 / boardSize)}%`,
                      width: `${100 / boardSize}%`,
                      height: `${100 / boardSize}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {cell % 3 === 0 ? <span>{(cell % 4) + 1}</span> : null}
                  </div>
                );
              })}

              {horizontalEdges.map((edge) => {
                const row = Math.floor(edge / boardSize);
                const column = edge % boardSize;
                const isActive = edge % 8 === 0 || edge % 13 === 0;

                return (
                  <button
                    key={`h-${edge}`}
                    type="button"
                    aria-label={`Horizontal edge ${row + 1}, ${column + 1}`}
                    className={`absolute h-4 rounded-full transition hover:bg-[#ffe68a] hover:shadow-[0_0_18px_rgba(255,230,138,0.65)] ${
                      isActive ? 'bg-[#ffe68a] shadow-[0_0_14px_rgba(255,230,138,0.42)]' : 'bg-[#7fd5ff]/18'
                    }`}
                    style={{
                      left: `${column * (100 / boardSize)}%`,
                      top: `${row * (100 / boardSize)}%`,
                      width: `${100 / boardSize}%`,
                      transform: 'translateY(-50%) scaleX(0.72)',
                    }}
                  />
                );
              })}

              {verticalEdges.map((edge) => {
                const row = Math.floor(edge / (boardSize + 1));
                const column = edge % (boardSize + 1);
                const isActive = edge % 10 === 0 || edge % 17 === 0;

                return (
                  <button
                    key={`v-${edge}`}
                    type="button"
                    aria-label={`Vertical edge ${row + 1}, ${column + 1}`}
                    className={`absolute w-4 rounded-full transition hover:bg-[#ff82c8] hover:shadow-[0_0_18px_rgba(255,130,200,0.65)] ${
                      isActive ? 'bg-[#ff82c8] shadow-[0_0_14px_rgba(255,130,200,0.42)]' : 'bg-[#7fd5ff]/18'
                    }`}
                    style={{
                      left: `${column * (100 / boardSize)}%`,
                      top: `${row * (100 / boardSize)}%`,
                      height: `${100 / boardSize}%`,
                      transform: 'translateX(-50%) scaleY(0.72)',
                    }}
                  />
                );
              })}

              {dots.map((dot) => {
                const row = Math.floor(dot / (boardSize + 1));
                const column = dot % (boardSize + 1);

                return (
                  <span
                    key={`dot-${dot}`}
                    className="absolute z-10 size-3 rounded-full border border-[#fff7ca]/70 bg-[#fff7ca] shadow-[0_0_12px_rgba(255,230,138,0.5)] sm:size-4"
                    style={{
                      left: `${column * (100 / boardSize)}%`,
                      top: `${row * (100 / boardSize)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <GradientButton variant="ghost"><Lightbulb size={18} />Hint</GradientButton>
            <GradientButton variant="ghost"><Undo2 size={18} />Undo</GradientButton>
            <GradientButton variant="ghost"><Redo2 size={18} />Redo</GradientButton>
            <GradientButton variant="gold"><RotateCcw size={18} />Reset</GradientButton>
          </div>
        </GlassPanel>

        <div className="grid gap-6">
          <GlassPanel glow="blue">
            <SectionHeader eyebrow="Difficulty" title="Choose a constellation" />
            <FilterTabs tabs={difficulties} active="Classic" />
            <div className="mt-5 space-y-4">
              <ProgressBar value={42} label="Completion" />
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Timer" value="08:24" detail="Placeholder" icon={Timer} />
                <StatCard label="Moves" value="126" detail="Draft count" icon={Sparkles} />
              </div>
            </div>
          </GlassPanel>

          <GlassPanel glow="pink">
            <SectionHeader eyebrow="Today" title="Daily challenge" />
            <div className="flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-3xl bg-[#ffe68a]/18 text-[#ffe68a]">
                <CalendarDays size={28} />
              </span>
              <div>
                <h3 className="font-black text-white">Starlace Loop</h3>
                <p className="mt-1 text-sm leading-6 text-[#cfd6ff]">Mock daily puzzle with a gentle 9 minute target.</p>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel glow="gold">
            <SectionHeader eyebrow="Stats" title="Puzzle notes" />
            <div className="space-y-3 text-sm font-bold text-[#d9dcff]">
              <p>Grid: 7 x 7</p>
              <p>Difficulty: Classic</p>
              <p>Best time: 06:18</p>
              <p>Completion streak: 5 days</p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </PageShell>
  );
}
