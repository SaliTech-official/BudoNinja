export interface ChatListItemType {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    avatarUrl?: string;
  }
  
  export interface UserType {
    id: string;
    name: string;
    avatar?: string;
  }

  export interface MessageType {
    id: string;
    chatId: string;
    senderId: string;
    text?: string;
    fileUrl?: string;
    fileName?: string;
    fileType?: 'image' | 'document';
    isOwnMessage: boolean;
    timestamp: string;
  }