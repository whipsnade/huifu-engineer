import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface RegisterScreenProps {
  onBack: () => void;
  onRegister: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack, onRegister }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#F4F6F8] dark:bg-slate-900 font-sans flex flex-col z-[200] animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 pt-12 bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center text-primary-600 dark:text-primary-400 font-medium p-1 -ml-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-slate-900 dark:text-white absolute left-1/2 -translate-x-1/2">
          新建账号
        </h1>
        <div className="w-16"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">工程师立即注册</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">加入我们的工程师技术团队，开启您的专业旅程</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">姓名</label>
            <input 
              type="text" 
              placeholder="请输入真实姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 py-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">电话</label>
            <input 
              type="tel" 
              placeholder="请输入您的手机号码"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 py-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
          </div>

          {/* Verification Code */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">验证码</label>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-0 flex-1 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 py-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
              <button className="bg-slate-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400 font-bold px-4 rounded-2xl whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex-shrink-0 text-sm">
                获取验证码
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">邮箱</label>
            <input 
              type="email" 
              placeholder="example@engineer.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 py-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-3 pt-2">
            <div className="relative flex items-center justify-center mt-0.5">
              <input 
                type="checkbox" 
                id="register-agreement"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-primary-500 checked:border-primary-500 transition-colors cursor-pointer"
              />
              <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed cursor-pointer select-none" htmlFor="register-agreement">
              我已阅读并同意 <span className="text-primary-600 dark:text-primary-400">《用户协议》</span> 和 <span className="text-primary-600 dark:text-primary-400">《隐私政策》</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              onClick={onRegister}
              disabled={!agreed}
              className="w-full h-14 bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all flex items-center justify-center text-lg"
            >
              下一步
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center pb-8">
          <p className="text-slate-600 dark:text-slate-400">
            已有账号？ <button onClick={onBack} className="text-primary-600 dark:text-primary-400 font-bold">立即登录</button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegisterScreen;
