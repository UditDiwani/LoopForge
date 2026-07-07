import { Home, Puzzle, Sparkles } from 'lucide-react';
import { GlassPanel, GradientButton, PageShell } from '../components/ui/AppPrimitives';

export function NotFoundPage() {
  return (
    <PageShell
      eyebrow="404"
      title="A puzzle piece drifted away."
      description="This route does not exist yet, but the night sky still knows the way home."
      centered
    >
      <div className="mx-auto w-full max-w-2xl pb-10">
        <GlassPanel glow="gold" className="text-center">
          <div className="mx-auto grid size-40 place-items-center rounded-[38px] border-4 border-[#ffe68a]/60 bg-[linear-gradient(135deg,#7fd5ff,#a778ff,#ff82c8)] text-[#2b1745] shadow-[0_0_38px_rgba(255,230,138,0.34)]">
            <Puzzle size={74} />
          </div>
          <div className="mt-6 flex justify-center gap-3 text-[#ffe68a]">
            <Sparkles className="twinkle" size={22} />
            <Sparkles className="twinkle" size={18} />
            <Sparkles className="twinkle" size={24} />
          </div>
          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#d9dcff]">
            The path probably loops back through the portal menu.
          </p>
          <GradientButton to="/" variant="gold" className="mt-6"><Home size={18} />Return home</GradientButton>
        </GlassPanel>
      </div>
    </PageShell>
  );
}
