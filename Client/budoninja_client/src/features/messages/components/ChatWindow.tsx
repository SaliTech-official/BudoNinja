import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Button } from '../../../components/UI/Button';
import { type ChatListItemType, type MessageType } from '../types';
import { User, Trash2, ChevronRight } from 'lucide-react';

interface Props {
  chat: ChatListItemType;
  messages: MessageType[];
  onUpdateMessages: (id: string, msgs: MessageType[]) => void;
  onDeleteRequest: () => void;
  onRequestForward: (msg: MessageType) => void;
  onBack?: () => void;
}

export const ChatWindow: React.FC<Props> = ({ 
  chat, messages, onUpdateMessages, onDeleteRequest, onRequestForward, onBack 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [messages]);

  const handleSendMessage = (payload: { text?: string; fileUrl?: string; fileName?: string; fileType?: 'image' | 'document' }) => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      chatId: chat.id,
      senderId: 'me',
      ...payload,
      isOwnMessage: true,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
    onUpdateMessages(chat.id, [...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <header className="px-4 py-3 border-b border-neutral-300 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button size="icon" onClick={onBack} variant="ghost" className='md:hidden hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 active:bg-neutral-100'><ChevronRight size={24}/></Button>
          )}
          <div className='flex gap-2 items-center'>
            {chat.avatarUrl ? (
              <img src={chat.avatarUrl} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className='h-10 w-10 bg-neutral-300 text-neutral-700 rounded-full flex justify-center items-center'><User /></div>
            )}
            <span className="font-semibold text-neutral-800">{chat.name}</span>
          </div>
        </div>
        <Button onClick={onDeleteRequest} size="icon" variant="ghost"><Trash2 /></Button>
      </header>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-neutral-50">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} onForward={() => onRequestForward(msg)} />
        ))}
      </div>
      
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};
