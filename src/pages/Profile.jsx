import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/ui/Button.jsx';
import useOffline from '../hooks/useOffline.js';

export default function Profile(){
  const { user } = useAuth();
  const { isOffline, toggleSimulateOffline } = useOffline();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Profile & Settings</h2>
      <div className="card">
        <div className="font-semibold">Farmer Details</div>
        <div className="text-sm text-slate-600">Name: {user?.name}</div>
        <div className="text-sm text-slate-600">Phone: {user?.phone}</div>
        <div className="text-sm text-slate-600">Location: {user?.farmLocation}</div>
      </div>
      <div className="card flex items-center justify-between">
        <div>
          <div className="font-semibold">Offline Demo Toggle</div>
          <div className="text-sm text-slate-600">Current: {isOffline ? 'Offline' : 'Online'}</div>
        </div>
        <Button onClick={toggleSimulateOffline}>{isOffline ? 'Go Online' : 'Go Offline'}</Button>
      </div>
    </div>
  );
}
