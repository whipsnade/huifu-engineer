import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ChangePhoneModal from './ChangePhoneModal';
import DeleteAccountModal from './DeleteAccountModal';
import BindEmailModal from './BindEmailModal';
import RealNameAuthModal from './RealNameAuthModal';
import FaceRecognitionModal from './FaceRecognitionModal';

interface AccountSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const AccountSecurityModal: React.FC<AccountSecurityModalProps> = ({ isOpen, onClose, onLogout }) => {
  const [isChangePhoneOpen, setChangePhoneOpen] = useState(false);
  const [isDeleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [isBindEmailOpen, setBindEmailOpen] = useState(false);
  const [isRealNameAuthOpen, setRealNameAuthOpen] = useState(false);
  const [isFaceRecognitionOpen, setFaceRecognitionOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isFaceVerified, setIsFaceVerified] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleChangePhoneSuccess = () => {
    setChangePhoneOpen(false);
    // In a real app, this would handle the redirect to login
    alert('手机号修改成功，请重新登录');
    window.location.reload(); // Simulate redirect to login by reloading
  };

  const handleDeleteConfirm = () => {
    setDeleteAccountOpen(false);
    alert('账号已注销');
    if (onLogout) {
      onLogout();
    }
  };

  const handleBindEmailSuccess = (newEmail: string) => {
    setEmail(newEmail);
    setBindEmailOpen(false);
    alert('邮箱绑定成功');
  };

  return (
    <div className="absolute inset-0 z-[110] flex flex-col bg-[#F4F6F8] dark:bg-slate-900 font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-center px-5 py-4 pt-12 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <button onClick={onClose} className="absolute left-5 p-2 -ml-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-[#1e293b] dark:text-white tracking-tight">账号与安全</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Contact Info Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <button 
            onClick={() => setChangePhoneOpen(true)}
            className="w-full flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <span className="text-[15px] text-slate-800 dark:text-slate-200">手机号</span>
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-[#94a3b8] dark:text-slate-400">138******78</span>
              <ChevronRight size={16} className="text-[#cbd5e1] dark:text-slate-500" />
            </div>
          </button>
          <button 
            onClick={() => setBindEmailOpen(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <span className="text-[15px] text-slate-800 dark:text-slate-200">邮箱</span>
            <div className="flex items-center gap-2">
              <span className={`text-[15px] ${email ? 'text-[#94a3b8] dark:text-slate-400' : 'text-[#f59e0b] dark:text-amber-500'}`}>
                {email || '待添加'}
              </span>
              <ChevronRight size={16} className="text-[#cbd5e1] dark:text-slate-500" />
            </div>
          </button>
        </div>

        {/* Real-name Authentication Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <button 
            onClick={() => setRealNameAuthOpen(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex flex-col items-start">
              <span className="text-[15px] text-slate-800 dark:text-slate-200">实名认证</span>
              <span className="text-xs text-[#94a3b8] dark:text-slate-400 mt-0.5">完成实名认证以解锁更多功能</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[15px] ${isVerified ? 'text-green-500' : 'text-[#f59e0b] dark:text-amber-500'}`}>
                {isVerified ? '已认证' : '未认证'}
              </span>
              <ChevronRight size={16} className="text-[#cbd5e1] dark:text-slate-500" />
            </div>
          </button>
        </div>

        {/* Face Recognition Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <button 
            onClick={() => setFaceRecognitionOpen(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex flex-col items-start">
              <span className="text-[15px] text-slate-800 dark:text-slate-200">人脸识别</span>
              <span className="text-xs text-[#94a3b8] dark:text-slate-400 mt-0.5">用于高风险操作的身份核验</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[15px] ${isFaceVerified ? 'text-green-500' : 'text-[#f59e0b] dark:text-amber-500'}`}>
                {isFaceVerified ? '已录入' : '未录入'}
              </span>
              <ChevronRight size={16} className="text-[#cbd5e1] dark:text-slate-500" />
            </div>
          </button>
        </div>

        {/* Delete Account Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <button 
            onClick={() => setDeleteAccountOpen(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex flex-col items-start">
              <span className="text-[15px] text-slate-800 dark:text-slate-200">账号注销</span>
              <span className="text-xs text-[#94a3b8] dark:text-slate-400 mt-0.5">删除账号所有数据，注销后不可恢复</span>
            </div>
            <ChevronRight size={16} className="text-[#cbd5e1] dark:text-slate-500" />
          </button>
        </div>

        {/* Logout Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm mt-6">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <span className="text-[15px] font-medium text-[#ef4444]">退出账号</span>
            <ChevronRight size={16} className="text-[#fca5a5]" />
          </button>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col items-center justify-center gap-3 pt-8 pb-4">
          <a href="#" className="text-sm text-[#4f46e5] dark:text-indigo-400 hover:underline">《用户服务协议》</a>
          <a href="#" className="text-sm text-[#4f46e5] dark:text-indigo-400 hover:underline">《隐私政策》</a>
        </div>

      </main>

      <ChangePhoneModal 
        isOpen={isChangePhoneOpen}
        onClose={() => setChangePhoneOpen(false)}
        onSuccess={handleChangePhoneSuccess}
      />

      <DeleteAccountModal
        isOpen={isDeleteAccountOpen}
        onClose={() => setDeleteAccountOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <BindEmailModal
        isOpen={isBindEmailOpen}
        onClose={() => setBindEmailOpen(false)}
        onSuccess={handleBindEmailSuccess}
      />

      <RealNameAuthModal
        isOpen={isRealNameAuthOpen}
        onClose={() => setRealNameAuthOpen(false)}
        onVerified={() => setIsVerified(true)}
      />

      <FaceRecognitionModal
        isOpen={isFaceRecognitionOpen}
        onClose={() => setFaceRecognitionOpen(false)}
        onVerified={() => setIsFaceVerified(true)}
      />
    </div>
  );
};

export default AccountSecurityModal;
