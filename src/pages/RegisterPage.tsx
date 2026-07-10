import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AuthLayout,
  Checkbox,
  InputField,
  LoadingButton,
  PasswordInput,
  PasswordRequirements,
  PasswordStrength,
  ValidationMessage,
  authIcons,
} from '../components/auth/AuthFlow';
import { GradientButton, PageShell } from '../components/ui/AppPrimitives';
import { registerUser } from '../services/authApi';
import { setAuthSession } from '../services/authSession';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim();
  const isEmailValid = emailPattern.test(trimmedEmail);
  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /\d/.test(password) },
  ];
  const passwordStrength = passwordRequirements.filter((requirement) => requirement.met).length;
  const isPasswordValid = passwordRequirements.every((requirement) => requirement.met);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit =
    trimmedUsername.length > 0 &&
    isEmailValid &&
    isPasswordValid &&
    passwordsMatch &&
    termsAccepted &&
    !isSubmitting;
  const showUsernameError = submittedOnce || touched.username;
  const showEmailError = submittedOnce || touched.email;
  const showPasswordError = submittedOnce || touched.password;
  const showConfirmPasswordError = submittedOnce || touched.confirmPassword;
  const showTermsError = submittedOnce || touched.terms;
  const usernameError = showUsernameError && !trimmedUsername ? 'Username is required.' : undefined;
  const emailError = showEmailError
    ? !trimmedEmail
      ? 'Email is required.'
      : !isEmailValid
        ? 'Enter a valid email address.'
        : undefined
    : undefined;
  const passwordError = showPasswordError && !password ? 'Password is required.' : showPasswordError && !isPasswordValid ? 'Use a stronger password.' : undefined;
  const confirmPasswordError =
    showConfirmPasswordError && !confirmPassword
      ? 'Confirm your password.'
      : showConfirmPasswordError && confirmPassword && !passwordsMatch
        ? "Passwords don't match."
        : undefined;
  const termsError = showTermsError && !termsAccepted ? 'You must accept the terms to continue.' : undefined;

  function markTouched(field: keyof typeof touched) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function focusFirstInvalidField() {
    if (!trimmedUsername) {
      usernameRef.current?.focus();
      return;
    }

    if (!isEmailValid) {
      emailRef.current?.focus();
      return;
    }

    if (!isPasswordValid) {
      passwordRef.current?.focus();
      return;
    }

    if (!passwordsMatch) {
      confirmPasswordRef.current?.focus();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedOnce(true);
    setSubmitError(undefined);

    if (!canSubmit) {
      focusFirstInvalidField();
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await registerUser({
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      });

      setAuthSession(session);
      void confirmPassword;
      void termsAccepted;
      navigate('/play');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell
      eyebrow="Create account"
      title="Start a new loop."
      description="A matching registration skeleton with placeholder fields and no account logic."
      centered
    >
      <AuthLayout
        eyebrow="New constellation"
        title="Make a place for your loops."
        description="Account creation is visual only for this sprint. These fields establish the flow without creating users, sessions, API calls, or database records."
        glow="pink"
      >
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <InputField
            ref={usernameRef}
            label="Username"
            name="register-username"
            placeholder="NovaQuinn"
            autoComplete="username"
            icon={authIcons.user}
            value={username}
            error={usernameError}
            onBlur={() => markTouched('username')}
            onChange={(event) => setUsername(event.target.value)}
          />
          <InputField
            ref={emailRef}
            label="Email"
            name="register-email"
            type="text"
            inputMode="email"
            autoComplete="email"
            placeholder="nova@loopforge.dev"
            icon={authIcons.mail}
            value={email}
            error={emailError}
            onBlur={() => markTouched('email')}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div>
            <PasswordInput
              ref={passwordRef}
              label="Password"
              name="register-password"
              placeholder="********"
              autoComplete="new-password"
              value={password}
              error={passwordError}
              onBlur={() => markTouched('password')}
              onChange={(event) => setPassword(event.target.value)}
            />
            <PasswordStrength score={passwordStrength} />
            <PasswordRequirements requirements={passwordRequirements} />
          </div>
          <PasswordInput
            ref={confirmPasswordRef}
            label="Confirm password"
            name="register-confirm-password"
            placeholder="********"
            autoComplete="new-password"
            value={confirmPassword}
            error={confirmPasswordError}
            onBlur={() => markTouched('confirmPassword')}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <div>
            <Checkbox
              checked={termsAccepted}
              onBlur={() => markTouched('terms')}
              onChange={(event) => setTermsAccepted(event.target.checked)}
            >
              I agree to the placeholder terms and cozy puzzle conduct.
            </Checkbox>
            <ValidationMessage>{termsError}</ValidationMessage>
          </div>
          <LoadingButton type="submit" variant="gold" className="w-full" disabled={!canSubmit} isLoading={isSubmitting}>
            <UserPlus size={18} />
            Create account
          </LoadingButton>
          <ValidationMessage>{submitError}</ValidationMessage>
        </form>
        <p className="mt-6 text-center text-sm font-bold text-[#d9dcff]">
          Already have an account? <Link to="/login" className="text-[#ffe68a]">Sign in</Link>
        </p>
      </AuthLayout>
    </PageShell>
  );
}
