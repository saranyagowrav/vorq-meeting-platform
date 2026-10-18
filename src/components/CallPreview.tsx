import { Video } from 'lucide-react';

// Decorative participant tiles using gradient avatars (no real data)
const PARTICIPANTS = [
  { name: 'Ava', grad: 'from-violet-electric to-violet-deep' },
  { name: 'Marco', grad: 'from-sky-500 to-indigo-600' },
  { name: 'Priya', grad: 'from-rose-500 to-violet-deep' },
  { name: 'Theo', grad: 'from-emerald-500 to-teal-600' },
];

export default function CallPreview() {
  return (
    <div className="relative">
      {/* Main dashboard card */}
      <div className="glass-strong rounded-2xl p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] glow-violet sm:p-4">
        {/* Top bar */}
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-rose-400" />
            <span className="text-xs font-semibold text-lavender-100/90">
              Product Sync
            </span>
          </div>
          <span className="rounded-md bg-lavender-100/[0.06] px-2 py-0.5 text-[10px] font-medium text-lavender-100/70">
            00:24:18
          </span>
        </div>

        {/* Participant grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {PARTICIPANTS.map((p, i) => (
            <div
              key={p.name}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-lavender-100/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.grad} opacity-80`} />
              <div className="absolute inset-0 bg-midnight-900/30" />
              {/* Avatar circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white backdrop-blur-sm">
                  {p.name.charAt(0)}
                </div>
              </div>
              {/* Name tag */}
              <div className="absolute bottom-1.5 left-1.5 rounded-md bg-midnight-900/60 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm">
                {p.name}
              </div>
              {/* Active speaker ring on first tile */}
              {i === 0 && (
                <div className="absolute inset-0 rounded-xl ring-2 ring-violet-electric/70" />
              )}
            </div>
          ))}
        </div>

        {/* Meeting toolbar */}
        <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-lavender-100/10 bg-midnight-900/50 px-3 py-2.5">
          {['mic', 'camera', 'screen', 'chat', 'participants', 'end'].map((icon, idx) => (
            <div
              key={icon}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                idx === 5
                  ? 'bg-rose-500/90 text-white'
                  : 'bg-lavender-100/[0.06] text-lavender-100/80 hover:bg-lavender-100/[0.1]'
              }`}
            >
              <ToolbarIcon name={icon} />
            </div>
          ))}
        </div>
      </div>

      {/* Floating: Meeting intelligence card */}
      <div className="absolute -left-4 top-24 hidden w-44 animate-float rounded-xl border border-lavender-100/15 bg-midnight-800/90 p-3 backdrop-blur-xl shadow-xl sm:block lg:-left-10 lg:w-52">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-electric/20 text-violet-soft">
            <Video className="h-3.5 w-3.5" />
          </span>
          <span className="text-[11px] font-semibold text-ink">Meeting intelligence</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-lavender-100/10">
            <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-violet-electric to-lavender-200" />
          </div>
          <p className="text-[10px] text-lavender-100/60">Live transcript ready</p>
        </div>
      </div>

      {/* Floating: Noise insights card */}
      <div className="absolute -right-3 top-44 hidden w-40 animate-float-slow rounded-xl border border-lavender-100/15 bg-midnight-800/90 p-3 backdrop-blur-xl shadow-xl sm:block lg:-right-8 lg:w-48">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-300">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12h3l3-8 4 16 3-8h7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[11px] font-semibold text-ink">Noise insights</span>
        </div>
        <div className="flex items-end gap-1 h-8">
          {[40, 70, 30, 55, 85, 45, 60, 35, 75].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/40 to-emerald-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="mt-1.5 text-[10px] text-lavender-100/60">Background noise: low</p>
      </div>

      {/* Floating: Smart moderation card */}
      <div className="absolute -bottom-5 right-8 hidden w-44 animate-float rounded-xl border border-lavender-100/15 bg-midnight-800/90 p-3 backdrop-blur-xl shadow-xl sm:block lg:w-52">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-500/20 text-sky-300">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[11px] font-semibold text-ink">Smart moderation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <p className="text-[10px] text-lavender-100/70">Inclusive speaking time</p>
        </div>
      </div>
    </div>
  );
}

function ToolbarIcon({ name }: { name: string }) {
  const common = 'h-4 w-4';
  switch (name) {
    case 'mic':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 10a7 7 0 0 0 14 0M12 19v3" strokeLinecap="round" />
        </svg>
      );
    case 'camera':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="14" height="12" rx="2" />
          <path d="m22 8-6 4 6 4V8z" strokeLinejoin="round" />
        </svg>
      );
    case 'screen':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 18v3" strokeLinecap="round" />
        </svg>
      );
    case 'chat':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinejoin="round" />
        </svg>
      );
    case 'participants':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" strokeLinecap="round" />
        </svg>
      );
    case 'end':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 11a9 9 0 0 1 18 0v2a9 9 0 0 1-18 0v-2z" strokeLinejoin="round" />
          <path d="M3 12h18" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
