import React, { useRef, useState } from 'react';
import { TextArea } from '../../../components/UI/TextArea';
import { Input } from '../../../components/UI/Input';
import { Paperclip } from 'lucide-react';
import { Button } from '../../../components/UI/Button';

interface Props {
  onSend: (payload: { text?: string; fileUrl?: string; fileName?: string; fileType?: 'image' | 'document' }) => void;
}

export const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendText = () => {
    if (!text.trim()) return;
    onSend({ text });
    setText('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onSend({
      fileUrl: URL.createObjectURL(file),
      fileName: file.name,
      fileType: file.type.startsWith('image/') ? 'image' : 'document'
    });
  };

  return (
    <div className="p-3 border-t border-neutral-300 flex items-start gap-2 bg-neutral-100">
      <Input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      <Button size="icon" variant="ghost" onClick={() => fileInputRef.current?.click()}><Paperclip size={16}/></Button>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className=""
        placeholder="پیام..."
      />
      <Button onClick={handleSendText}>ارسال</Button>
    </div>
  );
};
