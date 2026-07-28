import React from 'react';
import { cn } from '@/lib/utils';

export default function StatusBadge({ status, className }) {
  if (!status) return null;

  const normalizedStatus = status.toUpperCase();
  
  let colorStyles = 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
  
  if (['PAYMENT_PENDING', 'PENDING'].includes(normalizedStatus)) {
    colorStyles = 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
  } else if (['PAYMENT_COMPLETED', 'SUCCESS'].includes(normalizedStatus)) {
    colorStyles = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  } else if (['ORDER_CONFIRMED', 'CONFIRMED'].includes(normalizedStatus)) {
    colorStyles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  } else if (['PAYMENT_FAILED', 'FAILED'].includes(normalizedStatus)) {
    colorStyles = 'bg-red-500/10 text-red-400 border-red-500/20';
  } else if (['CANCELLED'].includes(normalizedStatus)) {
    colorStyles = 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
  } else if (['INVENTORY_RESERVED', 'RESERVED'].includes(normalizedStatus)) {
    colorStyles = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  } else if (['CREATED'].includes(normalizedStatus)) {
    colorStyles = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
  } else if (['REFUNDED'].includes(normalizedStatus)) {
    colorStyles = 'bg-orange-500/10 text-orange-400 border-orange-500/20';
  }

  const formattedLabel = normalizedStatus.replace(/_/g, ' ');

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      colorStyles,
      className
    )}>
      {formattedLabel}
    </span>
  );
}
