import { useRef, useState } from 'react';

export default function ImageUpload({ onFile }){
  const inputRef = useRef(null);
  const [preview, setPreview] = useState('');
  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('Please select an image');
    if (file.size > 5 * 1024 * 1024) return alert('File must be < 5MB');
    setPreview(URL.createObjectURL(file));
    onFile?.(file);
  };
  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const ev = { target: { files: [file] } };
      onChange(ev);
    }
  };
  return (
    <div className="space-y-2">
      <div onDragOver={(e)=>e.preventDefault()} onDrop={onDrop} className="border-2 border-dashed rounded-card p-6 text-center cursor-pointer" onClick={()=>inputRef.current?.click()}>
        <div>Drag & drop an image or click to select</div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
      {preview && <img src={preview} alt="Preview" className="rounded-card max-h-48 object-contain" />}
    </div>
  );
}
