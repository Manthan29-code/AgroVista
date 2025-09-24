import { formatINR, formatKm } from '../../utils/formatters.js';

export default function MarketCard({ market }){
  return (
    <div className="card">
      <div className="font-semibold">{market.name}</div>
      <div className="text-sm text-slate-600">{formatKm(market.distanceKm)} away</div>
      <div className="mt-2">Price: {formatINR(market.pricePerQuintal)} / quintal</div>
      <div className="text-sm">Contact: {market.contact}</div>
      <div className="text-sm">Open: {market.openingDays.join(', ')}</div>
    </div>
  );
}
