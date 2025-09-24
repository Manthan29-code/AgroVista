import FarmForm from '../components/forms/FarmForm.jsx';
import { useFarm } from '../context/FarmContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function FarmInput(){
  const { farm, setFarm } = useFarm();
  const nav = useNavigate();
  const onSubmit = (data) => {
    setFarm(data);
    nav('/recommendations');
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Farm Data</h2>
      <FarmForm initial={farm} onSubmit={onSubmit} />
    </div>
  );
}
