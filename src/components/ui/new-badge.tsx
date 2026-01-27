import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { cn } from '@/lib/utils';

interface NewBadgeProps {
  show: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const NewBadge = ({ show, className, size = 'sm' }: NewBadgeProps) => {
  const { config } = useConfiguration();

  if (!show || !config.enabled) return null;

  const sizeStyles = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-3 py-1.5"
  };

  const colorStyles = {
    red: "bg-red-500 hover:bg-red-600",
    blue: "bg-blue-500 hover:bg-blue-600", 
    green: "bg-green-500 hover:bg-green-600",
    orange: "bg-orange-500 hover:bg-orange-600"
  };

  const styleVariants = {
    pill: "rounded-full",
    dot: "rounded-full w-3 h-3 p-0",
    outline: "border-2 bg-transparent"
  };

  const badgeClasses = cn(
    "font-medium text-white",
    sizeStyles[size],
    config.badgeStyle === 'dot' ? 'w-3 h-3 p-0' : colorStyles[config.badgeColor],
    styleVariants[config.badgeStyle],
    config.showAnimations && "animate-pulse",
    className
  );

  return (
    <Badge className={badgeClasses}>
      {config.badgeStyle !== 'dot' && 'NEW'}
    </Badge>
  );
};

export default NewBadge;
