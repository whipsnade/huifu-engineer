import React, { useState } from 'react';
import { ChevronLeft, Star, Wallet, ArrowRightLeft, Wrench, CreditCard, Headset } from 'lucide-react';
import CustomerServiceModal from './CustomerServiceModal';
import WithdrawModal from './WithdrawModal';

interface PaymentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat?: () => void;
}

const PaymentManagementModal: React.FC<PaymentManagementModalProps> = ({ isOpen, onClose, onOpenChat }) => {
  const [isCustomerServiceOpen, setCustomerServiceOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);
  const availableBalance = 541.34;

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[110] flex flex-col bg-[#F4F6F8] dark:bg-slate-900 font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-center px-5 py-4 pt-12 w-full bg-[#F4F6F8] dark:bg-slate-900">
        <button onClick={onClose} className="absolute left-5 p-2 -ml-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">支付管理</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-5 pt-4 pb-8 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-400 to-orange-600 rounded-[2.5rem] p-8 text-white shadow-[0_24px_48px_-12px_rgba(255,149,0,0.35)] flex flex-col justify-between min-h-[200px] overflow-hidden">
          <div className="relative z-10 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Star className="w-[18px] h-[18px]" />
              </div>
              <p className="text-sm font-semibold text-white/90 tracking-widest uppercase">我的余额</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold tracking-tighter drop-shadow-sm">541.34</span>
            </div>
          </div>
          <div className="relative z-10 flex justify-end items-center mt-4">
            <span className="text-xs font-medium text-white/80 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm cursor-pointer hover:bg-black/30 transition-colors">了解分数</span>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        </section>

        {/* Quick Actions */}
        <section className="flex justify-center">
          <button 
            onClick={() => setWithdrawOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold py-4 rounded-2xl shadow-sm active:scale-[0.98] transition-all hover:shadow-md"
          >
            <Wallet className="w-5 h-5 text-orange-500" />
            <span>提现</span>
          </button>
        </section>

        {/* Transaction History */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">余额变动明细</h2>
            <button className="text-sm font-medium text-[#007AFF] hover:opacity-80 transition-opacity">查看全部</button>
          </div>
          <div className="space-y-3">
            <TransactionItem
              icon={<ArrowRightLeft className="w-6 h-6" />}
              iconBg="bg-green-100 dark:bg-green-900/30"
              iconColor="text-green-600 dark:text-green-400"
              title="收入"
              date="2026-01-07 09:18:16"
              amount="+503.24"
              amountColor="text-green-600 dark:text-green-400"
              balance="1124.66"
            />
            <TransactionItem
              icon={<Wrench className="w-6 h-6" />}
              iconBg="bg-orange-50 dark:bg-orange-900/30"
              iconColor="text-orange-500 dark:text-orange-400"
              title="提现"
              date="2026-01-06 14:22:10"
              amount="-100.00"
              amountColor="text-slate-900 dark:text-white"
              balance="621.42"
            />
            <TransactionItem
              icon={<Wallet className="w-6 h-6" />}
              iconBg="bg-green-100 dark:bg-green-900/30"
              iconColor="text-green-600 dark:text-green-400"
              title="收入"
              date="2026-01-05 10:05:45"
              amount="+200.00"
              amountColor="text-green-600 dark:text-green-400"
              balance="721.42"
            />
            <TransactionItem
              icon={<CreditCard className="w-6 h-6" />}
              iconBg="bg-orange-50 dark:bg-orange-900/30"
              iconColor="text-orange-500 dark:text-orange-400"
              title="提现"
              date="2026-01-04 18:30:22"
              amount="-300.00"
              amountColor="text-slate-900 dark:text-white"
              balance="521.42"
            />
          </div>
        </section>

        {/* Customer Service */}
        <section className="flex justify-center pt-4 pb-8">
          <button 
            onClick={() => {
              if (onOpenChat) {
                onOpenChat();
              } else {
                setCustomerServiceOpen(true);
              }
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95 text-[#007AFF]"
          >
            <Headset className="w-5 h-5" />
            <span className="font-semibold">我的客服</span>
          </button>
        </section>
      </main>

      <CustomerServiceModal
        isOpen={isCustomerServiceOpen}
        onClose={() => setCustomerServiceOpen(false)}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        availableBalance={availableBalance}
      />
    </div>
  );
};

function TransactionItem({
  icon,
  iconBg,
  iconColor,
  title,
  date,
  amount,
  amountColor,
  balance,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  date: string;
  amount: string;
  amountColor: string;
  balance: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm transition-all hover:shadow-md cursor-pointer border border-slate-100 dark:border-slate-700">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        <div>
          <p className="font-bold text-slate-900 dark:text-white">{title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${amountColor}`}>{amount}</p>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">余额 {balance}元</p>
      </div>
    </div>
  );
}

export default PaymentManagementModal;
