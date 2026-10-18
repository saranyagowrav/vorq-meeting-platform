import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string | null;
    email?: string | null;
    password?: string | null;
    confirm?: string | null;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  function validate(): boolean {
    const errors: typeof fieldErrors = {};
    if (!name.trim()) errors.name = 'Your name is required.';
    else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
    if (!email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
    if (!confirm) errors.confirm = 'Please confirm your password.';
    else if (confirm !== password) errors.confirm = 'Passwords do not match.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validate()) return;

    setSubmitting(true);
    const { error } = await signUp(name.trim(), email.trim(), password);
    setSubmitting(false);

    if (error) {
      setError(error);
      return;
    }
    setSuccess('Account created! Redirecting to your dashboard…');
    setTimeout(() => navigate('/dashboard', { replace: true }), 500);
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="glass-strong rounded-2xl p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] glow-violet sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-lavender-100/60">
              Start meeting better with VORQ in seconds.
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

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <TextField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
              error={fieldErrors.name}
              trailing={<User className="mr-2 h-4 w-4 text-lavender-100/40" />}
            />
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
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              error={fieldErrors.confirm}
            />
            <Button type="submit" variant="primary" fullWidth disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Create account
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-lavender-100/60">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="font-semibold text-violet-soft transition-colors hover:text-ink"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
