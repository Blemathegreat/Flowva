// src/hooks/useEarnPoints.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useEarnPoints = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // FIXED: Remove .single() and handle result manually
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId);

      if (error) throw error;

      // Check if we got a result
      if (!data || data.length === 0) {
        // User doesn't exist - create them automatically
        const { data: authUser } = await supabase.auth.getUser();
        
        if (authUser?.user) {
          const referralCode = `user${Math.floor(Math.random() * 10000)}`;
          
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({
              id: userId,
              email: authUser.user.email,
              full_name: authUser.user.user_metadata?.full_name || 'User',
              referral_code: referralCode,
              points_balance: 0,
              daily_streak: 0
            })
            .select();

          if (insertError) throw insertError;
          setUserData(newUser[0]); // Get first item from array
        } else {
          throw new Error('User not found');
        }
      } else {
        // User exists, use the first result
        setUserData(data[0]);
      }
      
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const claimDailyPoints = async () => {
    if (!userId || !userData) {
      return { success: false, message: 'User not found' };
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      const { data: checkIns, error: fetchError } = await supabase
        .from('daily_checkins')
        .select('*')
        .eq('user_id', userId);

      if (fetchError) {
        console.error('Error fetching check-ins:', fetchError);
        throw fetchError;
      }

      const existingCheckIn = checkIns?.find(c => c.check_in_date === today);

      if (existingCheckIn) {
        throw new Error('Already claimed today!');
      }

      const yesterdayCheckIn = checkIns?.find(c => c.check_in_date === yesterday);
      const newStreak = yesterdayCheckIn ? (userData.daily_streak || 0) + 1 : 1;

      const { error: checkInError } = await supabase
        .from('daily_checkins')
        .insert({
          user_id: userId,
          check_in_date: today,
          points_earned: 5
        });

      if (checkInError) {
        console.error('Error inserting check-in:', checkInError);
        throw checkInError;
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          points_balance: (userData.points_balance || 0) + 5,
          daily_streak: newStreak,
          last_check_in: today
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating user:', updateError);
        throw updateError;
      }

      await fetchUserData();
      return { success: true, message: 'Daily points claimed! +5 points' };
    } catch (error) {
      console.error('Check-in error:', error);
      return { success: false, message: error.message };
    }
  };

  const getWeeklyCheckIns = async () => {
    if (!userId) return Array(7).fill(false);

    try {
      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());

      const { data, error } = await supabase
        .from('daily_checkins')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error in getWeeklyCheckIns:', error);
        throw error;
      }

      const weekEnd = new Date(today);
      const filteredData = (data || []).filter(d => {
        const checkDate = new Date(d.check_in_date);
        return checkDate >= weekStart && checkDate <= weekEnd;
      });

      const completedDates = filteredData.map(d => d.check_in_date);
      const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getStart() + i);
        return completedDates.includes(date.toISOString().split('T')[0]);
      });

      return weekDays;
    } catch (error) {
      console.error('Error fetching weekly check-ins:', error);
      return Array(7).fill(false);
    }
  };

  const getReferralStats = async () => {
    if (!userId) return { referrals: 0, pointsEarned: 0 };

    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', userId);

      if (error) throw error;

      const referrals = data?.length || 0;
      const pointsEarned = (data || [])
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => sum + r.points_awarded, 0);

      return { referrals, pointsEarned };
    } catch (error) {
      console.error('Error fetching referral stats:', error);
      return { referrals: 0, pointsEarned: 0 };
    }
  };

  return {
    userData,
    loading,
    error,
    claimDailyPoints,
    getWeeklyCheckIns,
    getReferralStats,
    refetch: fetchUserData
  };
};