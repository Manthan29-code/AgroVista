import Button from '../ui/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import { required } from '../../utils/validators.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm(){
  const { login } = useAuth();
  const nav = useNavigate();
  const { values, handleChange, validate, errors } = useFormValidation({ name: '', phone: '', farmLocation: '' }, { name: required, phone: required, farmLocation: required });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    login(values);
    nav('/dashboard');
  };
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">Name</label>
        <input name="name" value={values.name} onChange={handleChange} className="w-full border rounded p-2" />
        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
      </div>
      <div>
        <label className="block text-sm">Phone</label>
        <input name="phone" value={values.phone} onChange={handleChange} className="w-full border rounded p-2" />
        {errors.phone && <div className="text-red-600 text-sm">{errors.phone}</div>}
      </div>
      <div>
        <label className="block text-sm">Farm Location</label>
        <input name="farmLocation" value={values.farmLocation} onChange={handleChange} className="w-full border rounded p-2" />
        {errors.farmLocation && <div className="text-red-600 text-sm">{errors.farmLocation}</div>}
      </div>
      <Button type="submit" className="w-full">Create Account</Button>
    </form>
  );
}
