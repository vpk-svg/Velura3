import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Mail, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;

    const title =
        locale === 'nl'
            ? 'Klachtenprocedure | FAB Clinic'
            : 'Complaints Procedure | FAB Clinic';
    const description =
        locale === 'nl'
            ? 'Wij nemen uw klacht serieus. Lees hier onze klachtenprocedure en hoe u contact met ons kunt opnemen voor een snelle oplossing.'
            : 'We take your complaint seriously. Read our complaints procedure here and learn how to contact us for a swift resolution.';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: '/images/hero-atmos.webp', width: 1200, height: 630, alt: title }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/images/hero-atmos.webp'],
        },
        alternates: {
            canonical: `/${locale}/klachten`,
        },
    };
}

export default async function KlachtenPage({ params }: PageProps) {
    const { locale } = await params;
    const isNl = locale === 'nl';

    return (
        <section className="min-h-screen bg-background-light pt-36 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <span className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-4 block font-semibold">
                        {isNl ? 'FAB CLINIC' : 'FAB CLINIC'}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-display text-secondary mb-6">
                        {isNl ? 'Klachtenprocedure' : 'Complaints Procedure'}
                    </h1>
                    <p className="font-sans font-light text-secondary/70 text-lg max-w-2xl mx-auto">
                        {isNl
                            ? 'Wij streven naar de hoogste kwaliteit en service. Bent u toch niet tevreden? Laat het ons weten, dan zoeken we samen naar de beste oplossing.'
                            : 'We strive for the highest quality and service. Are you not satisfied? Let us know, and we will find the best solution together.'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft-xl border border-primary/10">
                    <div className="prose prose-lg max-w-none text-secondary/80">

                        <h2 className="text-2xl font-display text-secondary flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                            {isNl ? 'Meld Uw Klacht' : 'Report Your Complaint'}
                        </h2>
                        <p>
                            {isNl
                                ? 'Neem zo snel mogelijk contact met ons op via e-mail, WhatsApp of brief.'
                                : 'Please contact us as soon as possible via e-mail, WhatsApp or letter.'}
                        </p>

                        <h2 className="text-2xl font-display text-secondary flex items-center gap-3 mt-10">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                            {isNl ? 'Wij Nemen Contact Op' : 'We Will Contact You'}
                        </h2>
                        <p>
                            {isNl
                                ? 'Binnen 3 werkdagen ontvangt u een bevestiging en nemen we contact met u op om de situatie te bespreken.'
                                : 'Within 3 working days you will receive a confirmation and we will contact you to discuss the situation.'}
                        </p>

                        <h2 className="text-2xl font-display text-secondary flex items-center gap-3 mt-10">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
                            {isNl ? 'Oplossing' : 'Resolution'}
                        </h2>
                        <p>
                            {isNl
                                ? 'We streven ernaar om uw klacht binnen 14 dagen op te lossen en u volledig tevreden te stellen.'
                                : 'We aim to resolve your complaint within 14 days and to completely satisfy you.'}
                        </p>

                        <hr className="my-12 border-primary/10" />

                        <h2 className="text-3xl font-display text-secondary">
                            {isNl ? 'Waarom een klacht indienen?' : 'Why submit a complaint?'}
                        </h2>
                        <ul className="space-y-4 my-8 list-none pl-0">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                                <div><strong>{isNl ? 'Snelle oplossing:' : 'Swift resolution:'}</strong> {isNl ? 'Door direct contact op te nemen kunnen we snel reageren en een oplossing bieden.' : 'By contacting us directly, we can respond quickly and offer a solution.'}</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                                <div><strong>{isNl ? 'Verbetering:' : 'Improvement:'}</strong> {isNl ? 'Uw feedback helpt ons om onze dienstverlening te verbeteren.' : 'Your feedback helps us to improve our services.'}</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                                <div><strong>{isNl ? 'Transparantie:' : 'Transparency:'}</strong> {isNl ? 'We staan voor openheid en eerlijke communicatie.' : 'We stand for openness and honest communication.'}</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                                <div><strong>{isNl ? 'Persoonlijke aandacht:' : 'Personal attention:'}</strong> {isNl ? 'Elke klacht wordt serieus genomen en persoonlijk behandeld.' : 'Every complaint is taken seriously and handled personally.'}</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                                <div><strong>{isNl ? 'Veilige omgeving:' : 'Safe environment:'}</strong> {isNl ? 'Uw klacht wordt vertrouwelijk behandeld.' : 'Your complaint is treated confidentially.'}</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                                <div><strong>{isNl ? 'Geen consequenties:' : 'No consequences:'}</strong> {isNl ? 'Een klacht indienen heeft geen negatieve gevolgen voor uw behandeling of nazorg bij FAB Clinic.' : 'Submitting a complaint has no negative consequences for your treatment or aftercare at FAB Clinic.'}</div>
                            </li>
                        </ul>

                        <hr className="my-12 border-primary/10" />

                        <h2 className="text-3xl font-display text-secondary mb-8">
                            {isNl ? 'Direct Contact' : 'Direct Contact'}
                        </h2>
                        <p className="mb-8">
                            {isNl
                                ? 'Voor dringende zaken of als u liever direct contact heeft, kunt u ons via de volgende kanalen bereiken:'
                                : 'For urgent matters or if you prefer direct contact, you can reach us via the following channels:'}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <a href="mailto:info@fabclinic.nl" className="flex items-center gap-4 p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors group no-underline text-secondary">
                                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold mb-1">E-mail</div>
                                    <div className="text-sm opacity-70">info@fabclinic.nl</div>
                                </div>
                            </a>

                            <a href="/contact" className="flex items-center gap-4 p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors group no-underline text-secondary">
                                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold mb-1">WhatsApp / Contact</div>
                                    <div className="text-sm opacity-70">{isNl ? 'Navigeer naar contact' : 'Go to contact page'}</div>
                                </div>
                            </a>
                        </div>

                        <p className="text-sm opacity-70 italic mb-12">
                            {isNl
                                ? 'Let op: Uw gegevens worden vertrouwelijk behandeld conform onze privacyverklaring.'
                                : 'Note: Your data will be treated confidentially in accordance with our privacy policy.'}
                        </p>

                        <div className="bg-secondary/5 rounded-2xl p-8 border-l-4 border-primary">
                            <h3 className="font-display text-2xl mb-4 mt-0">
                                {isNl ? 'Niet tevreden met de oplossing?' : 'Not satisfied with the resolution?'}
                            </h3>
                            <p className="mb-0">
                                {isNl
                                    ? 'Als wij er samen niet uitkomen, kunt u zich wenden tot een onafhankelijke geschillencommissie in het kader van de WKKGZ (Wet kwaliteit, klachten en geschillen zorg), of de Inspectie Gezondheidszorg en Jeugd (IGJ) voor klachten over medische behandelingen. Wij streven er altijd naar om tot een oplossing te komen die voor beide partijen acceptabel is.'
                                    : 'If we cannot reach an agreement, you can turn to an independent dispute committee under the WKKGZ, or the Health and Youth Care Inspectorate (IGJ) for complaints about medical treatments. We always strive to reach a solution that is acceptable to both parties.'}
                            </p>
                            <div className="mt-6">
                                <Link href={`/${locale}/wkkgz`} className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-bold no-underline text-sm uppercase tracking-wider">
                                    {isNl ? 'Lees meer over de WKKGZ' : 'Read more about WKKGZ'} <ExternalLink className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
