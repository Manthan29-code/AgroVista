import Button from '../components/ui/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home(){
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();
  return (
    <div className="grid gap-8 md:grid-cols-2 items-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary">AgroVista — AI-backed crop advisor</h1>
        <p className="mt-3 text-slate-700">Get smart crop recommendations, scan for pests, and find the best market prices — all in one place.</p>
        <div className="mt-4 flex gap-3">
          <Button onClick={()=> nav(isAuthenticated ? '/dashboard' : '/register')}>Try Demo</Button>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>
      <div className="grid gap-3">
        <div className="card">Crop Recommendation</div>
        <div className="card">Pest Scan</div>
        <div className="card">Market Linkage</div>
      </div>
    </div>
  );
}
