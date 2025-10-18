import { Link } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm.jsx';
import { Sparkles, UserPlus, Leaf, MapPin, Users, Award, TrendingUp, Zap } from 'lucide-react';

export default function Register(){
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-16 pb-12">
        <section className="relative overflow-hidden  bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 text-white">
          <AnimatedBackdrop />
          <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[3fr,2fr] lg:py-16">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider">
                <UserPlus className="h-4 w-4" /> Join the farming revolution
              </p>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Start your precision farming journey with AgroVista's AI-powered insights.
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                Join thousands of farmers who've increased their yields by 35% and profits by 50% using our intelligent crop recommendations and market analysis.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <StatTile
                  icon={Users}
                  label="Active Farmers"
                  value="50,000+"
                  hint="Growing community"
                />
                <StatTile
                  icon={TrendingUp}
                  label="Avg. Yield Increase"
                  value="35%"
                  hint="With AgroVista"
                />
                <StatTile
                  icon={Award}
                  label="Success Rate"
                  value="94%"
                  hint="Satisfied farmers"
                />
              </div>
            </div>
            <div className="rounded-3xl bg-white/15 p-6 shadow-xl backdrop-blur-xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
                What you get
              </div>
              <div className="space-y-4">
                <BenefitRow icon={Leaf} label="Smart recommendations" value="AI-powered" />
                <BenefitRow icon={MapPin} label="Local market data" value="Real-time" />
                <BenefitRow icon={Zap} label="Quick setup" value="2 minutes" />
              </div>
            </div>
          </div>
        </section>

        <section className="container-responsive">
          <div className="grid gap-10 lg:grid-cols-[2fr,3fr]">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-wider text-emerald-600 font-semibold">Get started today</p>
                <h2 className="text-2xl font-semibold text-slate-900">Why farmers choose AgroVista</h2>
              </div>
              <div className="grid gap-4">
                {REGISTER_BENEFITS.map((benefit) => (
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
              
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-emerald-800">Free to start!</h3>
                    <p className="text-sm text-emerald-700">No credit card required</p>
                  </div>
                </div>
                <p className="text-sm text-emerald-700">
                  Create your account in under 2 minutes and get instant access to crop recommendations, 
                  weather alerts, and market insights tailored to your farm.
                </p>
              </div>
            </div>
            
            <div className="rounded-3xl border border-teal-100 bg-white p-8 shadow-lg h-[fit-content]" >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Create your account</h3>
                <p className="text-sm text-slate-600 mt-2">Join the AgroVista farming community</p>
              </div>
              
              <RegisterForm />
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Sign in here →
                    </Link>
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Access your existing dashboard and recommendations
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

function StatTile({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 shadow-md backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest text-white/70">{label}</p>
          <p className="text-lg font-bold text-white">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-white/70">{hint}</p>
    </div>
  );
}

function BenefitRow({ icon: Icon, label, value }) {
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

const REGISTER_BENEFITS = [
  {
    icon: Leaf,
    title: 'AI crop recommendations',
    description: 'Get personalized suggestions based on your soil type, climate, and market conditions to maximize yield and profit.',
  },
  {
    icon: TrendingUp,
    title: 'Real-time market insights',
    description: 'Access live commodity prices, identify the best selling opportunities, and time your harvest for maximum returns.',
  },
  {
    icon: MapPin,
    title: 'Hyper-local weather data',
    description: 'Receive precise weather forecasts, irrigation recommendations, and alerts for your exact farm location.',
  },
  {
    icon: Users,
    title: 'Expert community support',
    description: 'Connect with agricultural experts and fellow farmers to share knowledge and solve farming challenges together.',
  },
];
