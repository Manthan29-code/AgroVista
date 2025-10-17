import { useEffect, useState, useMemo } from 'react';
import useMockApi from '../hooks/useMockApi.js';
import MarketCard from '../components/cards/MarketCard.jsx';
import Button from '../components/ui/Button.jsx';
import MapView from '../components/map/MapView.jsx';
import { DEFAULT_CENTER } from '../utils/constants.js';
import { TrendingUp, MapPin, List, Navigation, DollarSign, Clock, AlertCircle } from 'lucide-react';

export default function Market(){
  const api = useMockApi();
  const [markets, setMarkets] = useState([]);
  const [map, setMap] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  
  useEffect(() => {
    api.getMarkets(selectedCrop, DEFAULT_CENTER).then(setMarkets).catch(()=>setMarkets([]));
  }, [selectedCrop]);

  const stats = useMemo(() => {
    if (!markets.length) return { avgPrice: 0, bestPrice: 0, nearbyCount: 0 };
    const prices = markets.map(m => m.currentPrice || 0);
    const avgPrice = Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length);
    const bestPrice = Math.max(...prices);
    const nearbyCount = markets.filter(m => (m.distanceKm || 0) <= 50).length;
    return { avgPrice, bestPrice, nearbyCount };
  }, [markets]);

  const topMarkets = useMemo(() => markets.slice(0, 3), [markets]);

  return (
    <div className="space-y-16 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 text-white">
        <AnimatedBackdrop />
        <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[3fr,2fr] lg:py-16">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider">
              <TrendingUp className="h-4 w-4" /> Market intelligence
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Real-time mandi prices and logistics insights for maximum returns.
            </h1>
            <p className="max-w-2xl text-lg text-white/80">
              Track live commodity prices across {markets.length} nearby markets, compare transportation costs, and identify the best selling opportunities for your harvest.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatTile
                icon={DollarSign}
                label="Avg. Price"
                value={`₹${stats.avgPrice}/quintal`}
                hint="Current market rate"
              />
              <StatTile
                icon={TrendingUp}
                label="Best Price"
                value={`₹${stats.bestPrice}/quintal`}
                hint="Top paying mandi"
              />
              <StatTile
                icon={MapPin}
                label="Nearby Markets"
                value={`${stats.nearbyCount}`}
                hint="Within 50km radius"
              />
            </div>
          </div>
          <div className="rounded-3xl bg-white/15 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
              <span>Live market pulse</span>
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="space-y-4">
              {topMarkets.map((market) => (
                <MarketInsightRow 
                  key={market.name} 
                  name={market.name} 
                  price={`₹${market.currentPrice}/q`}
                  distance={`${market.distanceKm}km`}
                  trend="up" 
                />
              ))}
              {!topMarkets.length && (
                <div className="rounded-2xl bg-white/10 p-4 text-white/70 text-center">
                  Loading market data...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[2fr,3fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-wider text-emerald-600 font-semibold">Market strategy</p>
            <h2 className="text-2xl font-semibold text-slate-900">Maximize your selling price</h2>
          </div>
          <div className="grid gap-4">
            {MARKET_INSIGHTS.map((insight) => (
              <article key={insight.title} className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white via-white to-teal-50/40 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <insight.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-emerald-700">{insight.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{insight.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Market Explorer</h3>
              <p className="text-sm text-slate-600">Compare prices and find the best selling opportunities</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedCrop} 
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Tomato">Tomato</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Cotton">Cotton</option>
              </select>
              <Button 
                variant={map ? "primary" : "secondary"} 
                onClick={() => setMap((v) => !v)}
                className="flex items-center gap-2"
              >
                {map ? <List className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                {map ? 'List View' : 'Map View'}
              </Button>
            </div>
          </div>
          
          <div className="rounded-3xl border border-teal-100 bg-white shadow-lg overflow-hidden">
            {!map ? (
              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {markets.map((market, i) => (
                    <EnhancedMarketCard key={i} market={market} />
                  ))}
                  {!markets.length && (
                    <div className="col-span-full rounded-3xl border border-dashed border-teal-200 bg-slate-50 p-12 text-center text-slate-500">
                      <MapPin className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                      <p>No markets found for {selectedCrop}. Try selecting a different crop.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-96">
                <MapView center={DEFAULT_CENTER} markers={markets} />
              </div>
            )}
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

function MarketInsightRow({ name, price, distance, trend }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/10 p-3 shadow-sm">
      <div className="flex items-center gap-2 text-white/80">
        <span className={`h-2.5 w-2.5 rounded-full ${trend === 'up' ? 'bg-emerald-300' : 'bg-amber-300'}`}></span>
        <span className="text-sm">{name}</span>
      </div>
      <div className="text-right">
        <div className="text-sm text-white font-semibold">{price}</div>
        <div className="text-xs text-white/60">{distance}</div>
      </div>
    </div>
  );
}

function EnhancedMarketCard({ market }) {
  const priceColor = (market.currentPrice || 0) > 2000 ? 'text-emerald-600' : 'text-amber-600';
  
  return (
    <article className="relative overflow-hidden rounded-2xl border border-teal-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="absolute right-0 top-0 h-16 w-16 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-transparent" />
      <div className="relative space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-slate-900">{market.name}</h4>
            <p className="text-sm text-slate-600 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {market.distanceKm}km away
            </p>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${priceColor}`}>₹{market.currentPrice}</p>
            <p className="text-xs text-slate-500">/quintal</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Updated 2 hrs ago
          </span>
          <span className="flex items-center gap-1 text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            +5% today
          </span>
        </div>
      </div>
    </article>
  );
}

const MARKET_INSIGHTS = [
  {
    icon: Clock,
    title: 'Track price patterns',
    description: 'Monitor daily price fluctuations and identify the best selling windows. Prices typically peak during festival seasons and drop during harvest periods.',
  },
  {
    icon: Navigation,
    title: 'Calculate transport costs',
    description: 'Factor in fuel costs, vehicle hire, and time to market when choosing your selling destination. Sometimes nearby markets offer better net returns.',
  },
  {
    icon: AlertCircle,
    title: 'Watch demand signals',
    description: 'Stay alert for bulk buyer announcements, government procurement drives, and export opportunities that can significantly boost your selling price.',
  },
];
