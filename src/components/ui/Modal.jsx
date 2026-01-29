import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const ref = useRef(null);
  
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
  };

  return (
    <dialog 
      ref={ref} 
      className={`rounded-2xl p-0 w-full ${sizeClasses[size] || sizeClasses.md} backdrop:bg-black/50 backdrop:backdrop-blur-sm shadow-2xl border-0 overflow-hidden`}
    >
      <div className="p-0">
        {title && (
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 text-white">
            <h2 className="text-lg font-bold">{title}</h2>
            <button 
              aria-label="Close" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-medium"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </dialog>
  );
}
