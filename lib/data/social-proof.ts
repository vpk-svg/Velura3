/**
 * Social proof popup data.
 * Mock data for rotating notification popups.
 */

export interface SocialProofItem {
  id: string;
  type: 'booking' | 'review' | 'purchase';
  name: string;
  city: string;
  treatment: string;
  timeAgo: string;
  rating?: number;
}

export const SOCIAL_PROOF_DATA: SocialProofItem[] = [
  {
    id: 'sp1',
    type: 'booking',
    name: 'Lisa V.',
    city: 'Den Haag',
    treatment: 'Botox voorhoofd',
    timeAgo: '12 min geleden',
  },
  {
    id: 'sp2',
    type: 'review',
    name: 'Thomas K.',
    city: 'Rotterdam',
    treatment: 'Lip fillers',
    timeAgo: '28 min geleden',
    rating: 5,
  },
  {
    id: 'sp3',
    type: 'purchase',
    name: 'Fatima A.',
    city: 'Amsterdam',
    treatment: 'Mounjaro traject',
    timeAgo: '45 min geleden',
  },
  {
    id: 'sp4',
    type: 'booking',
    name: 'Sandra M.',
    city: 'Utrecht',
    treatment: 'Kaaklijn fillers',
    timeAgo: '1 uur geleden',
  },
  {
    id: 'sp5',
    type: 'review',
    name: 'Peter J.',
    city: 'Leiden',
    treatment: 'Weightloss programma',
    timeAgo: '2 uur geleden',
    rating: 5,
  },
  {
    id: 'sp6',
    type: 'booking',
    name: 'Nour B.',
    city: 'Den Haag',
    treatment: 'Butt Contour consult',
    timeAgo: '3 uur geleden',
  },
];
