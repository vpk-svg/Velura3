'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  CircleHelp,
  Sparkles,
  ShoppingBag,
  User,
  Mail,
  Phone as PhoneIcon,
  Calendar as CalendarIcon,
  MessageSquare,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Container from '@/components/ui/Container';
import BookingSlotSelector from '@/components/booking/BookingSlotSelector';
import {
  getBotoxTreatments,
  getFillerTreatments,
  type Locale,
} from '@/lib/clinic-data';
import { useCart } from '@/lib/cart-context';
import { EASE_PREMIUM } from '@/lib/motion';
import { Link, useRouter } from '@/lib/navigation';

type Focus = 'weightloss' | 'botox' | 'fillers' | 'bbl' | 'other';

type Option = {
  id: string;
  label: string;
};

type OptionGroup = {
  id: string;
  title: string;
  subtitle: string;
  options: Option[];
};

function normalizeFocus(value: string | null): Focus {
  if (value === 'weightloss' || value === 'botox' || value === 'fillers' || value === 'bbl' || value === 'other') {
    return value;
  }
  return 'other';
}

export default function ConsultPlanPage() {
  const locale = useLocale() as Locale;
  const tShape = useTranslations('shape_page');
  const tConsult = useTranslations('consult_plan');
  const searchParams = useSearchParams();
  const { items, addItem, removeItem, count, totalCents } = useCart();
  const router = useRouter();

  const isNl = locale === 'nl';
  const focus = normalizeFocus(searchParams.get('focus'));

  /* ── State ───────────────────────────────────────────────── */
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showInterests, setShowInterests] = useState(false);
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

  /* ── Data ────────────────────────────────────────────────── */
  const botoxOptions = useMemo(
    () => getBotoxTreatments(locale).map((treatment) => ({ id: `botox:${treatment.id}`, label: treatment.name })),
    [locale],
  );

  const fillerOptions = useMemo(
    () => getFillerTreatments(locale).map((treatment) => ({ id: `fillers:${treatment.id}`, label: treatment.name })),
    [locale],
  );

  const shapeOptions = useMemo<Option[]>(
    () => [
      { id: 'shape:bbl-standard', label: tShape('treatment_bbl_variant_standard') },
      { id: 'shape:bbl-premium', label: tShape('treatment_bbl_variant_premium') },
      { id: 'shape:eyelid-upper', label: tShape('treatment_eyelid_variant_upper') },
      { id: 'shape:eyelid-lower', label: tShape('treatment_eyelid_variant_lower') },
      { id: 'shape:eyelid-both', label: tShape('treatment_eyelid_variant_both') },
      { id: 'shape:double-chin-injection', label: tShape('treatment_double_chin_variant_injection') },
      { id: 'shape:double-chin-lipo', label: tShape('treatment_double_chin_variant_lipo') },
    ],
    [tShape],
  );

  const weightlossOptions: Option[] = useMemo(
    () => [
      { id: 'weightloss:mounjaro', label: 'Mounjaro' },
      { id: 'weightloss:ozempic', label: 'Ozempic' },
      { id: 'weightloss:wegovy', label: 'Wegovy' },
      { id: 'weightloss:medical-screening', label: isNl ? 'Medische intake zonder medicijnkeuze' : 'Medical intake without product choice' },
    ],
    [isNl],
  );

  const otherOptions: Option[] = useMemo(
    () => [
      { id: 'other:anti-aging-plan', label: isNl ? 'Algemeen anti-aging advies' : 'General anti-aging advisory' },
      { id: 'other:combination-treatment', label: isNl ? 'Combinatiebehandeling bespreken' : 'Discuss a combination treatment' },
      { id: 'other:first-consult', label: isNl ? 'Eerste consult, nog geen voorkeur' : 'First consult, no preference yet' },
    ],
    [isNl],
  );

  const groups = useMemo<OptionGroup[]>(
    () => [
      {
        id: 'weightloss',
        title: isNl ? 'Weightloss' : 'Weight Loss',
        subtitle: isNl ? 'Medische begeleiding en medicatie' : 'Medical guidance and medication',
        options: weightlossOptions,
      },
      {
        id: 'botox',
        title: 'Botox',
        subtitle: isNl ? 'Rimpel- en spierontspanning' : 'Wrinkle and muscle relaxation',
        options: botoxOptions,
      },
      {
        id: 'fillers',
        title: 'Fillers',
        subtitle: isNl ? 'Volumeherstel en contour' : 'Volume restoration and contour',
        options: fillerOptions,
      },
      {
        id: 'bbl',
        title: 'BBL / Shape',
        subtitle: isNl ? 'Body contouring behandelingen' : 'Body contouring procedures',
        options: shapeOptions,
      },
      {
        id: 'other',
        title: isNl ? 'Overig' : 'Other',
        subtitle: isNl ? 'Ik wil eerst advies' : 'I want advice first',
        options: otherOptions,
      },
    ],
    [botoxOptions, fillerOptions, isNl, otherOptions, shapeOptions, weightlossOptions],
  );

  /* ── Initial Selection ───────────────────────────────────── */
  useEffect(() => {
    if (focus === 'other') return;
    const defaultGroup = groups.find((group) => group.id === focus);
    if (!defaultGroup || defaultGroup.options.length === 0) return;

    setSelectedIds((prev) => {
      if (prev.length > 0) return prev;
      return [defaultGroup.options[0].id];
    });
  }, [focus, groups]);

  /* ── Computed ────────────────────────────────────────────── */
  const selectedNames = useMemo(() => {
    const dict = new Map<string, string>();
    groups.forEach((group) => {
      group.options.forEach((option) => dict.set(option.id, option.label));
    });
    return selectedIds.map((id) => dict.get(id)).filter(Boolean) as string[];
  }, [groups, selectedIds]);

  const summaryLabel = selectedNames.length > 0
    ? selectedNames.join(', ')
    : items.length > 0
      ? items.map(i => i.nameKey).join(', ') // Simplification for display
      : (isNl ? 'Uw consultkeuze' : 'Your consultation choice');

  /* ── Handlers ────────────────────────────────────────────── */
  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.birthDate) {
      alert(locale === 'nl' ? 'Vul alstublieft alle verplichte velden in.' : 'Please fill in all required fields.');
      return;
    }

    if (!selectedSlot) {
      alert(locale === 'nl' ? 'Selecteer alstublieft een tijdslot.' : 'Please select a time slot.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);

    // Redirect to contact success or similar
    const qs = new URLSearchParams();
    qs.set('firstName', formData.firstName);
    router.push(`/${locale}/contact?success=1`);
  }, [formData, selectedSlot, locale, router]);

  const hasSelection = selectedIds.length > 0 || items.length > 0;

  return (
    <main className="min-h-screen bg-surface pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/consult"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-secondary/50 hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {isNl ? 'Terug naar keuze' : 'Back to selection'}
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="mb-12"
          >
            <span className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-4 block font-semibold">
              {isNl ? 'GRATIS CONSULT - STAP 2 VAN 2' : 'FREE CONSULTATION - STEP 2 OF 2'}
            </span>
            <h1 className="font-display text-display-lg text-secondary mb-3 italic">
              {isNl ? 'Consult Plannen' : 'Schedule Consultation'}
            </h1>
            <p className="font-sans text-secondary/60 font-light text-lg">
              {isNl
                ? 'Vul uw gegevens in en kies een moment voor uw vrijblijvende intake.'
                : 'Enter your details and choose a moment for your no-obligation intake.'}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Summary & Form */}
            <div className="lg:col-span-8 space-y-8">

              {/* Interests Summary / Selection Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
                className="bg-white rounded-2xl border border-secondary/5 p-6 shadow-soft-sm overflow-hidden"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-primary font-bold flex items-center gap-2">
                    <Sparkles size={14} />
                    {isNl ? 'GEKOZEN INTERESSE(S)' : 'SELECTED INTERESTS'}
                  </h2>
                  <button
                    onClick={() => setShowInterests(!showInterests)}
                    className="text-secondary/40 hover:text-primary transition-colors flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-widest font-bold"
                  >
                    {showInterests ? (isNl ? 'Verbergen' : 'Hide') : (isNl ? 'Aanpassen' : 'Adjust')}
                    {showInterests ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                {!showInterests ? (
                  <div className="flex flex-wrap gap-2">
                    {items.length > 0 ? (
                      items.map(item => (
                        <span key={item.id} className="bg-primary/5 text-primary px-3 py-1.5 rounded-pill font-sans text-[11px] font-bold uppercase tracking-wider">
                          {item.nameKey}
                        </span>
                      ))
                    ) : selectedIds.length > 0 ? (
                      selectedNames.map(name => (
                        <span key={name} className="bg-primary/5 text-primary px-3 py-1.5 rounded-pill font-sans text-[11px] font-bold uppercase tracking-wider">
                          {name}
                        </span>
                      ))
                    ) : (
                      <span className="text-secondary/30 italic font-sans text-sm">
                        {isNl ? 'Nog geen keuze gemaakt selecteer onder aanpassen' : 'No selection made, adjust to select'}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6 mt-6">
                    {groups.map((group) => (
                      <article key={group.id} className="rounded-xl border border-secondary/5 bg-surface p-5">
                        <h3 className="font-display text-xl text-secondary mb-1 italic">{group.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                          {group.options.map((option) => {
                            const active = selectedIds.includes(option.id);
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => toggleOption(option.id)}
                                className={`text-left rounded-lg border px-3 py-2.5 transition-all duration-200 font-sans text-[11px] uppercase tracking-widest font-bold ${active
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-secondary/5 bg-white text-secondary/50 hover:border-primary/30'
                                  }`}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </article>
                    ))}
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
                      {isNl ? 'Uw Gegevens' : 'Your Details'}
                    </h2>
                    <p className="font-sans text-xs text-secondary/40 uppercase tracking-widest font-semibold">
                      {isNl ? 'Stap 1: Contactgegevens' : 'Step 1: Contact information'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">{tShape('form_first_name')} *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      className="w-full bg-surface border-0 rounded-xl px-5 py-4 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Sarah"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">{tShape('form_last_name')} *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      className="w-full bg-surface border-0 rounded-xl px-5 py-4 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Jansen"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">{tShape('form_email')} *</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full bg-surface border-0 rounded-xl px-5 py-4 pl-12 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="sarah@voorbeeld.nl"
                        required
                      />
                      <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">{tShape('form_phone')} *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full bg-surface border-0 rounded-xl px-5 py-4 pl-12 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="06 12345678"
                        required
                      />
                      <PhoneIcon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                    </div>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">{tShape('form_birth_date')} *</label>
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
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-sans text-[10px] uppercase tracking-widest text-secondary/60 font-bold ml-1">{tShape('form_notes')}</label>
                    <div className="relative">
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full bg-surface border-0 rounded-xl px-5 py-4 pl-12 font-sans text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        placeholder={isNl ? 'Zijn er bijzonderheden?' : 'Any specific details?'}
                      />
                      <MessageSquare size={16} className="absolute left-5 top-6 text-secondary/20" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Slot Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE_PREMIUM }}
              >
                <div className="flex items-center gap-3 mb-6 ml-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CalendarIcon size={20} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-secondary italic leading-none mb-1">
                      {isNl ? 'Kies een moment' : 'Choose a moment'}
                    </h2>
                    <p className="font-sans text-xs text-secondary/40 uppercase tracking-widest font-semibold">
                      {isNl ? 'Stap 2: Datum & Tijd' : 'Step 2: Date & Time'}
                    </p>
                  </div>
                </div>
                <BookingSlotSelector
                  locale={locale}
                  treatmentName={summaryLabel}
                  onSlotSelect={setSelectedSlot}
                />
              </motion.div>
            </div>

            {/* Right Side: Sticky Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE_PREMIUM }}
                className="bg-white rounded-3xl border border-primary/10 overflow-hidden shadow-soft-xl"
              >
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-secondary/5">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-secondary/40 font-bold block mb-2">{isNl ? 'UW SELECTIE' : 'YOUR SELECTION'}</span>
                      <p className="font-display text-lg text-secondary italic leading-tight">
                        {summaryLabel}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-sans text-sm uppercase tracking-[0.2em] text-secondary font-bold">Prijs</span>
                      <span className="font-display text-2xl text-primary font-bold">{isNl ? 'Gratis' : 'Free'}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !hasSelection}
                    className="w-full relative group overflow-hidden rounded-pill bg-primary px-8 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-gold-glow transition-all duration-300 hover:shadow-soft-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Sparkles size={16} />
                      )}
                      {isNl ? 'Consult Bevestigen' : 'Confirm Consultation'}
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <div className="space-y-4 pt-4 border-t border-secondary/5">
                    <p className="font-sans text-[10px] text-secondary/40 leading-relaxed italic">
                      {isNl
                        ? '* Uw aanvraag is vrijblijvend. We nemen contact met u op voor een definitieve bevestiging.'
                        : '* Your request is non-binding. We will contact you for a final confirmation.'}
                    </p>
                  </div>
                </div>

                {/* Bottom aesthetic footer */}
                <div className="bg-primary/5 px-8 py-4 text-center">
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-primary/60 font-bold">
                    {isNl ? 'OFFICIËLE FAB CLINIC INTAKE' : 'OFFICIAL FAB CLINIC INTAKE'}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
