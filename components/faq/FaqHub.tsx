'use client';

import { useMemo, useState } from 'react';
import { Search, Sparkles, ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { getFaqItems, type Locale, type FaqItem } from '@/lib/clinic-data';

const topicLabels: Record<Locale, Record<FaqItem['topic'], string>> = {
  nl: {
    botox: 'Botox',
    fillers: 'Fillers',
    weightloss: 'Medisch gewichtsverlies',
    buttlift: 'Bilfiller',
  },
  en: {
    botox: 'Botox',
    fillers: 'Fillers',
    weightloss: 'Medical weight loss',
    buttlift: 'Butt filler',
  },
};

export default function FaqHub({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<'all' | FaqItem['topic']>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [assistantQuestion, setAssistantQuestion] = useState('');

  const allItems = useMemo(() => getFaqItems(locale), [locale]);

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      const matchesTopic = topic === 'all' || item.topic === topic;
      const search = query.trim().toLowerCase();
      const matchesQuery =
        search.length === 0 ||
        item.question.toLowerCase().includes(search) ||
        item.answer.toLowerCase().includes(search);
      return matchesTopic && matchesQuery;
    });
  }, [allItems, query, topic]);

  const aiAnswer = useMemo(() => {
    if (!assistantQuestion.trim()) return null;
    const q = assistantQuestion.toLowerCase();
    const match = allItems.find(
      (item) => item.question.toLowerCase().includes(q) || q.split(' ').some((word) => item.question.toLowerCase().includes(word)),
    );
    return match ?? null;
  }, [assistantQuestion, allItems]);

  return (
    <section className="py-section-y bg-background-light">
      <Container>
        <SectionHeader
          label={locale === 'nl' ? 'FAQ HUB' : 'FAQ HUB'}
          title={locale === 'nl' ? 'Veelgestelde vragen (200 items)' : 'Frequently asked questions (200 items)'}
          subtitle={locale === 'nl' ? 'Zoek, filter en krijg direct een antwoord uit onze dataset.' : 'Search, filter, and get instant answers from our dataset.'}
        />

        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-8">
          <div className="rounded-md border border-primary/10 bg-white p-6">
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              <label className="relative flex-1">
                <Search className="w-4 h-4 text-secondary/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={locale === 'nl' ? 'Zoek in 200 FAQ-items…' : 'Search across 200 FAQ items…'}
                  className="w-full rounded-pill border border-secondary/20 pl-10 pr-4 py-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <select
                value={topic}
                onChange={(event) => setTopic(event.target.value as 'all' | FaqItem['topic'])}
                className="rounded-pill border border-secondary/20 px-4 py-3 text-sm outline-none focus:border-primary"
              >
                <option value="all">{locale === 'nl' ? 'Alle categorieën' : 'All categories'}</option>
                {(['botox', 'fillers', 'weightloss', 'buttlift'] as const).map((topicKey) => (
                  <option key={topicKey} value={topicKey}>
                    {topicLabels[locale][topicKey]}
                  </option>
                ))}
              </select>
            </div>

            <p className="font-sans text-xs uppercase tracking-[0.2em] text-secondary/60 mb-4">
              {locale === 'nl' ? `Resultaten: ${filtered.length}` : `Results: ${filtered.length}`}
            </p>

            <div className="space-y-3 max-h-[36rem] overflow-y-auto pr-1">
              {filtered.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <article key={item.id} className="border border-primary/10 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full flex items-center justify-between gap-3 text-left p-4"
                    >
                      <span className="font-sans text-sm text-secondary">{item.question}</span>
                      <ChevronDown className={`w-4 h-4 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen ? <p className="px-4 pb-4 text-sm text-secondary/75 leading-relaxed">{item.answer}</p> : null}
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="rounded-md border border-primary/15 bg-white p-6 h-fit">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-primary mb-2">AI Help</p>
            <h3 className="font-display text-3xl italic text-secondary mb-3">
              {locale === 'nl' ? 'Slim FAQ-assistent' : 'Smart FAQ assistant'}
            </h3>
            <p className="font-sans text-sm text-secondary/70 mb-4">
              {locale === 'nl'
                ? 'Mock-paneel: zoekt alleen in de lokale FAQ dataset (geen backend).'
                : 'Mock panel: answers only from local FAQ dataset (no backend).'}
            </p>

            <textarea
              value={assistantQuestion}
              onChange={(event) => setAssistantQuestion(event.target.value)}
              className="w-full min-h-28 rounded-2xl border border-secondary/20 p-3 text-sm outline-none focus:border-primary"
              placeholder={locale === 'nl' ? 'Stel uw vraag…' : 'Ask your question…'}
            />

            <div className="mt-4 rounded-2xl border border-primary/10 bg-background-light p-4">
              {aiAnswer ? (
                <div className="space-y-2">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {locale === 'nl' ? 'Best match' : 'Best match'}
                  </p>
                  <p className="font-sans text-sm text-secondary">{aiAnswer.question}</p>
                  <p className="font-sans text-sm text-secondary/75">{aiAnswer.answer}</p>
                </div>
              ) : (
                <p className="font-sans text-sm text-secondary/70">
                  {locale === 'nl'
                    ? 'Nog geen match. Typ een vraag over Botox, Fillers, Bilfiller of medisch gewichtsverlies.'
                    : 'No match yet. Ask about Botox, Fillers, Butt filler, or medical weight loss.'}
                </p>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
