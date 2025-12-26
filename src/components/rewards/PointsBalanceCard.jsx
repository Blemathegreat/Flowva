import { Award } from 'lucide-react';

const PointsBalanceCard = ({ pointsBalance, pointsGoal, progressPercentage }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className='bg-gray-100 p-6'>
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Points Balance</h3>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4 p-6">
        <span className="text-5xl font-bold text-gray-900">{pointsBalance}</span>
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
          <Award className="w-10 h-10 text-yellow-600" />
        </div>
      </div>
      <div className="space-y-2 p-6">
        <div className="flex justify-between text-[14px]">
          <span className="text-gray-600 font-semibold">Progress to <span className='text-gray-800 font-bold'>$5 Gift Card</span></span>
          <span className="font-bold text-gray-900">{pointsBalance}/{pointsGoal}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 flex items-center gap-1">📈 {pointsBalance > 0 ? 'Keep it up!' : 'Just getting started — keep earning points!'}</p>
      </div>
    </div>
  );
};

export default PointsBalanceCard;
