import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Container from './ui/Container';
import Button from './ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function FinalCTA() {
  const navigate = useNavigate();
  const { session } = useAuth();

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-violet-electric/20 bg-gradient-to-br from-midnight-700 via-midnight-800 to-midnight-900 px-6 py-16 text-center sm:px-12 lg:py-24">
          {/* Decorative glows */}
          <div
            className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-electric/25 blur-[100px]"
            aria-hidden
          />
          <div
            className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-violet-deep/20 blur-[100px]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-grid-faint bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Make every meeting count.
            </h2>
            <p className="mt-5 text-lg text-lavender-100/70">
              Join the teams shaping the future of collaboration with VORQ.
              Early access is opening soon.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                variant="primary"
                onClick={() => navigate(session ? '/dashboard' : '/signup')}
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" href="#features">
                Explore VORQ
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
