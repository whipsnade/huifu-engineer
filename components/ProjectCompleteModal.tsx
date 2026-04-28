import React, { useState } from 'react';
import { ArrowLeft, Mic, Camera, FileVideo, Edit3, CheckCircle } from 'lucide-react';

interface ProjectCompleteModalProps {
  onBack: () => void;
  onSubmit: () => void;
}

const ProjectCompleteModal: React.FC<ProjectCompleteModalProps> = ({ onBack, onSubmit }) => {
  const [remarks, setRemarks] = useState('');

  return (
    <div className="absolute inset-0 z-[70] bg-[#F8F9FC] dark:bg-slate-900 flex flex-col font-sans overflow-hidden animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex items-center justify-between px-4 py-3 pt-12 w-full border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-900 dark:text-white" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">提交完成</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32 p-4 space-y-6">
        
        {/* Remarks Section */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">备注 / 说明</h3>
          <div className="relative">
            <textarea
              className="w-full bg-white dark:bg-slate-800 rounded-2xl p-4 min-h-[120px] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="请描述维修详情..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
            <button className="absolute bottom-4 right-4 w-10 h-10 bg-[#F1F5F9] dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Mic size={18} />
            </button>
          </div>
        </div>

        {/* Attachments Section */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">附件</h3>
          <div className="w-full bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center cursor-pointer active:bg-slate-50 transition-colors">
            <div className="flex gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Camera size={26} strokeWidth={2.5} />
              </div>
              <div className="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-500">
                <FileVideo size={26} strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">上传照片或视频</p>
            <p className="text-xs text-slate-400">点击浏览相册或拍照</p>
          </div>
        </div>

        {/* Cost Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">维修费用明细</h3>
            <Edit3 size={16} className="text-emerald-500" />
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ea580c]"></div>
            
            <div className="pl-2 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">上门费</span>
                <span className="font-semibold text-slate-900 dark:text-white">¥50.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">工时费</span>
                <span className="font-semibold text-slate-900 dark:text-white">¥100.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">配件/资源费</span>
                <span className="font-semibold text-slate-900 dark:text-white">¥0.00</span>
              </div>
              
              <div className="h-px w-full bg-slate-100 dark:bg-slate-700 my-4"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold text-slate-900 dark:text-white">合计费用</span>
                <span className="text-lg font-bold text-[#ea580c]">¥150.00</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-[#F8F9FC] via-[#F8F9FC]/90 to-transparent dark:from-slate-900 dark:via-slate-900/90 border-t border-transparent z-50">
        <button 
          onClick={onSubmit}
          className="w-full h-[52px] bg-[#CBD5E1] dark:bg-slate-700 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-sm"
        >
          <CheckCircle size={20} strokeWidth={2.5} />
          提交完成
        </button>
      </div>

    </div>
  );
};

export default ProjectCompleteModal;
