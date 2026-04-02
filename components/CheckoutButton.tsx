'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Loader2, PlusCircle } from 'lucide-react';

interface CheckoutButtonProps {
    productId: string;
    label: string;
    variant: 'primary' | 'ghost';
}

export default function CheckoutButton({
    productId,
    label,
    variant,
}: CheckoutButtonProps) {
    const t = useTranslations('checkout');
    const locale = useLocale();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const lastClickRef = useRef(0);

    const handleCheckout = useCallback(async () => {
        // Debounce: prevent multiple clicks within 2s
        const now = Date.now();
        if (now - lastClickRef.current < 2000) return;
        lastClickRef.current = now;

        setIsLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    locale,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeout);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Checkout failed');
            }

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err: unknown) {
            clearTimeout(timeout);
            if (err instanceof DOMException && err.name === 'AbortError') {
                setError(t('timeout'));
            } else {
                console.error('Checkout error:', err);
                setError(t('error'));
            }
        } finally {
            setIsLoading(false);
        }
    }, [productId, locale, t]);

    const baseStyles = "w-full py-5 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center relative overflow-hidden font-semibold";
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
                <p className="mt-4 text-red-500 text-[10px] text-center font-sans tracking-[0.1em] font-semibold uppercase">
                    {error}
                </p>
            )}
        </div>
    );
}
