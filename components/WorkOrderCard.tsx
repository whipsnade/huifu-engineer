import React from 'react';
import { WorkOrder, OrderStatus } from '../types';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  Phone,
  PauseCircle,
  PlayCircle,
  CheckCircle,
  Wrench,
  BookOpen,
  Package,
  UserPlus,
  DollarSign,
  Calendar,
  Building2
} from 'lucide-react';

interface WorkOrderCardProps {
  order: WorkOrder;
  onAction: (action: string, order: WorkOrder) => void;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({ order, onAction }) => {
  const [timeLeft, setTimeLeft] = React.useState<number | null>(null);

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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  
  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    onAction(action, order);
  };

  const handleCallStore = (e: React.MouseEvent) => {
      e.stopPropagation();
      window.location.href = `tel:${order.storePhone}`;
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

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
    switch (status) {
      case OrderStatus.COMPLETED:
        return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case OrderStatus.IN_PROGRESS:
      case OrderStatus.ACCEPTED:
      case OrderStatus.DEPARTED:
      case OrderStatus.ARRIVED:
      case OrderStatus.REPAIRING:
        return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case OrderStatus.PENDING:
      case OrderStatus.TO_BE_VISITED:
        return 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
      default:
        return 'bg-primary-50 text-primary-700 border-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-800';
    }
  };

  const renderStatusBadge = () => {
    const styles = getPriorityColor(order.priority);
    const priorityText = {
      'Critical': '紧急',
      'High': '高',
      'Medium': '中',
      'Low': '低'
    }[order.priority] || order.priority;
    
    return (
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${styles}`}>
          {priorityText}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${getStatusColor(order.status)}`}>
          {getStatusLabel(order.status, order.statusLabel)}
        </span>
      </div>
    );
  };

  const renderActions = () => {
    const inProgressStatuses = [
        OrderStatus.IN_PROGRESS, OrderStatus.ACCEPTED, OrderStatus.STOP_METER_APPLIED,
        OrderStatus.STOP_METERING, OrderStatus.STOP_METER_REJECTED, OrderStatus.METER_OPENED,
        OrderStatus.TECH_UPGRADE_APPLIED, OrderStatus.TECH_EXPERT_SOLVING, OrderStatus.TECH_UPGRADE_REJECTED,
        OrderStatus.TRANSFERRED, OrderStatus.FEE_CHANGE_APPLIED, OrderStatus.FEE_CHANGED,
        OrderStatus.FEE_CHANGE_REJECTED, OrderStatus.RECEIPT_APPLIED, OrderStatus.RECEIPTED,
        OrderStatus.RECEIPT_REJECTED, OrderStatus.DEPARTED, OrderStatus.ARRIVED,
        OrderStatus.REPAIRING, OrderStatus.RESTART
    ];

    if (inProgressStatuses.includes(order.status)) {
        return (
            <div className="mt-4 grid grid-cols-4 gap-2">
              <button onClick={(e) => handleActionClick(e, 'pause')} className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform">
                <PauseCircle size={20} />
                <span className="text-[10px] font-bold">停表</span>
              </button>
              <button onClick={(e) => handleActionClick(e, 'guide')} className="col-span-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform">
                <BookOpen size={20} />
                <span className="text-[10px] font-bold">指南</span>
              </button>
               <button onClick={(e) => handleActionClick(e, 'parts')} className="col-span-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform">
                <Package size={20} />
                <span className="text-[10px] font-bold">配件</span>
              </button>
              <button onClick={(e) => handleActionClick(e, 'complete')} className="col-span-1 bg-green-600 hover:bg-green-700 text-white rounded-xl flex flex-col items-center justify-center py-2 gap-1 shadow-md active:scale-95 transition-transform">
                <CheckCircle size={20} />
                <span className="text-[10px] font-bold">完成</span>
              </button>
            </div>
          );
    }

    switch (order.status) {
      case OrderStatus.PENDING:
        return (
          <div className="mt-4 flex gap-3">
            <button 
              onClick={(e) => handleActionClick(e, 'reject')}
              className="w-1/3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center"
            >
              拒绝
            </button>
            <button 
              onClick={(e) => handleActionClick(e, 'accept')}
              className="w-2/3 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all"
            >
              <span>接单 {timeLeft !== null ? `(${formatTime(timeLeft)})` : ''}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        );

      case OrderStatus.TO_BE_VISITED:
        return (
          <div className="mt-4 flex gap-3">
             <button 
                onClick={(e) => handleActionClick(e, 'parts')}
                className="shrink-0 w-20 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform border border-orange-100"
             >
                <Package size={20} />
                <span className="text-[10px] font-bold">配件</span>
            </button>
            <button 
              onClick={(e) => handleActionClick(e, 'confirm_arrival')}
              className="flex-1 bg-white border-2 border-primary-600 text-primary-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-50 active:scale-[0.98] transition-all"
            >
              <MapPin size={18} />
              <span>确认到达</span>
            </button>
          </div>
        );

      case OrderStatus.IN_PROGRESS:
        return (
          <div className="mt-4 grid grid-cols-4 gap-2">
            <button onClick={(e) => handleActionClick(e, 'pause')} className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform">
              <PauseCircle size={20} />
              <span className="text-[10px] font-bold">停表</span>
            </button>
            <button onClick={(e) => handleActionClick(e, 'guide')} className="col-span-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform">
              <BookOpen size={20} />
              <span className="text-[10px] font-bold">指南</span>
            </button>
             <button onClick={(e) => handleActionClick(e, 'parts')} className="col-span-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl flex flex-col items-center justify-center py-2 gap-1 active:scale-95 transition-transform">
              <Package size={20} />
              <span className="text-[10px] font-bold">配件</span>
            </button>
            <button onClick={(e) => handleActionClick(e, 'complete')} className="col-span-1 bg-green-600 hover:bg-green-700 text-white rounded-xl flex flex-col items-center justify-center py-2 gap-1 shadow-md active:scale-95 transition-transform">
              <CheckCircle size={20} />
              <span className="text-[10px] font-bold">完成</span>
            </button>
          </div>
        );

      case OrderStatus.ON_HOLD:
        return (
          <button 
            onClick={(e) => handleActionClick(e, 'resume')}
            className="w-full mt-4 bg-slate-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-700 active:scale-[0.98] transition-all"
          >
            <PlayCircle size={18} />
            <span>恢复工作</span>
          </button>
        );

      case OrderStatus.AFTER_SALES:
        return (
           <div className="mt-4 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-slate-500 uppercase">状态</span>
                 <span className="text-sm font-semibold text-primary-700">{order.afterSalesStatus || '处理中'}</span>
              </div>
              <button 
                onClick={(e) => handleActionClick(e, 'support')}
                className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 text-sm"
              >
                <Phone size={16} />
                <span>联系客服</span>
              </button>
           </div>
        );

      default:
        return null;
    }
  };

  return (
    <article 
        onClick={() => { console.log(`[WorkOrderCard] Card clicked for order ${order.id}`); onAction('view', order); }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden transition-all hover:shadow-md cursor-pointer active:bg-slate-50"
    >
       
       {/* Top Right Actions (Call & Reassign) */}
       <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
           <button 
                onClick={handleCallStore}
                className="p-2 bg-slate-100 hover:bg-green-50 text-slate-500 hover:text-green-600 rounded-full transition-colors border border-transparent hover:border-green-200"
                title="联系门店"
           >
               <Phone size={18} />
           </button>
           
           {order.status === OrderStatus.IN_PROGRESS && (
             <button 
                onClick={(e) => handleActionClick(e, 'transfer')}
                className="p-2 text-slate-400 hover:text-primary-600 transition-colors"
                title="转派"
             >
                <UserPlus size={20} />
             </button>
           )}
       </div>

       {/* Company Name (Customer) at the very top */}
       <div className="flex items-center gap-1.5 mb-2 text-primary-600 dark:text-primary-400">
          <Building2 size={16} className="shrink-0" />
          <span className="text-xs font-bold tracking-wide">{order.customerName}</span>
          {order.isVIP && (
            <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[9px] font-black px-1.5 py-0.5 rounded-sm ml-1 tracking-wider border border-red-200 dark:border-red-800">VIP</span>
          )}
       </div>

       {/* Header */}
       <div className="flex justify-between items-start pr-16">
         <div>
            <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight truncate max-w-[200px]">{order.storeName}</h3>
                {renderStatusBadge()}
            </div>
            <p className="text-xs text-slate-500 font-medium">#{order.id} • {order.type}</p>
         </div>
       </div>

       {/* Content */}
       <div className="mt-4 flex gap-4">
          <div className="flex-1 space-y-3">
             <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug line-clamp-2">
                    {order.faultDescription}
                </p>
             </div>
             
             <button 
                onClick={(e) => handleActionClick(e, 'navigate')}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm hover:text-primary-600 transition-colors text-left group w-full"
             >
                <MapPin size={16} className="shrink-0 text-primary-600 group-hover:scale-110 transition-transform" />
                <span className="truncate underline decoration-slate-300 underline-offset-2 group-hover:decoration-primary-600">{order.address}</span>
             </button>

             <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">
                {order.cost !== undefined && (
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-emerald-600 dark:text-emerald-400">
                        <DollarSign size={12} />
                        <span>费用: ¥{order.cost.toFixed(2)}</span>
                    </div>
                )}
                {order.expectedOnSiteTime && (
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-blue-600 dark:text-blue-400">
                        <Calendar size={12} />
                        <span>预计: {order.expectedOnSiteTime}</span>
                    </div>
                )}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                    <Navigation size={12} />
                    <span>{order.distance}</span>
                </div>
                {order.startTime && (
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                        <Clock size={12} />
                        <span>开始于: {order.startTime}</span>
                    </div>
                )}
             </div>
          </div>
       </div>

       {renderActions()}

    </article>
  );
};

export default WorkOrderCard;