import React, { useMemo, useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronRight, BarChart2, Crown, Sparkles, Star } from 'lucide-react';
import RatingRecords from './RatingRecords';

interface RatingRankingProps {
  onBack: () => void;
}

const NAMES = ['陈晓明', '林美玲', '王力宏', '赵丽颖', '李现', '迪丽热巴', '刘德华', '周杰伦', '张学友', '郭富城', '黎明', '梁朝伟', '张曼玉', '林青霞', '关之琳', '王祖贤', '周润发', '成龙', '李连杰', '甄子丹', '吴京', '张震', '彭于晏', '胡歌', '霍建华', '吴磊', '刘昊然', '易烊千玺', '王俊凯', '王源', '肖战', '王一博', '杨洋', '李易峰', '张艺兴', '黄子韬', '鹿晗', '吴亦凡', '蔡徐坤', '范丞丞', '黄明昊', '朱正廷', '王子异', '小鬼', '陈立农', '林彦俊', '尤长靖', '蔡依林', '孙燕姿', '梁静茹'];

const RankIcon = ({ rank }: { rank: number }) => {
    if (rank === 1) return <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center"><Star className="w-3.5 h-3.5 text-white fill-white" /></div>;
    if (rank === 2) return <div className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center"><Star className="w-3.5 h-3.5 text-white fill-white" /></div>;
    if (rank === 3) return <div className="w-6 h-6 rounded-full bg-[#f68b33] flex items-center justify-center"><Star className="w-3.5 h-3.5 text-white fill-white" /></div>;
    return <span className="font-bold text-slate-700 dark:text-slate-300 w-6 text-center">{rank}</span>;
}

const RatingRanking: React.FC<RatingRankingProps> = ({ onBack }) => {
  const [isRatingRecordsOpen, setIsRatingRecordsOpen] = useState(false);

  const rankingData = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      // Create decreasing scores
      const score = 384 - Math.floor(i * (100 / 50));
      return {
        rank: i + 1,
        name: NAMES[i] || `工程师_${i + 1}`,
        score: score,
        avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
        isMe: i === 6 // 7th place is "刘德华"
      };
    });
  }, []);

  return (
    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-900 flex flex-col overflow-y-auto no-scrollbar animate-in slide-in-from-right-8 duration-300 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 pt-10 flex items-center justify-between border-b border-transparent">
        <button onClick={onBack} className="p-2 -ml-2 text-[#f68b33]">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">评分排名</h1>
        <div className="w-10"></div>
      </header>

      {/* Content */}
      <div className="px-4 pb-32 space-y-5">
        {/* Top Card */}
        <div className="relative pt-4">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 dark:from-orange-600 dark:to-orange-900 rounded-[2.5rem] -z-10 mt-2 h-[190px] opacity-90 shadow-lg shadow-orange-500/20"></div>
            
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 mx-3 mt-6 shadow-md relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-orange-300/30 to-amber-200/30 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-xl pointer-events-none"></div>

                <div 
                  onClick={() => setIsRatingRecordsOpen(true)}
                  className="absolute right-4 top-4 flex items-center text-orange-500 dark:text-orange-400 text-xs font-bold cursor-pointer px-2.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 transition-colors z-10"
                >
                    <span>评价详情</span>
                    <ChevronRight size={14} className="ml-0.5" />
                </div>
                
                <div className="flex flex-col items-center justify-center mt-4 mb-2 relative z-10">
                    <div className="relative mb-5 group">
                        <div className="absolute inset-0 bg-orange-400 blur-md opacity-30 rounded-full group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20 flex items-center justify-center shadow-inner border border-white/50 dark:border-white/5 pointer-events-none">
                            <Crown className="w-7 h-7 text-orange-500 dark:text-orange-400 drop-shadow-sm" strokeWidth={2.5} />
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 absolute -top-1 -right-1" />
                        </div>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 font-medium text-[13px] tracking-wide mb-1">满意度总分</span>
                    <div className="flex items-baseline gap-1">
                        <div className="text-[40px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-amber-500 dark:from-orange-400 dark:to-orange-200 tracking-tight">
                            279
                        </div>
                        <span className="text-orange-500 font-bold text-sm">分</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Middle Card */}
        <div className="bg-white dark:bg-slate-800 rounded-[1.5rem] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-[0.8rem] bg-[#fdf3eb] dark:bg-[#fdf3eb]/10 flex items-center justify-center shrink-0">
                    <BarChart2 className="w-6 h-6 text-[#d95c14]" strokeWidth={2.5} />
                </div>
                <div>
                     <p className="text-[13px] text-slate-600 dark:text-slate-400 mb-1">满意度排名</p>
                     <p className="text-slate-900 dark:text-white font-bold">第 <span className="text-[#a54300] dark:text-[#f68b33] mx-0.5">7</span> 名</p>
                </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/50 text-[10px] text-slate-500">
                统计维度: 2026年02月15日-2026年09月01日
            </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-6">
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">排行榜</h3>
                <span className="text-[13px] font-bold text-[#0f7684] dark:text-teal-400">前 50 名</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
                {rankingData.map((user, index) => (
                    <div key={user.rank} className={`flex items-center px-5 py-4 ${user.isMe ? 'bg-[#fdf8f3] dark:bg-orange-900/10' : ''} ${index !== rankingData.length - 1 ? 'border-b border-slate-50 dark:border-slate-700/50' : ''}`}>
                        <div className="w-8 flex justify-center shrink-0">
                            <RankIcon rank={user.rank} />
                        </div>
                        <div className="flex items-center gap-3 ml-3 flex-1">
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={`font-bold text-[15px] ${user.isMe ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {user.name}
                                </span>
                                {user.isMe && (
                                    <span className="bg-[#f68b33] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">我</span>
                                )}
                            </div>
                        </div>
                        <div className="font-bold text-[#833800] dark:text-[#f68b33] text-[15px]">
                            {user.score}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {isRatingRecordsOpen && (
        <RatingRecords onBack={() => setIsRatingRecordsOpen(false)} />
      )}
    </div>
  );
};

export default RatingRanking;
