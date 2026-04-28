import React, { useState, useEffect } from 'react';
import { X, Zap, Camera, Film, Mic } from 'lucide-react';
import { WorkOrder } from '../types';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface TechUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: WorkOrder | null;
  onSubmit: (expertName: string, description: string) => void;
}

const TechUpgradeModal: React.FC<TechUpgradeModalProps> = ({ isOpen, onClose, order, onSubmit }) => {
  const [expertName, setExpertName] = useState('');
  const [description, setDescription] = useState('');

  const { isRecording, startRecording: handleVoiceInput } = useVoiceInput((transcript) => {
    setDescription(prev => prev + (prev ? ' ' : '') + transcript);
  });

  useEffect(() => {
    if (isOpen) {
      setExpertName('');
      setDescription('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expertName.trim() && description.trim()) {
      onSubmit(expertName, description);
    }
  };

  return (
    <div className="absolute inset-0 z-[200] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Zap size={20} />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">申请技术升级</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <form id="tech-upgrade-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                技术专家姓名 <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={expertName}
                onChange={(e) => setExpertName(e.target.value)}
                placeholder="请输入技术专家姓名"
                className="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 p-3 text-slate-900 dark:text-white placeholder:text-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                问题描述 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请详细描述遇到的技术问题..."
                  className="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 min-h-[120px] text-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 pl-3 pr-10 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
                  required
                />
                <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`absolute right-3 bottom-4 p-2 rounded-full transition-colors ${
                        isRecording 
                        ? 'bg-red-100 text-red-500 animate-pulse' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-slate-600 hover:text-purple-500'
                    }`}
                    title="语音输入"
                >
                    <Mic size={18} />
                </button>
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                附件 (支持图片或视频)
              </label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-purple-400 transition-all cursor-pointer group">
                <div className="flex gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Camera size={24} className="text-blue-500" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 delay-75">
                    <Film size={24} className="text-purple-500" />
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-purple-600 transition-colors">
                  上传照片或视频
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  点击浏览相册或拍照
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button 
            type="submit"
            form="tech-upgrade-form"
            disabled={!expertName.trim() || !description.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98]"
          >
            提交申请
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechUpgradeModal;
