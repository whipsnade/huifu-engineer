import React, { useState } from 'react';
import { X } from 'lucide-react';

interface BindEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

const BindEmailModal: React.FC<BindEmailModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">绑定邮箱</h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 dark:text-slate-300">邮箱地址</label>
            <input 
              type="email"
              placeholder="请输入邮箱地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F9FC] dark:bg-slate-900 border-none rounded-2xl px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#4f46e5]/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 dark:text-slate-300">验证码</label>
            <div className="flex gap-3">
              <input 
                type="text"
                placeholder="请输入验证码"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="flex-1 bg-[#F8F9FC] dark:bg-slate-900 border-none rounded-2xl px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#4f46e5]/20 transition-all"
              />
              <button className="shrink-0 bg-[#eef2ff] dark:bg-indigo-900/30 text-[#4f46e5] dark:text-indigo-400 font-bold text-[15px] px-5 rounded-2xl hover:bg-[#e0e7ff] dark:hover:bg-indigo-900/50 transition-colors">
                获取验证码
              </button>
            </div>
          </div>

          <button 
            onClick={() => onSuccess(email)}
            disabled={!email || !verificationCode}
            className="w-full bg-[#4f46e5] hover:bg-[#4338ca] disabled:opacity-50 disabled:hover:bg-[#4f46e5] text-white font-bold text-[15px] py-4 rounded-2xl mt-8 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] active:scale-[0.98] transition-all"
          >
            确认提交
          </button>
        </div>

      </div>
    </div>
  );
};

export default BindEmailModal;
