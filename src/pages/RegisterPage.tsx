import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AuthLayout,
  Checkbox,
  InputField,
  PasswordInput,
  authIcons,
  handleAuthPlaceholderSubmit,
} from '../components/auth/AuthFlow';
import { GradientButton, PageShell } from '../components/ui/AppPrimitives';

export function RegisterPage() {
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
        <form className="space-y-5" onSubmit={handleAuthPlaceholderSubmit}>
          <InputField label="Username" placeholder="NovaQuinn" icon={authIcons.user} />
          <InputField label="Email" type="email" placeholder="nova@loopforge.dev" icon={authIcons.mail} />
          <PasswordInput label="Password" placeholder="********" />
          <PasswordInput label="Confirm password" placeholder="********" />
          <Checkbox>I agree to the placeholder terms and cozy puzzle conduct.</Checkbox>
          <GradientButton type="submit" variant="gold" className="w-full"><UserPlus size={18} />Create account</GradientButton>
        </form>
        <p className="mt-6 text-center text-sm font-bold text-[#d9dcff]">
          Already have an account? <Link to="/login" className="text-[#ffe68a]">Sign in</Link>
        </p>
      </AuthLayout>
    </PageShell>
  );
}
