import { useEffect, useState } from 'react';
import { useFarm } from '../context/FarmContext.jsx';
import { getTopRecommendations } from '../services/recommendationService.js';
import CropCard from '../components/cards/CropCard.jsx';
import Button from '../components/ui/Button.jsx';
import ProfitChart from '../components/charts/ProfitChart.jsx';

export default function CropRecommendations(){
  const { farm, recommendations, setRecommendations } = useFarm();
  const [compare, setCompare] = useState(false);
  useEffect(() => {
    if (!recommendations?.length) {
      getTopRecommendations(farm).then(setRecommendations);
    }
  }, []);
  const data = recommendations || [];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Top Crop Recommendations</h2>
        <Button variant="secondary" onClick={()=>setCompare((v)=>!v)}>{compare ? 'List View' : 'Compare'}</Button>
      </div>
      {!compare ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((c, i) => (
            <CropCard key={i} crop={c} onSelect={()=>{}} onCompare={()=>setCompare(true)} />
          ))}
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-4 font-semibold border-b pb-2">
              <div>Metric</div>
              {data.map((c, i) => <div key={i}>{c.cropName}</div>)}
            </div>
            {[
              { k: 'expectedYieldKgPerHectare', label: 'Yield (kg/ha)' },
              { k: 'profitEstimateINR', label: 'Profit (INR)' },
              { k: 'sustainabilityScore', label: 'Sustainability' },
            ].map((row) => (
              <div key={row.k} className="grid grid-cols-4 py-2 border-b">
                <div className="text-slate-600">{row.label}</div>
                {data.map((c, i) => <div key={i}>{c[row.k]}</div>)}
              </div>
            ))}
            <div className="mt-4">
              <div className="font-semibold mb-2">Profit Trend</div>
              <ProfitChart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
