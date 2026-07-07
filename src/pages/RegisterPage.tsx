import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassPanel, GradientButton, PageShell } from '../components/ui/AppPrimitives';

export function RegisterPage() {
  return (
    <PageShell
      eyebrow="Create account"
      title="Start a new loop."
      description="A matching registration skeleton with placeholder fields and no account logic."
      centered
    >
      <div className="mx-auto grid w-full max-w-md pb-10">
        <GlassPanel glow="pink">
          <form className="space-y-5">
            {[
              ['Username', 'NovaQuinn'],
              ['Email', 'nova@loopforge.dev'],
              ['Password', '********'],
              ['Confirm password', '********'],
            ].map(([label, placeholder]) => (
              <label key={label} className="block">
                <span className="text-sm font-black text-[#fff7ca]">{label}</span>
                <input
                  type={label.toLowerCase().includes('password') ? 'password' : 'text'}
                  className="mt-2 min-h-12 w-full rounded-2xl border-2 border-white/15 bg-[#0d1640]/72 px-4 text-white outline-none placeholder:text-[#aeb7e8] focus:border-[#ffe68a]/70"
                  placeholder={placeholder}
                />
              </label>
            ))}
            <label className="flex items-start gap-3 text-sm font-bold leading-6 text-[#d9dcff]">
              <input type="checkbox" className="mt-1 size-4 accent-[#ffe68a]" />
              I agree to the placeholder terms and cozy puzzle conduct.
            </label>
            <GradientButton variant="gold" className="w-full"><UserPlus size={18} />Create account</GradientButton>
          </form>
          <p className="mt-6 text-center text-sm font-bold text-[#d9dcff]">
            Already have an account? <Link to="/login" className="text-[#ffe68a]">Sign in</Link>
          </p>
        </GlassPanel>
      </div>
    </PageShell>
  );
}
