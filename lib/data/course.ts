/* ─── Course curriculum, learning outcomes, instructor, testimonials, FAQ ─── */

export interface CurriculumModule {
  id: string;
  timeSlot: string;
  titleKey: string;
  descKey: string;
  tags: string[];                // translation keys for badges e.g. "theory", "hands_on"
}

export interface LearningOutcome {
  id: string;
  textKey: string;
}

export interface CourseInstructor {
  name: string;
  titleKey: string;
  bioKey: string;
  image: string;
  credentials: string[];        // raw strings, not translated (medical registrations)
  stats: { labelKey: string; value: string }[];
}

export interface CourseTestimonial {
  id: string;
  quoteKey: string;
  nameKey: string;
  roleKey: string;
}

export interface CourseFaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

/* ── Curriculum (6 modules = full-day programme) ── */

export const CURRICULUM: CurriculumModule[] = [
  {
    id: 'mod-1',
    timeSlot: '09:00 – 10:15',
    titleKey: 'cur_1_title',
    descKey: 'cur_1_desc',
    tags: ['tag_theory'],
  },
  {
    id: 'mod-2',
    timeSlot: '10:30 – 12:00',
    titleKey: 'cur_2_title',
    descKey: 'cur_2_desc',
    tags: ['tag_theory', 'tag_demo'],
  },
  {
    id: 'mod-3',
    timeSlot: '12:00 – 12:45',
    titleKey: 'cur_3_title',
    descKey: 'cur_3_desc',
    tags: ['tag_break'],
  },
  {
    id: 'mod-4',
    timeSlot: '12:45 – 14:30',
    titleKey: 'cur_4_title',
    descKey: 'cur_4_desc',
    tags: ['tag_theory', 'tag_demo'],
  },
  {
    id: 'mod-5',
    timeSlot: '14:45 – 16:30',
    titleKey: 'cur_5_title',
    descKey: 'cur_5_desc',
    tags: ['tag_hands_on'],
  },
  {
    id: 'mod-6',
    timeSlot: '16:30 – 17:00',
    titleKey: 'cur_6_title',
    descKey: 'cur_6_desc',
    tags: ['tag_certificate'],
  },
];

/* ── Learning Outcomes (8 items) ── */

export const LEARNING_OUTCOMES: LearningOutcome[] = [
  { id: 'lo-1', textKey: 'lo_1' },
  { id: 'lo-2', textKey: 'lo_2' },
  { id: 'lo-3', textKey: 'lo_3' },
  { id: 'lo-4', textKey: 'lo_4' },
  { id: 'lo-5', textKey: 'lo_5' },
  { id: 'lo-6', textKey: 'lo_6' },
  { id: 'lo-7', textKey: 'lo_7' },
  { id: 'lo-8', textKey: 'lo_8' },
];

/* ── Instructor ── */

export const INSTRUCTOR: CourseInstructor = {
  name: 'Athiná Barza',
  titleKey: 'instructor_title',
  bioKey: 'instructor_bio',
  image: '/images/Newteam/athina-barza.jpg',
  credentials: ['BIG-geregistreerd arts 19937285901', 'Cosmetisch arts NVCG'],
  stats: [
    { labelKey: 'stat_experience', value: '10+' },
    { labelKey: 'stat_trained', value: '150+' },
    { labelKey: 'stat_treatments', value: '5 000+' },
  ],
};

/* ── Testimonials ── */

export const COURSE_TESTIMONIALS: CourseTestimonial[] = [
  {
    id: 'ct-1',
    quoteKey: 'testimonial_1_quote',
    nameKey: 'testimonial_1_name',
    roleKey: 'testimonial_1_role',
  },
  {
    id: 'ct-2',
    quoteKey: 'testimonial_2_quote',
    nameKey: 'testimonial_2_name',
    roleKey: 'testimonial_2_role',
  },
  {
    id: 'ct-3',
    quoteKey: 'testimonial_3_quote',
    nameKey: 'testimonial_3_name',
    roleKey: 'testimonial_3_role',
  },
];

/* ── Course FAQ ── */

export const COURSE_FAQ: CourseFaqItem[] = [
  { id: 'cfaq-1', questionKey: 'faq_1_q', answerKey: 'faq_1_a' },
  { id: 'cfaq-2', questionKey: 'faq_2_q', answerKey: 'faq_2_a' },
  { id: 'cfaq-3', questionKey: 'faq_3_q', answerKey: 'faq_3_a' },
  { id: 'cfaq-4', questionKey: 'faq_4_q', answerKey: 'faq_4_a' },
  { id: 'cfaq-5', questionKey: 'faq_5_q', answerKey: 'faq_5_a' },
  { id: 'cfaq-6', questionKey: 'faq_6_q', answerKey: 'faq_6_a' },
  { id: 'cfaq-7', questionKey: 'faq_7_q', answerKey: 'faq_7_a' },
];

/* ── Pricing inclusions (10 items) ── */

export const PRICING_INCLUSIONS: string[] = [
  'pricing_incl_1',
  'pricing_incl_2',
  'pricing_incl_3',
  'pricing_incl_4',
  'pricing_incl_5',
  'pricing_incl_6',
  'pricing_incl_7',
  'pricing_incl_8',
  'pricing_incl_9',
  'pricing_incl_10',
];

/* ── Highlight icons mapping keys ── */

export const HIGHLIGHT_KEYS = [
  'highlight_1',
  'highlight_2',
  'highlight_3',
  'highlight_4',
  'highlight_5',
  'highlight_6',
] as const;

/* ── Target audience keys ── */

export const TARGET_AUDIENCE_KEYS = [
  'audience_1',
  'audience_2',
  'audience_3',
] as const;

export const PREREQUISITE_KEYS = [
  'prereq_1',
  'prereq_2',
] as const;
