// src/components/rewards/RewardCard.jsx
import React from 'react';
import { Gift, DollarSign, BookOpen, CreditCard } from 'lucide-react';

// Icon mapping - maps icon names from database to actual icon components
const iconMap = {
  'Gift': Gift,
  'DollarSign': DollarSign,
  'BookOpen': BookOpen,
  'CreditCard': CreditCard,
};

const RewardCard = ({ reward }) => {
  // Get the icon component from the map, default to Gift if not found
  const Icon = iconMap[reward.icon_name] || Gift;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg">
      {/* Icon */}
      <div className={`w-16 h-16 ${reward.icon_bg_color} rounded-2xl flex items-center justify-center mb-4`}>
        <Icon className="w-8 h-8 text-gray-700" />
      </div>

      {/* Title */}
      <h3 className="text-[18px] font-bold text-gray-900 mb-3">
        {reward.title}
      </h3>

      {/* Description */}
      <p className="text-[18px] text-gray-600 mb-4 flex-grow leading-relaxed">
        {reward.description}
      </p>

      {/* Points */}
      <div className="flex items-center gap-1 text-purple-600 font-semibold mb-4">
        <span className="text-yellow-700">⭐</span>
        <span>{reward.points_required.toLocaleString()} pts</span>
      </div>

      {/* Status Button */}
      <button
        disabled={reward.status !== 'unlocked'}
        className={`w-full py-2.5 rounded-lg font-medium transition ${
          reward.status === 'unlocked'
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {reward.status === 'unlocked' && 'Redeem'}
        {reward.status === 'locked' && 'Locked'}
        {reward.status === 'coming-soon' && 'Coming Soon'}
      </button>
    </div>
  );
};

export default RewardCard;