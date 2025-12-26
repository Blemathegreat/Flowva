import { Calendar, Zap } from 'lucide-react';

const DailyStreakCard = ({ dailyStreak, weekDays, weeklyCheckIns, handleClaimPoints, claiming }) => {
  return (
    <div className="bg-white rounded-lg shadow transition-transform transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg">
      <div className='p-6 bg-gray-100 rounded-t-lg'>
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-blue-500" />
          <h3 className="font-semibold text-gray-900">Daily Streak</h3>
        </div>
      </div>
      <div className="text-5xl font-bold text-purple-600 mb-4 p-6">{dailyStreak} {dailyStreak === 1 ? 'day' : 'days'}</div>
      <div className="flex gap-2 mb-4 px-6">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`flex-1 aspect-square rounded-full flex items-center justify-center text-sm font-semibold ${
              weeklyCheckIns[index]
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <p className="text-[24px] text-gray-600 text-center">Check in daily to earn +5 points</p>
      <div className='p-6 h-[150px]'>
        <button 
          onClick={handleClaimPoints}
          disabled={claiming}
          className={`w-full bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 ${
            claiming ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Zap className="w-5 h-5" />
          {claiming ? 'Claiming...' : "Claim Today's Points"}
        </button>
      </div>
    </div>
  );
};

export default DailyStreakCard;
