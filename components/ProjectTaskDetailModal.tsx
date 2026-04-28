import React, { useState, useRef } from 'react';
import { ArrowLeft, ChevronRight, Upload, Calendar, Clock, CheckCircle, FileText, Mic } from 'lucide-react';

interface Task {
  name: string;
  status: 'completed' | 'active' | 'pending' | 'gray';
}

interface ProjectData {
  description: string;
  plannedStartTime: string;
  plannedEndTime: string;
  team?: { name: string; role: string; avatar: string }[];
}

interface ProjectTaskDetailModalProps {
  task: Task;
  project: ProjectData;
  onBack: () => void;
}

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop',
];

const ProjectTaskDetailModal: React.FC<ProjectTaskDetailModalProps> = ({ task, project, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [actualHours, setActualHours] = useState('');
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);
  const [tempHours, setTempHours] = useState('');
  const [progress, setProgress] = useState('');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [tempProgress, setTempProgress] = useState('');
  const [notes, setNotes] = useState('');
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [tempNotes, setTempNotes] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // In a real app we'd upload these to a server. Here we just create object URLs
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setAttachments(prev => [...prev, ...newUrls]);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      const scrollLeft = e.currentTarget.scrollLeft;
      const width = e.currentTarget.offsetWidth;
      const newSlide = Math.round(scrollLeft / width);
      setCurrentSlide(newSlide);
    }
  };

  return (
    <div className="flex flex-col font-sans w-full pb-8">
      
      {/* Carousel Section */}
      <div className="relative w-full h-[280px] bg-slate-200 dark:bg-slate-800 shrink-0">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
        >
          {MOCK_IMAGES.map((img, i) => (
            <div key={i} className="min-w-full h-full snap-center relative">
              <img src={img} alt={`验收标准图片 ${i+1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10"></div>
            </div>
          ))}
        </div>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {MOCK_IMAGES.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white scale-110' : 'bg-white/50'}`}
            />
          ))}
        </div>

        {/* Task Info Pill overlay */}
        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm font-semibold">
          {task.name}
        </div>
      </div>

      {/* Form Container */}
      <div className="px-4 py-6 space-y-6">
          
          {/* Section 1: Readonly info */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
            
            <div className="p-4 active:bg-slate-50 dark:active:bg-slate-700/50 transition-colors flex justify-between items-center cursor-pointer">
              <div>
                <div className="text-[11px] text-slate-500 font-medium mb-1">项目描述</div>
                <div className="text-[15px] font-bold text-slate-900 dark:text-white">{project.description}</div>
              </div>
              <ChevronRight size={18} className="text-slate-300 dark:text-slate-600" />
            </div>
            
            <div className="p-4 active:bg-slate-50 dark:active:bg-slate-700/50 transition-colors flex justify-between items-center cursor-pointer">
              <div>
                <div className="text-[11px] text-slate-500 font-medium mb-1">计划起止时间</div>
                <div className="text-[15px] font-bold text-slate-900 dark:text-white">{project.plannedStartTime} 至 {project.plannedEndTime}</div>
              </div>
              <ChevronRight size={18} className="text-slate-300 dark:text-slate-600" />
            </div>

          </div>

          {/* Section 3: Team Members */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-[11px] text-slate-500 font-medium block mb-4">参与人员</h3>
            <div className="grid grid-cols-2 gap-4">
              {project.team?.map((member, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover bg-slate-100 border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{member.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Task Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">任务包</h3>
            
            <div className="space-y-3">
              {/* Start Time */}
              <div className="relative bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 h-12 flex items-center justify-between px-4 cursor-pointer active:scale-[0.99] transition-transform">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mr-1">*</span>开始时间
                </span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-sm font-medium">{startTime ? startTime.replace('T', ' ') : '请选择'}</span>
                  <Calendar size={14} />
                </div>
                <input 
                  type="datetime-local" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* End Time */}
              <div className="relative bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 h-12 flex items-center justify-between px-4 cursor-pointer active:scale-[0.99] transition-transform">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mr-1">*</span>完成时间
                </span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-sm font-medium">{endTime ? endTime.replace('T', ' ') : '请选择'}</span>
                  <Calendar size={14} />
                </div>
                <input 
                  type="datetime-local" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Actual Hours */}
              <div 
                onClick={() => { setTempHours(actualHours); setIsHoursModalOpen(true); }}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 h-12 flex items-center justify-between px-4 cursor-pointer active:scale-[0.99] transition-transform"
              >
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mr-1">*</span>实际工时数
                </span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className={`text-sm font-medium ${actualHours ? 'text-slate-900 dark:text-white' : ''}`}>
                    {actualHours ? `${actualHours}小时` : '请选择'}
                  </span>
                  <Clock size={14} />
                </div>
              </div>

              {/* Task Progress */}
              <div 
                onClick={() => { setTempProgress(progress); setIsProgressModalOpen(true); }}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 h-12 flex items-center justify-between px-4 cursor-pointer active:scale-[0.99] transition-transform"
              >
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mr-1">*</span>任务进度
                </span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className={`text-sm font-medium ${progress ? 'text-slate-900 dark:text-white' : ''}`}>
                    {progress ? `${progress}%` : '请填写'}
                  </span>
                  <CheckCircle size={14} />
                </div>
              </div>

              {/* Notes */}
              <div 
                onClick={() => { setTempNotes(notes); setIsNotesModalOpen(true); }}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 min-h-[48px] py-1.5 flex items-center justify-between px-4 cursor-pointer active:scale-[0.99] transition-transform"
              >
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap mr-4">
                  <span className="text-transparent mr-1">*</span>备注
                </span>
                <div className="flex items-center gap-1.5 text-slate-400 max-w-[70%]">
                  <span className={`text-sm font-medium truncate ${notes ? 'text-slate-900 dark:text-white' : ''}`}>
                    {notes ? notes : '请填写'}
                  </span>
                  <FileText size={14} className="shrink-0" />
                </div>
              </div>

              {/* Attachments */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 px-4 py-3 cursor-pointer active:scale-[0.99] transition-transform flex flex-col justify-center min-h-[48px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="text-transparent mr-1">*</span>附件
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-sm font-medium">{attachments.length > 0 ? `已选${attachments.length}个` : '请上传'}</span>
                    <Upload size={14} />
                  </div>
                </div>
                {attachments.length > 0 && (
                  <div className="flex mt-3 gap-2 overflow-x-auto no-scrollbar">
                    {attachments.map((url, i) => (
                      <div key={i} className="flex-none relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src={url} alt={`Attachment ${i}`} className="w-full h-full object-cover" />
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            setAttachments(prev => prev.filter((_, idx) => idx !== i));
                          }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] cursor-pointer"
                        >
                          ×
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*,video/*"
                />
              </div>
              
              {/* Attachments Section unchanged here, ending of form */}
            </div>

          </div>

        </div>

      {/* Hours Input Modal */}
      {isHoursModalOpen && (
        <div className="absolute inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-[85%] max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white mb-6 text-center">填写实际工时</h3>
            
            <div className="relative mb-8">
              <input 
                type="number" 
                step="0.1"
                min="0"
                autoFocus
                placeholder="0.0"
                value={tempHours}
                onChange={(e) => setTempHours(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white text-3xl font-bold text-center focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder:text-slate-300"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">小时</span>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setIsHoursModalOpen(false)}
                className="flex-1 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold active:scale-[0.98] transition-transform"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  setActualHours(tempHours);
                  setIsHoursModalOpen(false);
                }}
                className="flex-1 py-3.5 rounded-2xl bg-primary-600 text-white font-semibold active:scale-[0.98] transition-transform shadow-lg shadow-primary-500/30"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Input Modal */}
      {isProgressModalOpen && (
        <div className="absolute inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-[85%] max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white mb-6 text-center">填写进度</h3>
            
            <div className="relative mb-8">
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="100"
                autoFocus
                placeholder="0.0"
                value={tempProgress}
                onChange={(e) => setTempProgress(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white text-3xl font-bold text-center focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder:text-slate-300 pr-12"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setIsProgressModalOpen(false)}
                className="flex-1 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold active:scale-[0.98] transition-transform"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  // limit to 0-100 max length
                  let p = parseFloat(tempProgress);
                  if (isNaN(p)) p = 0;
                  if (p > 100) p = 100;
                  if (p < 0) p = 0;
                  setProgress(p.toString());
                  setIsProgressModalOpen(false);
                }}
                className="flex-1 py-3.5 rounded-2xl bg-primary-600 text-white font-semibold active:scale-[0.98] transition-transform shadow-lg shadow-primary-500/30"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Notes Input Modal */}
      {isNotesModalOpen && (
        <div className="absolute inset-0 z-[80] bg-[#F8F9FC] dark:bg-slate-900 flex flex-col font-sans overflow-hidden animate-in slide-in-from-bottom duration-300">
          <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex items-center justify-between px-4 py-3 pt-12 w-full border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsNotesModalOpen(false)}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft size={20} className="text-slate-900 dark:text-white" />
              </button>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">填写备注</h1>
            </div>
            <button 
              onClick={() => { setNotes(tempNotes); setIsNotesModalOpen(false); }}
              className="text-primary-600 font-bold"
            >
              保存
            </button>
          </header>
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="relative h-full">
              <textarea
                className="w-full h-full bg-white dark:bg-slate-800 rounded-2xl p-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                placeholder="请填写备注..."
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                autoFocus
              />
              <button className="absolute bottom-4 right-4 w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-600 active:bg-primary-100 dark:active:bg-primary-900/40 transition-colors shadow-sm">
                <Mic size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTaskDetailModal;
