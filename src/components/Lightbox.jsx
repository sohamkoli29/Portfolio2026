import { useEffect, useRef } from 'react';

// A pop-up built on the browser's own <dialog>: Esc closes it and keyboard focus stays inside.
export default function Lightbox({ open, onClose, label, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto max-h-[90vh] w-[min(92vw,56rem)] overflow-auto rounded-xl bg-porcelain p-6 text-ink backdrop:bg-ink/60"
    >
      {open && (
        <>
          <button onClick={onClose} className="mb-4 ml-auto block rounded-full bg-sand px-4 py-1 text-sm">
            Close
          </button>
          {children}
        </>
      )}
    </dialog>
  );
}