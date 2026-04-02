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
    city: 'Ede',
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
    treatment: 'Afvalprogramma',
    timeAgo: '2 uur geleden',
    rating: 5,
  },
  {
    id: 'sp6',
    type: 'booking',
    name: 'Nour B.',
    city: 'Ede',
    treatment: 'Butt Contour consult',
    timeAgo: '3 uur geleden',
  },
];

export const SOCIAL_PROOF_DATA_EN: SocialProofItem[] = [
  {
    id: 'sp1',
    type: 'booking',
    name: 'Lisa V.',
    city: 'Ede',
    treatment: 'Botox forehead',
    timeAgo: '12 min ago',
  },
  {
    id: 'sp2',
    type: 'review',
    name: 'Thomas K.',
    city: 'Rotterdam',
    treatment: 'Lip fillers',
    timeAgo: '28 min ago',
    rating: 5,
  },
  {
    id: 'sp3',
    type: 'purchase',
    name: 'Fatima A.',
    city: 'Amsterdam',
    treatment: 'Mounjaro programme',
    timeAgo: '45 min ago',
  },
  {
    id: 'sp4',
    type: 'booking',
    name: 'Sandra M.',
    city: 'Utrecht',
    treatment: 'Jawline fillers',
    timeAgo: '1 hour ago',
  },
  {
    id: 'sp5',
    type: 'review',
    name: 'Peter J.',
    city: 'Leiden',
    treatment: 'Weight loss programme',
    timeAgo: '2 hours ago',
    rating: 5,
  },
  {
    id: 'sp6',
    type: 'booking',
    name: 'Nour B.',
    city: 'Ede',
    treatment: 'Butt Contour consultation',
    timeAgo: '3 hours ago',
  },
];
