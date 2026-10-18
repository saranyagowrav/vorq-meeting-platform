import { CalendarPlus, Sparkles, FileCheck2, type LucideIcon } from 'lucide-react';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: CalendarPlus,
    title: 'Schedule or start instantly',
    description:
      'Spin up a meeting in one click or schedule ahead. VORQ handles invites, links, and reminders automatically.',
  },
  {
    icon: Sparkles,
    title: 'AI joins alongside you',
    description:
      'During the call, VORQ quietly transcribes, detects noise, and tracks participation — invisibly in the background.',
  },
  {
    icon: FileCheck2,
    title: 'Get insights after the call',
    description:
      'Walk away with a clean summary, action items, and moderation notes — ready to share with your team.',
  },
];

export default function HowItWorks() {
  return (
    <Section className="relative">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          From schedule to summary in three steps
        </h2>
      </div>

      <div className="relative mt-16">
        {/* Connecting line */}
        <div
          className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-violet-electric/30 to-transparent lg:block"
          aria-hidden
        />

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative text-center lg:text-left">
              <div className="mb-6 flex items-center justify-center lg:justify-start">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-electric/30 bg-midnight-800">
                  <step.icon className="h-7 w-7 text-violet-soft" strokeWidth={2} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-electric text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-lavender-100/65">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
