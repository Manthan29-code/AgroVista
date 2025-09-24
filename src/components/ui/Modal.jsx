import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);
  return (
    <dialog ref={ref} className="rounded-card p-0 w-full max-w-lg backdrop:bg-black/40">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button aria-label="Close" className="btn btn-secondary px-2 py-1" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
