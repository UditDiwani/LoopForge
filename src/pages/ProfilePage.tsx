import { Flame, Gamepad2, Pencil, Star, Target, Trophy } from 'lucide-react';
import {
  AchievementBadge,
  Avatar,
  GlassPanel,
  GradientButton,
  PageShell,
  ProgressBar,
  SectionHeader,
  StatCard,
} from '../components/ui/AppPrimitives';

export function ProfilePage() {
  return (
    <PageShell
      eyebrow="Profile"
      title="Nova Quinn"
      description="A mock player profile for achievements, activity, favorite game, and long-term progress."
      actions={<GradientButton variant="pink"><Pencil size={18} />Edit profile</GradientButton>}
    >
      <div className="grid gap-6 pb-10 xl:grid-cols-[380px_1fr]">
        <GlassPanel glow="gold" className="text-center">
          <Avatar name="Nova Quinn" size="xl" status="online" />
          <h2 className="mt-5 text-3xl font-black text-white">Nova Quinn</h2>
          <p className="mt-2 text-sm font-bold text-[#cfd6ff]">Level 18 Loop Cartographer</p>
          <div className="mt-6">
            <ProgressBar value={68} label="XP to Level 19" />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <AchievementBadge label="Gold Thread" tone="gold" />
            <AchievementBadge label="Daily Star" tone="pink" />
            <AchievementBadge label="Calm Solver" tone="blue" />
          </div>
        </GlassPanel>

        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard label="Streak" value="12" detail="Current days" icon={Flame} />
            <StatCard label="Completion" value="94%" detail="All mock puzzles" icon={Target} />
            <StatCard label="Favorite" value="Classic" detail="Difficulty" icon={Star} />
            <StatCard label="Rank" value="#1" detail="Weekly standings" icon={Trophy} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassPanel glow="blue">
              <SectionHeader eyebrow="Favorite game" title="Slitherlink" />
              <div className="rounded-[26px] border border-white/12 bg-[#0d1640]/58 p-5">
                <span className="grid size-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#ffe68a,#ff82c8)] text-[#2b1745]">
                  <Gamepad2 size={26} />
                </span>
                <h3 className="mt-4 text-xl font-black text-white">Moonwell Classic</h3>
                <p className="mt-2 text-sm leading-6 text-[#cfd6ff]">Most played placeholder puzzle style.</p>
              </div>
            </GlassPanel>

            <GlassPanel glow="pink">
              <SectionHeader eyebrow="Activity" title="Recent trail" />
              <div className="space-y-3">
                {['Completed Starlace Loop', 'Earned Calm Solver badge', 'Reached 21,880 weekly points'].map((item) => (
                  <p key={item} className="rounded-2xl bg-white/8 p-3 text-sm font-bold text-[#d9dcff]">{item}</p>
                ))}
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
