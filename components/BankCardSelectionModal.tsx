import React, { useState } from 'react';
import { ChevronLeft, Plus, Check } from 'lucide-react';
import AddBankCardModal from './AddBankCardModal';

interface BankCardSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCardId: string | null;
  onSelectCard: (cardId: string) => void;
}

// Mock data for existing cards
const MOCK_CARDS = [
  { id: '1', bankName: '招商银行', cardType: '储蓄卡', last4: '9128', iconColor: 'bg-red-100 text-red-600', iconText: 'M' },
  { id: '2', bankName: '中国建设银行', cardType: '储蓄卡', last4: '3344', iconColor: 'bg-blue-100 text-blue-600', iconText: 'C' }
];

const BankCardSelectionModal: React.FC<BankCardSelectionModalProps> = ({ isOpen, onClose, selectedCardId, onSelectCard }) => {
  const [isAddCardOpen, setAddCardOpen] = useState(false);
  const [cards, setCards] = useState(MOCK_CARDS); // In a real app, this would come from props or state management

  if (!isOpen) return null;

  const handleAddCardSuccess = (newCard: any) => {
    setCards([...cards, newCard]);
    setAddCardOpen(false);
    onSelectCard(newCard.id);
    onClose();
  };

  return (
    <>
      <div className="absolute inset-0 z-[130] flex flex-col bg-[#F4F4F4] dark:bg-slate-900 font-sans animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <header className="flex items-center justify-center px-4 py-3 pt-12 relative bg-white dark:bg-slate-800">
          <button onClick={onClose} className="absolute left-4 p-2 -ml-2 text-slate-900 dark:text-white">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-[17px] font-medium text-slate-900 dark:text-white">选择到账银行卡</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 mt-2">
            {cards.map((card) => (
              <button 
                key={card.id}
                onClick={() => {
                  onSelectCard(card.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${card.iconColor} flex items-center justify-center font-bold text-sm`}>
                    {card.iconText}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[15px] text-slate-800 dark:text-slate-200">{card.bankName} ({card.last4})</span>
                    <span className="text-[12px] text-slate-500 dark:text-slate-400">{card.cardType} | 2小时内到账</span>
                  </div>
                </div>
                {selectedCardId === card.id && (
                  <Check size={20} className="text-[#07c160]" />
                )}
              </button>
            ))}

            <button 
              onClick={() => setAddCardOpen(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <Plus size={18} />
              </div>
              <span className="text-[15px] text-slate-800 dark:text-slate-200">使用新卡提现</span>
            </button>
          </div>
        </main>
      </div>

      <AddBankCardModal 
        isOpen={isAddCardOpen} 
        onClose={() => setAddCardOpen(false)} 
        onSuccess={handleAddCardSuccess}
      />
    </>
  );
};

export default BankCardSelectionModal;
