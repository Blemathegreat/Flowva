// src/components/modals/ClaimToolPointsModal.jsx
import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-toastify';

const ClaimToolPointsModal = ({ isOpen, onClose, userId, toolName = "Reclaim", pointsReward = 50 }) => {
  const [email, setEmail] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setScreenshot(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !screenshot) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubmitting(true);

    try {
      // In a real implementation, you would:
      // 1. Upload the screenshot to Supabase Storage
      // 2. Save the claim record to a 'tool_claims' table
      // 3. Award points after verification

      // For now, let's create a tool_claims record
      const { error: claimError } = await supabase
        .from('tool_claims')
        .insert({
          user_id: userId,
          tool_name: toolName,
          email_used: email,
          points_claimed: pointsReward,
          status: 'pending', // Will be verified by admin
          screenshot_filename: screenshot.name,
          created_at: new Date().toISOString()
        });

      if (claimError) {
        // If table doesn't exist, show a different message
        if (claimError.code === '42P01') {
          toast.info('Tool claims feature is being set up. Please try again later.');
        } else {
          throw claimError;
        }
      } else {
        toast.success(`🎉 Claim submitted! You'll receive ${pointsReward} points after verification.`);
        
        // Reset form
        setEmail('');
        setScreenshot(null);
        setScreenshotPreview(null);
        onClose();
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      toast.error('Failed to submit claim. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setScreenshot(null);
    setScreenshotPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 transform transition-all">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Claim Your {pointsReward} Points
        </h2>

        <p className="text-gray-600 mb-6">
          Sign up for {toolName} (free, no payment needed), then fill the form below:
        </p>

        {/* Instructions */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
              1
            </div>
            <p className="text-gray-700">
              Enter your {toolName} sign-up email.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
              2
            </div>
            <p className="text-gray-700">
              Upload a screenshot of your {toolName} profile showing your email. 
              After verification, you'll get {pointsReward} Flowva Points! 🎉 😊
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email used on {toolName}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload screenshot (mandatory)
            </label>
            
            {screenshotPreview ? (
              <div className="relative">
                <img 
                  src={screenshotPreview} 
                  alt="Screenshot preview" 
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setScreenshot(null);
                    setScreenshotPreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-gray-50 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Choose file</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !email || !screenshot}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Claim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimToolPointsModal;