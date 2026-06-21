import React from 'react';
import { type UserType } from '../types';
import { Button } from '../../../components/UI/Button';
import { X, User } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: UserType) => void;
  users: UserType[];
}

export const NewChatModal: React.FC<Props> = ({ isOpen, onClose, onSelectUser, users }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md">
      <div className="bg-neutral-100 rounded-xl w-96 p-4 shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b border-neutral-300 pb-2">
          <h3 className="font-bold text-neutral-800">چت جدید</h3>
          <Button variant="ghost" size="icon" onClick={onClose}><X /></Button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user)}
              className="flex items-center gap-3 p-2 hover:bg-primary-200 rounded-lg cursor-pointer transition-colors"
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className='w-8 h-8 rounded-full bg-neutral-300 flex justify-center items-center'><User size={16}/></div>
              )}
              
              <span className="text-sm text-neutral-700">{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
