import React from 'react';
import { type MessageType } from '../types';
import { Button } from '../../../components/UI/Button';
import { Forward, File as FileIcon, Image as ImageIcon } from 'lucide-react';

interface MessageBubbleProps {
  message: MessageType;
  onForward?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onForward }) => {
  const { text, fileUrl, fileName, fileType, timestamp, isOwnMessage } = message;

  const isImage = fileType === 'image';

  return (
    <div
      className={`
        group mb-4 flex items-center gap-2 justify-start
        ${isOwnMessage ? 'flex-row' : 'flex-row-reverse'}
      `}
    >
      <div
        className={`
          max-w-[80%] px-4 py-2 rounded-lg text-sm shadow-sm flex flex-col gap-2
          ${isOwnMessage
            ? 'bg-primary-600 text-neutral-50 rounded-br-none'
            : 'bg-neutral-200 text-neutral-900 rounded-bl-none'}
        `}
      >
        {fileUrl && (
          <div
            className={`
              flex items-center justify-between gap-3 rounded-[10px]
            `}
          >
            <div className="flex items-center gap-3">
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full
                  ${isOwnMessage ? 'bg-primary-500' : 'bg-primary-100'}
                `}
              >
                {isImage ? (
                  <ImageIcon
                    size={20}
                    className={isOwnMessage ? 'text-white' : 'text-primary-600'}
                  />
                ) : (
                  <FileIcon
                    size={20}
                    className={isOwnMessage ? 'text-white' : 'text-primary-600'}
                  />
                )}
              </a>

              <div className="flex flex-col">
                <p
                  className={`
                    text-[13px] font-medium line-clamp-1
                    ${isOwnMessage ? 'text-neutral-50' : 'text-primary-700'}
                  `}
                >
                  {fileName ?? 'فایل پیوست'}
                </p>
                <span
                  className={`
                    text-[11px]
                    ${isOwnMessage ? 'text-primary-100/80' : 'text-neutral-400'}
                  `}
                >
                  {isImage ? 'تصویر' : fileType ? fileType.toUpperCase() : 'فایل'}
                </span>
              </div>
            </div>
          </div>
        )}

        {text && <p className="whitespace-pre-wrap break-words">{text}</p>}

        <div
          className={`
            text-[10px] text-left
            ${isOwnMessage ? 'text-neutral-100' : 'text-neutral-500'}
          `}
        >
          <span>{timestamp}</span>
        </div>
      </div>

      {onForward && (
        <Button
          size="icon"
          onClick={onForward}
          className="
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            flex items-center justify-center
            w-8 h-8 rounded-full
            bg-neutral-200 text-neutral-500
            hover:bg-neutral-300 hover:text-neutral-600
            active:bg-neutral-400
            hover:scale-110
            transition-transform
          "
        >
          <Forward size={16} />
        </Button>
      )}
    </div>
  );
};
