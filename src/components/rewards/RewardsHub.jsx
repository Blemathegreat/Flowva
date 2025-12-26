import React, { useState } from 'react';
import RewardsHeader from './RewardsHeader';
import EarnPointsTab from './EarnPointsTab';
import RedeemRewardsTab from './RedeemRewardsTab';


const RewardsHub = () => {
  const [activeTab, setActiveTab] = useState('earn');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto">
        <RewardsHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        {activeTab === 'earn' ? (
          <EarnPointsTab />
        ) : (
          <RedeemRewardsTab />
        )}
      </div>
    </div>
  );
};

export default RewardsHub;
