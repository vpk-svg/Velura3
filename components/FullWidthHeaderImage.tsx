'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import PageHero from './PageHero';

export default function FullWidthHeaderImage() {
    const t = useTranslations('cinematic');
    const locale = useLocale();

    return (
        <PageHero
            align="center"
            sectionBgClassName="bg-background-light"
            className="bg-background-light"
            minHeightClassName="min-h-[75vh] md:min-h-screen"
            backgroundImageSrc="/images/hero-atmos.webp"
            backgroundImageAlt="FAB Clinic"
            backgroundImageClassName="object-cover opacity-40 grayscale-[0.05]"
            label={
                <>
                    {t('label')}
                    <div className="h-px w-16 bg-primary/30" />
                </>
            }
            title={<span className="font-display text-primary">{t('title1')} {t('title2')}</span>}
            description={t('hero_subtitle')}
            descriptionClassName="text-primary/70"
            actions={
                <>
                    <Link
                        href={`/${locale}/behandelingen`}
                        className="btn-primary inline-flex items-center justify-center gap-3 px-12 py-5"
                    >
                        {t('cta_treatments')}
                    </Link>
                    <Link
                        href={`/${locale}/trajecten`}
                        className="btn-ghost inline-flex items-center justify-center gap-3 px-12 py-5"
                    >
                        {t('explore')}
                    </Link>
                </>
            }
            bottomDecoration={
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-light">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
                </div>
            }
        />
    );
}
