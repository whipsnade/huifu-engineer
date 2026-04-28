import React, { useState } from 'react';
import { X, Star, MessageSquare } from 'lucide-react';
import { WorkOrder } from '../types';

interface EvaluateModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: WorkOrder | null;
  onSubmit: (rating: number, comment: string) => void;
}

const EvaluateModal: React.FC<EvaluateModalProps> = ({ isOpen, onClose, order, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
        alert("请选择星级评分");
        return;
    }
    onSubmit(rating, comment);
    // Reset form
    setRating(0);
    setHoverRating(0);
    setComment('');
  };

  return (
    <div className="absolute inset-0 z-[200] flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">工单评价</h2>
            <p className="text-xs text-slate-500 mt-1">请对本次维修服务进行评价</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto no-scrollbar">
          <form id="evaluate-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* 评分 */}
            <div className="space-y-3 flex flex-col items-center">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">星级评分</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="p-1 transition-transform hover:scale-110 focus:outline-none"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star 
                                size={36} 
                                className={`transition-colors ${
                                    (hoverRating || rating) >= star 
                                        ? 'fill-amber-400 text-amber-400' 
                                        : 'fill-transparent text-slate-300 dark:text-slate-600'
                                }`} 
                            />
                        </button>
                    ))}
                </div>
                <div className="text-xs text-slate-500 font-medium min-h-[16px]">
                    {rating === 1 && '非常不满意'}
                    {rating === 2 && '不满意'}
                    {rating === 3 && '一般'}
                    {rating === 4 && '满意'}
                    {rating === 5 && '非常满意'}
                </div>
            </div>

            {/* 评价内容 */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <MessageSquare size={16} className="text-primary-500" />
                评价内容
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="请输入您的评价内容..."
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
              />
            </div>
          </form>
        </div>

        <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              form="evaluate-form"
              className="flex-1 px-4 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-lg shadow-primary-900/20 transition-all"
            >
              提交评价
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluateModal;
