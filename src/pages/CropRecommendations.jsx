import { useEffect, useState, useMemo } from 'react';
import { useFarm } from '../context/FarmContext.jsx';
import { getTopRecommendations } from '../services/recommendationService.js';
import CropCard from '../components/cards/CropCard.jsx';
import Button from '../components/ui/Button.jsx';
import ProfitChart from '../components/charts/ProfitChart.jsx';
import { Sparkles, TrendingUp, Eye, BarChart3, Leaf, Target } from 'lucide-react';

export default function CropRecommendations(){
  const { farm, recommendations, setRecommendations } = useFarm();
  const [compare, setCompare] = useState(false);
  
  useEffect(() => {
    if (!recommendations?.length) {
      getTopRecommendations(farm).then(setRecommendations);
    }
  }, []);
  
  const data = recommendations || [];
  
  const stats = useMemo(() => {
    if (!data.length) return { avgYield: 0, maxProfit: 0, sustainableOptions: 0 };
    const avgYield = Math.round(data.reduce((sum, c) => sum + (c.expectedYieldKgPerHectare || 0), 0) / data.length);
    const maxProfit = Math.max(...data.map(c => c.profitEstimateINR || 0));
    const sustainableOptions = data.filter(c => (c.sustainabilityScore || 0) >= 8).length;
    return { avgYield, maxProfit, sustainableOptions };
  }, [data]);

  return (
    <div className="space-y-16 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 text-white">
        <AnimatedBackdrop />
        <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[3fr,2fr] lg:py-16">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> AI crop intelligence
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Precision-matched crops tailored for your soil and climate conditions.
            </h1>
            <p className="max-w-2xl text-lg text-white/80">
              Our AI analyzes {data.length} potential crops against your farm profile, weather patterns, and market trends to recommend the most profitable and sustainable options.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatTile
                icon={TrendingUp}
                label="Avg. Yield"
                value={`${stats.avgYield} kg/ha`}
                hint="Expected production"
              />
              <StatTile
                icon={Target}
                label="Max Profit"
                value={`₹${stats.maxProfit.toLocaleString()}`}
                hint="Top recommendation"
              />
              <StatTile
                icon={Leaf}
                label="Sustainable"
                value={`${stats.sustainableOptions}`}
                hint="High eco-score options"
              />
            </div>
          </div>
          <div className="rounded-3xl bg-white/15 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
              <span>Recommendation engine</span>
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="space-y-4">
              <InsightRow label="Farm location" value={farm.location || 'Not specified'} />
              <InsightRow label="Soil type" value={farm.soil?.type || 'Analysis pending'} />
              <InsightRow label="Season" value="Kharif 2025" />
              <InsightRow label="Analysis factors" value="12 parameters" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider text-emerald-600 font-semibold">Smart recommendations</p>
            <h2 className="text-2xl font-semibold text-slate-900">Top crop matches for your farm</h2>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant={compare ? "primary" : "secondary"} 
              onClick={() => setCompare((v) => !v)}
              className="flex items-center gap-2"
            >
              {compare ? <Eye className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
              {compare ? 'List View' : 'Compare'}
            </Button>
          </div>
        </div>
        
        {!compare ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((crop, i) => (
              <EnhancedCropCard key={i} crop={crop} rank={i + 1} onSelect={() => {}} onCompare={() => setCompare(true)} />
            ))}
            {!data.length && (
              <div className="col-span-full rounded-3xl border border-dashed border-teal-200 bg-white p-12 text-center text-slate-500">
                <Leaf className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <p>No recommendations available yet. Please complete your farm profile.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-teal-100 bg-white shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-teal-100">
              <h3 className="text-lg font-semibold text-slate-900">Detailed Crop Comparison</h3>
              <p className="text-sm text-slate-600">Side-by-side analysis of your top crop recommendations</p>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[700px] p-6">
                <div className="grid grid-cols-4 gap-4 font-semibold border-b border-slate-200 pb-3 mb-4">
                  <div className="text-slate-700">Metric</div>
                  {data.slice(0, 3).map((c, i) => (
                    <div key={i} className="text-slate-900">{c.cropName}</div>
                  ))}
                </div>
                {[
                  { k: 'expectedYieldKgPerHectare', label: 'Expected Yield (kg/ha)', format: (v) => v?.toLocaleString() || '—' },
                  { k: 'profitEstimateINR', label: 'Profit Estimate (INR)', format: (v) => v ? `₹${v.toLocaleString()}` : '—' },
                  { k: 'sustainabilityScore', label: 'Sustainability Score', format: (v) => v ? `${v}/10` : '—' },
                ].map((row) => (
                  <div key={row.k} className="grid grid-cols-4 gap-4 py-3 border-b border-slate-100">
                    <div className="text-slate-600 font-medium">{row.label}</div>
                    {data.slice(0, 3).map((c, i) => (
                      <div key={i} className="font-semibold text-slate-900">{row.format(c[row.k])}</div>
                    ))}
                  </div>
                ))}
                <div className="mt-8">
                  <div className="font-semibold text-slate-900 mb-4">Profit Trend Analysis</div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <ProfitChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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

function InsightRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/10 p-3 shadow-sm">
      <span className="text-sm text-white/80">{label}</span>
      <span className="text-sm text-white font-semibold">{value}</span>
    </div>
  );
}

function EnhancedCropCard({ crop, rank, onSelect, onCompare }) {
  const profitColor = (crop.profitEstimateINR || 0) > 50000 ? 'text-emerald-600' : 'text-amber-600';
  
  return (
    <article className="relative overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-transparent" />
      <div className="absolute left-4 top-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">#{rank}</span>
      </div>
      <div className="relative space-y-4 p-6 pt-16">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">{crop.cropName}</h3>
          <p className="text-sm text-slate-600">Recommended for your soil type</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Expected Yield</p>
            <p className="font-semibold text-slate-900">{(crop.expectedYieldKgPerHectare || 0).toLocaleString()} kg/ha</p>
          </div>
          <div>
            <p className="text-slate-500">Profit Estimate</p>
            <p className={`font-semibold ${profitColor}`}>₹{(crop.profitEstimateINR || 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-slate-600">Sustainability: {crop.sustainabilityScore || 0}/10</span>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={onSelect} className="flex-1 text-sm">
            Select Crop
          </Button>
          <Button variant="secondary" onClick={onCompare} className="text-sm">
            Compare
          </Button>
        </div>
      </div>
    </article>
  );
}
