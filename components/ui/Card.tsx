import { type ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'article' | 'li';
}

/**
 * Unified card shell.
 * Consistent rounded-md + shadow + border treatment across the site.
 */
export default function Card({
  children,
  className,
  hover = true,
  as: Tag = 'article',
}: CardProps) {
  return (
    <Tag
      className={clsx(
        'bg-white rounded-md overflow-hidden border border-secondary/5 shadow-soft-sm',
        hover && 'transition-shadow duration-300 ease-premium hover:shadow-soft-lg',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
