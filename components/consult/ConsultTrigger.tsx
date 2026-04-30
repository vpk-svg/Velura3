'use client';

import type { ReactNode } from 'react';
import { useRouter, usePathname } from '@/lib/navigation';
import { useCart } from '@/lib/cart-context';

export type ConsultSubject = 'home' | 'weightloss' | 'botox' | 'fillers' | 'bbl' | 'medicatie' | 'intake' | 'other';

interface ConsultTriggerProps {
  children: ReactNode;
  className?: string;
  from?: ConsultSubject;
}

function subjectFromPath(pathname: string): ConsultSubject {
  if (/^\/(nl|en)?\/?$/.test(pathname)) return 'home';
  if (pathname.includes('/weightloss')) return 'weightloss';
  if (pathname.includes('/medicatie')) return 'medicatie';
  if (pathname.includes('/fillers')) return 'fillers';
  if (pathname.includes('/shape')) return 'bbl';
  if (pathname.includes('/botox') || pathname.includes('/trajecten')) return 'botox';
  return 'other';
}

export default function ConsultTrigger({ children, className, from }: ConsultTriggerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { addItem, count } = useCart();

  const handleConsult = (e: React.MouseEvent) => {
    e.preventDefault();
    const source = from ?? subjectFromPath(pathname);

    // If cart is empty, add a general consultation item based on the source
    if (count === 0) {
      if (source === 'botox') {
        addItem({ id: 'consult:botox', type: 'botox', nameKey: 'first-consult', namespace: 'consult_plan', priceCents: 0 });
      } else if (source === 'fillers') {
        addItem({ id: 'consult:fillers', type: 'fillers', nameKey: 'first-consult', namespace: 'consult_plan', priceCents: 0 });
      } else if (source === 'bbl') {
        addItem({ id: 'consult:bbl', type: 'shape', nameKey: 'first-consult', namespace: 'consult_plan', priceCents: 0 });
      } else {
        addItem({ id: 'consult:general', type: 'consult', nameKey: 'first-consult', namespace: 'consult_plan', priceCents: 0 });
      }
    }

    router.push('/checkout');
  };

  return (
    <button onClick={handleConsult} className={className}>
      {children}
    </button>
  );
}
