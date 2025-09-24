import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container-responsive flex items-center justify-between h-14">
        <Link to="/" className="font-semibold text-primary">AgroVista</Link>
        <nav className="hidden md:flex gap-4">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'text-primary' : 'text-slate-600'}>Dashboard</NavLink>
          <NavLink to="/farm/input" className={({isActive}) => isActive ? 'text-primary' : 'text-slate-600'}>Farm</NavLink>
          <NavLink to="/recommendations" className={({isActive}) => isActive ? 'text-primary' : 'text-slate-600'}>Recommendations</NavLink>
          <NavLink to="/pest-scan" className={({isActive}) => isActive ? 'text-primary' : 'text-slate-600'}>Pest Scan</NavLink>
          <NavLink to="/market" className={({isActive}) => isActive ? 'text-primary' : 'text-slate-600'}>Market</NavLink>
          <NavLink to="/profile" className={({isActive}) => isActive ? 'text-primary' : 'text-slate-600'}>Profile</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-slate-600 hidden sm:inline">Hi, {user.name.split(' ')[0]}</span>
              <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
