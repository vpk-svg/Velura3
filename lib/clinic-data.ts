export type Locale = 'nl' | 'en';

export interface TreatmentTag {
  id: string;
  label: string;
}

export interface TreatmentItem {
  id: string;
  name: string;
  price: string;
  description: string;
  tags: TreatmentTag[];
}

export interface WeightOption {
  id: 'ozempic' | 'mounjaro';
  name: string;
  subtitle: string;
  pricingText: string;
  description: string;
}

export interface QuestionnaireOption {
  id: string;
  label: string;
  value: string;
}

export interface QuestionnaireStep {
  id: string;
  question: string;
  helperText?: string;
  options: QuestionnaireOption[];
}

export interface CourseDate {
  id: string;
  title: string;
  dateLabel: string;
  status: 'open' | 'limited' | 'almost_full';
  percentFilled: number;
}

export interface FaqItem {
  id: string;
  topic: 'botox' | 'fillers' | 'weightloss' | 'buttlift';
  question: string;
  answer: string;
}

export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  startIso: string;
  capacity: 2;
  booked: 0 | 1 | 2;
  remaining: number;
  isAvailable: boolean;
}

export interface ClinicContactInfo {
  clinicName: string;
  address: string;
  email: string;
  phone: string;
  openingHours: string;
  mapsEmbedUrl: string;
}

export interface IntakeFieldOption {
  id: string;
  label: string;
}

type LocalizedText = { nl: string; en: string };

type LocalizedTreatment = {
  id: string;
  price: string;
  tags: TreatmentTag[];
  name: LocalizedText;
  description: LocalizedText;
};

const botoxTreatments: LocalizedTreatment[] = [
  {
    id: 'fronsrimpels',
    price: '€100',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'popular', label: 'Popular' }],
    name: { nl: 'Fronsrimpels', en: 'Frown Lines' },
    description: {
      nl: 'Verzacht diepe fronslijnen tussen de wenkbrauwen voor een uitgeruste uitstraling.',
      en: 'Softens deep glabellar lines for a calm, refreshed look.',
    },
  },
  {
    id: 'voorhoofd',
    price: '€110',
    tags: [{ id: 'botox', label: 'Botox' }],
    name: { nl: 'Voorhoofd geheel', en: 'Full Forehead' },
    description: {
      nl: 'Subtiele ontspanning van horizontale voorhoofdlijnen met behoud van expressie.',
      en: 'Refines horizontal forehead lines while preserving natural expression.',
    },
  },
  {
    id: 'kraaienpootjes',
    price: '€100',
    tags: [{ id: 'botox', label: 'Botox' }],
    name: { nl: 'Kraaienpootjes', en: "Crow’s Feet" },
    description: {
      nl: 'Vermindert lijntjes rond de ogen voor een zachtere, jongere oogopslag.',
      en: 'Smooths eye-area lines for a softer and more youthful gaze.',
    },
  },
  {
    id: 'lipflip',
    price: '€80',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'subtle', label: 'Subtle' }],
    name: { nl: 'Lipflip', en: 'Lip Flip' },
    description: {
      nl: 'Geeft de bovenlip een subtielere projectie zonder extra volume.',
      en: 'Enhances upper lip definition without adding filler volume.',
    },
  },
  {
    id: 'wenkbrauwlift',
    price: '€80',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'refined', label: 'Refined' }],
    name: { nl: 'Wenkbrauwlift', en: 'Brow Lift' },
    description: {
      nl: 'Lichte lift voor een open blik zonder chirurgische ingreep.',
      en: 'Creates a subtle lift and a more open eye contour without surgery.',
    },
  },
  {
    id: 'neuslift',
    price: '€75',
    tags: [{ id: 'botox', label: 'Botox' }],
    name: { nl: 'Neuslift', en: 'Nose Lift' },
    description: {
      nl: 'Verzacht neerwaartse spanning rond de neuspunt voor een subtiele lift.',
      en: 'Softens downward pull around the nose tip for a subtle lift.',
    },
  },
  {
    id: 'mondhoeken',
    price: '€75',
    tags: [{ id: 'botox', label: 'Botox' }],
    name: { nl: 'Mondhoeken', en: 'Mouth Corners' },
    description: {
      nl: 'Lichte correctie van neerwaartse mondhoeken voor een vriendelijker expressie.',
      en: 'Lifts downturned corners for a softer, more approachable expression.',
    },
  },
  {
    id: 'gummy-smile',
    price: '€80',
    tags: [{ id: 'botox', label: 'Botox' }],
    name: { nl: 'Gummy Smile', en: 'Gummy Smile' },
    description: {
      nl: 'Beperkt overmatige zichtbaarheid van tandvlees met een verfijnde injectietechniek.',
      en: 'Reduces excessive gum show with precise micro-dosing.',
    },
  },
  {
    id: 'bunny-lines',
    price: '€80',
    tags: [{ id: 'botox', label: 'Botox' }],
    name: { nl: 'Bunny Lines', en: 'Bunny Lines' },
    description: {
      nl: 'Corrigeert fijne rimpels op de neusbrug bij lachen of fronsen.',
      en: 'Softens nasal bridge lines visible when smiling or frowning.',
    },
  },
  {
    id: 'kin',
    price: '€80',
    tags: [{ id: 'botox', label: 'Botox' }],
    name: { nl: 'Kin', en: 'Chin' },
    description: {
      nl: 'Egaliseert de kinstructuur en verzacht een onrustig kinoppervlak.',
      en: 'Smooths chin texture and minimizes pebbled appearance.',
    },
  },

  {
    id: 'face-slimming',
    price: '€280',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'contour', label: 'Contour' }],
    name: { nl: 'Face Slimming', en: 'Face Slimming' },
    description: {
      nl: 'Vermindert kaakspanning en verfijnt de kaaklijn bij een bredere ondergezichtsvorm.',
      en: 'Reduces jaw muscle bulk for a slimmer lower-face contour.',
    },
  },
  {
    id: 'migraine-klein',
    price: '€250',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'medical', label: 'Medical' }],
    name: { nl: 'Migraine (klein)', en: 'Migraine (Small)' },
    description: {
      nl: 'Medische toepassing gericht op het verminderen van frequentie en intensiteit van migraine.',
      en: 'Medical protocol focused on lowering migraine frequency and intensity.',
    },
  },
  {
    id: 'migraine-groot',
    price: '€380',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'medical', label: 'Medical' }],
    name: { nl: 'Migraine (groot)', en: 'Migraine (Large)' },
    description: {
      nl: 'Uitgebreider medisch protocol voor intensieve migraineklachten.',
      en: 'Extended medical protocol for more intensive migraine complaints.',
    },
  },
  {
    id: 'traptox',
    price: '€260',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'contour', label: 'Contour' }],
    name: { nl: 'Traptox', en: 'TrapTox' },
    description: {
      nl: 'Ontspant de monnikskapspier voor minder spanning in nek en schouders.',
      en: 'Relaxes trapezius muscles to reduce neck and shoulder tension.',
    },
  },
  {
    id: 'nek-nefertiti',
    price: '€240',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'contour', label: 'Contour' }],
    name: { nl: 'Nek Nefertiti', en: 'Nefertiti Neck Lift' },
    description: {
      nl: 'Verfijnt de kaak-hals overgang en ontspant verticale halsbanden.',
      en: 'Refines jaw-neck definition and softens vertical platysma bands.',
    },
  },
  {
    id: 'overmatig-zweten-klein',
    price: '€400',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'medical', label: 'Medical' }],
    name: { nl: 'Overmatig zweten (klein)', en: 'Excessive Sweating (Small Area)' },
    description: {
      nl: 'Effectieve behandeling voor lokale zones met overmatige transpiratie.',
      en: 'Effective treatment for localized areas of excessive sweating.',
    },
  },
  {
    id: 'overmatig-zweten-groot',
    price: '€740',
    tags: [{ id: 'botox', label: 'Botox' }, { id: 'medical', label: 'Medical' }],
    name: { nl: 'Overmatig zweten (groot)', en: 'Excessive Sweating (Large Area)' },
    description: {
      nl: 'Uitgebreide behandeling voor grotere zones met overmatig zweten.',
      en: 'Extended treatment for larger areas affected by excessive sweating.',
    },
  },
];

const fillerTreatments: LocalizedTreatment[] = [
  {
    id: 'lippen-05-ml',
    price: '€165',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Lippen 0,5 ML', en: 'Lips 0.5 ML' },
    description: {
      nl: 'Subtiele volumeverbetering en contourdefinitie met premium hyaluronzuur.',
      en: 'Refined lip volume and definition with premium hyaluronic acid.',
    },
  },
  {
    id: 'fillers-oplossen',
    price: 'v.a. €80',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Fillers oplossen', en: 'Dissolving fillers' },
    description: {
      nl: 'Veilige afbraak van hyaluronzuur fillers met behulp van hyaluronidase.',
      en: 'Safe breakdown of hyaluronic acid fillers using hyaluronidase.',
    },
  },
  {
    id: 'lippen-10-ml',
    price: '€290',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Lippen 1,0 ML', en: 'Lips 1.0 ML' },
    description: {
      nl: 'Verticale projectie voor een strakke, elegante liplijn.',
      en: 'Vertical projection technique for a lifted, elegant lip shape.',
    },
  },
  {
    id: 'cheeks-jukbeenderen-10-ml',
    price: '€290',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Cheeks / jukbeenderen 1,0 ML', en: 'Cheeks / cheekbones 1.0 ML' },
    description: {
      nl: 'Herstelt midface volume en accentueert de contour van het gezicht.',
      en: 'Restores mid-face volume and elevates cheek contour.',
    },
  },
  {
    id: 'cheeks-jukbeenderen-20-ml',
    price: '€580',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Cheeks / jukbeenderen 2,0 ML', en: 'Cheeks / cheekbones 2.0 ML' },
    description: {
      nl: 'Extra volume-opbouw voor meer projectie en contour in het midface gebied.',
      en: 'Additional volume build-up for enhanced projection and cheek contour.',
    },
  },
  {
    id: 'cheeks-jukbeenderen-30-ml',
    price: '€870',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Cheeks / jukbeenderen 3,0 ML', en: 'Cheeks / cheekbones 3.0 ML' },
    description: {
      nl: 'Uitgebreid contourplan voor maximale definitie van de jukbeenderen.',
      en: 'Advanced contour plan for maximum cheekbone definition.',
    },
  },
  {
    id: 'jawline-kaaklijn-10-ml',
    price: '€290',
    tags: [{ id: 'filler', label: 'Filler' }, { id: 'popular', label: 'Popular' }],
    name: { nl: 'Jawline / kaaklijn 1,0 ML', en: 'Jawline 1.0 ML' },
    description: {
      nl: 'Creëert een strakkere kaaklijn en verbeterde definitie van het profiel.',
      en: 'Defines a sharper jawline and enhances profile structure.',
    },
  },
  {
    id: 'jawline-kaaklijn-20-ml',
    price: '€580',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Jawline / kaaklijn 2,0 ML', en: 'Jawline 2.0 ML' },
    description: {
      nl: 'Voor extra kaaklijnaccent en een strakker zijprofiel.',
      en: 'For stronger jawline definition and a sharper side profile.',
    },
  },
  {
    id: 'jawline-kaaklijn-30-ml',
    price: '€870',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Jawline / kaaklijn 3,0 ML', en: 'Jawline 3.0 ML' },
    description: {
      nl: 'Uitgebreide opbouw voor krachtige kaakcontouren.',
      en: 'Extended build-up for strong jaw contours.',
    },
  },
  {
    id: 'jawline-kaaklijn-40-ml',
    price: '€1160',
    tags: [{ id: 'filler', label: 'Filler' }, { id: 'advanced', label: 'Advanced' }],
    name: { nl: 'Jawline / kaaklijn 4,0 ML', en: 'Jawline 4.0 ML' },
    description: {
      nl: 'Maximale contourering voor een sterk gedefinieerde kaaklijn.',
      en: 'Maximum contouring for a strongly defined jawline.',
    },
  },
  {
    id: 'chin-kin-10-ml',
    price: '€290',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Chin / kin 1,0 ML', en: 'Chin 1.0 ML' },
    description: {
      nl: 'Verbetert projectie en balans tussen neus, lippen en kin.',
      en: 'Improves projection and harmony between nose, lips and chin.',
    },
  },
  {
    id: 'chin-kin-20-ml',
    price: '€580',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Chin / kin 2,0 ML', en: 'Chin 2.0 ML' },
    description: {
      nl: 'Extra projectie en profielbalans bij de kin.',
      en: 'Additional chin projection and profile harmony.',
    },
  },
  {
    id: 'neus-lippenplooi-10-ml',
    price: '€290',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Neus-lippenplooi 1,0 ML', en: 'Nasolabial Fold 1.0 ML' },
    description: {
      nl: 'Zachte correctie van diepe lijnen tussen neus en mondhoeken.',
      en: 'Softens deeper folds between the nose and mouth corners.',
    },
  },
  {
    id: 'neus-lippenplooi-20-ml',
    price: '€580',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Neus-lippenplooi 2,0 ML', en: 'Nasolabial Fold 2.0 ML' },
    description: {
      nl: 'Uitgebreidere correctie van nasolabiale plooien voor een zachtere uitstraling.',
      en: 'Extended correction of nasolabial folds for a softer appearance.',
    },
  },
  {
    id: 'traangoot',
    price: '€290',
    tags: [{ id: 'filler', label: 'Filler' }],
    name: { nl: 'Traangoot', en: 'Tear Trough' },
    description: {
      nl: 'Vermindert schaduwvorming onder de ogen voor een frisse uitstraling.',
      en: 'Reduces under-eye hollows for a bright, rested appearance.',
    },
  },
  {
    id: 'full-face-contouring-signature-20-ml',
    price: '€580',
    tags: [{ id: 'filler', label: 'Filler' }, { id: 'signature', label: 'Signature' }],
    name: { nl: 'Full Face Contouring Signature 2,0 ML', en: 'Full Face Contouring Signature 2.0 ML' },
    description: {
      nl: 'Signature full-face plan met harmonieuze contourverbetering.',
      en: 'Signature full-face plan with harmonious contour enhancement.',
    },
  },
  {
    id: 'full-face-contouring-signature-30-ml',
    price: '€870',
    tags: [{ id: 'filler', label: 'Filler' }, { id: 'signature', label: 'Signature' }],
    name: { nl: 'Full Face Contouring Signature 3,0 ML', en: 'Full Face Contouring Signature 3.0 ML' },
    description: {
      nl: 'Uitgebreidere signature aanpak voor balans en definitie in meerdere zones.',
      en: 'Extended signature approach for balance and definition across multiple zones.',
    },
  },
  {
    id: 'full-face-contouring-signature-40-ml',
    price: '€1160',
    tags: [{ id: 'filler', label: 'Filler' }, { id: 'signature', label: 'Signature' }],
    name: { nl: 'Full Face Contouring Signature 4,0 ML', en: 'Full Face Contouring Signature 4.0 ML' },
    description: {
      nl: 'Intensief contourpakket voor geavanceerde full-face harmonisatie.',
      en: 'Intensive contour package for advanced full-face harmonization.',
    },
  },
  {
    id: 'full-face-contouring-signature-50-ml',
    price: '€1450',
    tags: [{ id: 'filler', label: 'Filler' }, { id: 'signature', label: 'Signature' }],
    name: { nl: 'Full Face Contouring Signature 5,0 ML', en: 'Full Face Contouring Signature 5.0 ML' },
    description: {
      nl: 'Meest uitgebreide signature behandeling voor complete contouring.',
      en: 'Most extensive signature treatment for complete contouring.',
    },
  },
  {
    id: 'billen',
    price: 'Op aanvraag',
    tags: [{ id: 'filler', label: 'Filler' }, { id: 'body', label: 'Body' }],
    name: { nl: 'Billen', en: 'Buttocks' },
    description: {
      nl: 'Categorie-item voor bilcontouring behandelingen. Prijs op aanvraag na intake.',
      en: 'Category-style item for buttock contouring treatments. Pricing available on request after consultation.',
    },
  },
  {
    id: 'buttfiller-billift-100ml',
    price: '€2750',
    tags: [{ id: 'filler', label: 'Filler' }, { id: 'body', label: 'Body' }],
    name: { nl: 'Buttfiller (billift) – 100ML (2 jaar resultaat)', en: 'Butt Filler (Butt Lift) – 100ML (2-year result)' },
    description: {
      nl: 'Rondere, symmetrische contouren zonder operatie of lange hersteltijd.',
      en: 'Enhances gluteal contour and symmetry without surgical downtime.',
    },
  },
];

const weightLossOptionsLocalized = {
  ozempic: {
    name: { nl: 'Ozempic', en: 'Ozempic' },
    subtitle: { nl: 'Semaglutide · Wekelijkse injectie', en: 'Semaglutide · Weekly injection' },
    pricingText: { nl: 'v.a. €299 incl. Begeleiding', en: 'from €299 incl. Guidance' },
    description: {
      nl: 'Medisch begeleide GLP-1 therapie met bewezen effect op eetlustregulatie.',
      en: 'Medically supervised GLP-1 therapy with proven appetite regulation benefits.',
    },
  },
  mounjaro: {
    name: { nl: 'Mounjaro', en: 'Mounjaro' },
    subtitle: { nl: 'Tirzepatide · Wekelijkse injectie', en: 'Tirzepatide · Weekly injection' },
    pricingText: { nl: '€425,00 incl. Begeleiding', en: '€425.00 incl. Guidance' },
    description: {
      nl: 'Dubbele GLP-1/GIP agonist voor geavanceerde begeleiding bij gewichtsverlies.',
      en: 'Dual GLP-1/GIP agonist for advanced, physician-led weight management.',
    },
  },
} as const;

export function getClinicContactInfo(locale: Locale): ClinicContactInfo {
  return locale === 'nl'
    ? {
      clinicName: 'FabClinic EDE',
      address: 'Achterdoelen 96-102, 6711 AV Ede',
      email: 'shots@fabclinic.eu',
      phone: '', /* TODO: add real phone number when available */
      openingHours: 'Zaterdag (alleen op afspraak)',
      mapsEmbedUrl:
        'https://www.google.com/maps?q=Nieuwe+Stationsstraat+20,+Ede&output=embed',
    }
    : {
      clinicName: 'FabClinic EDE',
      address: 'Achterdoelen 96-102, 6711 AV Ede, The Netherlands',
      email: 'shots@fabclinic.eu',
      phone: '', /* TODO: add real phone number when available */
      openingHours: 'Saturday (by appointment only)',
      mapsEmbedUrl:
        'https://www.google.com/maps?q=Nieuwe+Stationsstraat+20,+Ede&output=embed',
    };
}

export function getIntakeTreatmentOptions(locale: Locale): IntakeFieldOption[] {
  return locale === 'nl'
    ? [
      { id: 'fillers', label: 'Fillers' },
      { id: 'botox', label: 'Botox' },
      { id: 'bbl', label: 'BBL' },
      { id: 'anders', label: 'Anders' },
    ]
    : [
      { id: 'fillers', label: 'Fillers' },
      { id: 'botox', label: 'Botox' },
      { id: 'bbl', label: 'BBL' },
      { id: 'anders', label: 'Other' },
    ];
}

export function getBotoxTreatments(locale: Locale): TreatmentItem[] {
  if (botoxTreatments.length !== 17) {
    throw new Error('Botox treatments list must contain exactly 17 items.');
  }

  return botoxTreatments.map((item) => ({
    id: item.id,
    name: item.name[locale],
    price: item.price,
    description: item.description[locale],
    tags: item.tags,
  }));
}

export function getFillerTreatments(locale: Locale): TreatmentItem[] {
  return fillerTreatments.map((item) => ({
    id: item.id,
    name: item.name[locale],
    price: item.price,
    description: item.description[locale],
    tags: item.tags,
  }));
}

export function getWeightLossOptions(locale: Locale): WeightOption[] {
  return [
    {
      id: 'ozempic',
      name: weightLossOptionsLocalized.ozempic.name[locale],
      subtitle: weightLossOptionsLocalized.ozempic.subtitle[locale],
      pricingText: weightLossOptionsLocalized.ozempic.pricingText[locale],
      description: weightLossOptionsLocalized.ozempic.description[locale],
    },
    {
      id: 'mounjaro',
      name: weightLossOptionsLocalized.mounjaro.name[locale],
      subtitle: weightLossOptionsLocalized.mounjaro.subtitle[locale],
      pricingText: weightLossOptionsLocalized.mounjaro.pricingText[locale],
      description: weightLossOptionsLocalized.mounjaro.description[locale],
    },
  ];
}

export function getQuestionnaireSteps(locale: Locale): QuestionnaireStep[] {
  if (locale === 'nl') {
    return [
      {
        id: 'goal',
        question: 'Waarom wilt u afvallen?',
        helperText: 'Kies de reden die nu het meest voor u telt.',
        options: [
          { id: 'goal-1', label: 'Gezondheid verbeteren', value: 'health' },
          { id: 'goal-2', label: 'Meer energie in het dagelijks leven', value: 'energy' },
          { id: 'goal-3', label: 'Zelfvertrouwen en uitstraling', value: 'confidence' },
          { id: 'goal-4', label: 'Op advies van arts of specialist', value: 'medical_advice' },
        ],
      },
      {
        id: 'bmi-band',
        question: 'In welke BMI-categorie valt u op dit moment?',
        options: [
          { id: 'bmi-1', label: '25–29.9', value: 'overweight' },
          { id: 'bmi-2', label: '30–34.9', value: 'obesity_1' },
          { id: 'bmi-3', label: '35+', value: 'obesity_2_plus' },
          { id: 'bmi-4', label: 'Ik weet het niet', value: 'unknown' },
        ],
      },
      {
        id: 'preference',
        question: 'Welke begeleiding past het beste bij u?',
        options: [
          { id: 'pref-1', label: 'Alleen medicatie', value: 'medication_only' },
          { id: 'pref-2', label: 'Medicatie + voedingscoaching', value: 'medication_nutrition' },
          { id: 'pref-3', label: 'Volledig traject met wekelijkse check-ins', value: 'full_program' },
        ],
      },
    ];
  }

  return [
    {
      id: 'goal',
      question: 'What is your primary goal?',
      helperText: 'Choose the option that best reflects your treatment journey.',
      options: [
        { id: 'goal-1', label: 'Lose 5–10 kg', value: '5_10kg' },
        { id: 'goal-2', label: 'Lose 10–20 kg', value: '10_20kg' },
        { id: 'goal-3', label: 'Lose 20+ kg', value: '20plus_kg' },
        { id: 'goal-4', label: 'Maintain weight with medical guidance', value: 'maintenance' },
      ],
    },
    {
      id: 'bmi-band',
      question: 'Which BMI category best describes you today?',
      options: [
        { id: 'bmi-1', label: '25–29.9', value: 'overweight' },
        { id: 'bmi-2', label: '30–34.9', value: 'obesity_1' },
        { id: 'bmi-3', label: '35+', value: 'obesity_2_plus' },
        { id: 'bmi-4', label: "I don't know", value: 'unknown' },
      ],
    },
    {
      id: 'preference',
      question: 'Which care model suits you best?',
      options: [
        { id: 'pref-1', label: 'Medication only', value: 'medication_only' },
        { id: 'pref-2', label: 'Medication + nutrition coaching', value: 'medication_nutrition' },
        { id: 'pref-3', label: 'Full program with weekly check-ins', value: 'full_program' },
      ],
    },
  ];
}

export function getCourseDates(locale: Locale): CourseDate[] {
  return locale === 'nl'
    ? [
      {
        id: 'course-1',
        title: 'Injectables Cursus - Zaterdag 28 november 2026',
        dateLabel: 'Zaterdag 28 november 2026',
        status: 'open',
        percentFilled: 0,
      },
    ]
    : [
      {
        id: 'course-1',
        title: 'Injectables Course - Saturday 28 November 2026',
        dateLabel: 'Saturday 28 November 2026',
        status: 'open',
        percentFilled: 0,
      },
    ];
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseSeedDate(seedDate?: string): Date {
  if (!seedDate) return new Date();
  const parsed = new Date(seedDate);
  if (Number.isNaN(parsed.getTime())) return new Date();
  return parsed;
}

function getSaturdayOnOrAfter(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7;
  result.setDate(result.getDate() + daysUntilSaturday);
  result.setHours(0, 0, 0, 0);
  return result;
}

function deterministicBookedCount(_seed: string): 0 {
  return 0;
}

export function generateSaturdaySlots(seedDate?: string): BookingSlot[] {
  const parsed = parseSeedDate(seedDate);

  const friday = new Date(parsed);
  friday.setDate(friday.getDate() + ((5 - friday.getDay() + 7) % 7));
  friday.setHours(0, 0, 0, 0);

  const saturday = new Date(parsed);
  saturday.setDate(saturday.getDate() + ((6 - saturday.getDay() + 7) % 7));
  saturday.setHours(0, 0, 0, 0);

  const slots: BookingSlot[] = [];

  const addSlotsForDay = (dateObj: Date, sHour: number, eHour: number, labelPrefix: string) => {
    const dayLabel = toIsoDate(dateObj);
    for (let hour = sHour; hour <= eHour; hour += 1) {
      for (let minute = 0; minute < 60; minute += 10) {
        if (hour === eHour && minute > 50) break;

        const time = `${`${hour}`.padStart(2, '0')}:${`${minute}`.padStart(2, '0')}`;
        const slotDate = new Date(dateObj);
        slotDate.setHours(hour, minute, 0, 0);

        const booked = deterministicBookedCount(`${dayLabel}-${time}`);
        const remaining = 2 - booked;

        slots.push({
          id: `slot-${dayLabel}-${time}`,
          date: `${labelPrefix} ${dayLabel}`,
          time,
          startIso: slotDate.toISOString(),
          capacity: 2,
          booked,
          remaining,
          isAvailable: remaining > 0,
        });
      }
    }
  };

  addSlotsForDay(friday, 14, 18, 'Vr');
  addSlotsForDay(saturday, 10, 17, 'Za');

  return slots;
}

/* ─────────────────────────────────────────────────────────────
   NEW: Generate available days (Fri + Sat) for 8 weeks
   starting from Saturday 31 May 2026 (first open day).
   Returns an array of AvailableDay objects with slots.
───────────────────────────────────────────────────────────── */
export interface AvailableDay {
  dateIso: string;          // e.g. "2026-05-30"
  dayName: string;          // "Vrijdag" | "Zaterdag"
  dayNameEn: string;        // "Friday" | "Saturday"
  displayDate: string;      // e.g. "za 30 mei"
  dayOfWeek: 5 | 6;         // 5=Friday, 6=Saturday
  slots: BookingSlot[];
}

export function generateAvailableDays(weeksAhead = 8): AvailableDay[] {
  // Hard start: Saturday 30 May 2026
  const START = new Date('2026-05-30T00:00:00');

  const NL_MONTHS = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  const days: AvailableDay[] = [];

  // From the start date, walk week-by-week collecting Fri + Sat pairs
  // Start date is a Saturday, so first Friday is the following week (6 Jun)
  // But Saturday 30 May is available, so we push it first then cycle Fri→Sat.
  const cursor = new Date(START);

  for (let week = 0; week < weeksAhead; week++) {
    // For week 0: only Saturday (30 May). For week 1+: Friday first, then Saturday
    if (week === 0) {
      // Saturday 30 May
      const saturday = new Date(cursor); // cursor is Sat 30 May
      days.push(buildDay(saturday, 6, NL_MONTHS));
      // Advance cursor to next Friday
      cursor.setDate(cursor.getDate() + 6); // Sat → next Fri (+6)
    } else {
      // Friday
      const friday = new Date(cursor);
      days.push(buildDay(friday, 5, NL_MONTHS));
      // Saturday (+1)
      const saturday = new Date(cursor);
      saturday.setDate(saturday.getDate() + 1);
      days.push(buildDay(saturday, 6, NL_MONTHS));
      // Advance cursor to next Friday (+7)
      cursor.setDate(cursor.getDate() + 7);
    }
  }

  return days;
}

function buildDay(dateObj: Date, dayOfWeek: 5 | 6, nlMonths: string[]): AvailableDay {
  const isFriday = dayOfWeek === 5;
  const dateIso = toIsoDate(dateObj);
  const d = dateObj.getDate();
  const m = nlMonths[dateObj.getMonth()];
  const prefix = isFriday ? 'vr' : 'za';
  const displayDate = `${prefix} ${d} ${m}`;

  const slots: BookingSlot[] = [];
  const sHour = isFriday ? 14 : 10;
  const eHour = isFriday ? 18 : 17;

  for (let hour = sHour; hour <= eHour; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      if (hour === eHour && minute > 50) break;
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      const slotDate = new Date(dateObj);
      slotDate.setHours(hour, minute, 0, 0);
      const booked = deterministicBookedCount(`${dateIso}-${time}`);
      const remaining = 2 - booked;
      slots.push({
        id: `slot-${dateIso}-${time}`,
        date: displayDate,
        time,
        startIso: slotDate.toISOString(),
        capacity: 2,
        booked,
        remaining,
        isAvailable: remaining > 0,
      });
    }
  }

  return {
    dateIso,
    dayName: isFriday ? 'Vrijdag' : 'Zaterdag',
    dayNameEn: isFriday ? 'Friday' : 'Saturday',
    displayDate,
    dayOfWeek,
    slots,
  };
}



type FaqTopic = 'botox' | 'fillers' | 'weightloss' | 'buttlift';

const faqQuestionStems: Record<FaqTopic, LocalizedText[]> = {
  botox: [
    { nl: 'Hoe snel zie ik resultaat na een Botox-behandeling?', en: 'How quickly will I see results after Botox?' },
    { nl: 'Hoe lang blijft Botox zichtbaar werken?', en: 'How long do Botox results typically last?' },
    { nl: 'Ziet Botox er altijd natuurlijk uit?', en: 'Can Botox still look natural?' },
    { nl: 'Doet een Botox-behandeling pijn?', en: 'Is Botox treatment painful?' },
    { nl: 'Mag ik direct weer sporten na Botox?', en: 'Can I work out right after Botox?' },
    { nl: 'Wat is het verschil tussen Baby Botox en standaard Botox?', en: 'What is the difference between Baby Botox and standard dosing?' },
    { nl: 'Kan Botox preventief worden ingezet?', en: 'Can Botox be used preventively?' },
    { nl: 'Hoe veilig is Botox bij een ervaren arts?', en: 'How safe is Botox in experienced medical hands?' },
    { nl: 'Wanneer plan ik het beste een touch-up?', en: 'When should I schedule a Botox touch-up?' },
    { nl: 'Voor welke zones is Botox het meest geschikt?', en: 'Which facial areas are most suitable for Botox?' },
  ],
  fillers: [
    { nl: 'Welke filler is geschikt voor lippen zonder overcorrectie?', en: 'Which filler approach suits lips without overcorrection?' },
    { nl: 'Hoe lang blijft een fillerbehandeling zichtbaar?', en: 'How long do filler results usually remain visible?' },
    { nl: 'Wat is het verschil tussen kaaklijn- en kinfiller?', en: 'What is the difference between jawline and chin filler?' },
    { nl: 'Is een traangootbehandeling met filler veilig?', en: 'Is tear trough filler treatment safe?' },
    { nl: 'Kan ik filler combineren met Botox?', en: 'Can I combine filler with Botox?' },
    { nl: 'Wanneer zie ik het eindresultaat van fillers?', en: 'When do I see the final filler result?' },
    { nl: 'Hoe kies ik een natuurlijk fillerresultaat?', en: 'How do I choose a natural-looking filler result?' },
    { nl: 'Wat is de hersteltijd na fillers?', en: 'What is the recovery time after fillers?' },
    { nl: 'Zijn hyaluronzuurfillers omkeerbaar?', en: 'Are hyaluronic acid fillers reversible?' },
    { nl: 'Welke zones verouderen het snelst en profiteren van filler?', en: 'Which areas age fastest and benefit from filler first?' },
  ],
  weightloss: [
    { nl: 'Hoe werkt medische gewichtsbehandeling met GLP-1?', en: 'How does medically supervised GLP-1 weight treatment work?' },
    { nl: 'Wat is het verschil tussen Ozempic en Mounjaro?', en: 'What is the difference between Ozempic and Mounjaro?' },
    { nl: 'Wanneer merk ik effect op eetlust en gewicht?', en: 'When do I notice appetite and weight changes?' },
    { nl: 'Hoe wordt de dosering veilig opgebouwd?', en: 'How is dose escalation managed safely?' },
    { nl: 'Kan ik medicatie combineren met voedingscoaching?', en: 'Can I combine medication with nutrition coaching?' },
    { nl: 'Wat als ik bijwerkingen ervaar?', en: 'What if I experience side effects?' },
    { nl: 'Hoe vaak zijn medische controles nodig?', en: 'How often are medical check-ins needed?' },
    { nl: 'Is langdurig resultaat mogelijk na het traject?', en: 'Is long-term weight stability possible after treatment?' },
    { nl: 'Is online voorschrijven medisch verantwoord?', en: 'Is online prescribing medically responsible?' },
    { nl: 'Voor wie is GLP-1 behandeling geschikt?', en: 'Who is an appropriate candidate for GLP-1 treatment?' },
  ],
  buttlift: [
    { nl: 'Wat houdt een non-surgical buttlift met filler in?', en: 'What does a non-surgical butt lift with filler involve?' },
    { nl: 'Wanneer zie ik resultaat na buttfiller?', en: 'When will I see results after butt filler?' },
    { nl: 'Hoe lang blijft een buttfillerresultaat zichtbaar?', en: 'How long does butt filler typically last?' },
    { nl: 'Is buttfiller veilig zonder operatie?', en: 'Is butt filler safe without surgery?' },
    { nl: 'Hoeveel volume is realistisch in één sessie?', en: 'How much volume is realistic in one session?' },
    { nl: 'Kan asymmetrie met buttfiller worden gecorrigeerd?', en: 'Can asymmetry be corrected with butt filler?' },
    { nl: 'Mag ik zitten en sporten na de behandeling?', en: 'Can I sit and exercise after treatment?' },
    { nl: 'Wat is het verschil tussen buttfiller en BBL?', en: 'What is the difference between butt filler and BBL?' },
    { nl: 'Heb ik meerdere sessies nodig voor optimaal resultaat?', en: 'Do I need multiple sessions for best results?' },
    { nl: 'Hoe verloopt de intake voor body contouring?', en: 'How does the consultation for body contouring work?' },
  ],
};

const faqAnswerTemplates: Record<FaqTopic, LocalizedText[]> = {
  botox: [
    {
      nl: 'Onze artsen starten met een nauwkeurige mimiekanalyse en kiezen een dosis die past bij uw anatomie. U ziet meestal binnen enkele dagen eerste verfijning en een volledige uitwerking rond dag 10–14.',
      en: 'Our clinicians begin with a precise facial movement assessment and tailor dosing to your anatomy. Initial refinement appears within days, with full effect around day 10–14.',
    },
    {
      nl: 'Voor premium, natuurlijke resultaten hanteren wij microdosering en duidelijke nazorginstructies. Het effect blijft gemiddeld 3–4 maanden zichtbaar, afhankelijk van spieractiviteit en leefstijl.',
      en: 'For premium, natural outcomes, we use micro-dosing and clear aftercare guidance. Results typically remain visible for 3–4 months, depending on muscle activity and lifestyle.',
    },
    {
      nl: 'Veiligheid staat centraal: behandeling uitsluitend door BIG-geregistreerde artsen met medische productkeuze op indicatie. Zo blijft de expressie zacht en geloofwaardig, zonder “bevroren” look.',
      en: 'Safety is central: treatment is performed by licensed physicians using indication-based product selection. This preserves soft expression and avoids an overtreated appearance.',
    },
    {
      nl: 'Wij adviseren een follow-upmoment om de balans van het resultaat te evalueren. Indien nodig verfijnen we subtiel, zodat het eindresultaat elegant en in verhouding blijft.',
      en: 'We recommend a follow-up appointment to evaluate balance and symmetry. If needed, we refine conservatively to keep outcomes elegant and proportionate.',
    },
    {
      nl: 'Elke behandeling start met een medische intake en exclusiecheck op contra-indicaties. Daarmee bieden we een gecontroleerd traject met maximale voorspelbaarheid en comfort.',
      en: 'Every treatment starts with a medical intake and contraindication screening. This creates a controlled pathway with high predictability and comfort.',
    },
  ],
  fillers: [
    {
      nl: 'Wij werken met premium hyaluronzuurfillers en anatomisch plan op maat. Het doel is zachte contourverbetering met behoud van karakter en natuurlijke gezichtsverhoudingen.',
      en: 'We use premium hyaluronic acid fillers with a personalized anatomical plan. The goal is refined contour enhancement while preserving character and natural proportions.',
    },
    {
      nl: 'Eerste resultaat is direct zichtbaar, maar de finale beoordeling doen we meestal na 2 weken wanneer het weefsel volledig is gestabiliseerd.',
      en: 'You see immediate improvement, but final assessment is usually done after 2 weeks once tissue has fully settled.',
    },
    {
      nl: 'Voor veiligheid behandelen wij in gecontroleerde stappen met realistische volumedoelen. Zo bouwen we resultaat op zonder overbehandeling.',
      en: 'For safety, we treat in controlled stages with realistic volume goals, allowing elegant progression without overcorrection.',
    },
    {
      nl: 'Afhankelijk van zone en product houdt het effect gemiddeld 9–15 maanden aan. Tijdens controle stemmen we timing en onderhoud individueel af.',
      en: 'Depending on area and product, results generally last 9–15 months. During review, we tailor maintenance timing to your profile.',
    },
    {
      nl: 'Onze artsen bespreken vooraf alternatieven, verwachtingen en reversibiliteit. Dat geeft helderheid en maakt de behandeling medisch verantwoord en transparant.',
      en: 'Our physicians discuss alternatives, expectations, and reversibility up front, ensuring a medically responsible and transparent plan.',
    },
  ],
  weightloss: [
    {
      nl: 'Uw traject start met medische triage, gezondheidsvragen en behandeladvies op maat. Indien geschikt begeleiden wij dosering, leefstijl en opvolging in één geïntegreerd protocol.',
      en: 'Your pathway starts with medical triage, health screening, and tailored treatment planning. If suitable, we guide dosing, lifestyle, and follow-up in one integrated protocol.',
    },
    {
      nl: 'GLP-1 medicatie werkt het best in combinatie met voeding, beweging en gedragscoaching. Daardoor verbetert niet alleen gewichtsverlies, maar ook langetermijnbehoud.',
      en: 'GLP-1 medication works best with nutrition, movement, and behavior coaching, improving both weight loss and long-term maintenance.',
    },
    {
      nl: 'Wij bouwen doseringen stapsgewijs op om tolerantie en effectiviteit te balanceren. Bijwerkingen worden actief gemonitord en waar nodig direct bijgestuurd.',
      en: 'We escalate doses gradually to balance tolerability and effectiveness. Side effects are monitored closely and adjusted promptly when needed.',
    },
    {
      nl: 'Transparantie staat voorop: u ontvangt duidelijke instructies, evaluatiemomenten en realistische verwachtingen. Zo blijft uw traject veilig en voorspelbaar.',
      en: 'Transparency comes first: you receive clear instructions, review checkpoints, and realistic expectations to keep your journey safe and predictable.',
    },
    {
      nl: 'Onze medische teams hanteren evidence-based protocollen en individuele risicobeoordeling. Dit garandeert een hoogwaardige, verantwoord uitgevoerde behandeling.',
      en: 'Our medical teams follow evidence-based protocols with individualized risk assessment, ensuring high-standard, responsibly delivered care.',
    },
  ],
  buttlift: [
    {
      nl: 'Buttfiller is een non-surgical contourbehandeling met zorgvuldig geselecteerde bodyfiller. We richten ons op proportie, projectie en symmetrie binnen veilige volumelimieten.',
      en: 'Butt filler is a non-surgical contour treatment using carefully selected body filler. We focus on proportion, projection, and symmetry within safe volume limits.',
    },
    {
      nl: 'Na behandeling is direct contourverbetering zichtbaar; de verfijning neemt toe wanneer het product integreert in het weefsel. Eindbeoordeling plannen we na enkele weken.',
      en: 'Contour improvement is visible immediately, then refines as the product integrates into tissue. Final review is scheduled after several weeks.',
    },
    {
      nl: 'Wij stellen realistische doelen per sessie en adviseren gefaseerde opbouw voor een elegant en duurzaam resultaat. Dit voorkomt overcorrectie.',
      en: 'We set realistic goals per session and often recommend phased enhancement for elegant, durable outcomes while avoiding overcorrection.',
    },
    {
      nl: 'Het behandelplan bevat duidelijke leefregels voor zitten, drukbelasting en training. Hierdoor ondersteunen we een voorspoedig herstel en optimale productstabiliteit.',
      en: 'Your plan includes clear guidance on sitting, pressure management, and exercise, supporting smooth recovery and optimal product stability.',
    },
    {
      nl: 'Tijdens intake beoordelen we huidkwaliteit, weefselstructuur en esthetische wensen in detail. Zo ontwerpen we een veilig, medisch onderbouwd contourprotocol.',
      en: 'During consultation, we evaluate skin quality, tissue structure, and aesthetic goals in detail to design a safe, medically grounded contour protocol.',
    },
  ],
};

const faqAddOns: Record<Locale, string[]> = {
  nl: [
    'Wij adviseren altijd een persoonlijke medische intake vooraf.',
    'Uw plan wordt afgestemd op anatomie, veiligheid en een natuurlijk resultaat.',
    'Nazorginstructies worden helder meegegeven op de dag van behandeling.',
    'Controle na behandeling helpt om het resultaat verfijnd te optimaliseren.',
    'Onze focus ligt op duurzaam resultaat met premium klinische kwaliteit.',
  ],
  en: [
    'We always recommend a personalized medical consultation first.',
    'Your plan is tailored to anatomy, safety, and natural-looking results.',
    'Aftercare instructions are clearly provided on treatment day.',
    'A review appointment helps refine and optimize final outcome.',
    'Our focus is long-term quality with premium clinical standards.',
  ],
};

function buildTopicFaq(topic: FaqTopic, locale: Locale): FaqItem[] {
  const stems = faqQuestionStems[topic];
  const templates = faqAnswerTemplates[topic];
  const addOns = faqAddOns[locale];

  const items: FaqItem[] = [];

  for (let i = 0; i < 50; i += 1) {
    const stem = stems[i % stems.length][locale];
    const template = templates[Math.floor(i / 10)][locale];
    const addOn = addOns[i % addOns.length];

    items.push({
      id: `faq-${topic}-${`${i + 1}`.padStart(2, '0')}`,
      topic,
      question: `${stem}`,
      answer: `${template} ${addOn}`,
    });
  }

  return items;
}

export function getFaqItems(locale: Locale): FaqItem[] {
  const items = [
    ...buildTopicFaq('botox', locale),
    ...buildTopicFaq('fillers', locale),
    ...buildTopicFaq('weightloss', locale),
    ...buildTopicFaq('buttlift', locale),
  ];

  if (items.length !== 200) {
    throw new Error('FAQ generator must return exactly 200 items.');
  }

  return items;
}

export function getPractitionerPlaceholders(locale: Locale): Array<{
  title: string;
  subtitle: string;
  todoLabel: string;
  imageSrc: string;
}> {
  return locale === 'nl'
    ? [
      {
        title: 'Dr. [Naam Voornaam]',
        subtitle: 'Cosmetisch Arts KNMG · Gezichtsanatomie specialist',
        todoLabel: 'TODO: voeg bio, registratienummer en specialisaties toe',
        imageSrc: '/images/team/placeholder-doctor-1.jpg',
      },
      {
        title: 'Drs. [Naam Voornaam]',
        subtitle: 'BIG-geregistreerd arts · Injectable safety lead',
        todoLabel: 'TODO: voeg ervaring, opleidingen en consultstijl toe',
        imageSrc: '/images/team/placeholder-doctor-2.jpg',
      },
      {
        title: '[Naam Voornaam]',
        subtitle: 'Verpleegkundig specialist · Patiëntcoördinatie',
        todoLabel: 'TODO: voeg begeleidingsrol en expertisegebieden toe',
        imageSrc: '/images/team/placeholder-practitioner-3.jpg',
      },
    ]
    : [
      {
        title: 'Dr. [First Last Name]',
        subtitle: 'Cosmetic Physician · Facial Anatomy Specialist',
        todoLabel: 'TODO: add bio, registration number, and specialties',
        imageSrc: '/images/team/placeholder-doctor-1.jpg',
      },
      {
        title: 'Drs. [First Last Name]',
        subtitle: 'Licensed Medical Doctor · Injectable Safety Lead',
        todoLabel: 'TODO: add experience, training, and consultation style',
        imageSrc: '/images/team/placeholder-doctor-2.jpg',
      },
      {
        title: '[First Last Name]',
        subtitle: 'Nurse Specialist · Patient Journey Coordinator',
        todoLabel: 'TODO: add support scope and area expertise',
        imageSrc: '/images/team/placeholder-practitioner-3.jpg',
      },
    ];
}
