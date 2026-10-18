import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Container from './ui/Container';
import Button from './ui/Button';
import Eyebrow from './ui/Eyebrow';
import CallPreview from './CallPreview';
import { useAuth } from '@/context/AuthContext';

export default function Hero() {
  const navigate = useNavigate();
  const { session } = useAuth();

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 bg-radial-violet" aria-hidden />
      <div
        className="absolute inset-0 bg-grid-faint bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden
      />
      <div
        className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-violet-electric/20 blur-[120px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Left: copy */}
          <div className="max-w-xl">
            <div className="animate-fade-up">
              <Eyebrow>
                <Sparkles className="h-3.5 w-3.5" />
                The future of collaboration
              </Eyebrow>
            </div>

            <h1 className="mt-6 animate-fade-up font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink delay-100 sm:text-5xl lg:text-6xl">
              Meet better.{' '}
              <span className="text-gradient-violet">Work smarter.</span>
            </h1>

            <p className="mt-6 animate-fade-up text-lg leading-relaxed text-lavender-100/75 delay-200">
              AI-powered meetings that keep teams connected, conversations clear,
              and collaboration moving.
            </p>

            <div className="mt-8 flex animate-fade-up flex-col gap-3 delay-300 sm:flex-row">
              <Button
                variant="primary"
                onClick={() => navigate(session ? '/dashboard' : '/signup')}
              >
                <Play className="h-4 w-4 fill-current" />
                Start a meeting
              </Button>
              <Button variant="secondary" href="#features">
                Explore VORQ
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="mt-6 animate-fade-up text-xs text-lavender-100/40 delay-500">
              Demo preview shown — live meeting features are coming soon.
            </p>
          </div>

          {/* Right: dashboard preview */}
          <div className="animate-fade-up delay-300 lg:pl-8">
            <CallPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}
