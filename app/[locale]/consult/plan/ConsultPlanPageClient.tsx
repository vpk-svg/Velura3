'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Check, CircleHelp, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import BookingSlotSelector from '@/components/booking/BookingSlotSelector';
import {
  getBotoxTreatments,
  getFillerTreatments,
  type Locale,
} from '@/lib/clinic-data';

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
  const searchParams = useSearchParams();

  const isNl = locale === 'nl';
  const focus = normalizeFocus(searchParams.get('focus'));

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

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (focus === 'other') return;

    const defaultGroup = groups.find((group) => group.id === focus);
    if (!defaultGroup || defaultGroup.options.length === 0) return;

    setSelectedIds((prev) => {
      if (prev.length > 0) return prev;
      return [defaultGroup.options[0].id];
    });
  }, [focus, groups]);

  const selectedNames = useMemo(() => {
    const dict = new Map<string, string>();
    groups.forEach((group) => {
      group.options.forEach((option) => dict.set(option.id, option.label));
    });
    return selectedIds.map((id) => dict.get(id)).filter(Boolean) as string[];
  }, [groups, selectedIds]);

  const summaryLabel = selectedNames.length > 0
    ? selectedNames.slice(0, 3).join(' + ')
    : (isNl ? 'Uw consultkeuze' : 'Your consultation choice');

  const contactHref = useMemo(() => {
    const qs = new URLSearchParams();
    qs.set('source', 'consult-planning');
    qs.set('interests', selectedIds.join(','));
    return `/${locale}/contact?${qs.toString()}`;
  }, [locale, selectedIds]);

  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="min-h-screen bg-background-light pt-36 pb-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-primary/15 bg-white shadow-soft-xl p-6 md:p-10 mb-8">
            <p className="font-sans text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              {isNl ? 'Gratis consult - stap 2 van 2' : 'Free consultation - step 2 of 2'}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-secondary mb-4 leading-tight">
              {isNl ? 'Kies uw behandeling(en) en plan uw consult' : 'Choose your treatment(s) and plan your consultation'}
            </h1>
            <p className="font-sans text-secondary/70 text-lg leading-relaxed max-w-3xl">
              {isNl
                ? 'Selecteer eerst minstens 1 behandeling. Daarna kiest u eenvoudig een geschikt tijdslot.'
                : 'First select at least one treatment. Then choose a suitable time slot with ease.'}
            </p>
          </div>

          <div className="rounded-3xl border border-primary/12 bg-white p-6 md:p-8 shadow-soft-lg mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="font-display text-3xl text-secondary">
                {isNl ? '1. Selecteer uw interesse(s)' : '1. Select your interests'}
              </h2>
            </div>

            <div className="space-y-6">
              {groups.map((group) => (
                <article key={group.id} className="rounded-2xl border border-primary/10 bg-background-light p-5 md:p-6">
                  <h3 className="font-display text-2xl text-secondary mb-1">{group.title}</h3>
                  <p className="font-sans text-sm text-secondary/60 mb-4">{group.subtitle}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {group.options.map((option) => {
                      const active = selectedIds.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => toggleOption(option.id)}
                          className={`text-left rounded-xl border px-4 py-4 transition-all duration-250 font-sans text-sm leading-relaxed ${active
                              ? 'border-primary bg-primary/10 text-secondary shadow-soft-sm'
                              : 'border-secondary/15 bg-white text-secondary/75 hover:border-primary/40'
                            }`}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span>{option.label}</span>
                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${active ? 'border-primary bg-primary text-white' : 'border-secondary/25'}`}>
                              {active ? <Check size={13} /> : null}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>

            {selectedIds.length === 0 && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-700 font-sans text-sm">
                <CircleHelp size={16} />
                {isNl ? 'Kies minimaal 1 behandeling om verder te gaan.' : 'Choose at least one treatment to continue.'}
              </div>
            )}
          </div>

          {selectedIds.length > 0 && (
            <div className="space-y-8">
              <div className="rounded-3xl border border-primary/12 bg-white p-6 md:p-8 shadow-soft-lg">
                <h2 className="font-display text-3xl text-secondary mb-3">
                  {isNl ? '2. Kies uw datum en tijd' : '2. Choose your date and time'}
                </h2>
                <p className="font-sans text-secondary/65 mb-6">
                  {isNl ? 'Geselecteerde richting:' : 'Selected direction:'} <span className="font-semibold text-secondary">{summaryLabel}</span>
                </p>
                <BookingSlotSelector locale={locale} treatmentName={summaryLabel} />
              </div>

              <div className="rounded-3xl border border-primary/12 bg-white p-6 md:p-8 shadow-soft-lg">
                <h2 className="font-display text-3xl text-secondary mb-3">
                  {isNl ? '3. Rond uw consultaanvraag af' : '3. Finalize your consultation request'}
                </h2>
                <p className="font-sans text-secondary/65 mb-6">
                  {isNl
                    ? 'Ga verder naar contact om uw gegevens in te vullen. Uw gekozen interesses nemen we mee.'
                    : 'Continue to contact to complete your details. Your selected interests are included.'}
                </p>
                <a
                  href={contactHref}
                  className="inline-flex items-center justify-center rounded-pill px-8 py-4 font-sans text-sm uppercase tracking-[0.16em] font-bold bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300"
                >
                  {isNl ? 'Verder naar contact' : 'Continue to contact'}
                </a>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
