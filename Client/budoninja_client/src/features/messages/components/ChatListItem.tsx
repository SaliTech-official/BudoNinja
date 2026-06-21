import React from 'react';
import { type ChatListItemType } from '../types';
import { User } from 'lucide-react';

interface ChatListItemProps {
  chat: ChatListItemType;
  isActive: boolean;
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-between px-5 py-3 cursor-pointer rounded-lg transition-colors duration-200
        ${isActive ? 'bg-primary-600 text-neutral-50' : 'hover:bg-neutral-100'}
      `}
    >
      <div className='flex gap-3'>
        <div className="relative">
          {chat.avatarUrl ? 
            (<img
            src={chat.avatarUrl}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover"
            />) : 
            (<div className='w-10 h-10 rounded-full flex justify-center items-center bg-neutral-300 text-neutral-900'>
                <User size={20}/>
            </div>)
          }
          {chat.unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 bg-primary-500 text-neutral-50 text-[10px] leading-relaxed rounded-full">
              {chat.unreadCount}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className={`font-semibold text-sm ${isActive ? '' : 'text-neutral-900'}`}>
            {chat.name}
          </div>
          <div className={`text-xs truncate ${isActive ? 'text-neutral-100' : 'text-neutral-600'}`}>
            {chat.lastMessage}
          </div>
        </div>
      </div>

      <div className={`text-xs ${isActive ? 'text-neutral-100' : 'text-neutral-500'}`}>
        {chat.timestamp}
      </div>
    </div>
  );
};
