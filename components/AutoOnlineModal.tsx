import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';

interface AutoOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AutoOnlineModal: React.FC<AutoOnlineModalProps> = ({ isOpen, onClose }) => {
  const [autoOnlineEnabled, setAutoOnlineEnabled] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
              <Clock size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">自动在线设置</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">开启自动在线</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">在设定时间内自动切换为在线状态</p>
            </div>
            <button 
              onClick={() => setAutoOnlineEnabled(!autoOnlineEnabled)}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out relative ${autoOnlineEnabled ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${autoOnlineEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className={`space-y-4 transition-opacity duration-200 ${autoOnlineEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">开启时间</label>
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">关闭时间</label>
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <button 
            onClick={() => {
              alert('设置已保存');
              onClose();
            }}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoOnlineModal;
