import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[130] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[#dc2626] dark:text-red-500">
            <AlertTriangle size={24} />
            <h2 className="text-xl font-bold tracking-tight">注销账号</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <p className="text-[15px] text-slate-700 dark:text-slate-300">
            注销账号是不可逆的操作，注销后：
          </p>
          <ul className="space-y-3">
            {[
              '个人资料将被永久删除',
              '所有历史订单记录将无法找回',
              '账户内的积分和优惠券将失效',
              '无法再使用该手机号登录'
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-[14px] text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f87171] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-[#f1f5f9] dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[15px] py-3.5 rounded-2xl active:scale-[0.98] transition-all"
          >
            再想想
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-[15px] py-3.5 rounded-2xl shadow-[0_8px_20px_-6px_rgba(220,38,38,0.5)] active:scale-[0.98] transition-all"
          >
            确认注销
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteAccountModal;
