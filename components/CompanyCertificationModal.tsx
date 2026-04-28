import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, Camera } from 'lucide-react';

interface CompanyCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasCompany: boolean;
  onApply: (data: any) => void;
}

const CompanyCertificationModal: React.FC<CompanyCertificationModalProps> = ({ isOpen, onClose, hasCompany, onApply }) => {
  const [companyName, setCompanyName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [taxId, setTaxId] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [licensePhoto, setLicensePhoto] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!companyName || !name || !phone || !address || !taxId || !bankName || !bankAccount || !licensePhoto) return;
    onApply({ companyName, name, phone, address, taxId, bankName, bankAccount, licensePhoto });
  };

  return (
    <div className="absolute inset-0 bg-[#F4F6F8] dark:bg-slate-900 font-sans flex flex-col z-[200] animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 pt-12 bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10">
        <button onClick={onClose} className="flex items-center text-primary-600 dark:text-primary-400 font-medium p-1 -ml-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-slate-900 dark:text-white absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          {hasCompany ? '企业认证信息' : '申请企业账号'}
        </h1>
        <div className="w-16"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 py-8">
        {hasCompany ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">企业已存在</h3>
            <p className="text-slate-500 dark:text-slate-400">您已绑定企业信息，无法重复添加。</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">企业名称</label>
              <input
                type="text"
                placeholder="请输入企业名称"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">姓名</label>
              <input
                type="text"
                placeholder="请输入您的姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">电话</label>
              <input
                type="tel"
                placeholder="请输入联系电话"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">地址</label>
              <input
                type="text"
                placeholder="请输入企业地址"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>
            
            {/* New Fields */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">纳税登记号</label>
              <input
                type="text"
                placeholder="请输入纳税登记号"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">开户行</label>
              <input
                type="text"
                placeholder="请输入开户行名称"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">银行账号</label>
              <input
                type="text"
                placeholder="请输入银行账号"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">营业执照照片</label>
              <div 
                onClick={() => setLicensePhoto('uploaded')}
                className="w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                {licensePhoto ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">已上传</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-8 h-8 mb-2 text-slate-400" />
                    <span className="text-sm font-medium">点击上传营业执照</span>
                  </>
                )}
              </div>
            </div>

            <div className="pt-4 pb-4">
              <button
                onClick={handleSubmit}
                disabled={!companyName || !name || !phone || !address || !taxId || !bankName || !bankAccount || !licensePhoto}
                className="w-full py-4 bg-[#5b52f6] hover:bg-[#4f46e5] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
              >
                提交申请
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyCertificationModal;
