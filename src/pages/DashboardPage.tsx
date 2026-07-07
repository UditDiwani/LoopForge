import { ArrowRight, CalendarDays, Newspaper, Play, Sparkles, Trophy } from 'lucide-react';
import {
  AchievementBadge,
  GlassPanel,
  GradientButton,
  PageShell,
  ProgressBar,
  SectionHeader,
  StatCard,
} from '../components/ui/AppPrimitives';

export function DashboardPage() {
  return (
    <PageShell
      eyebrow="Dashboard"
      title="Welcome back to the forge."
      description="A personal overview for continuing puzzles, daily challenges, recent activity, achievements, and soft product news."
      actions={<GradientButton to="/play" variant="gold"><Play size={18} />Continue playing</GradientButton>}
    >
      <div className="grid gap-6 pb-10 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <GlassPanel glow="gold">
            <SectionHeader eyebrow="Continue" title="Moonwell Classic" action={<AchievementBadge label="42% complete" />} />
            <div className="grid gap-5 lg:grid-cols-[1fr_220px] lg:items-center">
              <div>
                <p className="text-sm leading-6 text-[#cfd6ff]">Resume the placeholder Slitherlink board from your last session.</p>
                <div className="mt-5">
                  <ProgressBar value={42} label="Puzzle progress" />
                </div>
              </div>
              <GradientButton to="/play" variant="pink"><ArrowRight size={18} />Open board</GradientButton>
            </div>
          </GlassPanel>

          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="Completed" value="128" detail="Lifetime mock puzzles" icon={Trophy} />
            <StatCard label="Daily streak" value="12" detail="Days active" icon={CalendarDays} />
            <StatCard label="Achievements" value="31" detail="Badges unlocked" icon={Sparkles} />
          </div>

          <GlassPanel glow="blue">
            <SectionHeader eyebrow="Recent puzzles" title="Last played" />
            <div className="grid gap-3 md:grid-cols-3">
              {['Starlace Loop', 'Cloudline Path', 'Lavender Gate'].map((name, index) => (
                <article key={name} className="rounded-[24px] border border-white/12 bg-[#0d1640]/52 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffe68a]">Puzzle {index + 1}</p>
                  <h3 className="mt-3 font-black text-white">{name}</h3>
                  <p className="mt-2 text-sm text-[#cfd6ff]">Classic difficulty placeholder</p>
                </article>
              ))}
            </div>
          </GlassPanel>
        </div>

        <div className="grid gap-6">
          <GlassPanel glow="pink">
            <SectionHeader eyebrow="Today" title="Daily challenge" />
            <p className="text-sm leading-6 text-[#cfd6ff]">A calm daily puzzle card with reward and streak placeholders.</p>
            <GradientButton to="/play" variant="gold" className="mt-5 w-full">Start daily</GradientButton>
          </GlassPanel>

          <GlassPanel glow="gold">
            <SectionHeader eyebrow="Quick actions" title="Jump points" />
            <div className="grid gap-3">
              <GradientButton to="/leaderboard" variant="ghost">View standings</GradientButton>
              <GradientButton to="/friends" variant="ghost">Find friends</GradientButton>
              <GradientButton to="/profile" variant="ghost">Open profile</GradientButton>
            </div>
          </GlassPanel>

          <GlassPanel glow="blue">
            <SectionHeader eyebrow="News" title="Forge notes" />
            <div className="flex gap-3">
              <Newspaper className="mt-1 shrink-0 text-[#ffe68a]" size={22} />
              <p className="text-sm leading-6 text-[#d9dcff]">Placeholder update cards will announce new puzzle worlds and seasonal events.</p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </PageShell>
  );
}
