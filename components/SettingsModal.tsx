import React from 'react';
import { Menu, IdCard, ChevronRight } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
  onOpenChat?: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onLogout, onOpenChat }) => {
  if (!isOpen) return null;

  const mainSettings = [
    { 
      id: 'enterprise', 
      icon: <IdCard size={24} className="text-[#006e1a] dark:text-green-400" fill="currentColor" />, 
      label: '加入企业',
      desc: '证书、许可证、培训'
    },
  ];

  return (
    <div className="absolute inset-0 z-[90] flex flex-col bg-[#F4F6F8] dark:bg-slate-900 font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-center px-5 py-4 pt-12 w-full">
        <button onClick={onClose} className="absolute left-5 p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">设置</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-5 pt-4 pb-8 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Main Settings Cards */}
        <div className="space-y-4">
          {mainSettings.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e6f4ea] dark:bg-green-900/30 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[17px] font-bold text-slate-900 dark:text-white mb-0.5">{item.label}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-400 shrink-0" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SettingsModal;
