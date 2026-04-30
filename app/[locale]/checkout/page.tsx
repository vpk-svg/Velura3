'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingBag, Trash2, ArrowLeft, ShieldCheck, Lock, CreditCard, User, Mail, Phone as PhoneIcon, Calendar as CalendarIcon, MessageSquare } from 'lucide-react';
import Container from '@/components/ui/Container';
import { useCart, type CartItem } from '@/lib/cart-context';
import { EASE_PREMIUM } from '@/lib/motion';
import { Link } from '@/lib/navigation';
import BookingSlotSelector from '@/components/booking/BookingSlotSelector';

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
    const locale = useLocale() as 'nl' | 'en';
    const tForm = useTranslations('shape_page'); // Using existing form translations
    const [mounted, setMounted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        notes: '',
    });
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => setMounted(true), []);

    const labels = TYPE_LABELS[locale] ?? TYPE_LABELS.nl;

    /* Group items by type */
    const grouped = items.reduce<Record<string, CartItem[]>>((acc, item) => {
        (acc[item.type] ??= []).push(item);
        return acc;
    }, {});

    const treatmentDisplayNames = items.map(item => item.nameKey).join(', ');

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProceedToPayment = useCallback(async () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.birthDate) {
            alert(locale === 'nl' ? 'Vul alstublieft alle verplichte velden in.' : 'Please fill in all required fields.');
            return;
        }

        if (!selectedSlot) {
            alert(locale === 'nl' ? 'Selecteer alstublieft een tijdslot op zaterdag.' : 'Please select a Saturday time slot.');
            const slotEl = document.getElementById('slot-selector');
            slotEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setIsSubmitting(true);

        try {
            // Integration with Stripe session creation
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'payment', // Defaulting to payment for now
                    locale,
                    treatmentType: 'Multi-Treatment Booking',
                    zones: items.map(item => ({
                        id: item.id,
                        name: item.nameKey, // Ideally translated
                        priceCents: item.priceCents * item.quantity
                    })),
                    customerDetails: formData,
                    bookingSlot: selectedSlot
                })
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Failed to create checkout session');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert(locale === 'nl' ? 'Er is een fout opgetreden. Probeer het opnieuw.' : 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, selectedSlot, items, locale]);

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
                <div className="max-w-4xl mx-auto">
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
                            {locale === 'nl' ? 'VOLTOOI UW BOEKING' : 'COMPLETE YOUR BOOKING'}
                        </span>
                        <h1 className="font-display text-display-lg text-secondary mb-3 italic">
                            {totalCents === 0
                                ? (locale === 'nl' ? 'Consult Bevestigen' : 'Confirm Consult')
                                : (locale === 'nl' ? 'Checkout' : 'Checkout')}
                        </h1>
                        <p className="font-sans text-secondary/60 font-light text-lg">
                            {locale === 'nl'
                                ? 'Vul uw gegevens in en kies een moment voor uw behandeling.'
                                : 'Enter your details and choose a moment for your treatment.'}
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
                        /* Multi-column layout */
                        <div className="grid lg:grid-cols-12 gap-8 items-start">
                            {/* Left Side: Form & Items */}
                            <div className="lg:col-span-8 space-y-8">
                                {/* Items Review Sidebar (Mobile-style but on left) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
                                    className="bg-white rounded-2xl border border-secondary/5 p-6 shadow-soft-sm overflow-hidden"
                                >
                                    <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-primary font-bold mb-6 flex items-center gap-2">
                                        <ShoppingBag size={14} />
                                        {totalCents === 0
                                            ? (locale === 'nl' ? 'GEKOZEN CONSULT' : 'CHOSEN CONSULT')
                                            : (locale === 'nl' ? 'GEKOZEN BEHANDELINGEN' : 'SELECTED TREATMENTS')}
                                    </h2>

                                    <div className="space-y-4">
                                        {Object.entries(grouped).map(([type, typeItems]) => (
                                            <div key={type} className="border-b border-secondary/5 pb-4 last:border-0 last:pb-0">
                                                <div className="flex items-center justify-between gap-4 mb-3">
                                                    {typeItems.map((item) => (
                                                        <div key={item.id} className="flex-1 flex items-center justify-between gap-4">
                                                            <div className="min-w-0">
                                                                <h3 className="font-display text-base text-secondary italic">
                                                                    <ItemName item={item} />
                                                                </h3>
                                                                <span className="font-sans text-[10px] text-primary/60 uppercase tracking-widest leading-none">
                                                                    {labels[type]}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                {Number(item.priceCents) !== 0 && (
                                                                    <span className="font-sans text-sm font-medium text-secondary">
                                                                        {`€${(Number(item.priceCents) / 100).toLocaleString()}`}
                                                                    </span>
                                                                )}
                                                                <button
                                                                    onClick={() => removeItem(item.id)}
                                                                    className="text-secondary/20 hover:text-rose-500 transition-colors"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {totalCents > 0 && (
                                        <div className="mt-4 pt-4 border-t border-secondary/5 flex justify-between items-center">
                                            <span className="font-sans text-xs uppercase tracking-widest text-secondary/40 font-semibold">Totaal</span>
                                            <span className="font-display text-xl text-primary font-bold">{`€${(totalCents / 100).toLocaleString()}`}</span>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Personal Data Form */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: EASE_PREMIUM }}
                                    className="bg-white rounded-2xl border border-secondary/5 p-8 shadow-soft-sm"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h2 className="font-display text-2xl text-secondary italic leading-none mb-1">
                                                {tForm('form_title')}
                                            </h2>
                                            <p className="font-sans text-xs text-secondary/40 uppercase tracking-widest font-semibold">
                                                {locale === 'nl' ? 'Stap 1: Persoonlijke gegevens' : 'Step 1: Personal details'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* First Name */}
                                        <div className="space-y-1.5">
                                            <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">
                                                {tForm('form_first_name')} *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleFormChange}
                                                    className="w-full bg-surface border-0 rounded-xl px-5 py-4 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-secondary/20"
                                                    placeholder="Sarah"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Last Name */}
                                        <div className="space-y-1.5">
                                            <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">
                                                {tForm('form_last_name')} *
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleFormChange}
                                                className="w-full bg-surface border-0 rounded-xl px-5 py-4 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-secondary/20"
                                                placeholder="Jansen"
                                                required
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1.5">
                                            <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">
                                                {tForm('form_email')} *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleFormChange}
                                                    className="w-full bg-surface border-0 rounded-xl px-5 py-4 pl-12 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-secondary/20"
                                                    placeholder="sarah@voorbeeld.nl"
                                                    required
                                                />
                                                <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-1.5">
                                            <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">
                                                {tForm('form_phone')} *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleFormChange}
                                                    className="w-full bg-surface border-0 rounded-xl px-5 py-4 pl-12 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-secondary/20"
                                                    placeholder="06 12345678"
                                                    required
                                                />
                                                <PhoneIcon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                                            </div>
                                        </div>

                                        {/* Birthday */}
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">
                                                {tForm('form_birth_date')} *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    name="birthDate"
                                                    value={formData.birthDate}
                                                    onChange={handleFormChange}
                                                    className="w-full bg-surface border-0 rounded-xl px-5 py-4 pl-12 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all text-secondary"
                                                    required
                                                />
                                                <CalendarIcon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">
                                                {tForm('form_notes')}
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    name="notes"
                                                    value={formData.notes}
                                                    onChange={handleFormChange}
                                                    rows={3}
                                                    className="w-full bg-surface border-0 rounded-xl px-5 py-4 pl-12 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-secondary/20 resize-none"
                                                    placeholder={locale === 'nl' ? 'Heeft u specifieke wensen of vragen?' : 'Do you have specific wishes or questions?'}
                                                />
                                                <MessageSquare size={16} className="absolute left-5 top-6 text-secondary/20" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Date Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3, ease: EASE_PREMIUM }}
                                    id="slot-selector"
                                >
                                    <div className="flex items-center gap-3 mb-6 ml-2">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <CalendarIcon size={20} />
                                        </div>
                                        <div>
                                            <h2 className="font-display text-2xl text-secondary italic leading-none mb-1">
                                                {locale === 'nl' ? 'Kies een datum' : 'Choose a date'}
                                            </h2>
                                            <p className="font-sans text-xs text-secondary/40 uppercase tracking-widest font-semibold">
                                                {locale === 'nl' ? 'Stap 2: Plan uw behandeling' : 'Step 2: Schedule your treatment'}
                                            </p>
                                        </div>
                                    </div>

                                    <BookingSlotSelector
                                        locale={locale}
                                        treatmentName={treatmentDisplayNames}
                                        onSlotSelect={setSelectedSlot}
                                    />
                                </motion.div>
                            </div>

                            {/* Right Side: Sticky Checkout Widget */}
                            <div className="lg:col-span-4 lg:sticky lg:top-32">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4, ease: EASE_PREMIUM }}
                                    className="bg-white rounded-3xl border border-primary/10 overflow-hidden shadow-soft-xl"
                                >
                                    <div className="p-8 space-y-6">
                                        {totalCents > 0 && (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center pb-4 border-b border-secondary/5">
                                                    <span className="font-sans text-xs uppercase tracking-widest text-secondary/40 font-bold">Subtotaal</span>
                                                    <span className="font-sans text-lg text-secondary font-medium whitespace-nowrap">{`€${(totalCents / 100).toLocaleString()}`}</span>
                                                </div>
                                                <div className="flex justify-between items-center pt-2">
                                                    <span className="font-sans text-sm uppercase tracking-[0.2em] text-secondary font-bold">Totaal</span>
                                                    <span className="font-display text-4xl text-primary font-bold">{`€${(totalCents / 100).toLocaleString()}`}</span>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleProceedToPayment}
                                            disabled={isSubmitting}
                                            className="w-full relative group overflow-hidden rounded-pill bg-primary px-8 py-5 text-[11px] font-bold uppercase tracking-[0.3em] !text-white shadow-gold-glow transition-all duration-300 hover:shadow-soft-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                {isSubmitting ? (
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <CreditCard size={16} />
                                                )}
                                                {totalCents === 0
                                                    ? (locale === 'nl' ? 'Consult Bevestigen' : 'Confirm Consult')
                                                    : (locale === 'nl' ? 'Afrekenen' : 'Complete checkout')}
                                            </span>
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>

                                        <div className="space-y-4 pt-4">
                                            {totalCents > 0 && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                                                        <Lock size={14} className="text-primary/60" />
                                                    </div>
                                                    <p className="font-sans text-[11px] text-secondary/50 leading-tight">
                                                        {locale === 'nl'
                                                            ? 'Beveiligde betaling via Stripe. Uw gegevens zijn 100% veilig.'
                                                            : 'Secure payment via Stripe. Your data is 100% safe.'}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                                                    <ShieldCheck size={14} className="text-primary/60" />
                                                </div>
                                                <p className="font-sans text-[11px] text-secondary/50 leading-tight">
                                                    {locale === 'nl'
                                                        ? 'Directe bevestiging van uw gekozen tijdslot.'
                                                        : 'Instant confirmation of your chosen time slot.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom aesthetic footer on widget */}
                                    <div className="bg-primary/5 px-8 py-4 text-center">
                                        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-primary/60 font-bold">
                                            {locale === 'nl' ? 'OFFICIËLE FAB CLINIC BOEKING' : 'OFFICIAL FAB CLINIC BOOKING'}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </main>
    );
}
