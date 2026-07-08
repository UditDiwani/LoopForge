import { Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AuthDivider,
  AuthLayout,
  Checkbox,
  InputField,
  PasswordInput,
  authIcons,
  handleAuthPlaceholderSubmit,
} from '../components/auth/AuthFlow';
import { GradientButton, PageShell } from '../components/ui/AppPrimitives';

export function LoginPage() {
  return (
    <PageShell
      eyebrow="Sign in"
      title="Return to your puzzle sky."
      description="A glassy authentication skeleton matching the LoopForge night world."
      centered
    >
      <AuthLayout
        eyebrow="Account portal"
        title="Your saved puzzle sky waits here."
        description="This sprint keeps the sign-in experience presentational. Accounts, tokens, and saved progress will connect in a later backend sprint."
      >
        <form className="space-y-5" onSubmit={handleAuthPlaceholderSubmit}>
          <InputField label="Email" type="email" placeholder="nova@loopforge.dev" icon={authIcons.mail} />
          <PasswordInput label="Password" placeholder="********" />
          <div className="flex items-center justify-between gap-3 text-sm">
            <Checkbox>Remember me</Checkbox>
            <Link to="/login" className="font-black text-[#ffe68a]">Forgot password?</Link>
          </div>
          <GradientButton type="submit" variant="gold" className="w-full">Sign in</GradientButton>
          <AuthDivider label="future option" />
          <GradientButton
            variant="ghost"
            className="w-full"
            onClick={() => {
              // TODO: Connect provider sign-in when authentication is implemented.
            }}
          >
            <Mail size={18} />
            Continue with Google
          </GradientButton>
        </form>
        <p className="mt-6 text-center text-sm font-bold text-[#d9dcff]">
          New to LoopForge? <Link to="/register" className="text-[#ffe68a]">Create an account</Link>
        </p>
        <Sparkles className="mx-auto mt-5 text-[#ff82c8]" size={24} />
      </AuthLayout>
    </PageShell>
  );
}
