import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, User, Phone, MapPin, CheckCircle2, ChevronDown,
  Share2, BookOpen, Headset
} from 'lucide-react';
import ProjectTaskDetailModal from './ProjectTaskDetailModal';
import ProjectCompleteModal from './ProjectCompleteModal';

export interface ProjectData {
  id: string;
  originalOrderId?: string;
  status?: string;
  plannedStartTime: string;
  plannedEndTime: string;
  storeCode: string;
  storeName: string;
  region: string;
  manager: string;
  phone: string;
  provinceArea: string;
  address: string;
  description: string;
  openDate: string;
  workDays: number;
  plannedProgress: number;
  actualProgress: number;
  currentPhase: string;
  tasks: { name: string; status: 'completed' | 'active' | 'pending' | 'gray' }[];
  plannedTimeline: { task: string; date: string; assign: string }[];
  actualTimeline: { task: string; date: string; assign: string; status: 'completed' | 'pending' }[];
  team: { name: string; role: string; avatar: string }[];
}

interface ProjectDetailModalProps {
  project: ProjectData;
  onBack: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onBack }) => {
  const [activeTask, setActiveTask] = useState<any>(project.tasks.find(t => t.status === 'active') || project.tasks[0]);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState(project.status || '处理中');

  const handleCompleteSubmit = () => {
    setLocalStatus('待验收');
    setIsCompleteModalOpen(false);
  };

  const isEditable = localStatus !== '待验收' && localStatus !== '已完成';

  return (
    <div className="absolute inset-0 z-[60] bg-[#F8F9FC] dark:bg-slate-900 flex flex-col font-sans overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex items-center justify-between px-4 py-3 pt-12 w-full border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-900 dark:text-white" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            项目详情
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              localStatus === '处理中' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' :
              localStatus === '待验收' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
              'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
            }`}>
              {localStatus}
            </span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2 pr-1">
          <button className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[#3b82f6]">
            <Share2 size={20} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[#f97316]">
            <BookOpen size={20} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[#22c55e]">
            <Headset size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="p-4 space-y-4">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50">
            <div className="mb-4">
              <span className="text-[11px] text-slate-500 font-medium block mb-1">编号</span>
              <span className="text-[15px] font-bold text-slate-900 dark:text-white">{project.id}</span>
            </div>
            
            <div className="mb-4 text-sm font-medium">
              <span className="text-[11px] text-slate-500 font-medium block mb-1">计划起止时间</span>
              <div className="text-[#f97316] font-bold">
                {project.plannedStartTime} 至 {project.plannedEndTime}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">门店</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.storeCode} {project.storeName}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">区域</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.region}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">负责人</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.manager}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">联系电话</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.phone}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">所属省市区</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.provinceArea}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">地址</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.address}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">项目说明</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.description}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">开业日期</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.openDate}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Progress */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-5">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1">计划工时</span>
              <div className="text-[#f97316] font-bold text-base">
                {project.workDays} <span className="text-sm font-semibold">(工作日)</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-2">计划进度</span>
              <div className="w-full bg-slate-100 dark:bg-slate-700/50 h-3.5 rounded-full overflow-hidden relative border border-slate-200/50 dark:border-slate-600">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${project.plannedProgress}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white drop-shadow-md">
                  {project.plannedProgress}%
                </div>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-2">实际进度</span>
              <div className="w-full bg-slate-100 dark:bg-slate-700/50 h-3.5 rounded-full overflow-hidden relative border border-slate-200/50 dark:border-slate-600">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${project.actualProgress}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white drop-shadow-md">
                  {project.actualProgress}%
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Project Phase & Tasks */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-5">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1">项目阶段</span>
              <span className="text-[#f97316] font-bold text-base">{project.currentPhase}</span>
            </div>
            
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-3">任务项列表</span>
              <div className="flex flex-wrap gap-2">
                {project.tasks.map((task, i) => {
                  const isActive = activeTask.name === task.name;
                  return (
                  <span 
                    key={i} 
                    onClick={() => setActiveTask(task)}
                    className={`cursor-pointer active:scale-95 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20 scale-105'
                        : task.status === 'completed'
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500' 
                        : task.status === 'active'
                        ? 'border border-primary-500 text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {task.name}
                  </span>
                )})}
              </div>
            </div>
          </div>

          {/* Task Detail inline component */}
          {activeTask && (
            <ProjectTaskDetailModal 
              task={activeTask} 
              project={project} 
              onBack={() => {}} 
            />
          )}

        </div>
      </main>

      {/* Complete Button Footer */}
      {localStatus === '处理中' && (
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-40">
          <button 
            onClick={() => setIsCompleteModalOpen(true)}
            className="w-full h-[52px] bg-primary-600 active:bg-primary-700 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-primary-500/20"
          >
            <CheckCircle2 size={20} strokeWidth={2.5} />
            完成项目
          </button>
        </div>
      )}

      {/* Complete Sub-modal */}
      {isCompleteModalOpen && (
        <ProjectCompleteModal
          onBack={() => setIsCompleteModalOpen(false)}
          onSubmit={handleCompleteSubmit}
        />
      )}
    </div>
  );
};

export default ProjectDetailModal;
