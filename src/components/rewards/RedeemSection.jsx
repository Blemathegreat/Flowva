// src/components/rewards/RedeemSection.jsx
import React, { useState } from 'react';
import { useRewards, getRewardsCounts, filterRewards } from '../../hooks/useRewards';
import RewardCard from './RewardCard';

const RedeemSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { rewards, loading, error } = useRewards();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading rewards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-semibold mb-2">Error loading rewards</p>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  const filteredRewards = filterRewards(rewards, activeTab);
  const counts = getRewardsCounts(rewards);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">
        Redeem Your Points
      </h2>

      {/* Tab Navigation - Responsive */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-8">
        <div className="flex gap-2 sm:gap-6 min-w-max sm:min-w-full pb-0">
          <TabButton
            label="All Rewards"
            count={counts.all}
            isActive={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          />
          <TabButton
            label="Unlocked"
            count={counts.unlocked}
            isActive={activeTab === 'unlocked'}
            onClick={() => setActiveTab('unlocked')}
          />
          <TabButton
            label="Locked"
            count={counts.locked}
            isActive={activeTab === 'locked'}
            onClick={() => setActiveTab('locked')}
          />
          <TabButton
            label="Coming Soon"
            count={counts.comingSoon}
            isActive={activeTab === 'coming-soon'}
            onClick={() => setActiveTab('coming-soon')}
          />
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map(reward => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>

      {/* Empty State */}
      {filteredRewards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No rewards available in this category.</p>
        </div>
      )}
    </div>
  );
};

// Tab Button Component
const TabButton = ({ label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`pb-3 px-2 sm:px-1 font-medium transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base ${
      isActive ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {label}
    <span className={`text-xs px-2 py-0.5 rounded-full ${
      isActive ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
    }`}>
      {count}
    </span>
  </button>
);

export default RedeemSection;