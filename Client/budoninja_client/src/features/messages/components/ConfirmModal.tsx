import React from 'react';
import { Button } from '../../../components/UI/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex p-4 items-center justify-center bg-white/10 backdrop-blur-md">
      <div className="bg-neutral-100 flex flex-col gap-6 rounded-xl p-6 shadow-2xl w-full max-w-sm overflow-hidden">
        <div className='flex flex-col gap-2'>
          <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-600">{message}</p>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="ghost" size="sm" onClick={onClose} className='text-neutral-600 hover:text-neutral-50 hover:bg-neutral-500 active:bg-neutral-700'>
            انصراف
          </Button>
          <Button 
            onClick={() => { onConfirm(); onClose(); }} 
            size="sm"
          >
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
};
