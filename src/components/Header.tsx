import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import ThemeToggle from './ThemeToggle';
import { VorqWordmark, VorqSymbol } from './VorqLogo';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { label: 'Product', href: '#features' },
  { label: 'Features', href: '#features' },
  { label: 'Security', href: '#security' },
  { label: 'Resources', href: '#privacy' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-lavender-100/10 bg-midnight-900/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-20">
          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-2.5" aria-label="VORQ home">
            <VorqSymbol className="h-8 w-8 shrink-0" />
            <VorqWordmark />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-lavender-100/80 transition-colors hover:bg-lavender-100/[0.05] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            {session ? (
              <Button variant="primary" onClick={() => navigate('/dashboard')}>
                Go to dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/signin')}>
                  Sign in
                </Button>
                <Button variant="primary" onClick={() => navigate('/signup')}>
                  Get started
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggles */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-lavender-100/90 transition-colors hover:bg-lavender-100/[0.06]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-lavender-100/10 bg-midnight-800/95 backdrop-blur-xl md:hidden">
          <Container>
            <ul className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-lavender-100/90 transition-colors hover:bg-lavender-100/[0.05] hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2 px-1">
                {session ? (
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/dashboard');
                    }}
                  >
                    Go to dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/signin');
                      }}
                    >
                      Sign in
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/signup');
                      }}
                    >
                      Get started
                    </Button>
                  </>
                )}
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
