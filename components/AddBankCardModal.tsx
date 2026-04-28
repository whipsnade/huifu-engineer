import React, { useState } from 'react';
import { ChevronLeft, ShieldCheck, Camera, Search, HeadphonesIcon, Settings } from 'lucide-react';

interface AddBankCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (card: any) => void;
}

const QUICK_ADD_BANKS = [
  { id: 'cmb', name: '招商银行', icon: 'M', color: 'bg-red-100 text-red-600' },
  { id: 'abc', name: '中国农业银行', icon: 'A', color: 'bg-green-100 text-green-600' },
  { id: 'cmbc', name: '中国民生银行', icon: 'S', color: 'bg-teal-100 text-teal-600' },
  { id: 'icbc', name: '中国工商银行', icon: 'I', color: 'bg-red-100 text-red-600' },
  { id: 'ccb', name: '中国建设银行', icon: 'C', color: 'bg-blue-100 text-blue-600' },
  { id: 'psbc', name: '中国邮政储蓄银行', icon: 'P', color: 'bg-green-100 text-green-600' },
  { id: 'boc', name: '中国银行', icon: 'B', color: 'bg-red-100 text-red-600' },
  { id: 'bocom', name: '交通银行', icon: 'B', color: 'bg-blue-100 text-blue-600' },
  { id: 'pab', name: '平安银行', icon: 'P', color: 'bg-orange-100 text-orange-600' },
  { id: 'citic', name: '中信银行', icon: 'C', color: 'bg-red-100 text-red-600' },
];

const AddBankCardModal: React.FC<AddBankCardModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const handleQuickAdd = (bank: typeof QUICK_ADD_BANKS[0]) => {
    // Simulate adding a card
    onSuccess({
      id: Date.now().toString(),
      bankName: bank.name,
      cardType: '储蓄卡',
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      iconColor: bank.color,
      iconText: bank.icon
    });
  };

  return (
    <div className="absolute inset-0 z-[140] flex flex-col bg-[#F7F7F7] dark:bg-slate-900 font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 pt-12 relative">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-900 dark:text-white">
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="flex flex-col items-center mt-2 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">添加银行卡</h1>
          <div className="flex items-center gap-1.5 text-[#1677FF] text-sm font-medium">
            <ShieldCheck size={16} className="fill-[#1677FF] text-white" />
            <span>系统全力保护你的信息安全</span>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-3 bg-[#F5F5F5] dark:bg-slate-700/50 rounded-xl px-4 py-3">
            <Search size={20} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="输入银行名称或本人银行卡号"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-600 mx-2"></div>
            <button className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-300 min-w-[50px]">
              <Camera size={22} strokeWidth={1.5} />
              <span className="text-[10px]">拍照添卡</span>
            </button>
          </div>
        </div>

        {/* Quick Add Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[17px] font-bold text-slate-900 dark:text-white mb-4">免输卡号添加</h2>
          
          <div className="space-y-1">
            {QUICK_ADD_BANKS.map((bank, index) => (
              <div key={bank.id} className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${bank.color} flex items-center justify-center font-bold text-sm`}>
                    {bank.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] text-slate-900 dark:text-white">{bank.name}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleQuickAdd(bank)}
                  className="text-[14px] text-[#1677FF] font-medium px-3 py-1 rounded-full hover:bg-[#1677FF]/10 transition-colors"
                >
                  添加
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddBankCardModal;
