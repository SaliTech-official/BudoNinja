import React, { useState } from 'react';
import { ChatListItem } from '../components/ChatListItem';
import { EmptyChatState } from '../components/EmptyChatState';
import { ChatWindow } from '../components/ChatWindow';
import { NewChatModal } from '../components/NewChatModal';
import { ForwardMessageModal } from '../components/ForwardMessageModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { Button } from '../../../components/UI/Button';
import { Plus } from 'lucide-react';

import { mockConversations, mockMessages, mockUsers } from '../mock/mockChats';
import { type ChatListItemType, type MessageType, type UserType } from '../types';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<ChatListItemType[]>(mockConversations);
  const [messagesByChat, setMessagesByChat] = useState<Record<string, MessageType[]>>(mockMessages);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [forwardState, setForwardState] = useState<{ message: MessageType | null; isModalOpen: boolean }>({
    message: null,
    isModalOpen: false,
  });

  const [isChatOpenOnMobile, setIsChatOpenOnMobile] = useState(false);

  const handleUpdateMessages = (chatId: string, newMessages: MessageType[]) => {
    setMessagesByChat(prev => ({ ...prev, [chatId]: newMessages }));
    const lastMsg = newMessages[newMessages.length - 1];
    
    if (lastMsg) {
      const lastMessagePreview = lastMsg.text 
        ? lastMsg.text 
        : lastMsg.fileType === 'image' ? 'عکس 🖼️' : `فایل: ${lastMsg.fileName || 'پیوست'}`;

      setConversations(prev =>
        prev.map(c =>
          c.id === chatId
            ? {
                ...c,
                lastMessage: lastMessagePreview,
                timestamp: new Date().toLocaleTimeString('fa-IR', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              }
            : c,
        ),
      );
    }
  };

  const handleCreateNewChat = (user: UserType) => {
    if (conversations.some(c => c.id === user.id)) {
      setSelectedChatId(user.id);
      setIsNewChatModalOpen(false);
      setIsChatOpenOnMobile(true);
      return;
    }

    const newChat: ChatListItemType = {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatar,
      unreadCount: 0,
      lastMessage: 'گفتگو را شروع کنید...',
      timestamp: new Date().toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setConversations(prev => [newChat, ...prev]);
    setMessagesByChat(prev => ({ ...prev, [user.id]: [] }));
    setSelectedChatId(user.id);
    setIsNewChatModalOpen(false);
    setIsChatOpenOnMobile(true);
  };

  const performDeleteChat = () => {
    if (!deleteTargetId) return;
    setConversations(prev => prev.filter(c => c.id !== deleteTargetId));
    setMessagesByChat(prev => {
      const copy = { ...prev };
      delete copy[deleteTargetId];
      return copy;
    });
    if (selectedChatId === deleteTargetId) {
      setSelectedChatId(null);
      setIsChatOpenOnMobile(false);
    }
    setDeleteTargetId(null);
  };

  const handleSelectForwardTarget = (targetChat: ChatListItemType) => {
    if (!forwardState.message) return;
    const forwarded: MessageType = {
      ...forwardState.message,
      id: `fwd-${Date.now()}`,
      chatId: targetChat.id,
      isOwnMessage: true,
    };
    handleUpdateMessages(targetChat.id, [...(messagesByChat[targetChat.id] || []), forwarded]);
    setForwardState({ message: null, isModalOpen: false });
    setSelectedChatId(targetChat.id);
    setIsChatOpenOnMobile(true);
  };

  const selectedChat = conversations.find(c => c.id === selectedChatId) || null;

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setIsChatOpenOnMobile(true);
  };

  const handleBackFromChat = () => {
    setSelectedChatId(null)
    setIsChatOpenOnMobile(false);
  };

  return (
    <div className="flex h-full overflow-hidden bg-white rounded-lg shadow-sm">
      <aside
        className={`w-full md:w-80 flex flex-col overflow-y-auto ${isChatOpenOnMobile ? 'hidden md:block' : 'block'}`}
      >
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="font-semibold text-xl text-neutral-900">پیام‌ها</h2>
          <Button size="icon" onClick={() => setIsNewChatModalOpen(true)} >
            <Plus />
          </Button>
        </div>
        {conversations.map(chat => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={selectedChatId === chat.id}
            onClick={() => handleSelectChat(chat.id)}
          />
        ))}
      </aside>

      <section className={`flex-1 flex flex-col ${isChatOpenOnMobile ? 'block' : 'hidden'} md:block`}>
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            messages={messagesByChat[selectedChat.id] || []}
            onUpdateMessages={handleUpdateMessages}
            onDeleteRequest={() => setDeleteTargetId(selectedChat.id)}
            onRequestForward={msg => setForwardState({ message: msg, isModalOpen: true })}
            onBack={handleBackFromChat}
          />
        ) : (
          <div className="hidden md:flex flex-1"><EmptyChatState /></div>
        )}
      </section>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={performDeleteChat}
        title="حذف گفتگو"
        message="آیا مطمئنید؟ این چت برای همیشه پاک می‌شود."
      />
      <ForwardMessageModal
        isOpen={forwardState.isModalOpen}
        onClose={() => setForwardState({ message: null, isModalOpen: false })}
        conversations={conversations}
        onSelectConversation={handleSelectForwardTarget}
      />
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onSelectUser={handleCreateNewChat}
        users={mockUsers}
      />
    </div>
  );
}
