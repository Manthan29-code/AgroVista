import Button from '../ui/Button.jsx';
import { formatINR } from '../../utils/formatters.js';

export default function CropCard({ crop, onSelect, onCompare }){
  return (
    <div className="card flex flex-col">
      <img src={crop.image} alt={`${crop.cropName}`} className="h-32 w-full object-cover rounded-card" />
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{crop.cropName}</h3>
          <span className="text-sm text-slate-600">Score {crop.sustainabilityScore}</span>
        </div>
        <div className="text-sm">Yield: {crop.expectedYieldKgPerHectare.toLocaleString()} kg/ha</div>
        <div className="text-sm">Profit: {formatINR(crop.profitEstimateINR)}</div>
        <div className="text-xs text-slate-600">Fertilizers: {crop.recommendedFertilizers.join(', ')}</div>
      </div>
      <div className="mt-3 flex gap-2">
        <Button onClick={onSelect}>View Details</Button>
        <Button variant="secondary" onClick={onCompare}>Compare</Button>
      </div>
    </div>
  );
}
