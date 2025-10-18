import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm.jsx';
import { Sparkles, User, Shield, Smartphone, Users, Target, TrendingUp } from 'lucide-react';

export default function Login(){
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-16 pb-12">
        <section className="relative overflow-hidden  bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 text-white">
          <AnimatedBackdrop />
          <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[3fr,2fr] lg:py-16">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider">
                <User className="h-4 w-4" /> Farmer login portal
              </p>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Welcome back to AgroVista! Sign in to access your farm intelligence.
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                Continue your precision farming journey with personalized crop recommendations, real-time market insights, and AI-powered agricultural guidance.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureTile
                  icon={Target}
                  title="Your Dashboard"
                  description="Personalized farm analytics await"
                />
                <FeatureTile
                  icon={TrendingUp}
                  title="Market Updates"
                  description="Live commodity prices & trends"
                />
              </div>
            </div>
            <div className="rounded-3xl bg-white/15 p-6 shadow-xl backdrop-blur-xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
                Platform highlights
              </div>
              <div className="space-y-4">
                <InsightRow icon={Shield} label="Secure access" value="Protected data" />
                <InsightRow icon={Smartphone} label="Mobile friendly" value="Any device" />
                <InsightRow icon={Users} label="Expert support" value="24/7 available" />
              </div>
            </div>
          </div>
        </section>

        <section className="container-responsive">
          <div className="grid gap-10 lg:grid-cols-[2fr,3fr]">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-wider text-emerald-600 font-semibold">Secure authentication</p>
                <h2 className="text-2xl font-semibold text-slate-900">Why farmers trust AgroVista</h2>
              </div>
              <div className="grid gap-4">
                {LOGIN_BENEFITS.map((benefit) => (
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
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Sign in to your account</h3>
                <p className="text-sm text-slate-600 mt-2">Access your personalized farming dashboard</p>
              </div>
              
              <LoginForm />
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    New to AgroVista?{' '}
                    <Link 
                      to="/register" 
                      className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Create your free account →
                    </Link>
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Join thousands of farmers already using AgroVista
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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

const LOGIN_BENEFITS = [
  {
    icon: Shield,
    title: 'Data security & privacy',
    description: 'Your farm data is encrypted and secure. We never share your information without consent.',
  },
  {
    icon: Target,
    title: 'Personalized recommendations',
    description: 'Get crop suggestions tailored to your soil, climate, and market conditions.',
  },
  {
    icon: TrendingUp,
    title: 'Real-time market intelligence',
    description: 'Access live commodity prices, trends, and the best selling opportunities near you.',
  },
];
