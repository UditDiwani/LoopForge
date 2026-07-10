import { useState } from 'react';
import { AlertTriangle, Bell, Eye, Globe2, Lock, Moon, Palette, Volume2, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton, ValidationMessage } from '../components/auth/AuthFlow';
import { GlassPanel, GradientButton, PageShell, SectionHeader, SettingRow } from '../components/ui/AppPrimitives';
import { deleteCurrentUser } from '../services/authApi';
import { clearAuthSession, getAuthSession } from '../services/authSession';

const groups = [
  {
    title: 'Experience',
    icon: Palette,
    rows: [
      ['Theme', 'Keep the app in the magical night palette.', 'Moonlit'],
      ['Sound', 'Soft interface and puzzle feedback audio.', undefined, true],
      ['Animations', 'Floating clouds, stars, and hover motion.', undefined, true],
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    rows: [
      ['Daily reminders', 'Gentle nudges for the daily Slitherlink challenge.', undefined, false],
      ['Friend activity', 'Placeholder alerts for requests and achievements.', undefined, true],
    ],
  },
  {
    title: 'Accessibility',
    icon: Eye,
    rows: [
      ['Reduced motion', 'Prepare a calmer animation option.', undefined, false],
      ['High contrast grid', 'Future puzzle board contrast preference.', undefined, false],
      ['Language', 'Preferred interface language.', 'English'],
    ],
  },
  {
    title: 'Account and privacy',
    icon: Lock,
    rows: [
      ['Account', 'Placeholder profile and account controls.', 'Manage'],
      ['Privacy', 'Future visibility settings for friends and rankings.', 'Friends only'],
    ],
  },
];

export function SettingsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | undefined>();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    if (!getAuthSession()) {
      setDeleteError('Sign in or start a guest session before deleting an account.');
      return;
    }

    setIsDeleting(true);
    setDeleteError(undefined);

    try {
      await deleteCurrentUser();
      clearAuthSession();
      navigate('/');
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Unable to delete account.');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <PageShell
      eyebrow="Settings"
      title="Tune the night sky."
      description="A complete visual settings layout with placeholder controls only."
    >
      <div className="grid gap-6 pb-10 lg:grid-cols-2">
        {groups.map((group) => {
          const Icon = group.icon;

          return (
            <GlassPanel key={group.title} glow="blue">
              <SectionHeader
                eyebrow="Settings"
                title={group.title}
                action={<span className="grid size-11 place-items-center rounded-2xl bg-[#ffe68a]/16 text-[#ffe68a]"><Icon size={22} /></span>}
              />
              <div className="space-y-3">
                {group.rows.map(([title, description, value, enabled]) => (
                  <SettingRow key={title as string} title={title as string} description={description as string} value={value as string | undefined} enabled={enabled as boolean | undefined} />
                ))}
              </div>
            </GlassPanel>
          );
        })}

        <GlassPanel glow="pink" className="lg:col-span-2">
          <SectionHeader
            eyebrow="Careful"
            title="Danger zone"
            action={<span className="grid size-11 place-items-center rounded-2xl bg-[#ff82c8]/16 text-[#ffd8fb]"><AlertTriangle size={22} /></span>}
          />
          <div className="grid gap-3 md:grid-cols-3">
            <SettingRow title="Export data" description="Placeholder control for future account export." value="Prepare" />
            <SettingRow title="Pause account" description="Placeholder control for temporarily hiding activity." value="Pause" />
            <button
              type="button"
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0d1640]/50 p-4 text-left transition hover:border-[#ff82c8]/45 sm:flex-row sm:items-center sm:justify-between"
              onClick={() => {
                setDeleteError(undefined);
                setIsDeleteModalOpen(true);
              }}
            >
              <span>
                <span className="block font-black text-white">Delete account</span>
                <span className="mt-1 block text-sm leading-6 text-[#cfd6ff]">Permanently remove the current account or guest session.</span>
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black text-[#ffe68a]">Delete</span>
            </button>
          </div>
        </GlassPanel>

        <GlassPanel glow="gold" className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-[#d9dcff]">
            <Moon className="text-[#ffe68a]" size={20} />
            <span>Visual preferences are static placeholders.</span>
            <Volume2 className="text-[#ff82c8]" size={20} />
            <Globe2 className="text-[#7fd5ff]" size={20} />
            <Wand2 className="text-[#9dffcf]" size={20} />
          </div>
        </GlassPanel>
      </div>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </PageShell>
  );
}

function DeleteAccountModal({
  isOpen,
  isDeleting,
  error,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  isDeleting: boolean;
  error?: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#05091f]/72 px-4 py-6 backdrop-blur-md">
      <button className="absolute inset-0 cursor-default" aria-label="Close delete account confirmation" onClick={onClose} />
      <section className="relative w-full max-w-md rounded-[28px] border-4 border-[#ff82c8]/55 bg-[#14184a]/95 p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <SectionHeader eyebrow="Confirm" title="Delete this account?" />
        <p className="text-sm font-bold leading-6 text-[#d9dcff]">
          This removes the current LoopForge user record from MongoDB. This first version does not include account recovery.
        </p>
        <ValidationMessage>{error}</ValidationMessage>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <GradientButton variant="ghost" onClick={onClose}>Cancel</GradientButton>
          <LoadingButton variant="pink" isLoading={isDeleting} onClick={onConfirm}>
            <AlertTriangle size={18} />
            Delete account
          </LoadingButton>
        </div>
      </section>
    </div>
  );
}
