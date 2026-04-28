import React, { useState } from 'react';
import { X, FileText, AlertCircle, Mic } from 'lucide-react';
import { WorkOrder } from '../types';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface ReturnOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: WorkOrder | null;
  onSubmit: (data: any) => void;
}

const ReturnOrderModal: React.FC<ReturnOrderModalProps> = ({ isOpen, onClose, order, onSubmit }) => {
  const [reason, setReason] = useState('');

  const { isRecording, startRecording: handleVoiceInput } = useVoiceInput((transcript) => {
    setReason(prev => prev + (prev ? ' ' : '') + transcript);
  });

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('请输入回单原因');
      return;
    }
    
    onSubmit({
      reason
    });
    
    // Reset form
    setReason('');
  };

  return (
    <div className="absolute inset-0 z-[200] flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">申请回单</h2>
            <p className="text-xs text-slate-500 mt-1">工单 #{order.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto no-scrollbar flex-1">
          <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              确认回单后，此工单将退回给400服务台，并从您的工单列表中移除。
            </p>
          </div>

          <form id="return-order-form" onSubmit={handleSubmit} className="space-y-5">
            {/* 回单原因 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileText size={16} className="text-primary-500" />
                回单原因
              </label>
              <div className="relative">
                <textarea
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="请详细说明回单原因..."
                  rows={4}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
                />
                <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`absolute right-3 bottom-3 p-2 rounded-full transition-colors ${
                        isRecording 
                        ? 'bg-red-100 text-red-500 animate-pulse' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-primary-50 dark:hover:bg-slate-600 hover:text-primary-500'
                    }`}
                    title="语音输入"
                >
                    <Mic size={18} />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0 flex gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
          >
            取消
          </button>
          <button 
            type="submit"
            form="return-order-form"
            className="flex-1 py-3.5 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-900/20 transition-all active:scale-[0.98]"
          >
            确认回单
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnOrderModal;
