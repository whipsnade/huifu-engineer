import React from 'react';
import { ChevronLeft, MessageSquare, Phone, FileText, HelpCircle, ChevronRight } from 'lucide-react';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerServiceModal: React.FC<CustomerServiceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[120] flex flex-col bg-[#F4F6F8] dark:bg-slate-900 font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-center px-5 py-4 pt-12 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <button onClick={onClose} className="absolute left-5 p-2 -ml-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-[#1e293b] dark:text-white tracking-tight">我的客服</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-8 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Welcome Section */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">您好，有什么可以帮您？</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">我们的客服团队随时准备为您提供帮助</p>
        </div>

        {/* Contact Options */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <MessageSquare size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[15px] font-bold text-slate-800 dark:text-slate-200">在线客服</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">7x24小时为您服务</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <Phone size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[15px] font-bold text-slate-800 dark:text-slate-200">电话客服</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">工作日 9:00 - 18:00</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 px-1">常见问题</h3>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
            {[
              '如何修改登录密码？',
              '提现多久可以到账？',
              '如何进行企业认证？',
              '积分有什么用？',
            ].map((question, index, array) => (
              <button 
                key={index}
                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                  index !== array.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-slate-400" />
                  <span className="text-[15px] text-slate-700 dark:text-slate-300">{question}</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default CustomerServiceModal;
