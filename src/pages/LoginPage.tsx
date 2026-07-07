import { Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassPanel, GradientButton, PageShell } from '../components/ui/AppPrimitives';

export function LoginPage() {
  return (
    <PageShell
      eyebrow="Sign in"
      title="Return to your puzzle sky."
      description="A glassy authentication skeleton matching the LoopForge night world."
      centered
    >
      <div className="mx-auto grid w-full max-w-md pb-10">
        <GlassPanel glow="gold">
          <form className="space-y-5">
            <label className="block">
              <span className="text-sm font-black text-[#fff7ca]">Email</span>
              <input className="mt-2 min-h-12 w-full rounded-2xl border-2 border-white/15 bg-[#0d1640]/72 px-4 text-white outline-none placeholder:text-[#aeb7e8] focus:border-[#ffe68a]/70" placeholder="nova@loopforge.dev" />
            </label>
            <label className="block">
              <span className="text-sm font-black text-[#fff7ca]">Password</span>
              <input type="password" className="mt-2 min-h-12 w-full rounded-2xl border-2 border-white/15 bg-[#0d1640]/72 px-4 text-white outline-none placeholder:text-[#aeb7e8] focus:border-[#ffe68a]/70" placeholder="********" />
            </label>
            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 font-bold text-[#d9dcff]">
                <input type="checkbox" className="size-4 accent-[#ffe68a]" />
                Remember me
              </label>
              <Link to="/login" className="font-black text-[#ffe68a]">Forgot password?</Link>
            </div>
            <GradientButton variant="gold" className="w-full">Sign in</GradientButton>
            <GradientButton variant="ghost" className="w-full"><Mail size={18} />Continue with Google</GradientButton>
          </form>
          <p className="mt-6 text-center text-sm font-bold text-[#d9dcff]">
            New to LoopForge? <Link to="/register" className="text-[#ffe68a]">Create an account</Link>
          </p>
          <Sparkles className="mx-auto mt-5 text-[#ff82c8]" size={24} />
        </GlassPanel>
      </div>
    </PageShell>
  );
}
