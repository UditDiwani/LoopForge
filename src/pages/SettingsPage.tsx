import { AlertTriangle, Bell, Eye, Globe2, Lock, Moon, Palette, Volume2, Wand2 } from 'lucide-react';
import { GlassPanel, PageShell, SectionHeader, SettingRow } from '../components/ui/AppPrimitives';

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
            <SettingRow title="Delete account" description="Placeholder destructive area with no active behavior." value="Locked" />
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
    </PageShell>
  );
}
