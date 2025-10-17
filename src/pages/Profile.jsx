import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/ui/Button.jsx';
import useOffline from '../hooks/useOffline.js';
import { User, MapPin, Phone, Settings, Wifi, WifiOff, Bell, Shield, HelpCircle, Edit } from 'lucide-react';

export default function Profile(){
  const { user } = useAuth();
  const { isOffline, toggleSimulateOffline } = useOffline();
  
  return (
    <div className="space-y-16 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 text-white">
        <AnimatedBackdrop />
        <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[3fr,2fr] lg:py-16">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider">
              <User className="h-4 w-4" /> Farmer profile
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Welcome back, {user?.name || 'Farmer'}!
            </h1>
            <p className="max-w-2xl text-lg text-white/80">
              Manage your profile, customize your AgroVista experience, and stay in control of your farm data and privacy settings.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureTile
                icon={Shield}
                title="Data Security"
                description="Your farm data is encrypted and secure"
              />
              <FeatureTile
                icon={Bell}
                title="Smart Alerts"
                description="Customizable notifications for your crops"
              />
            </div>
          </div>
          <div className="rounded-3xl bg-white/15 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
              <span>Account status</span>
              <Settings className="h-5 w-5" />
            </div>
            <div className="space-y-4">
              <StatusRow icon={User} label="Account type" value="Premium Farmer" />
              <StatusRow icon={isOffline ? WifiOff : Wifi} label="Connection" value={isOffline ? "Offline Mode" : "Online"} />
              <StatusRow icon={Shield} label="Security" value="Protected" />
              <StatusRow icon={Bell} label="Notifications" value="Enabled" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[2fr,3fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-wider text-emerald-600 font-semibold">Account management</p>
            <h2 className="text-2xl font-semibold text-slate-900">Quick settings</h2>
          </div>
          <div className="grid gap-4">
            {SETTINGS_OPTIONS.map((option) => (
              <article key={option.title} className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white via-white to-teal-50/40 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <option.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-emerald-700">{option.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{option.description}</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="text-xs">
                    Edit
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="rounded-3xl border border-teal-100 bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Personal Information</h3>
                <p className="text-sm text-slate-600">Your registered farmer details</p>
              </div>
              <Button variant="secondary" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
            
            <div className="space-y-6">
              <ProfileField
                icon={User}
                label="Full Name"
                value={user?.name || 'Not specified'}
              />
              <ProfileField
                icon={Phone}
                label="Phone Number"
                value={user?.phone || 'Not specified'}
              />
              <ProfileField
                icon={MapPin}
                label="Farm Location"
                value={user?.farmLocation || 'Not specified'}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-teal-100 bg-white p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900">Connection Settings</h3>
              <p className="text-sm text-slate-600">Manage your app connectivity and offline features</p>
            </div>
            
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full ${isOffline ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {isOffline ? <WifiOff className="h-6 w-6" /> : <Wifi className="h-6 w-6" />}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-900">Offline Demo Mode</div>
                    <div className="text-sm text-slate-600">
                      Current status: <span className={`font-medium ${isOffline ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {isOffline ? 'Offline' : 'Online'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Toggle to simulate offline functionality for testing
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={toggleSimulateOffline}
                  variant={isOffline ? "primary" : "secondary"}
                  className="flex items-center gap-2"
                >
                  {isOffline ? (
                    <>
                      <Wifi className="h-4 w-4" />
                      Go Online
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4" />
                      Go Offline
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-16 left-1/3 h-60 w-60 animate-blob bg-emerald-400/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 animate-blob-delay bg-cyan-400/30 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-64 w-64 animate-spin-slow rounded-full border border-white/10" />
    </div>
  );
}

function FeatureTile({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 shadow-md backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-white/70">{description}</p>
        </div>
      </div>
    </div>
  );
}

function StatusRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/10 p-3 shadow-sm">
      <div className="flex items-center gap-2 text-white/80">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm text-white font-semibold">{value}</span>
    </div>
  );
}

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-base text-slate-900">{value}</p>
      </div>
    </div>
  );
}

const SETTINGS_OPTIONS = [
  {
    icon: Bell,
    title: 'Notification Preferences',
    description: 'Customize alerts for weather, market prices, and crop recommendations.',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Manage data sharing preferences and account security settings.',
  },
  {
    icon: HelpCircle,
    title: 'Help & Support',
    description: 'Access tutorials, FAQs, and contact our farming experts.',
  },
];
