// src/features/messages/mock/mockChats.ts
import { type ChatListItemType, type MessageType } from '../types';

export const mockConversations: ChatListItemType[] = [
  {
    id: 'chat-1',
    name: 'علی احمدی',
    lastMessage: 'سلام، پروژه چطوره؟',
    timestamp: '10:30',
    unreadCount: 2,
  },
  {
    id: 'chat-2',
    name: 'پشتیبانی فنی',
    lastMessage: 'مشکل شما بررسی شد.',
    timestamp: 'دیروز',
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    name: 'مریم رضایی',
    lastMessage: 'فایل رو برات فرستادم.',
    timestamp: '08:15',
    unreadCount: 1,
  },
  {
    id: 'chat-4',
    name: 'گروه پروژه',
    lastMessage: 'جلسه فردا ساعت ۱۰.',
    timestamp: '14:00',
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, MessageType[]> = {
  'chat-1': [
    {
      id: 'msg-1',
      chatId: 'chat-1',
      senderId: 'me',
      text: 'سلام علی جان، خوبی؟',
      timestamp: '10:25',
      isOwnMessage: true,
    },
    {
      id: 'msg-2',
      chatId: 'chat-1',
      senderId: 'ali',
      text: 'سلام، خوبم ممنون. پروژه چطوره پیش میره؟',
      timestamp: '10:26',
      isOwnMessage: false,
    },
    {
      id: 'msg-3',
      chatId: 'chat-1',
      senderId: 'me',
      text: 'خوبه، امروز می‌خوام بخش چت رو تموم کنم.',
      timestamp: '10:28',
      isOwnMessage: true,
    },
  ],
  'chat-2': [
    {
      id: 'msg-4',
      chatId: 'chat-2',
      senderId: 'support',
      text: 'سلام، مشکل شما بررسی شد و برطرف شد.',
      timestamp: '09:00',
      isOwnMessage: false,
    },
  ],
  'chat-3': [
    {
      id: 'msg-5',
      chatId: 'chat-3',
      senderId: 'maryam',
      text: 'سلام، فایل رو برات فرستادم توی ایمیل.',
      timestamp: '08:15',
      isOwnMessage: false,
    },
  ],
  'chat-4': [
    {
      id: 'msg-6',
      chatId: 'chat-4',
      senderId: 'me',
      text: 'یادت نره فردا جلسه داریم.',
      timestamp: '13:55',
      isOwnMessage: true,
    },
    {
      id: 'msg-7',
      chatId: 'chat-4',
      senderId: 'other',
      text: 'حتما، ممنون یادآوری کردی.',
      timestamp: '13:57',
      isOwnMessage: false,
    },
  ],
};

export const mockUsers = [
    { id: 'u1', name: 'سارا کریمی' },
    { id: 'u2', name: 'رضا حسینی' },
    { id: 'u3', name: 'امیر محمدی' },
  ];