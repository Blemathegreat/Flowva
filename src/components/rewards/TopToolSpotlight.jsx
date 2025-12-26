import { Users, Calendar } from 'lucide-react';

const TopToolSpotlight = ({ onOpenClaimModal }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-gradient-to-br from-purple-600 to-blue-400 p-6">
        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">Featured</span>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Top Tool Spotlight</h3>
          <div className="w-14 h-14 bg-blue-900 rounded-lg flex items-center justify-center p-2">
            <div className="w-full h-full rounded bg-blue-800 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-4">Reclaim</h4>
        <div className="flex items-start gap-3 mb-3">
          <div className="mt-1">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Automate and Optimize Your Schedule</h5>
            <p className="text-gray-600 text-sm">Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!</p>
          </div>
        </div>
        <div className='h-1 bg-gray-50'></div>
        <div className="flex gap-3 justify-between mt-6">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2">
            <Users className="w-4 h-4" />
            Sign up
          </button>
          <button 
            onClick={onOpenClaimModal}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Claim 50 pts
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopToolSpotlight;
