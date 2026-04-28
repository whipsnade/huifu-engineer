import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Clock, Calendar, AlertTriangle, 
  Phone, Navigation, CheckSquare, Package, FileText,
  ChevronRight, MoreVertical, Star, User, Paperclip,
  Image as ImageIcon, Film, Play, X, Building2, DollarSign,
  Zap, UserPlus, PauseCircle, BookOpen, Headset, Share2
} from 'lucide-react';
import { WorkOrder, OrderStatus, Attachment } from '../types';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import FeeDetailsTab from './FeeDetailsTab';

interface WorkOrderDetailProps {
  order: WorkOrder;
  onBack: () => void;
  onAction: (action: string, order: WorkOrder, data?: any) => void;
  initialTab?: 'overview' | 'tasks' | 'sla' | 'timeline' | 'parts' | 'fee';
  isSharedView?: boolean;
}

const WorkOrderDetail: React.FC<WorkOrderDetailProps> = ({ order, onBack, onAction, initialTab = 'overview', isSharedView = false }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'sla' | 'timeline' | 'parts' | 'fee'>(initialTab as any);
  const [showToast, setShowToast] = useState(false);
  
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?shareWorkOrder=${order.id}`;
    navigator.clipboard.writeText(url).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    }).catch((err) => {
        console.error('Failed to copy', err);
    });
  };

  const [viewingAttachment, setViewingAttachment] = useState<Attachment | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const scrollRef1 = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  const scrollRef3 = useHorizontalScroll();

  const isReadOnlyStatus = [
    OrderStatus.TO_BE_ACCEPTED,
    OrderStatus.PENDING_PAYMENT,
    OrderStatus.TO_BE_REVIEWED,
    OrderStatus.COMPLETED,
    OrderStatus.ARCHIVED
  ].includes(order.status);

  const tasksList = ['核对电源', '检查错误代码', '检查物理损坏', '测试运行'];
  const [completedTasks, setCompletedTasks] = useState<number[]>(() => {
      try {
          const stored = localStorage.getItem(`wo_tasks_${order.id}`);
          return stored ? JSON.parse(stored) : [0];
      } catch {
          return [0];
      }
  });

  React.useEffect(() => {
      try {
          const stored = localStorage.getItem(`wo_tasks_${order.id}`);
          setCompletedTasks(stored ? JSON.parse(stored) : [0]);
      } catch {
          setCompletedTasks([0]);
      }
  }, [order.id]);

  const toggleTask = (index: number) => {
      if (isReadOnlyStatus || isSharedView) return;
      setCompletedTasks(prev => {
          const next = prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
          localStorage.setItem(`wo_tasks_${order.id}`, JSON.stringify(next));
          return next;
      });
  };

  const [timeLeft, setTimeLeft] = React.useState<number | null>(null);
  const [canWithdraw, setCanWithdraw] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (order.status === OrderStatus.PENDING && order.dispatchTime) {
      const calculateTimeLeft = () => {
        const dispatchTime = new Date(order.dispatchTime!).getTime();
        const expiryTime = dispatchTime + 5 * 60 * 1000;
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000));
        setTimeLeft(remaining);
      };

      calculateTimeLeft();
      const interval = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(interval);
    } else {
      setTimeLeft(null);
    }
  }, [order.status, order.dispatchTime]);

  React.useEffect(() => {
    if (order.status === OrderStatus.TO_BE_ACCEPTED && order.submittedForAcceptanceAt) {
      const checkWithdraw = () => {
        const now = Date.now();
        const diff = now - order.submittedForAcceptanceAt!;
        setCanWithdraw(diff < 60000);
      };

      checkWithdraw();
      const interval = setInterval(checkWithdraw, 1000);
      return () => clearInterval(interval);
    } else {
      setCanWithdraw(false);
    }
  }, [order.status, order.submittedForAcceptanceAt]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    console.log('[WorkOrderDetail] Mounted for order:', order.id);
    return () => console.log('[WorkOrderDetail] Unmounted for order:', order.id);
  }, [order.id]);

  const getStatusLabel = (status: OrderStatus, customLabel?: string) => {
    if (customLabel) return customLabel;
    switch (status) {
      case OrderStatus.PENDING: return '待接单';
      case OrderStatus.TO_BE_VISITED: return '待上门';
      case OrderStatus.IN_PROGRESS: return '处理中';
      case OrderStatus.RESTART: return '重启';
      case OrderStatus.TO_BE_ACCEPTED: return '待验收';
      case OrderStatus.PENDING_PAYMENT: return '待付款';
      case OrderStatus.TO_BE_REVIEWED: return '待评价';
      case OrderStatus.COMPLETED: return '已完成';
      case OrderStatus.ACCEPTED: return '已接单';
      case OrderStatus.STOP_METER_APPLIED: return '申请停表';
      case OrderStatus.STOP_METERING: return '停表中';
      case OrderStatus.STOP_METER_REJECTED: return '停表拒绝';
      case OrderStatus.METER_OPENED: return '已开表';
      case OrderStatus.TECH_UPGRADE_APPLIED: return '申请技术升级';
      case OrderStatus.TECH_EXPERT_SOLVING: return '技术专家解决中';
      case OrderStatus.TECH_UPGRADE_REJECTED: return '技术升级拒绝';
      case OrderStatus.TRANSFERRED: return '已转单';
      case OrderStatus.FEE_CHANGE_APPLIED: return '申请费用变更';
      case OrderStatus.FEE_CHANGED: return '费用已变更';
      case OrderStatus.FEE_CHANGE_REJECTED: return '费用变更拒绝';
      case OrderStatus.RECEIPT_APPLIED: return '申请回单';
      case OrderStatus.RECEIPTED: return '已回单';
      case OrderStatus.RECEIPT_REJECTED: return '回单拒绝';
      case OrderStatus.DEPARTED: return '已出发';
      case OrderStatus.ARRIVED: return '已到达';
      case OrderStatus.REPAIRING: return '到店维修中';
      case OrderStatus.CLOSED: return '已关闭';
      case OrderStatus.ARCHIVED: return '已归档';
      case OrderStatus.CANCELLED: return '已取消';
      default: return status;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
      const inProgressStatuses = [
        OrderStatus.IN_PROGRESS, OrderStatus.ACCEPTED, OrderStatus.STOP_METER_APPLIED,
        OrderStatus.STOP_METERING, OrderStatus.STOP_METER_REJECTED, OrderStatus.METER_OPENED,
        OrderStatus.TECH_UPGRADE_APPLIED, OrderStatus.TECH_EXPERT_SOLVING, OrderStatus.TECH_UPGRADE_REJECTED,
        OrderStatus.TRANSFERRED, OrderStatus.FEE_CHANGE_APPLIED, OrderStatus.FEE_CHANGED,
        OrderStatus.FEE_CHANGE_REJECTED, OrderStatus.RECEIPT_APPLIED, OrderStatus.RECEIPTED,
        OrderStatus.RECEIPT_REJECTED, OrderStatus.DEPARTED, OrderStatus.ARRIVED,
        OrderStatus.REPAIRING, OrderStatus.RESTART
      ];

      if (inProgressStatuses.includes(status)) return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';

      switch (status) {
          case OrderStatus.PENDING: 
          case OrderStatus.TO_BE_VISITED: 
              return 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
          case OrderStatus.COMPLETED: 
              return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
          case OrderStatus.CLOSED:
          case OrderStatus.ARCHIVED:
          case OrderStatus.CANCELLED:
              return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
          default: return 'bg-primary-50 text-primary-700 border-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-800';
      }
  };

  const getSLAStatusColor = (status?: string, isTimedOut?: boolean) => {
    if (status === 'Timeout' || isTimedOut) {
        return 'text-white bg-red-500 border-red-600 shadow-sm';
    }
    switch (status) {
        case 'Warning': return 'text-orange-600 bg-orange-50 border-orange-100';
        default: return 'text-green-600 bg-green-50 border-green-100';
    }
  };

  const getSLARemainingTime = (expiryTime?: string, status?: string) => {
    if (status === 'Timeout') return '已超时';
    if (!expiryTime) return '正常';
    
    try {
      const now = new Date();
      const expiry = new Date(expiryTime.replace(' ', 'T'));
      const diff = expiry.getTime() - now.getTime();
      
      if (diff <= 0) return '已超时';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      let result = '剩余';
      if (days > 0) result += `${days}天`;
      if (hours > 0 || days > 0) result += `${hours}小时`;
      result += `${minutes}分`;
      
      return result;
    } catch (e) {
      return '正常';
    }
  };

  const slaTimeText = getSLARemainingTime(order.slaExpiryTime, order.slaStatus);
  const isSLATimedOut = slaTimeText === '已超时';

  return (
    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Toast */}
      {showToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[70] bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckSquare size={16} className="text-emerald-400" />
          分享链接已复制到剪贴板
        </div>
      )}

      {/* Navbar */}
      <div className="bg-white dark:bg-slate-900 px-4 pt-12 pb-3 flex items-center justify-between shadow-sm z-10 border-b border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => { console.log('[WorkOrderDetail] Back button clicked'); onBack(); }} 
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-800 dark:text-white" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">工单详情</h1>
        <div className="flex items-center gap-1 -mr-2">
          {!isSharedView && (
             <button 
               onClick={handleShare}
               className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-500 dark:text-blue-400 transition-colors"
               title="分享工单"
             >
               <Share2 size={24} />
             </button>
          )}
          <button 
            onClick={() => onAction('guide', order)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-orange-500 dark:text-orange-400 transition-colors"
            title="查看指南"
          >
            <BookOpen size={24} />
          </button>
          <button 
            onClick={() => onAction('support', order)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-primary-600 dark:text-primary-400 transition-colors"
            title="咨询客服"
          >
            <Headset size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        
        {/* Header Card */}
        <div className="bg-white dark:bg-slate-900 p-5 pb-0 mb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status, order.statusLabel)}
                        </div>
                        <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-full border border-primary-100 dark:border-primary-800/50">
                            <Building2 size={12} />
                            <span className="text-xs font-bold">{order.customerName}</span>
                        </div>
                        {order.slaStatus && (
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black border shadow-sm ${getSLAStatusColor(order.slaStatus, isSLATimedOut)}`}>
                                <Clock size={12} className="mr-1" />
                                【SLA：{slaTimeText}】
                            </div>
                        )}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-1">{order.storeName}</h2>
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
                        <span>#{order.id}</span>
                        {order.storeNumber && <span>• 编号: {order.storeNumber}</span>}
                    </div>
                </div>
                {/* Priority Icon */}
                <div className={`p-2 rounded-lg ${order.priority === 'Critical' ? 'bg-red-100' : 'bg-slate-100'} `}>
                    <AlertTriangle className={order.priority === 'Critical' ? 'text-red-500' : 'text-slate-500'} size={24} />
                </div>
            </div>

            {/* Address & Navigation Row */}
            <div className="flex gap-3 mb-6">
                <button 
                    onClick={() => onAction('navigate', order)}
                    className="flex-1 text-left flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl active:bg-slate-100 dark:active:bg-slate-800 transition-all border border-slate-100 dark:border-slate-700 group shadow-sm"
                >
                    <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg group-hover:scale-110 transition-transform">
                        <MapPin className="text-primary-600" size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 leading-tight">{order.address}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-black text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-1.5 py-0.5 rounded uppercase tracking-tighter">距离 {order.distance}</span>
                            <span className="text-[10px] font-bold text-slate-400">• 点击查看路径</span>
                        </div>
                    </div>
                </button>
                <button 
                    onClick={() => onAction('navigate', order)}
                    className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-primary-900/20 active:scale-95 transition-all group"
                    title="地图导航"
                >
                    <Navigation size={22} className="group-hover:rotate-12 transition-transform" />
                    <span className="text-[8px] font-black mt-1 uppercase">导航</span>
                </button>
            </div>
            
            {/* Contact Info moved here */}
             <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                          <User size={20} />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">用户联系电话</p>
                          <p className="text-xs text-slate-500">{order.storePhone}</p>
                      </div>
                  </div>
                  <a 
                     href={`tel:${order.storePhone}`}
                     className="p-2.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
                  >
                      <Phone size={20} />
                  </a>
             </div>

             {/* Core Actions */}
             {order.status !== OrderStatus.PENDING && (
               <div className="mb-8">
                   <div className="flex items-center justify-between mb-3 px-1">
                       <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">我的操作</h3>
                       <span className="text-[10px] text-slate-400 italic">左右滑动查看更多</span>
                   </div>
                   <div ref={scrollRef1} className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                       <button disabled={isReadOnlyStatus} onClick={() => onAction('respond', order)} className={`flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm min-w-[140px] flex-shrink-0 transition-all ${isReadOnlyStatus ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 group'}`}>
                           <div className={`w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-400 ${!isReadOnlyStatus && 'group-hover:rotate-12'} transition-transform`}>
                               <Zap size={20} />
                           </div>
                           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">响应</span>
                       </button>
                       <button disabled={isReadOnlyStatus} onClick={() => onAction('transfer', order)} className={`flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm min-w-[140px] flex-shrink-0 transition-all ${isReadOnlyStatus ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 group'}`}>
                           <div className={`w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-400 ${!isReadOnlyStatus && 'group-hover:rotate-12'} transition-transform`}>
                               <UserPlus size={20} />
                           </div>
                           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">转派</span>
                       </button>
                       <button disabled={isReadOnlyStatus} onClick={() => onAction(order.status === OrderStatus.DEPARTED ? 'arrive' : 'depart', order)} className={`flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm min-w-[140px] flex-shrink-0 transition-all ${isReadOnlyStatus ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 group'}`}>
                           <div className={`w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-400 ${!isReadOnlyStatus && 'group-hover:rotate-12'} transition-transform`}>
                               {order.status === OrderStatus.DEPARTED ? <MapPin size={20} /> : <Navigation size={20} />}
                           </div>
                           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                               {order.status === OrderStatus.DEPARTED ? '到店' : '出发'}
                           </span>
                       </button>
                       <button disabled={isReadOnlyStatus} onClick={() => onAction('pause', order)} className={`flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm min-w-[140px] flex-shrink-0 transition-all ${isReadOnlyStatus ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 group'}`}>
                           <div className={`w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-400 ${!isReadOnlyStatus && 'group-hover:rotate-12'} transition-transform`}>
                               <PauseCircle size={20} />
                           </div>
                           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">停表</span>
                       </button>
                       <button disabled={isReadOnlyStatus} onClick={() => onAction('return_order', order)} className={`flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm min-w-[140px] flex-shrink-0 transition-all ${isReadOnlyStatus ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 group'}`}>
                           <div className={`w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-400 ${!isReadOnlyStatus && 'group-hover:rotate-12'} transition-transform`}>
                               <FileText size={20} />
                           </div>
                           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">回单</span>
                       </button>
                       <button disabled={isReadOnlyStatus} onClick={() => onAction('tech_upgrade', order)} className={`flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm min-w-[140px] flex-shrink-0 transition-all ${isReadOnlyStatus ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 group'}`}>
                           <div className={`w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-500 dark:text-purple-400 ${!isReadOnlyStatus && 'group-hover:rotate-12'} transition-transform`}>
                               <Zap size={20} />
                           </div>
                           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">技术升级</span>
                       </button>
                       <button disabled={isReadOnlyStatus} onClick={() => onAction('parts', order)} className={`flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm min-w-[140px] flex-shrink-0 transition-all ${isReadOnlyStatus ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 group'}`}>
                           <div className={`w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-400 ${!isReadOnlyStatus && 'group-hover:rotate-12'} transition-transform`}>
                               <Package size={20} />
                           </div>
                           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">配件</span>
                       </button>
                   </div>
               </div>
             )}

            {/* Tabs Header */}
            <div ref={scrollRef2} className="flex gap-8 overflow-x-auto no-scrollbar">
                {(isSharedView ? ['overview', 'tasks', 'sla'] : ['overview', 'tasks', 'sla', 'timeline', 'parts', 'fee']).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-3 text-sm font-bold capitalize transition-colors relative whitespace-nowrap ${
                            activeTab === tab 
                            ? 'text-primary-600 dark:text-primary-400' 
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                    >
                        {tab === 'overview' ? '概览' : tab === 'tasks' ? '任务' : tab === 'sla' ? 'SLA' : tab === 'timeline' ? '过程' : tab === 'parts' ? '配件' : '费用'}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 space-y-4">
            {activeTab === 'overview' && (
                <>
                    {/* Key Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-2">
                                <DollarSign size={20} className="text-emerald-600" />
                            </div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">费用</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white">¥{order.cost?.toFixed(2) || '0.00'}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-2">
                                <Clock size={20} className="text-blue-600" />
                            </div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">预计工时</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white">{order.estimatedDuration || '未设置'}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-2">
                                <Calendar size={20} className="text-orange-600" />
                            </div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">派单时间</p>
                            <p className="text-sm font-black text-slate-900 dark:text-white">{order.dispatchTime || '未设置'}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-2">
                                <AlertTriangle size={20} className="text-red-600" />
                            </div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">SLA到期</p>
                            <p className="text-sm font-black text-slate-900 dark:text-white">{order.slaExpiryTime || '未设置'}</p>
                        </div>
                    </div>

                    {/* Expected Visit Time */}
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 shadow-sm border border-primary-200 dark:border-primary-800 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">期待上门时间</span>
                        </div>
                        <span className="text-sm font-bold text-primary-700 dark:text-primary-300">{order.expectedOnSiteTime || '未设置'}</span>
                    </div>

                    {/* Description */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">案件描述</h3>
                        <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium">
                            {order.faultDescription}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <h4 className="text-xs font-bold text-slate-400 mb-3">报修图片/视频</h4>
                            {order.attachments && order.attachments.length > 0 ? (
                                <div ref={scrollRef3} className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                    {order.attachments.map((att) => (
                                        <button 
                                            key={att.id}
                                            onClick={() => setViewingAttachment(att)}
                                            className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 group border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                                        >
                                            <img 
                                                src={att.thumbnailUrl || att.url} 
                                                alt="Attachment" 
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                {att.type === 'video' ? (
                                                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                                                        <Play size={14} className="ml-0.5 fill-white" />
                                                    </div>
                                                ) : (
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ImageIcon size={20} className="text-white drop-shadow-md" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                                    <ImageIcon size={18} />
                                    <span className="text-sm">暂无报修图片/视频</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detailed Info List */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
                        <div className="p-4 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase">用户品牌</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{order.brand || '未设置'}</span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase">报修人</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{order.reporter || '未设置'}</span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase">报修分类</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{order.type}</span>
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase">设备信息</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">{order.equipmentInfo || '未设置'}</span>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'tasks' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">服务清单</h3>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{completedTasks.length}/{tasksList.length} 已完成</span>
                     </div>
                     <div className="space-y-4">
                         {tasksList.map((task, i) => {
                             const isCompleted = completedTasks.includes(i);
                             return (
                             <div key={i} onClick={() => toggleTask(i)} className={`flex items-start gap-3 group ${isReadOnlyStatus || isSharedView ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
                                 <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isCompleted ? 'bg-primary-600 border-primary-600 text-white' : `border-slate-300 dark:border-slate-600 ${(!isReadOnlyStatus && !isSharedView) && 'group-hover:border-primary-500'}`}`}>
                                     {isCompleted && <CheckSquare size={12} />}
                                 </div>
                                 <span className={`text-sm ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>{task}</span>
                             </div>
                         )})}
                     </div>
                </div>
            )}

            {activeTab === 'sla' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">SLA达标情况</h3>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${order.slaStatus === 'Timeout' ? 'text-red-600 bg-red-50' : order.slaStatus === 'Warning' ? 'text-amber-600 bg-amber-50' : 'text-green-600 bg-green-50'}`}>{order.slaStatus === 'Timeout' ? '已超时' : order.slaStatus === 'Warning' ? '警告' : '正常'}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-400">约定SLA</span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">2小时响应 / 4小时到店 / 24小时完成</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-400">响应SLA</span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">已达标 (耗时 15 分钟)</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                <CheckSquare size={16} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-400">到店SLA</span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">已达标 (耗时 1.5 小时)</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                <CheckSquare size={16} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-400">完成SLA</span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">进行中 (剩余 18.5 小时)</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <Clock size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'timeline' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">操作过程信息</h3>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">全流程留痕</span>
                    </div>
                    <div className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800 ml-2 space-y-10">
                        {order.timeline && order.timeline.length > 0 ? (
                            order.timeline.map((event, i) => (
                                <div key={event.id} className="relative">
                                    <div className={`absolute -left-[41px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm ${i === 0 ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-slate-400'}`} />
                                    </div>
                                    <div className="flex justify-between items-start mb-1.5">
                                        <h4 className={`text-sm font-black ${i === 0 ? 'text-primary-600' : 'text-slate-900 dark:text-white'}`}>{event.type}</h4>
                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{event.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{event.description}</p>
                                    {(() => {
                                        const hasLegacyEvidence = !!event.evidenceUrl;
                                        const attachments = event.attachments || (hasLegacyEvidence ? [{ id: event.id, type: 'image' as const, url: event.evidenceUrl! }] : []);
                                        const hasAttachments = attachments.length > 0;
                                        const isExpanded = expandedEvents[event.id];

                                        if (!hasAttachments) return null;

                                        if (attachments.length === 1) {
                                            return (
                                                <button 
                                                    onClick={() => setViewingAttachment(attachments[0])}
                                                    className="relative w-32 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 group active:scale-95 transition-transform"
                                                >
                                                    <img src={attachments[0].url} alt="Evidence" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                                                        <ImageIcon size={16} className="text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <div className="absolute bottom-1 right-1 bg-black/40 backdrop-blur-sm text-[8px] text-white px-1.5 py-0.5 rounded-full">
                                                        查看证据
                                                    </div>
                                                </button>
                                            );
                                        }

                                        if (!isExpanded) {
                                            return (
                                                <button 
                                                    onClick={() => setExpandedEvents(prev => ({ ...prev, [event.id]: true }))}
                                                    className="relative w-32 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 group active:scale-95 transition-transform"
                                                >
                                                    <img src={attachments[0].url} alt="Evidence" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center transition-colors group-hover:bg-black/50">
                                                        <span className="text-white font-bold text-lg">+{attachments.length - 1}</span>
                                                        <span className="text-white/90 text-[8px] mt-1 px-2 text-center leading-tight">点击展开可查看多个内容</span>
                                                    </div>
                                                </button>
                                            );
                                        }

                                        return (
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                    {attachments.map((att) => (
                                                        <button
                                                            key={att.id}
                                                            onClick={() => setViewingAttachment(att)}
                                                            className="relative aspect-video rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 group active:scale-95 transition-transform"
                                                        >
                                                            <img src={att.url} alt="Evidence" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                            <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                                                                <ImageIcon size={16} className="text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => setExpandedEvents(prev => ({ ...prev, [event.id]: false }))}
                                                    className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline"
                                                >
                                                    收起附件
                                                </button>
                                            </div>
                                        );
                                    })()}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <Clock size={40} className="text-slate-200 mx-auto mb-3" />
                                <p className="text-slate-400 text-sm font-bold">暂无操作记录</p>
                                <p className="text-slate-300 text-xs mt-1">工单执行后将自动记录关键节点</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'parts' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 text-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Package size={32} />
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">暂无配件订单</p>
                    <p className="text-slate-400 text-xs mb-4">您可以从仓库申请配件</p>
                    <button disabled={isReadOnlyStatus} onClick={() => onAction('parts', order)} className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-all ${isReadOnlyStatus ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' : 'bg-slate-900 dark:bg-slate-700 text-white shadow-slate-900/10'}`}>
                        打开配件目录
                    </button>
                </div>
            )}

            {activeTab === 'fee' && (
                <FeeDetailsTab order={order} onSubmit={(data) => onAction('submit_fee', order, data)} readOnly={isReadOnlyStatus} />
            )}

        </div>
      </div>
        
      {/* Bottom Action Button (Contextual) */}
      {!isSharedView && (
      <div className="bg-white dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-slate-800 pb-8 shrink-0">
            {order.status === OrderStatus.PENDING ? (
                <div className="flex gap-3">
                    <button 
                        onClick={() => onAction('reject', order)}
                        className="w-1/3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3.5 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center"
                    >
                        拒绝
                    </button>
                    <button 
                        onClick={() => onAction('accept', order)}
                        className="w-2/3 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        确认接单 {timeLeft !== null ? `(${formatTime(timeLeft)})` : ''}
                    </button>
                </div>
            ) : (
                <div className="flex gap-3">
                    <button 
                        onClick={() => {
                            // Quick Action logic based on status
                            if (order.status === OrderStatus.TO_BE_VISITED) onAction('confirm_arrival', order);
                            else if (order.status === OrderStatus.TO_BE_REVIEWED) onAction('evaluate', order);
                            else if (order.status === OrderStatus.TO_BE_ACCEPTED || order.status === OrderStatus.PENDING_PAYMENT || order.status === OrderStatus.COMPLETED || order.status === OrderStatus.ARCHIVED) return; // Disabled
                            else if (order.status === OrderStatus.IN_PROGRESS || [
                                OrderStatus.ACCEPTED, OrderStatus.STOP_METER_APPLIED, OrderStatus.STOP_METERING,
                                OrderStatus.STOP_METER_REJECTED, OrderStatus.METER_OPENED, OrderStatus.TECH_UPGRADE_APPLIED,
                                OrderStatus.TECH_EXPERT_SOLVING, OrderStatus.TECH_UPGRADE_REJECTED, OrderStatus.TRANSFERRED,
                                OrderStatus.FEE_CHANGE_APPLIED, OrderStatus.FEE_CHANGED, OrderStatus.FEE_CHANGE_REJECTED,
                                OrderStatus.RECEIPT_APPLIED, OrderStatus.RECEIPTED, OrderStatus.RECEIPT_REJECTED,
                                OrderStatus.DEPARTED, OrderStatus.ARRIVED, OrderStatus.REPAIRING, OrderStatus.RESTART
                            ].includes(order.status)) onAction('complete', order);
                            else onAction('support', order);
                        }}
                        disabled={order.status === OrderStatus.TO_BE_ACCEPTED || order.status === OrderStatus.PENDING_PAYMENT || order.status === OrderStatus.COMPLETED || order.status === OrderStatus.ARCHIVED}
                        className={`w-full font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                            order.status === OrderStatus.TO_BE_ACCEPTED || order.status === OrderStatus.PENDING_PAYMENT || order.status === OrderStatus.COMPLETED || order.status === OrderStatus.ARCHIVED
                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none dark:bg-slate-800 dark:text-slate-500'
                                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-900/20'
                        }`}
                    >
                        {order.status === OrderStatus.TO_BE_VISITED ? '确认到达' : 
                         order.status === OrderStatus.TO_BE_REVIEWED ? '待评价' : 
                         order.status === OrderStatus.TO_BE_ACCEPTED ? '等待用户验收' :
                         order.status === OrderStatus.PENDING_PAYMENT ? '等待用户付款' :
                         order.status === OrderStatus.COMPLETED ? '工单已完成' :
                         order.status === OrderStatus.ARCHIVED ? '工单已归档' :
                         (order.status === OrderStatus.IN_PROGRESS || [
                            OrderStatus.ACCEPTED, OrderStatus.STOP_METER_APPLIED, OrderStatus.STOP_METERING,
                            OrderStatus.STOP_METER_REJECTED, OrderStatus.METER_OPENED, OrderStatus.TECH_UPGRADE_APPLIED,
                            OrderStatus.TECH_EXPERT_SOLVING, OrderStatus.TECH_UPGRADE_REJECTED, OrderStatus.TRANSFERRED,
                            OrderStatus.FEE_CHANGE_APPLIED, OrderStatus.FEE_CHANGED, OrderStatus.FEE_CHANGE_REJECTED,
                            OrderStatus.RECEIPT_APPLIED, OrderStatus.RECEIPTED, OrderStatus.RECEIPT_REJECTED,
                            OrderStatus.DEPARTED, OrderStatus.ARRIVED, OrderStatus.REPAIRING, OrderStatus.RESTART
                        ].includes(order.status)) ? '完成工单' : '联系客服'}
                    </button>
                    {order.status === OrderStatus.TO_BE_ACCEPTED && canWithdraw && (
                        <button
                            onClick={() => onAction('withdraw_completion', order)}
                            className="bg-white dark:bg-slate-800 border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-bold px-6 py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-all flex-shrink-0"
                        >
                            撤回
                        </button>
                    )}
                </div>
            )}
      </div>
      )}

      {/* Media Viewer Modal (Lightbox) */}
      {viewingAttachment && (
          <div className="absolute inset-0 z-50 bg-black flex items-center justify-center animate-in fade-in duration-200">
              {/* Close Button */}
              <button 
                  onClick={() => setViewingAttachment(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
              >
                  <X size={24} />
              </button>

              {/* Content */}
              <div className="w-full h-full flex items-center justify-center p-2">
                  {viewingAttachment.type === 'video' ? (
                      <video 
                          src={viewingAttachment.url} 
                          controls 
                          autoPlay 
                          className="max-w-full max-h-full rounded-lg shadow-2xl"
                      />
                  ) : (
                      <img 
                          src={viewingAttachment.url} 
                          alt="Attachment" 
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      />
                  )}
              </div>
          </div>
      )}

    </div>
  );
}

export default WorkOrderDetail;