'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
    productId: string;
    priceEur: number;
    productName: string;
    label: string;
    variant: 'primary' | 'ghost';
}

export default function CheckoutButton({
    productId,
    priceEur,
    productName,
    label,
    variant,
}: CheckoutButtonProps) {
    const t = useTranslations('checkout');
    const locale = useLocale();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    priceEur,
                    productName,
                    locale,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Checkout failed');
            }

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(t('error'));
        } finally {
            setIsLoading(false);
        }
    };

    const baseStyles = "w-full py-4 rounded-md font-label text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center relative overflow-hidden";
    const variants = {
        primary: "bg-brand-gold text-brand-teal-deep hover:bg-brand-gold-light",
        ghost: "bg-transparent border border-brand-teal-deep text-brand-teal-deep hover:bg-brand-teal-deep/5",
    };

    return (
        <div className="w-full">
            <motion.button
                onClick={handleCheckout}
                disabled={isLoading}
                whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(201,168,76,0.3)' }}
                whileTap={{ scale: 0.98 }}
                className={`${baseStyles} ${variants[variant]}`}
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                <span>{isLoading ? t('loading') : label}</span>
            </motion.button>
            {error && (
                <p className="mt-2 text-red-500 text-[10px] text-center font-sans tracking-wide">
                    {error}
                </p>
            )}
        </div>
    );
}
