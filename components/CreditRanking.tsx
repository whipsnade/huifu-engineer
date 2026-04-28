import React, { useMemo, useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronRight, BarChart2, ShieldCheck, Sparkles, Star } from 'lucide-react';

interface CreditRankingProps {
  onBack: () => void;
}

const NAMES = ['陈晓明', '林美玲', '王力宏', '赵丽颖', '李现', '迪丽热巴', '刘德华', '周杰伦', '张学友', '郭富城', '黎明', '梁朝伟', '张曼玉', '林青霞', '关之琳', '王祖贤', '周润发', '成龙', '李连杰', '甄子丹', '吴京', '张震', '彭于晏', '胡歌', '霍建华', '吴磊', '刘昊然', '易烊千玺', '王俊凯', '王源', '肖战', '王一博', '杨洋', '李易峰', '张艺兴', '黄子韬', '鹿晗', '吴亦凡', '蔡徐坤', '范丞丞', '黄明昊', '朱正廷', '王子异', '小鬼', '陈立农', '林彦俊', '尤长靖', '蔡依林', '孙燕姿', '梁静茹'];

const RankIcon = ({ rank }: { rank: number }) => {
    if (rank === 1) return <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center"><Star className="w-3.5 h-3.5 text-white fill-white" /></div>;
    if (rank === 2) return <div className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center"><Star className="w-3.5 h-3.5 text-white fill-white" /></div>;
    if (rank === 3) return <div className="w-6 h-6 rounded-full bg-[#f68b33] flex items-center justify-center"><Star className="w-3.5 h-3.5 text-white fill-white" /></div>;
    return <span className="font-bold text-slate-700 dark:text-slate-300 w-6 text-center">{rank}</span>;
}

const CreditRanking: React.FC<CreditRankingProps> = ({ onBack }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const rankingData = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      // Create decreasing scores close to 100
      const score = 100 - Math.floor(i * (20 / 50));
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
        <button onClick={onBack} className="p-2 -ml-2 text-blue-500">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">信用排名</h1>
        <button className="p-2 -mr-2 text-blue-500" onClick={() => setIsInfoModalOpen(true)}>
          <HelpCircle size={24} />
        </button>
      </header>

      {/* Content */}
      <div className="px-4 pb-32 space-y-5">
        {/* Top Card */}
        <div className="relative pt-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 dark:from-blue-600 dark:to-blue-900 rounded-[2.5rem] -z-10 mt-2 h-[190px] opacity-90 shadow-lg shadow-blue-500/20"></div>
            
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 mx-3 mt-6 shadow-md relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-indigo-200/30 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-xl pointer-events-none"></div>

                <div className="absolute right-4 top-4 flex items-center text-blue-500 dark:text-blue-400 text-xs font-bold cursor-pointer px-2.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 transition-colors z-10">
                    <span>评价详情</span>
                    <ChevronRight size={14} className="ml-0.5" />
                </div>
                
                <div className="flex flex-col items-center justify-center mt-4 mb-2 relative z-10">
                    <div className="relative mb-5 group">
                        <div className="absolute inset-0 bg-blue-400 blur-md opacity-30 rounded-full group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20 flex items-center justify-center shadow-inner border border-white/50 dark:border-white/5 pointer-events-none">
                            <ShieldCheck className="w-7 h-7 text-blue-500 dark:text-blue-400 drop-shadow-sm" strokeWidth={2.5} />
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400 absolute -top-1 -right-1" />
                        </div>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 font-medium text-[13px] tracking-wide mb-1">信用总分</span>
                    <div className="flex items-baseline gap-1">
                        <div className="text-[40px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-blue-200 tracking-tight">
                            98
                        </div>
                        <span className="text-blue-500 font-bold text-sm">分</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Middle Card */}
        <div className="bg-white dark:bg-slate-800 rounded-[1.5rem] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-[0.8rem] bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <BarChart2 className="w-6 h-6 text-blue-500" strokeWidth={2.5} />
                </div>
                <div>
                     <p className="text-[13px] text-slate-600 dark:text-slate-400 mb-1">信用排名</p>
                     <p className="text-slate-900 dark:text-white font-bold">第 <span className="text-blue-600 dark:text-blue-400 mx-0.5">7</span> 名</p>
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
                    <div key={user.rank} className={`flex items-center px-5 py-4 ${user.isMe ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''} ${index !== rankingData.length - 1 ? 'border-b border-slate-50 dark:border-slate-700/50' : ''}`}>
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
                                    <span className="bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">我</span>
                                )}
                            </div>
                        </div>
                        <div className="font-bold text-blue-600 dark:text-blue-400 text-[15px]">
                            {user.score}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Info Modal */}
      {isInfoModalOpen && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsInfoModalOpen(false)} />
          <div className="relative bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-xl w-[270px] rounded-[14px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-4 pt-5 pb-4 flex flex-col items-center text-center">
              <h3 className="font-semibold text-[17px] text-black dark:text-white mb-2 tracking-tight">评分基于用户真实评价计算</h3>
              <div className="text-[13px] leading-[1.35] text-black/70 dark:text-white/70 space-y-2">
                <p>
                  评分是综合多个维度建立的评估体系，致力于以客户的角度，“真实”、“公允”地衡量工程师的服务水平。
                </p>
                <p>
                  评分更新时间，每天更新
                </p>
              </div>
            </div>
            <div className="border-t border-black/10 dark:border-white/10 flex">
              <button 
                onClick={() => setIsInfoModalOpen(false)} 
                className="flex-1 py-2.5 text-[17px] text-[#007AFF] dark:text-[#0A84FF] font-semibold active:bg-black/5 dark:active:bg-white/5 transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditRanking;
