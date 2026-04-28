import React from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { WorkOrder, OrderStatus } from '../types';
import WorkOrderCard from './WorkOrderCard';

interface ApprovalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: WorkOrder[];
  onAction: (action: string, order: WorkOrder) => void;
}

const ApprovalsModal: React.FC<ApprovalsModalProps> = ({ isOpen, onClose, orders, onAction }) => {
  if (!isOpen) return null;

  const approvalStatuses = [
    OrderStatus.STOP_METER_APPLIED,
    OrderStatus.TECH_UPGRADE_APPLIED,
    OrderStatus.FEE_CHANGE_APPLIED,
    OrderStatus.RECEIPT_APPLIED
  ];

  const approvalOrders = orders.filter(order => approvalStatuses.includes(order.status));

  return (
    <div className="absolute inset-0 z-[100] bg-[#F8F9FC] dark:bg-slate-900 flex flex-col font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-4 py-4 pt-12 border-b border-slate-200/80 dark:border-slate-800/80">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white absolute left-1/2 -translate-x-1/2">
          我的审核
        </h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        <div className="flex items-center justify-between shrink-0 mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            待审核工单
          </h2>
          <button className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {approvalOrders.length} Total
          </button>
        </div>

        {approvalOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
              <CheckCircle size={48} className="text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-lg font-medium">暂无待审核工单</p>
          </div>
        ) : (
          approvalOrders.map(order => (
            <WorkOrderCard 
              key={order.id} 
              order={order} 
              onAction={onAction} 
            />
          ))
        )}
        <div className="h-8"></div>
      </main>
    </div>
  );
};

export default ApprovalsModal;
