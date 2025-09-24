import useOffline from '../../hooks/useOffline.js';

export default function OfflineBanner() {
  const { isOffline } = useOffline();
  if (!isOffline) return null;
  return (
    <div className="bg-yellow-100 text-yellow-900 text-sm py-2">
      <div className="container-responsive">You are offline. Some features are unavailable.</div>
    </div>
  );
}
