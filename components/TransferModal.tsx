import React, { useState, useMemo } from 'react';
import { X, Search, User, FileText, CheckCircle2, Mic } from 'lucide-react';
import { WorkOrder } from '../types';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: WorkOrder | null;
  onSubmit: (data: any) => void;
}

// Mock engineers data
const MOCK_ENGINEERS = [
  { id: 'e1', name: '张三', company: '北京维修中心', distance: '1.2km' },
  { id: 'e2', name: '李四', company: '海淀区分部', distance: '3.5km' },
  { id: 'e3', name: '王五', company: '朝阳区分部', distance: '5.8km' },
  { id: 'e4', name: '赵六', company: '丰台区分部', distance: '8.1km' },
  { id: 'e5', name: '陈七', company: '通州区分部', distance: '12.4km' },
];

const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, order, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngineer, setSelectedEngineer] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const { isRecording, startRecording: handleVoiceInput } = useVoiceInput((transcript) => {
    setReason(prev => prev + (prev ? ' ' : '') + transcript);
  });

  const filteredEngineers = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_ENGINEERS;
    const query = searchQuery.toLowerCase();
    return MOCK_ENGINEERS.filter(e => 
      e.name.toLowerCase().includes(query) || 
      e.company.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEngineer) {
      alert('请选择要转派的工程师');
      return;
    }
    if (!reason.trim()) {
      alert('请输入转派原因');
      return;
    }
    
    const engineer = MOCK_ENGINEERS.find(e => e.id === selectedEngineer);
    
    onSubmit({
      engineerId: selectedEngineer,
      engineerName: engineer?.name,
      reason
    });
    
    // Reset form
    setSearchQuery('');
    setSelectedEngineer(null);
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
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">转派工单</h2>
            <p className="text-xs text-slate-500 mt-1">将工单 #{order.id} 转派给其他工程师</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto no-scrollbar flex-1">
          <form id="transfer-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* 搜索工程师 */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User size={16} className="text-primary-500" />
                选择工程师
              </label>
              
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索工程师姓名或分部..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>

              {searchQuery.trim() && (
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden max-h-48 overflow-y-auto no-scrollbar">
                  {filteredEngineers.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-500">未找到匹配的工程师</div>
                  ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                      {filteredEngineers.map(engineer => (
                        <button
                          key={engineer.id}
                          type="button"
                          onClick={() => {
                            setSelectedEngineer(engineer.id);
                            setSearchQuery(engineer.name); // Optional: auto-fill search with selected name
                          }}
                          className={`w-full flex items-center justify-between p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left ${selectedEngineer === engineer.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedEngineer === engineer.id ? 'bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                              {engineer.name[0]}
                            </div>
                            <div>
                              <p className={`text-sm font-bold ${selectedEngineer === engineer.id ? 'text-primary-700 dark:text-primary-300' : 'text-slate-700 dark:text-slate-300'}`}>{engineer.name}</p>
                              <p className="text-[10px] text-slate-500">{engineer.company} • 距离 {engineer.distance}</p>
                            </div>
                          </div>
                          {selectedEngineer === engineer.id && (
                            <CheckCircle2 size={18} className="text-primary-600 dark:text-primary-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 转派原因 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileText size={16} className="text-primary-500" />
                转派原因
              </label>
              <div className="relative">
                <textarea
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="请详细说明转派原因..."
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
          </form>
        </div>

        <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
          <button
            type="submit"
            form="transfer-form"
            disabled={!selectedEngineer || !reason.trim()}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all"
          >
            确认转派
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
