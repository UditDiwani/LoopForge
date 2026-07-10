import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AuthDivider,
  AuthLayout,
  Checkbox,
  InputField,
  LoadingButton,
  PasswordInput,
  ValidationMessage,
  authIcons,
} from '../components/auth/AuthFlow';
import { GradientButton, PageShell } from '../components/ui/AppPrimitives';
import { loginUser } from '../services/authApi';
import { setAuthSession } from '../services/authSession';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const canSubmit = email.trim().length > 0 && password.length > 0 && !isSubmitting;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(undefined);

    if (!email.trim()) {
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      passwordRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await loginUser({
        email,
        password,
      });

      setAuthSession(session);
      // TODO: Use rememberMe when persistent refresh/session support is introduced.
      void rememberMe;
      navigate('/play');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <InputField
            ref={emailRef}
            label="Email"
            name="login-email"
            type="text"
            inputMode="email"
            autoComplete="email"
            placeholder="nova@loopforge.dev"
            icon={authIcons.mail}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <PasswordInput
            ref={passwordRef}
            label="Password"
            name="login-password"
            placeholder="********"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex items-center justify-between gap-3 text-sm">
            <Checkbox checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)}>
              Remember me
            </Checkbox>
            <Link to="/login" className="font-black text-[#ffe68a]">Forgot password?</Link>
          </div>
          <LoadingButton type="submit" variant="gold" className="w-full" disabled={!canSubmit} isLoading={isSubmitting}>
            Sign in
          </LoadingButton>
          <ValidationMessage>{submitError}</ValidationMessage>
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
