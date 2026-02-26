import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface WheelScrollerProps {
  items: (string | number)[];
  onSelect: (item: string | number) => void;
  selectedValue: string | number;
}

export function WheelScroller({ items, onSelect, selectedValue }: WheelScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40;

  const isSnapping = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = items.indexOf(selectedValue);
      if (selectedIndex !== -1) {
        scrollRef.current.scrollTo({
          top: selectedIndex * itemHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedValue, items, itemHeight]);

  const handleScroll = () => {
    if (scrollRef.current && !isSnapping.current) {
      isSnapping.current = true;
      setTimeout(() => {
        const scrollTop = scrollRef.current!.scrollTop;
        const selectedIndex = Math.round(scrollTop / itemHeight);
        const selectedItem = items[selectedIndex];
        
        if (selectedItem !== selectedValue) {
          onSelect(selectedItem);
        }
        isSnapping.current = false;
      }, 150);
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="h-48 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      <div style={{ height: `calc(50% - ${itemHeight / 2}px)` }} />
      {items.map((item) => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          className={cn(
            "flex h-10 items-center justify-center snap-center transition-all duration-300 ease-out",
            selectedValue === item
              ? "text-lg font-bold text-neutral-900" 
              : "text-base text-neutral-400 scale-90 opacity-60" 
          )}
        >
          {item}
        </div>
      ))}
      <div style={{ height: `calc(50% - ${itemHeight / 2}px)` }} />
    </div>
  );
}