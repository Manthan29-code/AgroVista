import FarmForm from '../components/forms/FarmForm.jsx';
import { useFarm } from '../context/FarmContext.jsx';
import { useNavigate } from 'react-router-dom';
import { MapPin, Sprout, Thermometer, Droplets, Target } from 'lucide-react';

export default function FarmInput(){
  const { farm, setFarm } = useFarm();
  const nav = useNavigate();
  const onSubmit = (data) => {
    setFarm(data);
    nav('/recommendations');
  };

  return (
    <div className="space-y-16 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 text-white">
        <AnimatedBackdrop />
        <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[3fr,2fr] lg:py-16">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider">
              <Sprout className="h-4 w-4" /> Smart farm profiler
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Tell us about your land and we'll unlock precision insights for every acre.
            </h1>
            <p className="max-w-2xl text-lg text-white/80">
              AgroVista's AI analyzes your soil data, weather patterns, and crop history to deliver personalized recommendations that maximize yield and sustainability.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureTile
                icon={MapPin}
                title="Location Intelligence"
                description="Hyper-local weather and soil analysis"
              />
              <FeatureTile
                icon={Target}
                title="Precision Matching"
                description="AI-powered crop recommendations"
              />
            </div>
          </div>
          <div className="rounded-3xl bg-white/15 p-6 shadow-xl backdrop-blur-xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
              Quick farm insights
            </div>
            <div className="space-y-4">
              <InsightRow icon={Thermometer} label="Climate zone" value="Sub-tropical" />
              <InsightRow icon={Droplets} label="Monsoon timing" value="June - September" />
              <InsightRow icon={Sprout} label="Growing seasons" value="Kharif & Rabi" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[2fr,3fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-wider text-emerald-600 font-semibold">Farm intelligence</p>
            <h2 className="text-2xl font-semibold text-slate-900">Why we need your farm data</h2>
          </div>
          <div className="grid gap-4">
            {BENEFITS.map((benefit) => (
              <article key={benefit.title} className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white via-white to-teal-50/40 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <benefit.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-emerald-700">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-teal-100 bg-white p-8 shadow-lg">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900">Farm Data Profile</h3>
            <p className="text-sm text-slate-600">Complete your farm profile to unlock personalized recommendations</p>
          </div>
          <FarmForm initial={farm} onSubmit={onSubmit} />
        </div>
      </section>
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

function FeatureTile({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 shadow-md backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-white/70">{description}</p>
        </div>
      </div>
    </div>
  );
}

function InsightRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/10 p-3 shadow-sm">
      <div className="flex items-center gap-2 text-white/80">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm text-white font-semibold">{value}</span>
    </div>
  );
}

const BENEFITS = [
  {
    icon: Target,
    title: 'Crop-soil compatibility analysis',
    description: 'Match your soil type, pH levels, and nutrient content with the most suitable crop varieties for maximum yield potential.',
  },
  {
    icon: Droplets,
    title: 'Water requirement optimization', 
    description: 'Calculate precise irrigation schedules based on your local rainfall patterns, soil water retention, and crop water needs.',
  },
  {
    icon: Thermometer,
    title: 'Climate risk assessment',
    description: 'Evaluate temperature fluctuations, frost risks, and heat stress patterns to select climate-resilient crop varieties.',
  },
];
