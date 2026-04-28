import React, { useState } from 'react';
import { X, MoreHorizontal, ChevronRight, Delete } from 'lucide-react';
import BankCardSelectionModal from './BankCardSelectionModal';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, availableBalance }) => {
  const [amount, setAmount] = useState('');
  const [isBankCardSelectionOpen, setBankCardSelectionOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>('1'); // Default to first mock card
  const [selectedCard, setSelectedCard] = useState<any>({
    id: '1', bankName: '招商银行', cardType: '储蓄卡', last4: '9128', iconColor: 'bg-red-100 text-red-600', iconText: 'M'
  });

  if (!isOpen) return null;

  const handleWithdrawAll = () => {
    setAmount(availableBalance.toString());
  };

  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.') {
      if (!amount.includes('.')) {
        setAmount(prev => prev + (prev === '' ? '0.' : '.'));
      }
    } else {
      // Limit to 2 decimal places
      if (amount.includes('.')) {
        const [, decimal] = amount.split('.');
        if (decimal && decimal.length >= 2) return;
      }
      setAmount(prev => prev + key);
    }
  };

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    alert(`提现申请已提交: ¥${amount}`);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-[120] flex flex-col bg-[#F4F4F4] dark:bg-slate-900 font-sans animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 pt-12">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-900 dark:text-white">
          <X size={24} />
        </button>
        <h1 className="text-[17px] font-medium text-slate-900 dark:text-white">零钱提现</h1>
        <button className="p-2 -mr-2 text-slate-900 dark:text-white">
          <MoreHorizontal size={24} />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 pt-6 flex flex-col">
        
        {/* Bank Card Info */}
        <div 
          className="flex items-start justify-between mb-6 px-2 cursor-pointer"
          onClick={() => setBankCardSelectionOpen(true)}
        >
          <span className="text-[15px] text-slate-600 dark:text-slate-400 mt-0.5 w-24">到账银行卡</span>
          <div className="flex-1 flex items-center justify-between">
            <div className="flex flex-col">
              {selectedCard ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${selectedCard.iconColor} flex items-center justify-center font-bold text-[10px]`}>
                      {selectedCard.iconText}
                    </div>
                    <span className="text-[15px] text-slate-800 dark:text-slate-200">{selectedCard.bankName} ({selectedCard.last4})</span>
                  </div>
                  <span className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 ml-6">2小时内到账</span>
                </>
              ) : (
                <span className="text-[15px] text-slate-800 dark:text-slate-200">请选择银行卡</span>
              )}
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </div>
        </div>

        {/* Amount Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm flex flex-col">
          <h2 className="text-[15px] text-slate-900 dark:text-white mb-6">提现金额</h2>
          
          <div className="flex items-end border-b border-slate-100 dark:border-slate-700 pb-4 mb-4">
            <span className="text-4xl font-bold text-slate-900 dark:text-white mr-2 mb-1">¥</span>
            <div className="text-5xl font-medium text-slate-900 dark:text-white h-14 flex items-center">
              {amount}
              {/* Blinking cursor effect */}
              <span className="w-0.5 h-10 bg-[#07c160] animate-pulse ml-1"></span>
            </div>
          </div>

          <div className="flex items-center text-[13px] text-slate-500 dark:text-slate-400">
            <span>当前零钱余额 {availableBalance}元，</span>
            <button onClick={handleWithdrawAll} className="text-[#576b95] dark:text-blue-400">全部提现</button>
          </div>
        </div>

      </main>

      {/* Custom Keyboard */}
      <div className="bg-[#f2f2f2] dark:bg-slate-900 pb-8 pt-2 px-1.5 grid grid-cols-4 gap-1.5">
        <div className="col-span-3 grid grid-cols-3 gap-1.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
            <button 
              key={key}
              onClick={() => handleKeyPress(key)}
              className="bg-white dark:bg-slate-800 rounded-md h-14 text-xl font-medium text-slate-900 dark:text-white active:bg-slate-200 dark:active:bg-slate-700 shadow-sm"
            >
              {key}
            </button>
          ))}
          <button 
            className="bg-transparent rounded-md h-14 text-xl font-medium text-slate-900 dark:text-white"
          ></button>
          <button 
            onClick={() => handleKeyPress('0')}
            className="bg-white dark:bg-slate-800 rounded-md h-14 text-xl font-medium text-slate-900 dark:text-white active:bg-slate-200 dark:active:bg-slate-700 shadow-sm"
          >
            0
          </button>
          <button 
            onClick={() => handleKeyPress('.')}
            className="bg-white dark:bg-slate-800 rounded-md h-14 text-xl font-medium text-slate-900 dark:text-white active:bg-slate-200 dark:active:bg-slate-700 shadow-sm"
          >
            .
          </button>
        </div>
        <div className="col-span-1 flex flex-col gap-1.5">
          <button 
            onClick={() => handleKeyPress('delete')}
            className="bg-white dark:bg-slate-800 rounded-md h-14 flex items-center justify-center text-slate-900 dark:text-white active:bg-slate-200 dark:active:bg-slate-700 shadow-sm"
          >
            <Delete size={24} />
          </button>
          <button 
            onClick={handleConfirm}
            disabled={!amount || parseFloat(amount) <= 0}
            className="bg-[#07c160] disabled:bg-[#9de4bd] text-white rounded-md flex-1 text-[17px] font-medium active:bg-[#06ad56] transition-colors shadow-sm"
          >
            确定
          </button>
        </div>
      </div>

      <BankCardSelectionModal 
        isOpen={isBankCardSelectionOpen}
        onClose={() => setBankCardSelectionOpen(false)}
        selectedCardId={selectedCardId}
        onSelectCard={(cardId) => {
          setSelectedCardId(cardId);
          // In a real app, you would fetch the card details from your state/store
          // Here we just mock it for the newly added card or existing ones
          const MOCK_CARDS = [
            { id: '1', bankName: '招商银行', cardType: '储蓄卡', last4: '9128', iconColor: 'bg-red-100 text-red-600', iconText: 'M' },
            { id: '2', bankName: '中国建设银行', cardType: '储蓄卡', last4: '3344', iconColor: 'bg-blue-100 text-blue-600', iconText: 'C' }
          ];
          const card = MOCK_CARDS.find(c => c.id === cardId) || {
             id: cardId, bankName: '新添加银行', cardType: '储蓄卡', last4: '0000', iconColor: 'bg-green-100 text-green-600', iconText: 'N'
          };
          setSelectedCard(card);
        }}
      />
    </div>
  );
};

export default WithdrawModal;
