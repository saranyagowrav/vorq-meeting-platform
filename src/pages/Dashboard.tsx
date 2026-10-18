import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  VideoOff,
  CalendarPlus,
  LogIn,
  Clock,
  LogOut,
  User as UserIcon,
  Info,
  Loader2,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ThemeToggle';
import { VorqSymbol, VorqWordmark } from '@/components/VorqLogo';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionInfo, setActionInfo] = useState<string | null>(null);

  const displayName =
    user?.user_metadata?.full_name ||
    (user?.email ? user.email.split('@')[0] : 'there');

  async function handleSignOut() {
    await signOut();
    navigate('/', { replace: true });
  }

  function comingSoon(label: string) {
    setActionInfo(`${label} is coming soon. This is a demo dashboard.`);
    setTimeout(() => setActionInfo(null), 3500);
  }

  return (
    <div className="theme-transition relative min-h-screen bg-midnight-900">
      <div className="absolute inset-0 bg-radial-violet" aria-hidden />
      <div
        className="absolute inset-0 bg-grid-faint bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]"
        aria-hidden
      />

      {/* Top nav */}
      <header className="relative z-20 border-b border-lavender-100/10 bg-midnight-900/70 backdrop-blur-xl">
        <Container>
          <nav className="flex h-16 items-center justify-between lg:h-20">
            <Link to="/" className="flex items-center gap-2.5" aria-label="VORQ home">
              <VorqSymbol className="h-8 w-8 shrink-0" />
              <VorqWordmark />
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl border border-lavender-100/15 bg-lavender-100/[0.04] py-2 pl-2 pr-3 text-sm font-medium text-ink transition-colors hover:bg-lavender-100/[0.07]"
                  aria-expanded={menuOpen}
                  aria-label="Account menu"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-electric to-violet-deep text-xs font-bold text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline">{displayName}</span>
                </button>
                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMenuOpen(false)}
                      aria-hidden
                    />
                    <div className="absolute right-0 top-12 z-20 w-56 overflow-hidden rounded-xl border border-lavender-100/15 bg-midnight-800/95 shadow-2xl backdrop-blur-xl">
                      <div className="border-b border-lavender-100/10 px-4 py-3">
                        <p className="truncate text-sm font-semibold text-ink">{displayName}</p>
                        <p className="truncate text-xs text-lavender-100/55">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          comingSoon('Profile');
                        }}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-lavender-100/80 transition-colors hover:bg-lavender-100/[0.05] hover:text-ink"
                      >
                        <UserIcon className="h-4 w-4" />
                        Profile
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-rose-300 transition-colors hover:bg-rose-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </nav>
        </Container>
      </header>

      <main className="relative z-10 py-10 lg:py-16">
        <Container>
          {/* Welcome */}
          <div className="animate-fade-up">
            <p className="text-sm font-medium text-violet-soft">VORQ Dashboard</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Welcome back, {displayName}.
            </h1>
            <p className="mt-3 max-w-xl text-base text-lavender-100/70 sm:text-lg">
              Ready to meet better? Start a new meeting instantly or join one with a link.
            </p>
          </div>

          {/* Action cards */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lavender-100/30">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-electric/0 blur-3xl transition-all duration-500 group-hover:bg-violet-electric/20" aria-hidden />
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-electric/20 to-violet-deep/10 text-violet-soft">
                <Video className="h-6 w-6" strokeWidth={2} />
              </div>
              <h2 className="relative mb-1 font-display text-lg font-semibold text-ink">
                Start a meeting
              </h2>
              <p className="relative mb-5 text-sm text-lavender-100/65">
                Spin up an instant meeting and invite your team.
              </p>
              <Button variant="primary" onClick={() => comingSoon('Start Meeting')}>
                <Video className="h-4 w-4" />
                Start meeting
              </Button>
            </div>

            <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lavender-100/30">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/0 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/20" aria-hidden />
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/10 text-emerald-300">
                <LogIn className="h-6 w-6" strokeWidth={2} />
              </div>
              <h2 className="relative mb-1 font-display text-lg font-semibold text-ink">
                Join a meeting
              </h2>
              <p className="relative mb-5 text-sm text-lavender-100/65">
                Enter a meeting link or code to join an ongoing call.
              </p>
              <Button variant="secondary" onClick={() => comingSoon('Join Meeting')}>
                <LogIn className="h-4 w-4" />
                Join meeting
              </Button>
            </div>
          </div>

          {/* Info toast */}
          {actionInfo && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-300">
              <Info className="h-4 w-4 shrink-0" />
              <span>{actionInfo}</span>
            </div>
          )}

          {/* Recent meetings */}
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-ink">Recent meetings</h2>
              <span className="text-xs text-lavender-100/40">0 meetings</span>
            </div>

            <div className="glass rounded-2xl p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-lavender-100/15 bg-lavender-100/[0.04] text-lavender-100/50">
                <VideoOff className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">
                No meetings yet
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-lavender-100/60">
                When you start or join a meeting, it will appear here so you can
                quickly find your summaries and action items.
              </p>
              <div className="mt-5 flex justify-center">
                <Button variant="secondary" onClick={() => comingSoon('Start Meeting')}>
                  <CalendarPlus className="h-4 w-4" />
                  Start your first meeting
                </Button>
              </div>
            </div>
          </section>

          {/* Loading note (purely for session hydration visibility) */}
          {!user && (
            <div className="mt-8 flex items-center gap-2 text-sm text-lavender-100/50">
              <Loader2 className="h-4 w-4 animate-spin" />
              Restoring your session…
            </div>
          )}

          <p className="mt-10 flex items-center gap-1.5 text-xs text-lavender-100/40">
            <Clock className="h-3.5 w-3.5" />
            Meeting features are in development — this dashboard is a preview.
          </p>
        </Container>
      </main>
    </div>
  );
}
