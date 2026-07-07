import type { ElementType, InputHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Gamepad2,
  Home,
  LayoutDashboard,
  Search,
  Settings,
  Sparkles,
  Trophy,
  User,
  Users,
} from 'lucide-react';

type PageShellProps = {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  centered?: boolean;
};

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  glow?: 'gold' | 'pink' | 'blue' | 'none';
};

type GradientButtonProps = {
  children: ReactNode;
  to?: string;
  variant?: 'gold' | 'pink' | 'blue' | 'ghost';
  className?: string;
};

type StatCardProps = {
  label: string;
  value: string;
  detail?: string;
  icon?: ElementType;
};

type AchievementBadgeProps = {
  label: string;
  tone?: 'gold' | 'pink' | 'blue' | 'green';
};

type FilterTabsProps = {
  tabs: string[];
  active?: string;
};

type AvatarProps = {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'away' | 'offline';
};

type ProgressBarProps = {
  value: number;
  label?: string;
};

type SettingRowProps = {
  title: string;
  description: string;
  value?: string;
  enabled?: boolean;
};

const navItems = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Play', to: '/play', icon: Gamepad2 },
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Standings', to: '/leaderboard', icon: Trophy },
  { label: 'Friends', to: '/friends', icon: Users },
  { label: 'Profile', to: '/profile', icon: User },
  { label: 'Settings', to: '/settings', icon: Settings },
];

const starPositions = [
  'left-[8%] top-[10%]',
  'left-[18%] top-[38%]',
  'left-[30%] top-[16%]',
  'left-[48%] top-[28%]',
  'left-[63%] top-[9%]',
  'left-[76%] top-[34%]',
  'left-[88%] top-[14%]',
  'left-[92%] top-[62%]',
  'left-[42%] top-[72%]',
  'left-[12%] top-[76%]',
];

const glowStyles = {
  gold: 'shadow-[0_0_34px_rgba(255,230,138,0.18),0_22px_55px_rgba(0,0,0,0.28)]',
  pink: 'shadow-[0_0_34px_rgba(255,130,200,0.18),0_22px_55px_rgba(0,0,0,0.28)]',
  blue: 'shadow-[0_0_34px_rgba(127,213,255,0.18),0_22px_55px_rgba(0,0,0,0.28)]',
  none: 'shadow-[0_22px_55px_rgba(0,0,0,0.28)]',
};

const buttonStyles = {
  gold: 'border-[#2b1745] bg-[linear-gradient(135deg,#ffe68a,#ffb86c)] text-[#2b1745] shadow-[0_7px_0_#2b1745]',
  pink: 'border-[#2b1745] bg-[linear-gradient(135deg,#ff82c8,#a778ff)] text-white shadow-[0_7px_0_#2b1745]',
  blue: 'border-[#20335f] bg-[linear-gradient(135deg,#7fd5ff,#9dffcf)] text-[#20335f] shadow-[0_7px_0_#20335f]',
  ghost: 'border-white/25 bg-white/10 text-[#fff7ca] shadow-[0_7px_0_rgba(23,14,57,0.55)]',
};

export function PageShell({ children, eyebrow, title, description, actions, centered = false }: PageShellProps) {
  return (
    <main className="loop-scene relative isolate min-h-screen overflow-hidden bg-[#09112f] px-4 py-5 text-white sm:px-6 lg:px-10">
      <div className="cloud cloud-one" aria-hidden="true" />
      <div className="cloud cloud-two" aria-hidden="true" />
      <div className="cloud cloud-three" aria-hidden="true" />

      {starPositions.map((position, index) => (
        <span
          key={position}
          className={`twinkle absolute ${position} size-2 rounded-full bg-[#ffe68a] shadow-[0_0_18px_5px_rgba(255,230,138,0.45)]`}
          style={{ animationDelay: `${index * 0.37}s` }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-7xl flex-col gap-8">
        <AppNavigation />
        <header className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'} pt-4`}>
          {eyebrow ? (
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ffe68a]/40 bg-[#ffe68a]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffe68a]">
              <Sparkles aria-hidden="true" size={15} />
              {eyebrow}
            </p>
          ) : null}
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black leading-tight text-white drop-shadow-[0_5px_0_rgba(54,23,96,0.55)] sm:text-5xl">
                {title}
              </h1>
              {description ? <p className="mt-3 max-w-3xl text-base leading-7 text-[#d9dcff]">{description}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

function AppNavigation() {
  return (
    <nav className="rounded-[28px] border-2 border-white/15 bg-white/10 px-3 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Link to="/" className="inline-flex items-center gap-3 rounded-full px-2 text-[#fff7ca]" aria-label="LoopForge home">
          <span className="grid size-11 place-items-center rounded-2xl border-2 border-[#ffe68a] bg-[#402778] text-[#ffe68a] shadow-[0_0_22px_rgba(255,230,138,0.35)]">
            <Gamepad2 aria-hidden="true" size={22} />
          </span>
          <span className="text-base font-black">LoopForge</span>
        </Link>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-[#0d1640]/62 px-4 text-sm font-bold text-[#d9dcff] transition hover:-translate-y-0.5 hover:border-[#ffe68a]/55 hover:text-[#ffe68a]"
              >
                <Icon aria-hidden="true" size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function GlassPanel({ children, className = '', glow = 'gold' }: GlassPanelProps) {
  return (
    <section className={`rounded-[28px] border-2 border-white/15 bg-white/10 p-5 backdrop-blur-md sm:p-6 ${glowStyles[glow]} ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffe68a]">{eyebrow}</p> : null}
        <h2 className="mt-1 text-2xl font-black text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function GradientButton({ children, to, variant = 'gold', className = '' }: GradientButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-4 px-5 text-sm font-black transition hover:-translate-y-1 hover:brightness-110 ${buttonStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}

export function StatCard({ label, value, detail, icon: Icon = Sparkles }: StatCardProps) {
  return (
    <GlassPanel className="min-h-32" glow="none">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#cfd6ff]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[#ffe68a]">{value}</p>
        </div>
        <span className="grid size-12 place-items-center rounded-2xl bg-[#ffe68a]/18 text-[#ffe68a]">
          <Icon aria-hidden="true" size={22} />
        </span>
      </div>
      {detail ? <p className="mt-3 text-sm leading-6 text-[#cfd6ff]">{detail}</p> : null}
    </GlassPanel>
  );
}

export function AchievementBadge({ label, tone = 'gold' }: AchievementBadgeProps) {
  const tones = {
    gold: 'border-[#ffe68a]/45 bg-[#ffe68a]/16 text-[#ffe68a]',
    pink: 'border-[#ff82c8]/45 bg-[#ff82c8]/16 text-[#ffd8fb]',
    blue: 'border-[#7fd5ff]/45 bg-[#7fd5ff]/16 text-[#c9f2ff]',
    green: 'border-[#9dffcf]/45 bg-[#9dffcf]/16 text-[#d5ffe9]',
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black ${tones[tone]}`}>
      <Sparkles aria-hidden="true" size={14} />
      {label}
    </span>
  );
}

export function FilterTabs({ tabs, active = tabs[0] }: FilterTabsProps) {
  return (
    <div className="inline-flex flex-wrap gap-2 rounded-full border border-white/15 bg-[#0d1640]/62 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`min-h-9 rounded-full px-4 text-sm font-black transition ${
            tab === active ? 'bg-[#ffe68a] text-[#2b1745]' : 'text-[#d9dcff] hover:bg-white/10'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#ffe68a]" size={18} aria-hidden="true" />
      <input
        {...props}
        className="min-h-12 w-full rounded-full border-2 border-white/15 bg-[#0d1640]/72 px-12 text-sm font-bold text-white outline-none transition placeholder:text-[#aeb7e8] focus:border-[#ffe68a]/70"
      />
    </label>
  );
}

export function Avatar({ name, size = 'md', status }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
  const sizes = {
    sm: 'size-10 text-sm',
    md: 'size-12 text-base',
    lg: 'size-16 text-xl',
    xl: 'size-28 text-4xl',
  };
  const statusColors = {
    online: 'bg-[#9dffcf]',
    away: 'bg-[#ffe68a]',
    offline: 'bg-[#8e96c4]',
  };

  return (
    <span className={`relative grid ${sizes[size]} shrink-0 place-items-center rounded-full border-4 border-white/20 bg-[linear-gradient(135deg,#7fd5ff,#ff82c8)] font-black text-[#2b1745] shadow-[0_0_24px_rgba(255,130,200,0.24)]`}>
      {initials}
      {status ? <span className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#15164c] ${statusColors[status]}`} /> : null}
    </span>
  );
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-[#d9dcff]">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      ) : null}
      <div className="h-3 overflow-hidden rounded-full bg-[#0d1640]/80">
        <span className="block h-full rounded-full bg-[linear-gradient(90deg,#ffe68a,#ff82c8,#7fd5ff)]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function SettingRow({ title, description, value, enabled = true }: SettingRowProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0d1640]/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-black text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#cfd6ff]">{description}</p>
      </div>
      {value ? (
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black text-[#ffe68a]">{value}</span>
      ) : (
        <span className={`relative h-8 w-14 rounded-full border-2 transition ${enabled ? 'border-[#ffe68a] bg-[#ffe68a]/25' : 'border-white/20 bg-white/10'}`}>
          <span className={`absolute top-1 size-5 rounded-full bg-[#ffe68a] transition ${enabled ? 'left-7' : 'left-1 bg-[#aeb7e8]'}`} />
        </span>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon = Bell, title, description }: { icon?: ElementType; title: string; description: string }) {
  return (
    <div className="grid min-h-52 place-items-center rounded-[26px] border-2 border-dashed border-white/18 bg-[#0d1640]/38 p-6 text-center">
      <div>
        <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-[#ffe68a]/16 text-[#ffe68a]">
          <Icon aria-hidden="true" size={28} />
        </span>
        <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-[#cfd6ff]">{description}</p>
      </div>
    </div>
  );
}
