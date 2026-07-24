import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { SalesRecord } from '../types/index';

interface DetailModalProps {
  record: SalesRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ record, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus close button when modal opens
    closeButtonRef.current?.focus();

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Handle click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !record) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="presentation"
    >
      <div
        ref={modalRef}
        className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 id="modal-title" className="text-xl font-bold text-white">
            Sale Details
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DetailField label="Sale ID" value={record.id} />
            <DetailField label="Date" value={new Date(record.date).toLocaleDateString()} />
            <DetailField label="Customer" value={record.customerName} />
            <DetailField label="Region" value={record.region} />
            <DetailField label="Category" value={record.category} />
            <DetailField label="Product" value={record.productName} />
            <DetailField label="Quantity" value={record.quantity.toString()} />
            <DetailField label="Unit Price" value={`$${record.unitPrice.toFixed(2)}`} />
            <DetailField label="Total Amount" value={`$${record.totalAmount.toFixed(2)}`} />
            <DetailField label="Status" value={record.status} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface DetailFieldProps {
  label: string;
  value: string;
}

const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => (
  <div>
    <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
    <p className="text-white">{value}</p>
  </div>
);
