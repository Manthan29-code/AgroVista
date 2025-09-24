import { useState } from 'react';

export default function useFormValidation(initial = {}, rules = {}) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };
  const validate = () => {
    const errs = {};
    Object.entries(rules).forEach(([key, fn]) => {
      const msg = fn(values[key], values);
      if (msg) errs[key] = msg;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  return { values, setValues, errors, setErrors, handleChange, validate };
}
