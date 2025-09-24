import Button from '../ui/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import { required } from '../../utils/validators.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

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
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}
