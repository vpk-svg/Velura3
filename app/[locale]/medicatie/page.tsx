'use client';

import ProductShop from '@/components/ProductShop';
import FullWidthHeaderImage from '@/components/FullWidthHeaderImage';
import TrustPillars from '@/components/TrustPillars';
import PharmacyDisclaimer from '@/components/PharmacyDisclaimer';
import { useTranslations } from 'next-intl';

export default function ShopPage() {
  const t = useTranslations('shop');

  return (
    <main className="min-h-screen pt-20">
      <FullWidthHeaderImage />
      
      <div className="bg-background-light">
        <ProductShop />
      </div>

      <TrustPillars />
      
      <div className="py-20">
        <PharmacyDisclaimer />
      </div>
    </main>
  );
}
