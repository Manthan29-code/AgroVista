import Header from '../ui/Header.jsx';
import Footer from '../ui/Footer.jsx';
import OfflineBanner from '../ui/OfflineBanner.jsx';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <OfflineBanner />
      <Header />
      <main className="flex-1">
        <div className="container-responsive py-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
