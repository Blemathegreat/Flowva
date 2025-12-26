// src/components/rewards/EarnPointsTab.jsx
import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { useEarnPoints } from '../../hooks/useEarnPoints';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import ClaimToolPointsModal from '../modal/ClaimToolPointsModal';
import PointsBalanceCard from './PointsBalanceCard';
import DailyStreakCard from './DailyStreakCard';
import TopToolSpotlight from './TopToolSpotlight';
import EarnMoreSection from './EarnMoreSection';
import ReferEarnSection from './ReferEarnSection';
import 'react-toastify/dist/ReactToastify.css';

import DailyPointsModal from './DailyPointsModal';


const EarnPointsTab = () => {
  const { user } = useAuth(); // Get authenticated user
  const userId = user?.id; // Get user ID from auth context
  
  const {
    userData,
    loading,
    error,
    claimDailyPoints,
    getWeeklyCheckIns,
    getReferralStats
  } = useEarnPoints(userId);

  const [weeklyCheckIns, setWeeklyCheckIns] = useState(Array(7).fill(false));
  const [referralStats, setReferralStats] = useState({ referrals: 0, pointsEarned: 0 });
  const [copied, setCopied] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const pointsGoal = 5000;
  const referralLink = `https://app.flowahub.com/signup?ref=${userData?.referral_code || 'invite'}`;

  useEffect(() => {
    if (userId) {
      loadWeeklyData();
      loadReferralStats();
    }
  }, [userId]);

  const loadWeeklyData = async () => {
    const weekData = await getWeeklyCheckIns();
    setWeeklyCheckIns(weekData);
  };

  const loadReferralStats = async () => {
    const stats = await getReferralStats();
    setReferralStats(stats);
  };

  const handleClaimPoints = async () => {
    console.log('Claiming points for user:', userId);
    console.log('Current user data:', userData);
    
    setClaiming(true);
    const result = await claimDailyPoints();
    
    console.log('Claim result:', result);
    
    if (result.success) {
      setShowSuccessModal(true);
      await loadWeeklyData();
    } else {
      toast.error('❌ ' + result.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    setClaiming(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('📋 Referral link copied!', {
      position: "bottom-center",
      autoClose: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform) => {
    const message = 'Join me on FlowvaHub!';
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${referralLink}`,
      twitter: `https://twitter.com/intent/tweet?url=${referralLink}&text=${message}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${referralLink}`,
      whatsapp: `https://wa.me/?text=${message} ${referralLink}`
    };
    window.open(urls[platform], '_blank');
  };

  // Show loading while checking auth
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Please log in to view your rewards</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading your rewards data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  const pointsBalance = userData?.points_balance || 0;
  const dailyStreak = userData?.daily_streak || 0;
  const progressPercentage = (pointsBalance / pointsGoal) * 100;

  return (
    <>
      <ToastContainer />
      <DailyPointsModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        points={5}
        streak={userData?.daily_streak || 1}
      />
      <ClaimToolPointsModal 
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        userId={userId}
        toolName="Reclaim"
        pointsReward={50}
      />
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">Your Rewards Journey</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PointsBalanceCard pointsBalance={pointsBalance} pointsGoal={pointsGoal} progressPercentage={progressPercentage} />
            <DailyStreakCard dailyStreak={dailyStreak} weekDays={weekDays} weeklyCheckIns={weeklyCheckIns} handleClaimPoints={handleClaimPoints} claiming={claiming} />
            <TopToolSpotlight onOpenClaimModal={() => setShowClaimModal(true)} />
          </div>
        </section>

        <section className='w-full'>
          <EarnMoreSection />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">Refer & Earn</h2>
          <ReferEarnSection referralStats={referralStats} referralLink={referralLink} copyToClipboard={copyToClipboard} copied={copied} shareOnSocial={shareOnSocial} />
        </section>
      </div>
    </>
  );
};

export default EarnPointsTab;