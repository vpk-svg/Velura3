import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'article' | 'li';
}

/**
 * Unified card shell.
 * Replaces the identical bg-white rounded-[48px] shadow-sm border pattern
 * duplicated 15+ times across treatment, product, testimonial, and blog cards.
 */
export default function Card({
  children,
  className = '',
  hover = true,
  as: Tag = 'article',
}: CardProps) {
  return (
    <Tag
      className={`
        bg-white rounded-card overflow-hidden border border-secondary/5
        shadow-soft-sm
        ${hover ? 'transition-shadow duration-300 ease-premium hover:shadow-soft-lg' : ''}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
