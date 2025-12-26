import { Gift, CreditCard, DollarSign, BookOpen } from 'lucide-react';

export const rewardsData = [
  {
    id: 1,
    title: '$5 Bank Transfer',
    description: 'The $5 equivalent will be transferred to your bank account.',
    points: 5000,
    status: 'locked',
    icon: DollarSign,
    iconBg: 'bg-blue-100'
  },
  {
    id: 2,
    title: '$5 PayPal International',
    description: 'Receive a $5 PayPal balance transfer directly to your PayPal account email.',
    points: 5000,
    status: 'locked',
    icon: DollarSign,
    iconBg: 'bg-green-100'
  },
  {
    id: 3,
    title: '$5 Virtual Visa Card',
    description: 'Use your $5 prepaid card to shop anywhere Visa is accepted online.',
    points: 5000,
    status: 'locked',
    icon: Gift,
    iconBg: 'bg-purple-100'
  },
  {
    id: 4,
    title: '$5 Apple Gift Card',
    description: 'Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.',
    points: 5000,
    status: 'locked',
    icon: Gift,
    iconBg: 'bg-pink-100'
  },
  {
    id: 5,
    title: '$5 Google Play Card',
    description: 'Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.',
    points: 5000,
    status: 'locked',
    icon: Gift,
    iconBg: 'bg-purple-100'
  },
  {
    id: 6,
    title: '$5 Amazon Gift Card',
    description: 'Get a $5 digital gift card to spend on your favorite tools or platforms.',
    points: 5000,
    status: 'locked',
    icon: Gift,
    iconBg: 'bg-purple-100'
  },
  {
    id: 7,
    title: '$10 Amazon Gift Card',
    description: 'Get a $10 digital gift card to spend on your favorite tools or platforms.',
    points: 10000,
    status: 'locked',
    icon: Gift,
    iconBg: 'bg-purple-100'
  },
  {
    id: 8,
    title: 'Free Udemy Course',
    description: 'Coming Soon!',
    points: 0,
    status: 'coming-soon',
    icon: BookOpen,
    iconBg: 'bg-blue-100'
  }
];

// Helper functions
export const getRewardsCounts = (rewards) => ({
  all: rewards.length,
  unlocked: rewards.filter(r => r.status === 'unlocked').length,
  locked: rewards.filter(r => r.status === 'locked').length,
  comingSoon: rewards.filter(r => r.status === 'coming-soon').length
});

export const filterRewards = (rewards, filter) => {
  if (filter === 'all') return rewards;
  if (filter === 'unlocked') return rewards.filter(r => r.status === 'unlocked');
  if (filter === 'locked') return rewards.filter(r => r.status === 'locked');
  if (filter === 'coming-soon') return rewards.filter(r => r.status === 'coming-soon');
  return rewards;
};