import { Star, Share2 } from 'lucide-react';

const EarnMoreSection = () => {
  return (
    <div className='md:w-3/4'>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">Earn More Points</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-gray-200 overflow-hidden transition-transform transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg">
          <div className="bg-white p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Refer and win 10,000 points!</h3>
            </div>
          </div>
          <div className="bg-gray-50 p-6 pt-4">
            <p className="text-gray-600 text-[18px] leading-[145%]">Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of <span className="text-purple-600 font-semibold">10,000 points</span>. Friends must complete onboarding to qualify.</p>
          </div>
        </div>
        <div className="rounded-lg border border-purple-100 overflow-hidden transition-transform transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg">
          <div className="bg-white p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Share Your Stack</h3>
                  <p className="text-sm text-gray-500">Earn +25 pts</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 pt-4 flex items-center justify-between">
            <p className="text-gray-600 text-sm">Share your tool stack</p>
            <button className="text-purple-600 bg-blue-50 rounded-full px-4 py-4 font-semibold flex items-center gap-2 hover:bg-blue-700 transition">
              <Share2 className="w-6 h-6" />Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnMoreSection;
