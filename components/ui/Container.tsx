import { type ReactNode } from 'react';
import { clsx } from 'clsx';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'nav';
}

/**
 * Consistent max-width container used across all sections.
 */
export default function Container({
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={clsx('max-w-container mx-auto px-6 lg:px-12', className)}>
      {children}
    </Tag>
  );
}
