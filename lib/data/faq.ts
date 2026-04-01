/**
 * FAQ data organized by category.
 */

export interface FaqItem {
  id: string;
  category: FaqCategory;
  questionKey: string;
  answerKey: string;
}

export type FaqCategory = 'general' | 'weightloss' | 'botox' | 'fillers' | 'shape' | 'pricing';

export const FAQ_CATEGORIES: FaqCategory[] = ['general', 'weightloss', 'botox', 'fillers', 'shape', 'pricing'];

export const FAQ_ITEMS: FaqItem[] = [
  // General
  { id: 'g1', category: 'general', questionKey: 'q_g1', answerKey: 'a_g1' },
  { id: 'g2', category: 'general', questionKey: 'q_g2', answerKey: 'a_g2' },
  { id: 'g3', category: 'general', questionKey: 'q_g3', answerKey: 'a_g3' },
  // Weightloss
  { id: 'w1', category: 'weightloss', questionKey: 'q_w1', answerKey: 'a_w1' },
  { id: 'w2', category: 'weightloss', questionKey: 'q_w2', answerKey: 'a_w2' },
  { id: 'w3', category: 'weightloss', questionKey: 'q_w3', answerKey: 'a_w3' },
  // Botox
  { id: 'b1', category: 'botox', questionKey: 'q_b1', answerKey: 'a_b1' },
  { id: 'b2', category: 'botox', questionKey: 'q_b2', answerKey: 'a_b2' },
  { id: 'b3', category: 'botox', questionKey: 'q_b3', answerKey: 'a_b3' },
  // Fillers
  { id: 'f1', category: 'fillers', questionKey: 'q_f1', answerKey: 'a_f1' },
  { id: 'f2', category: 'fillers', questionKey: 'q_f2', answerKey: 'a_f2' },
  { id: 'f3', category: 'fillers', questionKey: 'q_f3', answerKey: 'a_f3' },
  // Shape
  { id: 's1', category: 'shape', questionKey: 'q_s1', answerKey: 'a_s1' },
  { id: 's2', category: 'shape', questionKey: 'q_s2', answerKey: 'a_s2' },
  // Pricing
  { id: 'p1', category: 'pricing', questionKey: 'q_p1', answerKey: 'a_p1' },
  { id: 'p2', category: 'pricing', questionKey: 'q_p2', answerKey: 'a_p2' },
  { id: 'p3', category: 'pricing', questionKey: 'q_p3', answerKey: 'a_p3' },
];
