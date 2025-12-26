// src/components/modals/DailyPointsModal.jsx
import React from 'react';
import { X } from 'lucide-react';

const DailyPointsModal = ({ isOpen, onClose, points = 5, streak = 1 }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          <span className="text-purple-600">Level Up!</span>{' '}
          <span className="text-2xl">🎉</span>
        </h2>

        {/* Points */}
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-purple-600 mb-2">
            +{points} Points
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <span>✨</span>
            <span>💎</span>
            <span>🎯</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-center text-gray-600 text-lg">
          You've claimed your daily points! Come back tomorrow for more!
        </p>

        {/* Streak Info (Optional) */}
        {streak > 1 && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
            <span className="text-purple-600 font-semibold">
              🔥 {streak} Day Streak!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyPointsModal;