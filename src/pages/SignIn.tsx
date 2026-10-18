import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function SignIn() {
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberError, setRememberError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitting, setForgotSubmitting] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);

  const from = (location.state as { from?: string } | null)?.from || '/dashboard';

  function validate(): boolean {
    const errors: { email?: string | null; password?: string | null } = {};
    if (!email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
    if (!forgotMode) {
      if (!password) errors.password = 'Password is required.';
      else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setRememberError(null);
    setSuccess(null);
    if (!validate()) return;

    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);

    if (error) {
      setRememberError(error);
      return;
    }
    setSuccess('Welcome back! Redirecting to your dashboard…');
    setTimeout(() => navigate(from, { replace: true }), 400);
  }

  async function handleForgot(e: FormEvent) {
    e.preventDefault();
    setForgotSuccess(null);
    setRememberError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      setFieldErrors((p) => ({ ...p, email: 'Enter a valid email address.' }));
      return;
    }
    setForgotSubmitting(true);
    const { error } = await resetPassword(forgotEmail.trim());
    setForgotSubmitting(false);
    if (error) {
      setRememberError(error);
      return;
    }
    setForgotSuccess('If an account exists for that email, a reset link is on its way.');
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="glass-strong rounded-2xl p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] glow-violet sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {forgotMode ? 'Reset your password' : 'Welcome back'}
            </h1>
            <p className="mt-2 text-sm text-lavender-100/60">
              {forgotMode
                ? "Enter your email and we'll send you a reset link."
                : 'Sign in to your VORQ account to continue.'}
            </p>
          </div>

          {rememberError && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{rememberError}</span>
            </div>
          )}
          {success && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}
          {forgotSuccess && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{forgotSuccess}</span>
            </div>
          )}

          {forgotMode ? (
            <form onSubmit={handleForgot} className="space-y-5" noValidate>
              <TextField
                label="Email address"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                error={fieldErrors.email}
                trailing={<Mail className="mr-2 h-4 w-4 text-lavender-100/40" />}
              />
              <Button type="submit" variant="primary" fullWidth disabled={forgotSubmitting}>
                {forgotSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending link…
                  </>
                ) : (
                  'Send reset link'
                )}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setForgotMode(false);
                  setRememberError(null);
                  setForgotSuccess(null);
                }}
                className="w-full text-center text-sm font-medium text-violet-soft transition-colors hover:text-ink"
              >
                Back to sign in
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <TextField
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                error={fieldErrors.email}
                trailing={<Mail className="mr-2 h-4 w-4 text-lavender-100/40" />}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                error={fieldErrors.password}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="mr-1.5 flex h-8 w-8 items-center justify-center rounded-lg text-lavender-100/60 transition-colors hover:bg-lavender-100/[0.06] hover:text-ink"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(true);
                    setRememberError(null);
                    setForgotEmail(email);
                  }}
                  className="text-xs font-medium text-lavender-100/60 transition-colors hover:text-violet-soft"
                >
                  Forgot password?
                </button>
              </div>
              <Button type="submit" variant="primary" fullWidth disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Sign in
                  </>
                )}
              </Button>
            </form>
          )}

          {!forgotMode && (
            <p className="mt-6 text-center text-sm text-lavender-100/60">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-violet-soft transition-colors hover:text-ink"
              >
                Create one
              </Link>
            </p>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
