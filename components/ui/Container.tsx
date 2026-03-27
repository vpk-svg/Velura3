import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'nav';
}

/**
 * Consistent max-width container used across all sections.
 * Replaces the mix of max-w-[1600px] / max-w-[1800px] / max-w-7xl scattered everywhere.
 */
export default function Container({
  children,
  className = '',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={`max-w-container mx-auto px-6 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
