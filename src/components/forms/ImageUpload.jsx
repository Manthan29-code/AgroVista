import { useRef, useState } from 'react';

export default function ImageUpload({ onFile }){
  const inputRef = useRef(null);
  const [preview, setPreview] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

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
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const ev = { target: { files: [file] } };
      onChange(ev);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setPreview('');
    onFile?.(null);
  };

  return (
    <div className="space-y-4">
      {/* Upload Drop Zone */}
      <div 
        onDragOver={onDragOver} 
        onDragLeave={onDragLeave}
        onDrop={onDrop} 
        onClick={() => !preview && inputRef.current?.click()}
        className={`
          relative rounded-2xl border-2 border-dashed p-4 text-center overflow-hidden
          transition-all duration-300 ease-out min-h-[200px] flex items-center justify-center
          ${preview 
            ? 'border-teal-200 bg-white cursor-default' 
            : isDragOver 
              ? 'border-emerald-500 bg-emerald-50 scale-[1.02] cursor-pointer' 
              : 'border-teal-200 bg-gradient-to-br from-white via-white to-teal-50/30 hover:border-emerald-400 hover:bg-emerald-50/50 cursor-pointer'
          }
        `}
      >
        {/* Decorative Corner Gradient */}
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl pointer-events-none" />

        {preview ? (
          /* Image Preview Inside Drop Zone */
          <div className="relative w-full">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full max-h-64 object-contain rounded-xl" 
            />
            {/* Remove Button */}
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-colors z-10"
              aria-label="Remove image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Change Image Hint */}
            <div 
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-medium cursor-pointer transition-colors backdrop-blur-sm"
            >
              Click to change image
            </div>
          </div>
        ) : (
          /* Upload Prompt */
          <div className="py-4">
            {/* Upload Icon */}
            <div className={`
              mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4
              transition-all duration-300
              ${isDragOver ? 'bg-emerald-200 scale-110' : 'bg-emerald-100'}
            `}>
              <svg 
                className={`w-8 h-8 transition-colors ${isDragOver ? 'text-emerald-700' : 'text-emerald-600'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
            </div>

            {/* Text */}
            <p className="text-base font-medium text-gray-700 mb-1">
              {isDragOver ? 'Drop your image here' : 'Drag & drop an image or click to select'}
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, WebP • Max 5MB
            </p>
          </div>
        )}
      </div>

      <input 
        ref={inputRef} 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={onChange} 
      />
    </div>
  );
}
