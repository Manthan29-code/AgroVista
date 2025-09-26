import Button from '../components/ui/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const highlights = [
  {
    label: 'Smart Crop Planner',
    description: 'Soil-aware crop rotation with localized fertigation tips.',
  },
  {
    label: 'AI Pest Radar',
    description: 'Instant pest detection from a single leaf snapshot.',
  },
  {
    label: 'Market Pulse',
    description: 'Live mandi prices and scheme alerts tailored to your crop.',
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-[2.75rem] bg-gradient-to-br from-emerald-700 via-teal-600 to-sky-500 p-8 sm:p-10 md:p-12 text-white shadow-[0_45px_120px_-60px_rgba(6,95,70,0.85)]">
      <AnimatedBackdrop />
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[3fr,2fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-300"></span>
            Precision Farming OS
          </span>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Unlock agronomist-level insights and climate-smart actions for every acre.
          </h1>
          <p className="max-w-2xl text-base text-white/80 sm:text-lg">
            AgroVista combines soil diagnostics, satellite weather, and mandi intelligence to guide farmers from seeding to sale — all through a friendly AI copilots experience.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => nav(isAuthenticated ? '/dashboard' : '/register')}
              className="shadow-lg shadow-emerald-900/30 transition hover:-translate-y-0.5"
            >
              Start free demo
            </Button>
            <Link to="/login" className="btn btn-secondary backdrop-blur-sm bg-white/20 text-white hover:bg-white/30">
              Login to your farm
            </Link>
          </div>
        </div>
        <div className="relative grid gap-4">
          <div className="absolute right-0 top-0 h-32 w-32 animate-float-slow rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-12 -left-6 h-48 w-48 animate-float-delayed rounded-full bg-emerald-400/30 blur-3xl" />
          <div className="relative space-y-4 rounded-3xl bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">Command center</p>
            <div className="space-y-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-inner transition hover:border-white/40 hover:bg-white/15">
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <p className="mt-1 text-xs text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Live operations</div>
            <div className="mt-4 grid gap-3 text-sm">
              <StatusRow label="Soil moisture" value="Adequate" accent="bg-sky-300" />
              <StatusRow label="Heatwave alert" value="Watch next 48h" accent="bg-amber-300" />
              <StatusRow label="Best mandi" value="Ahmedabad (₹1890/q)" accent="bg-emerald-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-16 left-1/3 h-60 w-60 animate-blob bg-emerald-400/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 animate-blob-delay bg-cyan-400/30 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-64 w-64 animate-spin-slow rounded-full border border-white/10" />
    </div>
  );
}

function StatusRow({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/10 p-3 shadow-sm">
      <div className="flex items-center gap-2 text-white/80">
        <span className={`h-2.5 w-2.5 rounded-full ${accent}`}></span>
        <span>{label}</span>
      </div>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}
