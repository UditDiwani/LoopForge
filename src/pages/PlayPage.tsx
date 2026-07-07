import { CalendarDays, Lightbulb, RotateCcw, Sparkles, Timer, Trophy, Undo2, Redo2 } from 'lucide-react';
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
const difficulties = ['Gentle', 'Classic', 'Tricky', 'Expert'];

export function PlayPage() {
  return (
    <PageShell
      eyebrow="Slitherlink room"
      title="Trace the quiet loop."
      description="A polished puzzle table for the first LoopForge game. Everything here is visual placeholder content until the real Slitherlink engine arrives."
      actions={<GradientButton variant="pink">New puzzle</GradientButton>}
    >
      <div className="grid gap-6 pb-10 xl:grid-cols-[1fr_360px]">
        <GlassPanel glow="gold" className="overflow-hidden">
          <SectionHeader
            eyebrow="Puzzle board"
            title="Moonlit 7 x 7 practice grid"
            action={<AchievementBadge label="42% complete" tone="gold" />}
          />
          <div className="mx-auto grid aspect-square w-full max-w-[680px] grid-cols-7 gap-2 rounded-[30px] border-4 border-[#ffe68a]/50 bg-[#0d1640]/82 p-4 shadow-[inset_0_0_40px_rgba(127,213,255,0.12)]">
            {cells.map((cell) => (
              <div
                key={cell}
                className="relative grid aspect-square place-items-center rounded-2xl border-2 border-[#7fd5ff]/25 bg-white/[0.04] text-lg font-black text-[#fff7ca] transition hover:border-[#ffe68a]/70 hover:bg-[#ffe68a]/10"
              >
                {cell % 3 === 0 ? <span>{(cell % 4) + 1}</span> : null}
                {cell % 8 === 0 ? <span className="absolute -right-1 top-1/2 h-1 w-5 rounded-full bg-[#ffe68a]" /> : null}
                {cell % 10 === 0 ? <span className="absolute left-1/2 -bottom-1 h-5 w-1 rounded-full bg-[#ff82c8]" /> : null}
              </div>
            ))}
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
