import { useAuth } from '../context/AuthContext.jsx';
import { useFarm } from '../context/FarmContext.jsx';
import SoilSummaryCard from '../components/cards/SoilSummaryCard.jsx';
import ProfitChart from '../components/charts/ProfitChart.jsx';
import CropCard from '../components/cards/CropCard.jsx';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Cloud, Thermometer, Droplets, AlertTriangle, Eye, ArrowRight, Calendar } from 'lucide-react';

export default function Dashboard(){
  const { user } = useAuth();
  const { farm, recommendations } = useFarm();
  const nav = useNavigate();
  
  const currentTime = new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-16 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 text-white">
        <AnimatedBackdrop />
        <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[3fr,2fr] lg:py-16">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Farm command center
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {greeting()}, {user?.name || 'Farmer'}!
            </h1>
            <p className="max-w-2xl text-lg text-white/80">
              Your personalized farming dashboard with real-time insights for {user?.farmLocation || farm.location || 'your farm'}. 
              Stay ahead with AI-powered recommendations and live conditions monitoring.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <QuickStat
                icon={Cloud}
                label="Weather"
                value="28°C"
                hint="Partly cloudy"
              />
              <QuickStat
                icon={Droplets}
                label="Soil moisture"
                value="Good"
                hint="Adequate levels"
              />
              <QuickStat
                icon={TrendingUp}
                label="Market trend"
                value="Rising"
                hint="Tomato prices up"
              />
            </div>
          </div>
          <div className="rounded-3xl bg-white/15 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
              <span>Today's overview</span>
              <span>{currentTime}</span>
            </div>
            <div className="space-y-4">
              <AlertRow 
                icon={Thermometer} 
                type="info"
                message="Temperature optimal for current crops" 
              />
              <AlertRow 
                icon={Droplets} 
                type="success"
                message="No irrigation needed for next 2 days" 
              />
              <AlertRow 
                icon={AlertTriangle} 
                type="warning"
                message="Monitor pest activity in tomato field" 
              />
            </div>
            <button 
              onClick={() => nav('/recommendations')} 
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/30"
            >
              View all recommendations
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[2fr,3fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-wider text-emerald-600 font-semibold">Farm analytics</p>
            <h2 className="text-2xl font-semibold text-slate-900">Today's key insights</h2>
          </div>
          
          <div className="space-y-4">
            <SoilSummaryCard soil={farm.soil} />
            
            <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">Projected Profit</h3>
                  <p className="text-sm text-slate-600">Current season forecast</p>
                </div>
                <button 
                  onClick={() => nav('/market')} 
                  className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700"
                >
                  <Eye className="h-4 w-4" />
                  View markets
                </button>
              </div>
              <ProfitChart />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {!!recommendations?.length && (
            <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Latest Recommendation</h3>
                  <p className="text-sm text-slate-600">AI-powered crop suggestion for your farm</p>
                </div>
                <button 
                  onClick={() => nav('/recommendations')} 
                  className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-4">
                {recommendations.slice(0, 1).map((c, i) => (
                  <EnhancedCropCard 
                    key={i} 
                    crop={c} 
                    onSelect={() => nav('/recommendations')} 
                    onCompare={() => nav('/recommendations')} 
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <ActionCard
              icon={Calendar}
              title="Farm Planning"
              description="Plan your next planting cycle"
              action="Plan crops"
              onClick={() => nav('/farm/input')}
              color="emerald"
            />
            <ActionCard
              icon={TrendingUp}
              title="Market Analysis"
              description="Check current commodity prices"
              action="View markets"
              onClick={() => nav('/market')}
              color="blue"
            />
          </div>

          <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-white via-white to-teal-50/40 p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-semibold text-emerald-700 mb-2">Farm Optimization Tip</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Based on your soil analysis, consider intercropping with legumes to naturally improve nitrogen levels 
                  and reduce fertilizer costs by up to 30%.
                </p>
                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                  Learn more about intercropping →
                </button>
              </div>
            </div>
          </div>
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

function QuickStat({ icon: Icon, label, value, hint }) {
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

function AlertRow({ icon: Icon, type, message }) {
  const colors = {
    success: 'bg-emerald-300',
    warning: 'bg-amber-300',
    info: 'bg-sky-300',
  };

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3 shadow-sm">
      <span className={`mt-0.5 h-2 w-2 rounded-full ${colors[type]}`}></span>
      <div>
        <div className="flex items-center gap-2 text-white/80">
          <Icon className="h-4 w-4" />
        </div>
        <p className="mt-1 text-sm text-white/90">{message}</p>
      </div>
    </div>
  );
}

function EnhancedCropCard({ crop, onSelect, onCompare }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-emerald-50/30 p-5 shadow-sm transition hover:shadow-md">
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-transparent" />
      <div className="relative space-y-4">
        <div>
          <h4 className="text-lg font-bold text-slate-900">{crop.cropName}</h4>
          <p className="text-sm text-slate-600">Recommended for your soil type</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Expected Yield</p>
            <p className="font-semibold text-slate-900">{(crop.expectedYieldKgPerHectare || 0).toLocaleString()} kg/ha</p>
          </div>
          <div>
            <p className="text-slate-500">Profit Estimate</p>
            <p className="font-semibold text-emerald-600">₹{(crop.profitEstimateINR || 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={onSelect}
            className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Select Crop
          </button>
          <button 
            onClick={onCompare}
            className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50"
          >
            Compare
          </button>
        </div>
      </div>
    </article>
  );
}

function ActionCard({ icon: Icon, title, description, action, onClick, color }) {
  const colors = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors[color]} p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl`}>
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/20 blur-2xl" />
      <div className="relative space-y-4">
        <Icon className="h-8 w-8" />
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-white/80">{description}</p>
        </div>
        <button 
          onClick={onClick}
          className="flex items-center gap-2 text-sm font-medium text-white hover:text-white/90"
        >
          {action}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
