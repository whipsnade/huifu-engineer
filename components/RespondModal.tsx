import React, { useState } from 'react';
import { X, User, MessageSquare, Clock, FileText, CircleDollarSign, Wrench, Mic } from 'lucide-react';
import { WorkOrder } from '../types';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface RespondModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: WorkOrder | null;
  onSubmit: (data: any) => void;
}

const RespondModal: React.FC<RespondModalProps> = ({ isOpen, onClose, order, onSubmit }) => {
  const [contactPerson, setContactPerson] = useState('');
  const [faultConfirmation, setFaultConfirmation] = useState('');
  const [feeChangeType, setFeeChangeType] = useState<'none' | 'increase' | 'decrease'>('none');
  const [feeChangeAmount, setFeeChangeAmount] = useState('');
  const [needsSpareParts, setNeedsSpareParts] = useState(false);
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState('');
  const [remarks, setRemarks] = useState('');

  const { isRecording, startRecording: handleVoiceInput } = useVoiceInput((transcript) => {
    setFaultConfirmation(prev => prev + (prev ? ' ' : '') + transcript);
  });

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      contactPerson,
      faultConfirmation,
      feeChangeType,
      feeChangeAmount,
      needsSpareParts,
      estimatedArrivalTime,
      remarks,
    });
    // Reset form
    setContactPerson('');
    setFaultConfirmation('');
    setFeeChangeType('none');
    setFeeChangeAmount('');
    setNeedsSpareParts(false);
    setEstimatedArrivalTime('');
    setRemarks('');
  };

  return (
    <div className="absolute inset-0 z-[200] flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">响应工单</h2>
            <p className="text-xs text-slate-500 mt-1">记录与门店确认故障的过程</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto no-scrollbar">
          <form id="respond-form" onSubmit={handleSubmit} className="space-y-5">
            {/* 联系人 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User size={16} className="text-primary-500" />
                联系人
              </label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="请输入联系人姓名"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>

            {/* 故障确认 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <MessageSquare size={16} className="text-primary-500" />
                故障确认
              </label>
              <div className="relative">
                <textarea
                  required
                  value={faultConfirmation}
                  onChange={(e) => setFaultConfirmation(e.target.value)}
                  placeholder="请描述与门店确认的故障情况"
                  rows={3}
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

            {/* 预估维修费用 */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CircleDollarSign size={16} className="text-primary-500" />
                  维修费用确认
                </div>
                <div className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                  用户已支付: <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">¥{order.paidAmount?.toFixed(2) || '0.00'}</span>
                </div>
              </label>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => { setFeeChangeType('none'); setFeeChangeAmount(''); }}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${
                    feeChangeType === 'none' 
                      ? 'bg-primary-50 border-primary-500 text-primary-700 dark:bg-primary-900/30 dark:border-primary-500 dark:text-primary-400' 
                      : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  不变
                </button>
                <button
                  type="button"
                  onClick={() => setFeeChangeType('increase')}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${
                    feeChangeType === 'increase' 
                      ? 'bg-orange-50 border-orange-500 text-orange-700 dark:bg-orange-900/30 dark:border-orange-500 dark:text-orange-400' 
                      : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  增加费用
                </button>
                <button
                  type="button"
                  onClick={() => setFeeChangeType('decrease')}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${
                    feeChangeType === 'decrease' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-400' 
                      : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  减少费用
                </button>
              </div>

              {feeChangeType !== 'none' && (
                <div className="relative mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400">¥</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={feeChangeAmount}
                    onChange={(e) => setFeeChangeAmount(e.target.value)}
                    placeholder={`请输入预计${feeChangeType === 'increase' ? '增加' : '减少'}的金额`}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-mono"
                  />
                </div>
              )}
            </div>

            {/* 是否需要携带备件 */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Wrench size={16} className="text-primary-500" />
                是否需要携带备件
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                 <button
                  type="button"
                  onClick={() => setNeedsSpareParts(false)}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${
                    !needsSpareParts
                      ? 'bg-primary-50 border-primary-500 text-primary-700 dark:bg-primary-900/30 dark:border-primary-500 dark:text-primary-400' 
                      : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  否
                </button>
                <button
                  type="button"
                  onClick={() => setNeedsSpareParts(true)}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${
                    needsSpareParts
                      ? 'bg-primary-50 border-primary-500 text-primary-700 dark:bg-primary-900/30 dark:border-primary-500 dark:text-primary-400' 
                      : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  是
                </button>
              </div>
            </div>

            {/* 预计到达时间 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Clock size={16} className="text-primary-500" />
                预计到达时间
              </label>
              <input
                type="datetime-local"
                required
                value={estimatedArrivalTime}
                onChange={(e) => setEstimatedArrivalTime(e.target.value)}
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
                placeholder="其他需要说明的事项"
                rows={2}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
              />
            </div>
          </form>
        </div>

        <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
          <button
            type="submit"
            form="respond-form"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all"
          >
            确认添加
          </button>
        </div>
      </div>
    </div>
  );
};

export default RespondModal;
