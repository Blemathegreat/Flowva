// src/hooks/useRewards.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useRewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('is_active', true)
        .order('points_required', { ascending: true });

      if (error) throw error;

      setRewards(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  return { rewards, loading, error, refetch: fetchRewards };
};

export const useUserPoints = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUserData(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, error, refetch: fetchUserData };
};

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setTransactions(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return { transactions, loading, error, refetch: fetchTransactions };
};

// Helper functions to get reward counts
export const getRewardsCounts = (rewards) => ({
  all: rewards.length,
  unlocked: rewards.filter(r => r.status === 'unlocked').length,
  locked: rewards.filter(r => r.status === 'locked').length,
  comingSoon: rewards.filter(r => r.status === 'coming-soon').length
});

// Helper function to filter rewards
export const filterRewards = (rewards, filter) => {
  if (filter === 'all') return rewards;
  if (filter === 'unlocked') return rewards.filter(r => r.status === 'unlocked');
  if (filter === 'locked') return rewards.filter(r => r.status === 'locked');
  if (filter === 'coming-soon') return rewards.filter(r => r.status === 'coming-soon');
  return rewards;
};