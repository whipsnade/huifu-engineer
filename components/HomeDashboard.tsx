import React from 'react';
import {
  Maximize,
  Headset,
  Bell,
  ChevronRight,
  ClipboardCheck,
  AlertTriangle,
  Clock,
  Medal,
  Award,
  Star,
  Building2,
  Phone,
  MapPin,
  Banknote,
  Calendar,
  Navigation,
  Scan,
  IdCard
} from 'lucide-react';
import { EngineerProfile, WorkOrder, OrderStatus } from '../types';
import WorkOrderCard from './WorkOrderCard';

interface HomeDashboardProps {
  profile: EngineerProfile;
  orders: WorkOrder[];
  onAction: (action: string, order: WorkOrder) => void;
  onAvatarClick: () => void;
  onChatClick: () => void;
  onScanClick: () => void;
  onWorkPermitClick: () => void;
  onViewMore: () => void;
  onViewApprovals?: () => void;
  onViewProfile?: () => void;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ profile, orders, onAction, onAvatarClick, onChatClick, onScanClick, onWorkPermitClick, onViewMore, onViewApprovals, onViewProfile }) => {
  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar bg-[#F8F9FC] dark:bg-slate-900 text-slate-900 dark:text-white antialiased pb-32 font-sans selection:bg-primary-500/20">
      {/* Header */}
      <header className="bg-[#F8F9FC]/80 dark:bg-slate-900/80 backdrop-blur-[20px] sticky top-0 z-50 w-full">
        <div className="flex justify-between items-center w-full px-6 pt-12 pb-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={onAvatarClick} className="relative w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 shadow-sm border-2 border-transparent hover:border-primary-500 transition-colors">
              <img 
                alt="User Profile" 
                className="w-full h-full object-cover rounded-full" 
                src={profile.avatarUrl}
              />
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#F8F9FC] dark:border-slate-900 ${profile.isOnline ? 'bg-green-500' : 'bg-slate-400'}`}></div>
            </button>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-0.5">Hi~上午好</span>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-none">{profile.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onWorkPermitClick} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" title="电子上岗证">
              <IdCard className="w-4 h-4" />
            </button>
            <button onClick={onScanClick} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" title="扫一扫">
              <Scan className="w-4 h-4" />
            </button>
            <button onClick={onChatClick} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white relative" title="客服">
              <Headset className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse border border-white dark:border-slate-900"></span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-8 max-w-3xl mx-auto">
        {/* Notification Banner */}
        <section className="bg-orange-50 dark:bg-orange-900/10 p-2.5 rounded-[1rem] flex items-center justify-between active:opacity-70 transition-opacity cursor-pointer border border-orange-100 dark:border-orange-900/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center relative shrink-0">
              <Bell className="w-4 h-4 text-orange-500 dark:text-orange-400 fill-current" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-[2px] border-[#F8F9FC] dark:border-slate-900"></div>
            </div>
            <div>
              <p className="text-orange-700 dark:text-orange-300 font-bold text-xs leading-tight mb-0.5">工程师已指派: 王师傅 已接单 (...</p>
              <p className="text-[10px] text-orange-500 dark:text-orange-400 opacity-80 font-medium">点击查看详细进度</p>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 shrink-0" />
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-2 gap-3">
          <div 
            className="col-span-1 bg-white dark:bg-slate-800 p-4 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-32 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            onClick={onViewMore}
          >
            <div className="flex justify-between items-start">
              <ClipboardCheck className="w-5 h-5 text-primary-600 dark:text-primary-400 mb-2" />
              <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-1.5 py-0.5 rounded-full shadow-sm">
                <AlertTriangle className="w-2.5 h-2.5 font-bold fill-current" />
                <span className="text-[9px] font-bold">3</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5 tracking-tight">12</p>
              <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">我的工单</p>
            </div>
          </div>
          <div 
            className="col-span-1 bg-white dark:bg-slate-800 p-4 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-32 cursor-pointer active:scale-[0.98] transition-transform"
            onClick={onViewApprovals}
          >
            <Clock className="w-5 h-5 text-orange-500 dark:text-orange-400 mb-2" />
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5 tracking-tight">04</p>
              <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">我的审核</p>
            </div>
          </div>
        </section>

        {/* My Achievements */}
        <section className="space-y-3">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold tracking-tight leading-none">我的战绩</h2>
              <div className="flex items-center gap-1 cursor-pointer" onClick={onViewProfile}>
                <span className="text-slate-500 dark:text-slate-400 text-xs">了解更多</span>
                <button className="text-slate-400 hover:text-primary-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-4 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full flex items-center justify-end px-2" style={{ width: '86%' }}>
                  <span className="text-[10px] text-white font-bold leading-none">82/95 工单</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="py-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                  <span className="font-bold text-sm">98</span>
                  <Medal className="w-3 h-3 text-primary-600/70 dark:text-primary-400/70" />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">信用分</span>
              </div>
              <div className="py-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                  <span className="font-bold text-sm">4.9</span>
                  <Award className="w-3 h-3 text-primary-600/70 dark:text-primary-400/70" />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">满意度</span>
              </div>
              <div className="py-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                  <span className="font-bold text-sm">￥888</span>
                  <Star className="w-3 h-3 text-primary-600/70 dark:text-primary-400/70" />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">收入</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tasks Square */}
        <section className="space-y-3">
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight leading-none">任务广场</h2>
              <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-full text-[10px] font-bold">{orders.filter(o => o.status === OrderStatus.PENDING).length}</div>
            </div>
            <button onClick={onViewMore} className="text-primary-600 dark:text-primary-400 text-[10px] font-bold flex items-center gap-1 hover:opacity-80 transition-opacity">
              查看更多 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-3">
            {orders.filter(o => o.status === OrderStatus.PENDING).length > 0 ? (
              orders.filter(o => o.status === OrderStatus.PENDING).map(order => (
                <WorkOrderCard key={order.id} order={order} onAction={onAction} />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
                暂无待接单任务
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomeDashboard;
