import Button from '../ui/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import { required, isNumber } from '../../utils/validators.js';

export default function FarmForm({ initial, onSubmit }){
  const { values, setValues, handleChange, validate, errors } = useFormValidation({
    location: initial?.location || '',
    ph: initial?.soil?.ph ?? 7,
    moisturePercent: initial?.soil?.moisturePercent ?? 30,
    N: initial?.soil?.N ?? 0,
    P: initial?.soil?.P ?? 0,
    K: initial?.soil?.K ?? 0,
  }, {
    location: required,
    ph: isNumber,
    moisturePercent: isNumber,
    N: isNumber,
    P: isNumber,
    K: isNumber,
  });
  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ location: values.location, soil: { ph: Number(values.ph), moisturePercent: Number(values.moisturePercent), N: Number(values.N), P: Number(values.P), K: Number(values.K) } });
  };
  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="md:col-span-2">
        <label className="block text-sm">Location</label>
        <input name="location" value={values.location} onChange={handleChange} className="w-full border rounded p-2" />
        {errors.location && <div className="text-red-600 text-sm">{errors.location}</div>}
      </div>
      {['ph','moisturePercent','N','P','K'].map((f)=> (
        <div key={f}>
          <label className="block text-sm uppercase">{f}</label>
          <input name={f} value={values[f]} onChange={handleChange} className="w-full border rounded p-2" />
          {errors[f] && <div className="text-red-600 text-sm">{errors[f]}</div>}
        </div>
      ))}
      <div className="md:col-span-2 flex justify-end">
        <Button type="submit">Save & Continue</Button>
      </div>
    </form>
  );
}
