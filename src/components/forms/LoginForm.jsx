import Button from '../ui/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import { required } from '../../utils/validators.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { User, Phone, LogIn } from 'lucide-react';

export default function LoginForm(){
  const { login } = useAuth();
  const nav = useNavigate();
  const { values, handleChange, validate, errors } = useFormValidation({ phone: '', name: '' }, { phone: required, name: required });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    login(values);
    nav('/dashboard');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-slate-400" />
          </div>
          <input 
            name="name" 
            type="text"
            value={values.name} 
            onChange={handleChange} 
            placeholder="Enter your full name"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="h-4 w-4 text-red-500">⚠</span>
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-slate-400" />
          </div>
          <input 
            name="phone" 
            type="tel"
            value={values.phone} 
            onChange={handleChange}
            placeholder="Enter your phone number" 
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="h-4 w-4 text-red-500">⚠</span>
            {errors.phone}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-base shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      >
        <LogIn className="h-5 w-5" />
        Sign In to Dashboard
      </Button>

      <div className="text-center">
        <p className="text-xs text-slate-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </form>
  );
}
