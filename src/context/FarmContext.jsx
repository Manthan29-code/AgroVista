import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FarmContext = createContext(null);
const STORAGE_KEY = 'agv_farm';

export function FarmProvider({ children }) {
  const [farm, setFarm] = useState({
    location: '',
    soil: { ph: 7, moisturePercent: 30, N: 0, P: 0, K: 0 },
  });
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      setFarm(parsed.farm || farm);
      setRecommendations(parsed.recommendations || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ farm, recommendations }));
  }, [farm, recommendations]);

  const value = useMemo(() => ({ farm, setFarm, recommendations, setRecommendations }), [farm, recommendations]);
  return <FarmContext.Provider value={value}>{children}</FarmContext.Provider>;
}

export function useFarm() {
  return useContext(FarmContext);
}
