'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingBag, Trash2, ArrowLeft, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import Container from '@/components/ui/Container';
import { useCart, type CartItem } from '@/lib/cart-context';
import { EASE_PREMIUM } from '@/lib/motion';
import { Link } from '@/lib/navigation';

/** Translate item name safely */
function ItemName({ item }: { item: CartItem }) {
    const t = useTranslations(item.namespace);
    try {
        return <>{t(item.nameKey)}</>;
    } catch {
        return <>{item.nameKey}</>;
    }
}

/** Human-friendly labels per category */
const TYPE_LABELS: Record<string, Record<string, string>> = {
    nl: { botox: 'Botox', fillers: 'Fillers', shape: 'Body Contouring (BBL)', medicatie: 'Medicatie' },
    en: { botox: 'Botox', fillers: 'Fillers', shape: 'Body Contouring (BBL)', medicatie: 'Medication' },
};

export default function CheckoutPage() {
    const { items, removeItem, totalCents, count, clearAll } = useCart();
    const locale = useLocale();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const labels = TYPE_LABELS[locale] ?? TYPE_LABELS.nl;

    /* Group items by type */
    const grouped = items.reduce<Record<string, CartItem[]>>((acc, item) => {
        (acc[item.type] ??= []).push(item);
        return acc;
    }, {});

    const handleProceedToPayment = useCallback(() => {
        // Payment integration placeholder — for now just alert
        // In the future this will POST to /api/checkout with the cart items
        alert(locale === 'nl'
            ? 'Betaling wordt binnenkort geactiveerd. Uw selectie is opgeslagen.'
            : 'Payment will be activated soon. Your selection has been saved.'
        );
    }, [locale]);

    if (!mounted) {
        return (
            <main className="min-h-screen bg-surface pt-32 pb-24">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 animate-pulse mx-auto" />
                    </div>
                </Container>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface pt-32 pb-24">
            <Container>
                <div className="max-w-3xl mx-auto">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-secondary/50 hover:text-primary transition-colors mb-10 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        {locale === 'nl' ? 'Terug naar home' : 'Back to home'}
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                        className="mb-12"
                    >
                        <span className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-4 block font-semibold">
                            {locale === 'nl' ? 'UW SELECTIE' : 'YOUR SELECTION'}
                        </span>
                        <h1 className="font-display text-display-lg text-secondary mb-3">
                            {locale === 'nl' ? 'Checkout' : 'Checkout'}
                        </h1>
                        <p className="font-sans text-secondary/60 font-light text-lg">
                            {locale === 'nl'
                                ? 'Bekijk uw geselecteerde behandelingen en producten voordat u verdergaat.'
                                : 'Review your selected treatments and products before proceeding.'}
                        </p>
                    </motion.div>

                    {count === 0 ? (
                        /* Empty Cart State */
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 rounded-full bg-secondary/5 flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag size={32} className="text-secondary/20" />
                            </div>
                            <h2 className="font-display text-2xl text-secondary mb-3">
                                {locale === 'nl' ? 'Uw winkelmand is leeg' : 'Your cart is empty'}
                            </h2>
                            <p className="font-sans text-secondary/50 font-light mb-8">
                                {locale === 'nl'
                                    ? 'Selecteer behandelingen op onze pagina\'s om te beginnen.'
                                    : 'Select treatments from our pages to get started.'}
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-[11px] tracking-[0.25em] border border-secondary/20 text-secondary hover:border-primary hover:text-primary transition-all duration-300"
                            >
                                {locale === 'nl' ? 'Bekijk behandelingen' : 'View treatments'}
                            </Link>
                        </motion.div>
                    ) : (
                        /* Cart with items */
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left column: Items */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
                                className="lg:col-span-2"
                            >
                                {Object.entries(grouped).map(([type, typeItems], gi) => (
                                    <div key={type} className={gi > 0 ? 'mt-8' : ''}>
                                        <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-primary font-bold mb-4 flex items-center gap-2">
                                            <span className="w-5 h-px bg-primary/30" />
                                            {labels[type] ?? type}
                                        </h2>

                                        <div className="space-y-3">
                                            <AnimatePresence mode="popLayout">
                                                {typeItems.map((item) => (
                                                    <motion.div
                                                        key={item.id}
                                                        layout
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 20, height: 0 }}
                                                        transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                                                        className="bg-white rounded-xl border border-secondary/5 p-5 shadow-soft-sm hover:shadow-soft-md transition-shadow duration-300 flex items-center justify-between gap-4"
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-display text-lg text-secondary italic mb-1 truncate">
                                                                <ItemName item={item} />
                                                            </h3>
                                                            {item.quantity > 1 && (
                                                                <span className="font-sans text-xs text-secondary/40">
                                                                    ×{item.quantity}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-4 shrink-0">
                                                            <span className="font-display text-xl text-primary font-semibold">
                                                                €{((item.priceCents * item.quantity) / 100).toLocaleString()}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeItem(item.id)}
                                                                className="w-9 h-9 rounded-full border border-secondary/10 flex items-center justify-center text-secondary/30 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all duration-200 cursor-pointer"
                                                                aria-label="Verwijder"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                ))}

                                {/* Clear cart link */}
                                <button
                                    type="button"
                                    onClick={clearAll}
                                    className="mt-6 font-sans text-xs uppercase tracking-[0.15em] text-secondary/30 hover:text-rose-500 transition-colors cursor-pointer"
                                >
                                    {locale === 'nl' ? 'Alles verwijderen' : 'Clear all'}
                                </button>
                            </motion.div>

                            {/* Right column: Summary */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: EASE_PREMIUM }}
                                className="lg:col-span-1"
                            >
                                <div className="sticky top-32 bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-soft-lg">
                                    {/* Summary header */}
                                    <div className="px-6 py-5 border-b border-secondary/5 bg-primary/[0.02]">
                                        <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary/60 font-semibold">
                                            {locale === 'nl' ? 'Overzicht' : 'Summary'}
                                        </h3>
                                    </div>

                                    {/* Line items summary */}
                                    <div className="px-6 py-5 space-y-3 border-b border-secondary/5">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between text-sm">
                                                <span className="font-sans text-secondary/70 truncate pr-3">
                                                    <ItemName item={item} />
                                                </span>
                                                <span className="font-sans text-secondary font-medium shrink-0">
                                                    €{((item.priceCents * item.quantity) / 100).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total */}
                                    <div className="px-6 py-5 border-b border-primary/10">
                                        <div className="flex items-center justify-between">
                                            <span className="font-sans text-sm font-semibold text-secondary uppercase tracking-wider">
                                                {locale === 'nl' ? 'Totaal' : 'Total'}
                                            </span>
                                            <span className="font-display text-3xl text-primary font-semibold">
                                                €{(totalCents / 100).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="px-6 py-6 space-y-4">
                                        <button
                                            type="button"
                                            onClick={handleProceedToPayment}
                                            className="w-full inline-flex items-center justify-center gap-2 rounded-pill font-sans uppercase font-bold px-8 py-5 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97] cursor-pointer"
                                        >
                                            <CreditCard size={16} />
                                            {locale === 'nl' ? 'Afrekenen' : 'Proceed to payment'}
                                        </button>

                                        {/* Trust signals */}
                                        <div className="space-y-2.5 pt-2">
                                            <div className="flex items-center gap-2.5">
                                                <Lock size={12} className="text-primary/50" />
                                                <span className="font-sans text-[11px] text-secondary/40">
                                                    {locale === 'nl' ? 'Beveiligde betaling via Stripe' : 'Secure payment via Stripe'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <ShieldCheck size={12} className="text-primary/50" />
                                                <span className="font-sans text-[11px] text-secondary/40">
                                                    {locale === 'nl' ? 'BIG-geregistreerde artsen' : 'Registered physicians'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </Container>
        </main>
    );
}
