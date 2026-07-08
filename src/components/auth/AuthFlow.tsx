import type { FormEvent, InputHTMLAttributes, ReactNode } from 'react';
import { Check, Eye, Lock, Mail, Sparkles, Star, User, UserPlus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AchievementBadge, GlassPanel, GradientButton, SectionHeader } from '../ui/AppPrimitives';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinueAsGuest: () => void;
};

type Feature = {
  label: string;
  available: boolean;
};

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  glow?: 'gold' | 'pink' | 'blue';
};

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
};

const savedProgressFeatures = ['Puzzle progress', 'Statistics', 'Achievements', 'Friends', 'Multiplayer'];

const guestFeatures: Feature[] = [
  { label: 'Can play immediately', available: true },
  { label: 'Can generate puzzle progress', available: true },
  { label: 'Can track current session', available: true },
  { label: 'Progress disappears after closing the browser', available: false },
  { label: 'Friends unavailable', available: false },
  { label: 'Multiplayer unavailable', available: false },
  { label: 'Achievements not saved', available: false },
];

export function AuthModal({ isOpen, onClose, onContinueAsGuest }: AuthModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#05091f]/72 px-4 py-6 backdrop-blur-md">
      <button className="absolute inset-0 cursor-default" aria-label="Close account prompt" onClick={onClose} />
      <section className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border-4 border-[#ffe68a]/55 bg-[#14184a]/95 p-5 text-white shadow-[0_0_42px_rgba(255,230,138,0.22),0_30px_80px_rgba(0,0,0,0.45)] sm:p-7">
        <span className="twinkle absolute right-12 top-8 size-3 rounded-full bg-[#ffe68a] shadow-[0_0_20px_6px_rgba(255,230,138,0.45)]" aria-hidden="true" />
        <span className="twinkle absolute bottom-10 left-12 size-2 rounded-full bg-[#ff82c8] shadow-[0_0_20px_6px_rgba(255,130,200,0.35)]" aria-hidden="true" />
        <button
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border-2 border-white/15 bg-white/10 text-[#fff7ca] transition hover:border-[#ffe68a]/70 hover:text-[#ffe68a]"
          aria-label="Close account prompt"
          onClick={onClose}
        >
          <X aria-hidden="true" size={18} />
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="pt-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ffe68a]/40 bg-[#ffe68a]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffe68a]">
              <Sparkles aria-hidden="true" size={15} />
              save your stars
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white drop-shadow-[0_5px_0_rgba(54,23,96,0.55)] sm:text-4xl">
              Save your puzzle progress?
            </h2>
            <p className="mt-3 text-base font-bold leading-7 text-[#d9dcff]">
              Create a free LoopForge account to save:
            </p>
            <FeatureList features={savedProgressFeatures.map((label) => ({ label, available: true }))} compact />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <GradientButton to="/login" variant="gold" className="w-full">
                <Lock size={18} />
                Sign In
              </GradientButton>
              <GradientButton to="/register" variant="pink" className="w-full">
                <UserPlus size={18} />
                Create Account
              </GradientButton>
            </div>
          </div>

          <div className="rounded-[28px] border-2 border-white/15 bg-[#0d1640]/72 p-5 shadow-[inset_0_2px_0_rgba(255,255,255,0.12)]">
            <div className="flex items-center justify-between gap-3">
              <GuestBadge />
              <Star className="text-[#ffe68a]" fill="currentColor" size={26} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-2xl font-black text-white">Continue as Guest</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-[#d9dcff]">
              Progress will only exist while this browser session remains open.
            </p>
            <FeatureList features={guestFeatures} />
            <GradientButton variant="blue" className="mt-5 w-full" onClick={onContinueAsGuest}>
              <Sparkles size={18} />
              Continue as Guest
            </GradientButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export function GuestBanner() {
  return (
    <GlassPanel glow="blue" className="mb-6 border-[#7fd5ff]/35 bg-[#7fd5ff]/10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-3xl border-2 border-[#7fd5ff]/45 bg-[#7fd5ff]/18 text-[#c9f2ff]">
            <User aria-hidden="true" size={26} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black text-white">Playing as Guest</h2>
              <GuestBadge />
            </div>
            <p className="mt-1 text-sm font-bold leading-6 text-[#d9dcff]">
              Progress will disappear when this browser session ends.
            </p>
          </div>
        </div>
        <GradientButton to="/register" variant="gold" className="shrink-0">
          <UserPlus size={18} />
          Create Account
        </GradientButton>
      </div>
    </GlassPanel>
  );
}

export function GuestBadge() {
  return <AchievementBadge label="Guest mode" tone="blue" />;
}

export function AuthLayout({ eyebrow, title, description, children, glow = 'gold' }: AuthLayoutProps) {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <GlassPanel glow="blue" className="relative overflow-hidden">
        <span className="twinkle absolute right-8 top-8 size-3 rounded-full bg-[#ffe68a] shadow-[0_0_18px_5px_rgba(255,230,138,0.4)]" aria-hidden="true" />
        <SectionHeader eyebrow={eyebrow} title={title} />
        <p className="text-sm font-bold leading-7 text-[#d9dcff]">{description}</p>
        <div className="mt-5 rounded-[24px] border-2 border-white/12 bg-[#0d1640]/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <GuestBadge />
            <Sparkles className="text-[#ff82c8]" aria-hidden="true" size={22} />
          </div>
          <FeatureList features={guestFeatures} compact />
        </div>
      </GlassPanel>
      <AuthenticationCard glow={glow}>{children}</AuthenticationCard>
    </div>
  );
}

export function AuthenticationCard({ children, glow = 'gold' }: { children: ReactNode; glow?: 'gold' | 'pink' | 'blue' }) {
  return <GlassPanel glow={glow}>{children}</GlassPanel>;
}

export function InputField({ label, icon, className = '', ...props }: InputFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-black text-[#fff7ca]">{label}</span>
      <span className="relative mt-2 block">
        {icon ? <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#ffe68a]">{icon}</span> : null}
        <input
          {...props}
          className={`min-h-12 w-full rounded-2xl border-2 border-white/15 bg-[#0d1640]/72 px-4 text-white outline-none transition placeholder:text-[#aeb7e8] focus:border-[#ffe68a]/70 ${icon ? 'pl-12' : ''} ${className}`}
        />
      </span>
    </label>
  );
}

export function PasswordInput(props: Omit<InputFieldProps, 'type' | 'icon'>) {
  return <InputField {...props} type="password" icon={<Eye size={18} aria-hidden="true" />} />;
}

export function Checkbox({ children }: { children: ReactNode }) {
  return (
    <label className="flex items-start gap-3 text-sm font-bold leading-6 text-[#d9dcff]">
      <input type="checkbox" className="mt-1 size-4 accent-[#ffe68a]" />
      {children}
    </label>
  );
}

export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-white/15" />
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[#aeb7e8]">{label}</span>
      <span className="h-px flex-1 bg-white/15" />
    </div>
  );
}

export function FeatureList({ features, compact = false }: { features: Feature[]; compact?: boolean }) {
  return (
    <ul className={`${compact ? 'mt-4 grid gap-2' : 'mt-4 grid gap-3'}`}>
      {features.map((feature) => (
        <li key={feature.label} className="flex items-start gap-3 text-sm font-bold leading-6 text-[#d9dcff]">
          <span
            className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
              feature.available ? 'bg-[#9dffcf]/18 text-[#9dffcf]' : 'bg-[#ff82c8]/16 text-[#ffd8fb]'
            }`}
          >
            {feature.available ? <Check aria-hidden="true" size={14} /> : <X aria-hidden="true" size={14} />}
          </span>
          {feature.label}
        </li>
      ))}
    </ul>
  );
}

export function handleAuthPlaceholderSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  // TODO: Connect this form to the future authentication backend.
}

export const authIcons = {
  mail: <Mail size={18} aria-hidden="true" />,
  user: <User size={18} aria-hidden="true" />,
};
