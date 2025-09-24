import { useAuth } from '../context/AuthContext.jsx';
import { useFarm } from '../context/FarmContext.jsx';
import SoilSummaryCard from '../components/cards/SoilSummaryCard.jsx';
import ProfitChart from '../components/charts/ProfitChart.jsx';
import CropCard from '../components/cards/CropCard.jsx';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const { user } = useAuth();
  const { farm, recommendations } = useFarm();
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Welcome, {user?.name}</h2>
        <div className="text-slate-600">Farm: {user?.farmLocation || farm.location || '—'}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <SoilSummaryCard soil={farm.soil} />
        <div className="card">
          <div className="font-semibold mb-2">Projected Profit</div>
          <ProfitChart />
        </div>
      </div>
      {!!recommendations?.length && (
        <div>
          <div className="mb-2 font-semibold">Latest Recommendation</div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.slice(0,1).map((c, i) => (
              <CropCard key={i} crop={c} onSelect={()=>nav('/recommendations')} onCompare={()=>nav('/recommendations')} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
