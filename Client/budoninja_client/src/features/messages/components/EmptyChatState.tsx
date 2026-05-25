import React from 'react';
import { MessageSquarePlus } from 'lucide-react';

export const EmptyChatState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-100 w-full">
      <div className="text-center flex flex-col items-center gap-4">
        <MessageSquarePlus size={64} className='text-primary-500'/>
        <h2 className="text-xl font-semibold text-neutral-700">گفتگو خود را انتخاب کنید</h2>
        <p className="text-md text-neutral-500">یک گفتگو از لیست سمت راست انتخاب کنید یا یک چت جدید شروع کنید.</p>
      </div>
    </div>
  );
};
