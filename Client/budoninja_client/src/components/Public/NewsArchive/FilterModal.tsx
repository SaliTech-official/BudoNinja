import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../../UI/Button';
import { Sidebar } from './Sidebar';

interface FilterModalProps {
  onClose: () => void;
}

export function FilterModal({ onClose }: FilterModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: "100%", opacity: 0 },
  };

  return (
    <>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-50"
      />

      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: "spring", damping: 40, stiffness: 400 }}
        className="fixed px-6 py-4 bottom-0 left-0 right-0 z-50 flex h-[80vh] flex-col gap-6 rounded-t-2xl bg-white"
      >
        <div className='w-10 h-1 bg-neutral-500 rounded-full mx-auto'></div>
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <h3 className="text-xl font-bold text-neutral-900">فیلترها</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className='text-neutral-500 hover:bg-neutral-600'>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <Sidebar />
        </div>

        <div className="flex justify-center gap-2.5">
          <Button variant="ghost" className="w-full" onClick={onClose}>
            حذف فیلتر ها
          </Button>
          <Button className="w-full" onClick={onClose}>
            اعمال فیلتر
          </Button>
        </div>
      </motion.div>
    </>
  );
}