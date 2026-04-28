import React from 'react';
import { Bot, ChevronDown, ArrowRight, Fingerprint } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onRegisterClick?: () => void;
}

export default function LoginScreen({ onLogin, onRegisterClick }: LoginScreenProps) {
  return (
    <div className="h-full w-full bg-slate-50 dark:bg-slate-900 flex flex-col font-sans relative overflow-hidden">
      <main className="flex-1 pt-20 pb-12 px-6 flex flex-col justify-center relative z-10 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Logo & Branding */}
        <section className="mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-[#fee9b2] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Bot className="text-amber-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">欢迎回来</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">安全访问您的智能工作助手</p>
        </section>

        {/* Login Form Container */}
        <div className="space-y-6">
          {/* Phone Input */}
          <div className="space-y-2">
            <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700 transition-all focus-within:ring-2 focus-within:ring-primary-500/20">
              <div className="flex items-center gap-1 px-3 border-r border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                <span className="text-sm font-semibold">+86</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <input
                className="bg-transparent border-none focus:ring-0 w-full py-3 px-3 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                placeholder="请输入手机号"
                type="tel"
              />
            </div>
          </div>

          {/* Verification Input */}
          <div className="space-y-2">
            <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700 transition-all focus-within:ring-2 focus-within:ring-primary-500/20">
              <input
                className="bg-transparent border-none focus:ring-0 w-full py-3 px-3 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                placeholder="请输入验证码"
                type="text"
              />
              <button className="px-4 py-2 text-sm font-bold text-primary-600 dark:text-primary-400 hover:opacity-70 active:scale-95 transition-all whitespace-nowrap flex-shrink-0 cursor-pointer">
                获取验证码
              </button>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 px-1 py-2">
            <div className="pt-0.5">
              <input
                className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500/20 bg-white dark:bg-slate-800 appearance-none checked:bg-primary-600 checked:border-primary-600 transition-colors cursor-pointer relative after:content-[''] after:absolute after:hidden checked:after:block after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:-mt-0.5"
                id="agreement"
                type="checkbox"
              />
            </div>
            <label className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed cursor-pointer select-none" htmlFor="agreement">
              我已阅读并同意<span className="text-primary-600 dark:text-primary-400 font-bold">《用户协议》</span>和<span className="text-primary-600 dark:text-primary-400 font-bold">《隐私政策》</span>。所有数据处理均通过加密协议完成。
            </label>
          </div>

          {/* Main CTA */}
          <div className="pt-4">
            <button 
              onClick={onLogin}
              className="w-full h-14 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              登录
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Actions */}
          <div className="flex justify-center pt-2">
            <button 
              onClick={onRegisterClick}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              新用户？<span className="text-primary-600 dark:text-primary-400 font-bold">立即注册</span>
            </button>
          </div>
        </div>

        {/* Quick Access Section */}
        <section className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 shadow-sm rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer group border border-slate-200 dark:border-slate-700">
            <Fingerprint className="text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform w-5 h-5" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">本机号码一键登录</span>
          </div>
        </section>

        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 -z-10 opacity-40 pointer-events-none overflow-hidden h-full w-full">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/20 blur-[100px] rounded-full"></div>
          <div className="absolute top-1/2 -left-24 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full"></div>
        </div>
      </main>
    </div>
  );
}
