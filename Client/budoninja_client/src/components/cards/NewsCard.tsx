import * as React from 'react';
import { Badge } from '../UI/Badge.tsx';
import { Button } from '../UI/Button.tsx';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils.ts';

interface NewsCardProps {
  imageUrl: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
  className?: string;
}

export function NewsCard({ imageUrl, category, date, title, excerpt, link, className }: NewsCardProps) {
  return (
    <div className={cn("group max-w-90 flex flex-col overflow-hidden rounded-lg border border-neutral-700 bg-bg-secondary shadow-lg cursor-pointer", className)}>
      
      <div className="block flex-shrink-0 h-[220px] overflow-hidden ">
        <img className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" src={imageUrl} alt={title} />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Badge variant="primary">{category}</Badge>
            <p className="text-sm text-neutral-400">{date}</p>
          </div>

          <div className="mt-3">
            <p className="text-xl font-semibold text-neutral-50 group-hover:text-primary-500 transition-colors">{title}</p>
            <p className="mt-3 text-base text-neutral-300">{excerpt}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
            <Link to={link} className="text-sm font-medium text-primary-500 hover:text-primary-600">
              ادامه مطلب
            </Link>
        </div>
      </div>
    </div>
  );
}