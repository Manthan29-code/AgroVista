import { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((t)=> [...t, { id, message, type }]);
    setTimeout(()=> dismiss(id), 3000);
  };
  const dismiss = (id) => setToasts((t)=> t.filter(x=>x.id!==id));
  const value = useMemo(()=>({ addToast }), []);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className={`px-3 py-2 rounded-card shadow text-white ${t.type==='error' ? 'bg-red-600' : 'bg-slate-900'}`}>{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(){
  return useContext(ToastContext);
}
