// src/components/rewards/RewardsHeader.jsx
import React from 'react';
import NotificationsDropdown from '../notification/NotificationsDropdown';

const RewardsHeader = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards Hub</h1>
          <p className="text-gray-600">
            Earn points, unlock rewards, and celebrate your progress!
          </p>
        </div>
        
        {/* Notification Bell with Dropdown */}
        <NotificationsDropdown />
      </div>

      <div className="flex gap-8 border-b border-gray-200">
        <button
          onClick={() => onTabChange('earn')}
          className={`pb-3 px-1 font-semibold transition ${
            activeTab === 'earn'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Earn Points
        </button>
        <button
          onClick={() => onTabChange('redeem')}
          className={`pb-3 px-1 font-semibold transition ${
            activeTab === 'redeem'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Redeem Rewards
        </button>
      </div>
    </div>
  );
};

export default RewardsHeader;