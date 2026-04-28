import React, { useState } from 'react';
import { 
  ChevronLeft, Sparkles, Award, Medal, TrendingUp, ChevronUp, ChevronDown, 
  Star, FileText, LineChart, BarChart2, ChevronRight, CheckCircle2, Clock, 
  Wrench, ShieldCheck, Search, X, HelpCircle, ArrowLeft
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import RatingRanking from './RatingRanking';

import CreditRanking from './CreditRanking';

interface ProfileDashboardProps {
  onMenuClick?: () => void;
}

const RATING_TREND_DATA = [
  { month: '10月', rating: 4.6 },
  { month: '11月', rating: 4.7 },
  { month: '12月', rating: 4.8 },
  { month: '1月', rating: 4.7 },
  { month: '2月', rating: 4.8 },
  { month: '3月', rating: 4.9 },
];

const CREDIT_TREND_DATA = [
  { month: '10月', score: 92 },
  { month: '11月', score: 94 },
  { month: '12月', score: 95 },
  { month: '1月', score: 96 },
  { month: '2月', score: 95 },
  { month: '3月', score: 98 },
];

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ onMenuClick }) => {
  const [isRatingTrendOpen, setIsRatingTrendOpen] = useState(false);
  const [isCreditTrendOpen, setIsCreditTrendOpen] = useState(false);
  const [isRatingRankingOpen, setIsRatingRankingOpen] = useState(false);
  const [isCreditRankingOpen, setIsCreditRankingOpen] = useState(false);

  if (isRatingRankingOpen) {
    return <RatingRanking onBack={() => setIsRatingRankingOpen(false)} />;
  }

  if (isCreditRankingOpen) {
    return <CreditRanking onBack={() => setIsCreditRankingOpen(false)} />;
  }

  return (
    <div className="flex-1 w-full bg-[#F8F9FC] dark:bg-slate-900 text-slate-900 dark:text-white font-sans overflow-y-auto no-scrollbar pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-5 py-4 pt-12 w-full">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">我的战绩</h1>
        </div>
      </header>

      <main className="px-6 space-y-6 mt-4">
        {/* Regional Ranking */}
        <section>
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 p-6 min-h-[140px] flex flex-col justify-center rounded-[2rem] shadow-sm border border-amber-200/50 dark:border-amber-700/30">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-amber-700 dark:text-amber-400 text-[11px] font-extrabold uppercase tracking-[0.2em] mb-1">大区排名</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-black text-amber-900 dark:text-amber-100 tracking-tighter">3<span className="text-2xl">rd</span></h2>
                  <span className="text-sm font-semibold text-amber-700/70 dark:text-amber-400/70">名</span>
                </div>
                <p className="mt-2 text-xs font-medium text-amber-800/80 dark:text-amber-200/80 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  高级认证工程师
                </p>
                <p className="mt-1.5 text-[10px] opacity-75 text-amber-800/70 dark:text-amber-300/70">每月1号排名自动刷新</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400 blur-2xl opacity-20 rounded-full animate-pulse"></div>
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <Award className="w-16 h-16 text-amber-500 drop-shadow-lg fill-amber-500" />
                  <Star className="w-6 h-6 text-amber-200 fill-amber-200 absolute top-[17px] left-1/2 -translate-x-1/2" />
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
              <div className="relative">
                <Award className="w-32 h-32 fill-amber-500" />
                <Star className="w-12 h-12 fill-amber-500 absolute top-[19px] left-1/2 -translate-x-1/2" />
              </div>
            </div>
          </div>
        </section>

        {/* SLA Achievement Rate */}
        <section>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-xs mb-1">SLA 达标率</p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">98.5%</h2>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +1.2%
              </div>
            </div>
            
            <div className="h-24 w-full flex items-end gap-1.5 mb-6 relative">
              <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-t-md h-[60%]"></div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-t-md h-[75%]"></div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-t-md h-[70%]"></div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-t-md h-[85%]"></div>
              <div className="flex-1 bg-primary-100 dark:bg-primary-900/50 rounded-t-md h-[92%]"></div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-t-md h-[80%]"></div>
              <div className="flex-1 bg-primary-500 rounded-t-md h-[98%]"></div>
              <div className="absolute -bottom-5 left-0 w-full flex justify-between text-[9px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-tighter">
                <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="text-center">
                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">响应</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">99%</p>
                <div className="flex items-center justify-center text-[9px] text-emerald-500 mt-0.5">
                  <ChevronUp className="w-3 h-3" />
                  <span>0.5%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">到达</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">97%</p>
                <div className="flex items-center justify-center text-[9px] text-red-500 mt-0.5">
                  <ChevronDown className="w-3 h-3" />
                  <span>1.2%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">完成</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">99.5%</p>
                <div className="flex items-center justify-center text-[9px] text-emerald-500 mt-0.5">
                  <ChevronUp className="w-3 h-3" />
                  <span>2.1%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Rating */}
        <section>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-xs mb-1">客户评分</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4.9<span className="text-sm text-slate-400 font-normal">/5.0</span></h2>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => setIsRatingTrendOpen(true)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <LineChart className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">评分趋势</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-active:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsRatingRankingOpen(true)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <BarChart2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">评分排名</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-active:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Credit Score */}
        <section>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-xs mb-1">信用评分</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">98<span className="text-sm text-slate-400 font-normal">/极好</span></h2>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => setIsCreditTrendOpen(true)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <LineChart className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">信用趋势</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-active:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsCreditRankingOpen(true)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <BarChart2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">信用排名</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-active:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Tasks Completed */}
        <section>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                  <CheckCircle2 className="text-primary-600 dark:text-primary-400 w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">已完成任务Top5</h3>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mt-0.5">累计</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">196</p>
                <p className="text-[9px] text-primary-600 dark:text-primary-400 font-bold">总计</p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1.5 px-0.5">
                  <span className="text-slate-600 dark:text-slate-400">POS 终端</span>
                  <span className="text-slate-900 dark:text-white">68</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1.5 px-0.5">
                  <span className="text-slate-600 dark:text-slate-400">打印机</span>
                  <span className="text-slate-900 dark:text-white">45</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-400 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1.5 px-0.5">
                  <span className="text-slate-600 dark:text-slate-400">服务器</span>
                  <span className="text-slate-900 dark:text-white">43</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-300 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1.5 px-0.5">
                  <span className="text-slate-600 dark:text-slate-400">收银机</span>
                  <span className="text-slate-900 dark:text-white">25</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: '13%', backgroundColor: '#a5b4fc' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1.5 px-0.5">
                  <span className="text-slate-600 dark:text-slate-400">钱箱</span>
                  <span className="text-slate-900 dark:text-white">15</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: '8%', backgroundColor: '#c7d2fe' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-28">
            <div className="flex items-center justify-between">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">活跃</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">180h</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">在线时长</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-28">
            <div className="flex items-center justify-between">
              <Wrench className="w-4 h-4 text-orange-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">效率</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">45m</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">平均解决时间</p>
            </div>
          </div>
        </section>
      </main>

      {/* Rating Trend Modal */}
      {isRatingTrendOpen && (
        <div className="absolute inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsRatingTrendOpen(false)} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300 pb-6">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">评分趋势 (近半年)</h3>
              <button 
                onClick={() => setIsRatingTrendOpen(false)} 
                className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={RATING_TREND_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }} 
                      dy={10}
                    />
                    <YAxis 
                      domain={[4.0, 5.0]} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }} 
                      tickCount={6}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#f59e0b" 
                      strokeWidth={4} 
                      dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#f59e0b' }} 
                      activeDot={{ r: 6, fill: '#f59e0b' }} 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credit Trend Modal */}
      {isCreditTrendOpen && (
        <div className="absolute inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCreditTrendOpen(false)} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300 pb-6">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">信用趋势 (近半年)</h3>
              <button 
                onClick={() => setIsCreditTrendOpen(false)} 
                className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={CREDIT_TREND_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }} 
                      dy={10}
                    />
                    <YAxis 
                      domain={[70, 100]} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }} 
                      tickCount={6}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={4} 
                      dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#3b82f6' }} 
                      activeDot={{ r: 6, fill: '#3b82f6' }} 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
