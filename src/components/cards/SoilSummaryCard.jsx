export default function SoilSummaryCard({ soil }){
  if (!soil) return null;
  return (
    <div className="card">
      <div className="font-semibold mb-2">Soil Summary</div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>pH: {soil.ph}</div>
        <div>Moisture: {soil.moisturePercent}%</div>
        <div>N: {soil.N}</div>
        <div>P: {soil.P}</div>
        <div>K: {soil.K}</div>
        <div className="col-span-2 text-slate-600">Last Test: {soil.lastTestDate || '—'}</div>
      </div>
    </div>
  );
}
