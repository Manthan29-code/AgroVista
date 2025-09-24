import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'leaflet/dist/leaflet.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { FarmProvider } from './context/FarmContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FarmProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </FarmProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
