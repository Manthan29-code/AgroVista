import { useEffect, useState } from 'react';
import useMockApi from '../hooks/useMockApi.js';
import MarketCard from '../components/cards/MarketCard.jsx';
import Button from '../components/ui/Button.jsx';
import MapView from '../components/map/MapView.jsx';
import { DEFAULT_CENTER } from '../utils/constants.js';

export default function Market(){
  const api = useMockApi();
  const [markets, setMarkets] = useState([]);
  const [map, setMap] = useState(false);
  useEffect(() => {
    api.getMarkets('Tomato', DEFAULT_CENTER).then(setMarkets).catch(()=>setMarkets([]));
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Nearby Markets</h2>
        <Button variant="secondary" onClick={()=>setMap((v)=>!v)}>{map ? 'List View' : 'Map View'}</Button>
      </div>
      {!map ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {markets.map((m, i) => <MarketCard key={i} market={m} />)}
        </div>
      ) : (
        <MapView center={DEFAULT_CENTER} markers={markets} />
      )}
    </div>
  );
}
