import Container from './ui/Container';
import { VorqWordmark, VorqSymbol } from './VorqLogo';

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: ['Features', 'Security', 'Pricing', 'Roadmap'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Press'],
  },
  {
    title: 'Resources',
    links: ['Help center', 'Privacy', 'Terms', 'Status'],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-lavender-100/15 bg-midnight-900">
      <Container>
        <div className="py-14 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
            {/* Brand block */}
            <div className="max-w-sm">
              <a href="#top" className="flex items-center gap-2.5" aria-label="VORQ home">
                <VorqSymbol className="h-8 w-8 shrink-0" />
                <VorqWordmark />
              </a>
              <p className="mt-4 text-sm leading-relaxed text-lavender-100/55">
                AI-powered video meetings that keep teams connected, conversations
                clear, and collaboration moving.
              </p>
              <p className="mt-5 text-xs text-lavender-100/35">
                VORQ is pronounced like "work" — and spelled only as VORQ.
              </p>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-lavender-100/50">
                    {col.title}
                  </h4>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`${link} is coming soon.`);
                          }}
                          className="text-sm text-lavender-100/60 transition-colors hover:text-ink"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-lavender-100/15 pt-8 sm:flex-row">
            <p className="text-xs text-lavender-100/40">
              © {new Date().getFullYear()} VORQ. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`${social} link is coming soon.`);
                  }}
                  className="text-xs text-lavender-100/50 transition-colors hover:text-ink"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
