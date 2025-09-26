import { useLocation } from 'react-router-dom';
import Header from '../ui/Header.jsx';
import Footer from '../ui/Footer.jsx';
import OfflineBanner from '../ui/OfflineBanner.jsx';

export default function MainLayout({ children }) {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <OfflineBanner />
      <Header />
      <main className="flex-1">
        <div key={location.pathname} className="container-responsive py-6 animate-page-fade">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
