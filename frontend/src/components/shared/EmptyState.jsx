import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  actionHref,
  actionOnClick,
  className 
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5">
        {Icon && <Icon className="w-10 h-10 text-neutral-500" />}
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      
      {description && (
        <p className="text-neutral-400 max-w-sm mb-8">{description}</p>
      )}
      
      {actionLabel && (
        actionHref ? (
          <Link 
            to={actionHref}
            className="px-6 py-2.5 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors"
          >
            {actionLabel}
          </Link>
        ) : (
          <button 
            onClick={actionOnClick}
            className="px-6 py-2.5 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
