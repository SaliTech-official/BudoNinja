import React, { useState, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { cn } from '../../lib/utils';

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

export function OtpInput({ length = 5, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      
      if (newOtp.every(digit => digit !== "")) {
        onComplete(newOtp.join(""));
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    if (/^[0-9]+$/.test(pasteData)) {
      const newOtp = [...otp];
      for(let i=0; i<pasteData.length; i++) {
        if(i < length) {
          newOtp[i] = pasteData[i];
        }
      }
      setOtp(newOtp);
      const lastFullIndex = Math.min(pasteData.length, length - 1);
      inputRefs.current[lastFullIndex]?.focus();
      if (newOtp.every(digit => digit !== "")) {
        onComplete(newOtp.join(""));
      }
    }
  };

  return (
    <div className="flex justify-center gap-2" dir="ltr">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { 
            if (el) inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className="h-14 w-12 rounded-md border border-neutral-300 text-center text-2xl font-semibold text-neutral-700 focus:border-primary-500"
        />
      ))}
    </div>
  );
}