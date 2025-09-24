import { useState } from 'react';
import ImageUpload from '../components/forms/ImageUpload.jsx';
import Modal from '../components/ui/Modal.jsx';
import Button from '../components/ui/Button.jsx';
import useMockApi from '../hooks/useMockApi.js';
import { useToast } from '../context/ToastContext.jsx';

export default function PestDiagnosis(){
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  const api = useMockApi();
  const { addToast } = useToast();
  const onScan = async () => {
    try{
      const res = await api.postPestScan(file);
      setResult(res);
      setOpen(true);
    } catch(e){
      addToast(e.message || 'Scan failed', 'error');
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pest Diagnosis</h2>
      <ImageUpload onFile={setFile} />
      <Button onClick={onScan} disabled={!file}>Scan</Button>
      <Modal isOpen={open} onClose={()=>setOpen(false)} title="Scan Result">
        {result && (
          <div className="space-y-2">
            <div><span className="font-semibold">Detected:</span> {result.detectedName}</div>
            <div><span className="font-semibold">Confidence:</span> {result.confidencePercent}%</div>
            <div>
              <div className="font-semibold">Suggested Actions:</div>
              <ul className="list-disc ml-5 text-sm">
                {result.suggestedActions.map((a,i)=> <li key={i}>{a}</li>)}
              </ul>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={()=>{setOpen(false);}}>Save as Alert</Button>
              <Button variant="secondary">View Nearby Inputs</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
