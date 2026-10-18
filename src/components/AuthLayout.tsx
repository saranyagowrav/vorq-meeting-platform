import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import { VorqSymbol, VorqWordmark } from '@/components/VorqLogo';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="theme-transition relative flex min-h-screen flex-col bg-midnight-900">
      {/* Background layers */}
      <div className="absolute inset-0 bg-radial-violet" aria-hidden />
      <div
        className="absolute inset-0 bg-grid-faint bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden
      />
      <div
        className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-violet-electric/20 blur-[120px]"
        aria-hidden
      />

      {/* Header bar */}
      <header className="relative z-10 py-6">
        <Container>
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5" aria-label="VORQ home">
              <VorqSymbol className="h-8 w-8 shrink-0" />
              <VorqWordmark />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-lavender-100/70 transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-8 sm:px-8">
        {children}
      </main>
    </div>
  );
}
