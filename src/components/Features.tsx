import {
  BrainCircuit,
  AudioLines,
  ShieldCheck,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const FEATURES: Feature[] = [
  {
    icon: BrainCircuit,
    title: 'AI Meeting Insights',
    description:
      'Automatic summaries, action items, and key decisions captured in real time — so nothing falls through the cracks.',
    accent: 'from-violet-electric/20 to-violet-deep/10 text-violet-soft',
  },
  {
    icon: AudioLines,
    title: 'Noise Intelligence',
    description:
      'Adaptive background suppression and ambient sound detection keep every voice crisp and distraction-free.',
    accent: 'from-emerald-500/20 to-teal-600/10 text-emerald-300',
  },
  {
    icon: ShieldCheck,
    title: 'Smart Moderation',
    description:
      'Balanced speaking time tracking and gentle nudges help every voice be heard — without anyone feeling policed.',
    accent: 'from-sky-500/20 to-indigo-600/10 text-sky-300',
  },
  {
    icon: Lock,
    title: 'Secure Meetings',
    description:
      'End-to-end encryption, per-meeting access controls, and zero retention of private conversations by default.',
    accent: 'from-rose-500/20 to-violet-deep/10 text-rose-300',
  },
];

export default function Features() {
  return (
    <Section id="features" className="relative">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>What VORQ does</Eyebrow>
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Intelligence built into every meeting
        </h2>
        <p className="mt-4 text-lg text-lavender-100/70">
          Four pillars that make conversations clearer, fairer, and more productive —
          automatically.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="group glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lavender-100/30 hover:bg-lavender-100/[0.05]"
          >
            {/* Hover glow */}
            <div
              className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-electric/0 blur-3xl transition-all duration-500 group-hover:bg-violet-electric/20"
              aria-hidden
            />
            <div
              className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent}`}
            >
              <feature.icon className="h-6 w-6" strokeWidth={2} />
            </div>
            <h3 className="relative mb-2 font-display text-lg font-semibold text-ink">
              {feature.title}
            </h3>
            <p className="relative text-sm leading-relaxed text-lavender-100/65">
              {feature.description}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-lavender-100/40">
        AI capabilities are in active development — shown here as the product vision.
      </p>
    </Section>
  );
}
