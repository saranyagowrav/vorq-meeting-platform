import { Heart, EyeOff, Lock, UserCheck } from 'lucide-react';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';

const PRINCIPLES = [
  {
    icon: EyeOff,
    title: 'Private by default',
    description: 'Transcripts and insights are yours alone — never used to train models without explicit opt-in.',
  },
  {
    icon: Heart,
    title: 'Supportive, not judgmental',
    description: 'Moderation nudges are gentle suggestions, never scores or rankings of individuals.',
  },
  {
    icon: Lock,
    title: 'Encrypted end to end',
    description: 'Every meeting is protected with strong encryption in transit and at rest.',
  },
  {
    icon: UserCheck,
    title: 'You stay in control',
    description: 'Turn AI features on or off per meeting. Delete any recording or transcript anytime.',
  },
];

export default function Privacy() {
  return (
    <Section id="privacy" className="relative overflow-hidden">
      <div
        className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-electric/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Privacy first</Eyebrow>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            AI that supports people,{' '}
            <span className="text-gradient-violet">not judges them.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-lavender-100/70">
            VORQ is built on a simple belief: technology should make meetings feel
            more human, not more surveilled. Every AI feature is designed to assist,
            never to rank, rate, or report on individuals.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="flex gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-violet-electric/20 bg-violet-electric/10 text-violet-soft">
                  <p.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-lavender-100/60">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual: privacy shield card */}
        <div className="relative hidden justify-center lg:flex">
          <div className="glass-strong relative w-full max-w-sm rounded-3xl p-8 text-center glow-violet">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-electric to-violet-deep shadow-[0_10px_40px_-8px_rgba(130,112,255,0.6)]">
              <Lock className="h-9 w-9 text-white" strokeWidth={2} />
            </div>
            <h3 className="font-display text-xl font-semibold text-ink">
              Your conversations stay yours
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-lavender-100/60">
              No training on your data. No selling to third parties. Full deletion
              on demand — always.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-lavender-100/15 bg-midnight-900/40 py-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-lavender-100/80">
                Privacy commitments in active development
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
