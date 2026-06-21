import React from 'react';
import { type ChatListItemType } from '../types';
import { Button } from '../../../components/UI/Button';
import { X, User } from 'lucide-react';

interface ForwardMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: ChatListItemType[];
  onSelectConversation: (chat: ChatListItemType) => void;
}

export const ForwardMessageModal: React.FC<ForwardMessageModalProps> = ({
  isOpen,
  onClose,
  conversations,
  onSelectConversation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex p-4 items-center justify-center bg-white/10 backdrop-blur-md">
      <div className="bg-neutral-100 w-full max-w-md rounded-xl p-4 shadow-xl">
        
        {/* هدر */}
        <header className="flex justify-between items-center mb-4 border-b border-neutral-300 pb-2">
          <h3 className="font-bold text-neutral-800">فوروارد پیام به...</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X size={18} />
          </Button>
        </header>

        {/* لیست گفتگوها */}
        <div className="max-h-96 overflow-y-auto space-y-1">
          {conversations.length === 0 ? (
            <div className="p-4 text-sm text-neutral-500 text-center">
              هیچ گفتگویی برای انتخاب وجود ندارد.
            </div>
          ) : (
            conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectConversation(chat)}
                className="flex items-center gap-3 p-2 hover:bg-primary-200 rounded-lg cursor-pointer transition-colors"
              >
                {/* آواتار با جایگزین */}
                {chat.avatarUrl ? (
                  <img
                    src={chat.avatarUrl}
                    alt={chat.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-neutral-300 flex justify-center items-center text-neutral-600">
                    <User size={16} />
                  </div>
                )}

                {/* اطلاعات گفتگو */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-neutral-800 truncate">
                    {chat.name}
                  </div>
                  {chat.lastMessage && (
                    <div className="text-xs text-neutral-500 truncate">
                      {chat.lastMessage}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
