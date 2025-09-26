import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube } from 'lucide-react';

const quickLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Market', to: '/market' },
  { label: 'Feedback', to: '/feedback' },
  { label: 'Profile', to: '/profile' },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-200">
      <div className="container-responsive py-10">
        <div className="grid gap-10 md:grid-cols-[2fr,1fr,1fr]">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-lg font-semibold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">AV</span>
              AgroVista
            </Link>
            <p className="max-w-sm text-sm text-slate-400">
              AgroVista fuses satellite weather, soil intelligence, and mandi insights so every farmer gets an agronomist-grade playbook in their pocket.
            </p>
            <div className="flex gap-4 text-slate-400">
              <FooterIconLink href="https://facebook.com">
                <Facebook className="h-5 w-5" />
              </FooterIconLink>
              <FooterIconLink href="https://twitter.com">
                <Twitter className="h-5 w-5" />
              </FooterIconLink>
              <FooterIconLink href="https://youtube.com">
                <Youtube className="h-5 w-5" />
              </FooterIconLink>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-slate-400 transition hover:text-emerald-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/feedback" className="transition hover:text-emerald-300">
                  Share feedback
                </Link>
              </li>
              <li>
                <Link to="/profile" className="transition hover:text-emerald-300">
                  Account & preferences
                </Link>
              </li>
              <li>
                <a href="mailto:support@agrovista.ai" className="transition hover:text-emerald-300">
                  support@agrovista.ai
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} AgroVista. Built for the Smart India Hackathon prototype.
        </div>
      </div>
    </footer>
  );
}

function FooterIconLink({ href, children }) {
  return (
    <a
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:bg-emerald-500/20 hover:text-emerald-200"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
