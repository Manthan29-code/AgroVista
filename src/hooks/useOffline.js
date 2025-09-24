import { useEffect, useState } from 'react';

const SIM_KEY = 'agv_offline_sim';

export default function useOffline() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine || localStorage.getItem(SIM_KEY) === '1');
  useEffect(() => {
    const on = () => setIsOffline(false || localStorage.getItem(SIM_KEY) === '1');
    const off = () => setIsOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  const toggleSimulateOffline = () => {
    const v = localStorage.getItem(SIM_KEY) === '1' ? '0' : '1';
    localStorage.setItem(SIM_KEY, v);
    setIsOffline(v === '1' ? true : !navigator.onLine);
  };

  return { isOffline, toggleSimulateOffline };
}
