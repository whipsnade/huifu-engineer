import React, { useState, useRef } from 'react';
import { X, FileText, Clock, AlertCircle, Paperclip, Image as ImageIcon, Mic } from 'lucide-react';
import { WorkOrder } from '../types';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface StopMeterModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: WorkOrder | null;
  onSubmit: (data: any) => void;
}

const StopMeterModal: React.FC<StopMeterModalProps> = ({ isOpen, onClose, order, onSubmit }) => {
  const [reason, setReason] = useState('');
  const [resumeTime, setResumeTime] = useState('');
  const [remarks, setRemarks] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isRecording, startRecording: handleVoiceInput } = useVoiceInput((transcript) => {
    setReason(prev => prev + (prev ? ' ' : '') + transcript);
  });

  if (!isOpen || !order) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('请输入停表原因');
      return;
    }
    if (!resumeTime) {
      alert('请选择预计开表时间');
      return;
    }
    
    onSubmit({
      reason,
      resumeTime,
      remarks,
      attachments
    });
    
    // Reset form
    setReason('');
    setResumeTime('');
    setRemarks('');
    setAttachments([]);
  };

  return (
    <div className="absolute inset-0 z-[200] flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">申请停表</h2>
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
              提交停表申请后，需等待审批。审批通过后，该工单将停止计算SLA时长。
            </p>
          </div>

          <form id="stop-meter-form" onSubmit={handleSubmit} className="space-y-5">
            {/* 停表原因 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileText size={16} className="text-primary-500" />
                停表原因
              </label>
              <div className="relative">
                <textarea
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="请详细说明需要停表的原因（如：等待配件、客户原因等）..."
                  rows={3}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
                />
                <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`absolute right-3 bottom-4 p-2 rounded-full transition-colors ${
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

            {/* 开表时间 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Clock size={16} className="text-primary-500" />
                预计开表时间
              </label>
              <input
                type="datetime-local"
                required
                value={resumeTime}
                onChange={(e) => setResumeTime(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>

            {/* 备注 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileText size={16} className="text-primary-500" />
                备注 (选填)
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="其他需要说明的事项..."
                rows={2}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
              />
            </div>

            {/* 附件上传 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Paperclip size={16} className="text-primary-500" />
                  图片/附件 (选填)
                </label>
                <span className="text-xs text-slate-400">{attachments.length} 个文件</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {attachments.map((file, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group">
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-2">
                        <FileText size={24} className="text-slate-400 mb-1" />
                        <span className="text-[8px] text-slate-500 text-center truncate w-full">{file.name}</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 flex flex-col items-center justify-center gap-1 transition-all text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <ImageIcon size={20} />
                  <span className="text-[10px] font-medium">上传照片</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
          <button
            type="submit"
            form="stop-meter-form"
            disabled={!reason.trim() || !resumeTime}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all"
          >
            确认申请停表
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopMeterModal;
