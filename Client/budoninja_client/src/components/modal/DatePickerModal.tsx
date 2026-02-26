import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'jalali-moment';
import { X } from 'lucide-react';
import { WheelScroller } from '../UI/WheelScroller';
import { Button } from '../UI/Button';

export interface DateValue {
  day: number;
  month: string;
  year: number;
}

interface DatePickerModalProps {
  initialDate: DateValue;
  onClose: () => void;
  onSave: (date: DateValue) => void;
}

export function DatePickerModal({ initialDate, onClose, onSave }: DatePickerModalProps) {
  const [day, setDay] = useState(initialDate.day);
  const [month, setMonth] = useState(initialDate.month);
  const [year, setYear] = useState(initialDate.year);

  const currentJalaliYear = parseInt(moment().format('jYYYY'));
  const years = Array.from({ length: 100 }, (_, i) => currentJalaliYear - i);
  const months = moment.localeData('fa').jMonths();

  const daysInMonth = moment(`${year}/${months.indexOf(month) + 1}`, 'jYYYY/jM').jDaysInMonth();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    if (day > daysInMonth) {
      setDay(daysInMonth);
    }
  }, [month, year, day, daysInMonth]);

  const handleSave = () => {
    onSave({ day, month, year });
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-50"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[90vh] flex-col rounded-t-2xl bg-neutral-100"
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h3 className="text-lg font-bold text-neutral-900">انتخاب تاریخ تولد</h3>
          <Button variant="ghost" size="icon" onClick={onClose}><X size={20} /></Button>
        </div>

        <div className="p-6">
          <div className="relative flex justify-center items-center h-48">
            <div className="absolute h-10 w-full bg-primary-100/50 border-y border-primary-200 -z-10 rounded-md" />
            <div className="flex w-full text-center">
              <div className="flex-1"><WheelScroller items={years} selectedValue={year} onSelect={(val) => setYear(val as number)} /></div>
              <div className="flex-1"><WheelScroller items={months} selectedValue={month} onSelect={(val) => setMonth(val as string)} /></div>
              <div className="flex-1"><WheelScroller items={days} selectedValue={day} onSelect={(val) => setDay(val as number)} /></div>
            </div>
          </div>
          
          <Button onClick={handleSave} className="w-full mt-8" size="lg">
            تایید تاریخ
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}