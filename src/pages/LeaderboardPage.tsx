import { Crown, Medal, Star, Trophy } from 'lucide-react';
import {
  AchievementBadge,
  Avatar,
  FilterTabs,
  GlassPanel,
  PageShell,
  SearchInput,
  SectionHeader,
  StatCard,
} from '../components/ui/AppPrimitives';

const podium = [
  { name: 'Mira Vale', score: '18,420', rank: '2', tone: 'from-[#c9f2ff] to-[#7fd5ff]' },
  { name: 'Nova Quinn', score: '21,880', rank: '1', tone: 'from-[#ffe68a] to-[#ffb86c]' },
  { name: 'Iris Moon', score: '16,940', rank: '3', tone: 'from-[#ffd8fb] to-[#ff82c8]' },
];

const players = [
  ['4', 'Theo Sparks', '15,210', '97%', 'Loop Sage'],
  ['5', 'Kira Bloom', '14,870', '94%', 'Gold Thread'],
  ['6', 'Juno Hart', '13,440', '91%', 'Daily Star'],
  ['7', 'Arlo Night', '12,980', '89%', 'Calm Solver'],
];

export function LeaderboardPage() {
  return (
    <PageShell
      eyebrow="Standings"
      title="Puzzle stars of the week."
      description="Mock rankings, podium highlights, badges, and filters for the future competitive Slitherlink space."
    >
      <div className="grid gap-6 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Active solvers" value="2,418" detail="Weekly placeholder" icon={Trophy} />
          <StatCard label="Loops completed" value="38k" detail="Across all mock puzzles" icon={Star} />
          <StatCard label="Top streak" value="42" detail="Days in a row" icon={Crown} />
        </div>

        <GlassPanel glow="gold">
          <SectionHeader eyebrow="Champions" title="Top 3 podium" action={<FilterTabs tabs={['Weekly', 'Monthly', 'All Time']} />} />
          <div className="grid gap-4 md:grid-cols-3 md:items-end">
            {podium.map((player) => (
              <article
                key={player.rank}
                className={`rounded-[28px] border-2 border-white/18 bg-gradient-to-br ${player.tone} p-5 text-center text-[#2b1745] shadow-[0_16px_34px_rgba(0,0,0,0.22)] ${player.rank === '1' ? 'md:min-h-72' : 'md:min-h-60'}`}
              >
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#2b1745] text-[#ffe68a]">
                  <Medal size={28} />
                </div>
                <p className="mt-4 text-sm font-black uppercase tracking-[0.18em]">Rank {player.rank}</p>
                <Avatar name={player.name} size="lg" />
                <h3 className="mt-4 text-xl font-black">{player.name}</h3>
                <p className="mt-2 text-3xl font-black">{player.score}</p>
              </article>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel glow="blue">
          <SectionHeader eyebrow="Rankings" title="Explorer table" />
          <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto]">
            <SearchInput placeholder="Search players" />
            <FilterTabs tabs={['All', 'Friends', 'Badges']} active="All" />
          </div>
          <div className="overflow-hidden rounded-[24px] border border-white/12">
            {players.map(([rank, name, score, completion, badge]) => (
              <div key={rank} className="grid gap-4 border-b border-white/10 bg-[#0d1640]/46 p-4 last:border-b-0 md:grid-cols-[64px_1fr_120px_120px_160px] md:items-center">
                <span className="text-lg font-black text-[#ffe68a]">#{rank}</span>
                <div className="flex items-center gap-3">
                  <Avatar name={name} status="online" />
                  <span className="font-black text-white">{name}</span>
                </div>
                <span className="font-black text-white">{score}</span>
                <span className="text-sm font-bold text-[#cfd6ff]">{completion}</span>
                <AchievementBadge label={badge} tone={rank === '4' ? 'gold' : 'blue'} />
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </PageShell>
  );
}
