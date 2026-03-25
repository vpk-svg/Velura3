'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Loader2, PlusCircle } from 'lucide-react';

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

    const baseStyles = "w-full py-5 rounded-full font-label text-[11px] tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center relative overflow-hidden font-bold";
    const variantStyles = {
        primary: "bg-primary text-white shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95",
        ghost: "bg-transparent border border-primary text-primary hover:bg-primary/5 active:scale-95",
    };

    return (
        <div className="w-full">
            <motion.button
                onClick={handleCheckout}
                disabled={isLoading}
                className={`${baseStyles} ${variantStyles[variant]}`}
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-3" />
                ) : (
                    <PlusCircle className="w-5 h-5 mr-3 transition-transform group-hover:rotate-90" />
                )}
                <span>{isLoading ? t('loading') : label}</span>
            </motion.button>
            {error && (
                <p className="mt-4 text-red-500 text-[10px] text-center font-sans tracking-[0.1em] font-bold uppercase">
                    {error}
                </p>
            )}
        </div>
    );
}
