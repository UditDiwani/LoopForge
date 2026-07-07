import { MessageCircle, Plus, Puzzle, Radio, UserPlus, Users } from 'lucide-react';
import {
  Avatar,
  EmptyState,
  GlassPanel,
  GradientButton,
  PageShell,
  SearchInput,
  SectionHeader,
  StatCard,
} from '../components/ui/AppPrimitives';

const friends = [
  { name: 'Mira Vale', status: 'online', note: 'Solving Classic Moonwell' },
  { name: 'Theo Sparks', status: 'away', note: 'Paused on Expert grid' },
  { name: 'Kira Bloom', status: 'online', note: 'Finished Daily Challenge' },
  { name: 'Arlo Night', status: 'offline', note: 'Last seen yesterday' },
] as const;

const feed = ['Nova completed Starlace Loop in 08:24', 'Iris earned Gold Thread', 'Juno started a new Tricky puzzle'];

export function FriendsPage() {
  return (
    <PageShell
      eyebrow="Friends"
      title="A cozy table for fellow solvers."
      description="Placeholder social surfaces for future invites, friend activity, requests, and recently played puzzles."
      actions={<GradientButton variant="gold"><UserPlus size={18} />Invite friend</GradientButton>}
    >
      <div className="grid gap-6 pb-10 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="Friends" value="24" detail="Mock connections" icon={Users} />
            <StatCard label="Online" value="7" detail="Ready to play" icon={Radio} />
            <StatCard label="Requests" value="3" detail="Waiting nearby" icon={Plus} />
          </div>

          <GlassPanel glow="pink">
            <SectionHeader eyebrow="List" title="Friend constellations" />
            <SearchInput placeholder="Search friends" />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {friends.map((friend) => (
                <article key={friend.name} className="rounded-[26px] border border-white/12 bg-[#0d1640]/54 p-4 transition hover:-translate-y-1 hover:border-[#ffe68a]/45">
                  <div className="flex items-start gap-4">
                    <Avatar name={friend.name} status={friend.status} />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-black text-white">{friend.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#cfd6ff]">{friend.note}</p>
                    </div>
                    <span className="grid size-10 place-items-center rounded-full bg-white/10 text-[#ffe68a]">
                      <MessageCircle size={18} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </GlassPanel>
        </div>

        <div className="grid gap-6">
          <GlassPanel glow="gold">
            <SectionHeader eyebrow="Requests" title="Pending invites" />
            <div className="space-y-3">
              {['Luna Reed', 'Ezra Loop', 'Pia Star'].map((name) => (
                <div key={name} className="flex items-center justify-between gap-3 rounded-2xl bg-white/8 p-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={name} size="sm" />
                    <span className="font-bold text-white">{name}</span>
                  </div>
                  <GradientButton variant="ghost" className="min-h-9 px-3 text-xs">View</GradientButton>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel glow="blue">
            <SectionHeader eyebrow="Activity" title="Recent sparks" />
            <div className="space-y-3">
              {feed.map((item) => (
                <p key={item} className="rounded-2xl border border-white/10 bg-[#0d1640]/48 p-3 text-sm leading-6 text-[#d9dcff]">
                  {item}
                </p>
              ))}
            </div>
          </GlassPanel>

          <EmptyState icon={Puzzle} title="Recently played together" description="Future shared puzzle sessions will appear here as soft cards." />
        </div>
      </div>
    </PageShell>
  );
}
