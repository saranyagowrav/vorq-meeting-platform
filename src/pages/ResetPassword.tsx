import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  KeyRound,
} from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function ResetPassword() {
  const { session, loading, updatePassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ password?: string | null; confirm?: string | null }>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Optional request-reset sub-form shown when no recovery session is present
  const [requestMode, setRequestMode] = useState(false);
  const [requestEmail, setRequestEmail] = useState('');
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);

  // After a successful update, wait briefly then redirect signed-in users
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate('/dashboard', { replace: true }), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const canUpdate = Boolean(session) && !loading;

  function validate(): boolean {
    const errors: typeof fieldErrors = {};
    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
    if (!confirm) errors.confirm = 'Please confirm your new password.';
    else if (confirm !== password) errors.confirm = 'Passwords do not match.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validate()) return;

    setSubmitting(true);
    const { error } = await updatePassword(password);
    setSubmitting(false);

    if (error) {
      setError(error);
      return;
    }
    setSuccess('Your password has been updated. Redirecting to your dashboard…');
  }

  async function handleRequestReset(e: FormEvent) {
    e.preventDefault();
    setRequestSuccess(null);
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestEmail.trim())) {
      setFieldErrors((p) => ({ ...p, password: null, confirm: null }));
      setError('Enter a valid email address.');
      return;
    }
    setRequestSubmitting(true);
    const { error } = await resetPassword(requestEmail.trim());
    setRequestSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    setRequestSuccess('If an account exists for that email, a reset link is on its way.');
    setRequestEmail('');
  }

  // Loading state — session is still being restored (recovery link processing)
  if (loading) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md text-center">
          <div className="glass-strong rounded-2xl p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] glow-violet">
            <div className="mx-auto mb-4 flex h-10 w-10 animate-spin rounded-full border-2 border-violet-electric/30 border-t-violet-electric" />
            <p className="text-sm text-lavender-100/60">Verifying your reset link…</p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="glass-strong rounded-2xl p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] glow-violet sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-electric/20 to-violet-deep/10 text-violet-soft">
              <KeyRound className="h-6 w-6" strokeWidth={2} />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {requestMode ? 'Request reset link' : 'Set a new password'}
            </h1>
            <p className="mt-2 text-sm text-lavender-100/60">
              {requestMode
                ? "Enter your email and we'll send you a link to reset your password."
                : canUpdate
                  ? 'Choose a new password for your VORQ account.'
                  : 'Your reset link may have expired. Request a new one below.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}
          {requestSuccess && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{requestSuccess}</span>
            </div>
          )}

          {/* Update password form — shown when a recovery session is active */}
          {canUpdate && !requestMode ? (
            <form onSubmit={handleUpdate} className="space-y-5" noValidate>
              <TextField
                label="New password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
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
              <TextField
                label="Confirm new password"
                type={showPassword ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                error={fieldErrors.confirm}
              />
              <Button type="submit" variant="primary" fullWidth disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating password…
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Update password
                  </>
                )}
              </Button>
            </form>
          ) : (
            /* Request-reset sub-form — no recovery session available */
            <form onSubmit={handleRequestReset} className="space-y-5" noValidate>
              <TextField
                label="Email address"
                type="email"
                value={requestEmail}
                onChange={(e) => setRequestEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                trailing={<Mail className="mr-2 h-4 w-4 text-lavender-100/40" />}
              />
              <Button type="submit" variant="primary" fullWidth disabled={requestSubmitting}>
                {requestSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending link…
                  </>
                ) : (
                  'Send reset link'
                )}
              </Button>
            </form>
          )}

          {/* Footer links */}
          <div className="mt-6 flex flex-col items-center gap-2">
            {canUpdate && !requestMode && (
              <button
                type="button"
                onClick={() => {
                  setRequestMode(true);
                  setError(null);
                  setSuccess(null);
                }}
                className="text-xs font-medium text-lavender-100/60 transition-colors hover:text-violet-soft"
              >
                Need a new reset link?
              </button>
            )}
            {requestMode && (
              <button
                type="button"
                onClick={() => {
                  setRequestMode(false);
                  setError(null);
                  setRequestSuccess(null);
                }}
                className="text-xs font-medium text-lavender-100/60 transition-colors hover:text-violet-soft"
              >
                Back to set password
              </button>
            )}
            <p className="text-sm text-lavender-100/60">
              Remember your password?{' '}
              <Link
                to="/signin"
                className="font-semibold text-violet-soft transition-colors hover:text-ink"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
