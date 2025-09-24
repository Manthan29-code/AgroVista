import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'agv_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = (payload) => {
    setUser({
      name: payload.name || 'Demo Farmer',
      phone: payload.phone || '9876543210',
      farmLocation: payload.farmLocation || 'Nashik, MH',
      language: payload.language || 'en',
      token: 'mock-token',
    });
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout, isAuthenticated: !!user }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
