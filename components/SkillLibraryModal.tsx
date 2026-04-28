import React, { useState } from 'react';
import { X, Monitor, Zap, Network, Server, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SkillLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCert: (cert: { name: string; level: 'S' | 'A' | 'B' | 'C' }) => void;
}

const CATEGORIES = [
  { 
    id: 'it', 
    name: 'IT设备类', 
    icon: Monitor, 
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    skills: ['POS 终端维修', '打印机快修', '收银机调试', '大屏显示器安装'] 
  },
  { 
    id: 'electric', 
    name: '电工类', 
    icon: Zap, 
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    skills: ['商业照明排查', '基础电路施工', '配电箱巡检'] 
  },
  { 
    id: 'network', 
    name: '网络类', 
    icon: Network, 
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    skills: ['商业路由器配置', '交换机网管', 'AP无线部署'] 
  },
  { 
    id: 'weak', 
    name: '弱电类', 
    icon: Server, 
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    skills: ['数字监控安防', '门禁考勤系统', '背景音响功放'] 
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "在进行设备接线时，以下哪项操作是必须的？",
    options: ["断开总电源并进行验电确认", "穿好绝缘鞋直接带电作业", "无需注意，设备电压较低"]
  },
  {
    question: "遇到设备反复死机重启时，首要的排查步骤是？",
    options: ["立刻重新刷写固件", "检查电源供电及散热情况", "直接申请更换主板"]
  },
  {
    question: "关于保密协议与客户隐私，正确的做法是？",
    options: ["将客户设备的密码拍照保存在手机里使用", "结束维修后应在客户监督下销毁相关密码和配置信息", "发在微信群与其他工程师交流"]
  }
];

export const SkillLibraryModal: React.FC<SkillLibraryModalProps> = ({ isOpen, onClose, onAddCert }) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<'idle' | 'taking' | 'submitting' | 'passed'>('idle');
  const [answers, setAnswers] = useState<Record<number, number>>({});

  if (!isOpen) return null;

  const handleSelectSkill = (skill: string) => {
    setSelectedSkill(skill);
    setQuizState('taking');
    setAnswers({});
  };

  const handleSubmitQuiz = () => {
    setQuizState('submitting');
    setTimeout(() => {
      setQuizState('passed');
    }, 1500);
  };

  const handleFinish = () => {
    if (selectedSkill) {
      onAddCert({ name: selectedSkill, level: 'C' });
    }
    setSelectedSkill(null);
    setQuizState('idle');
    onClose();
  };

  const handleBack = () => {
    if (quizState === 'taking') {
      setSelectedSkill(null);
      setQuizState('idle');
    } else {
      onClose();
    }
  };

  if (quizState !== 'idle' && selectedSkill) {
    return (
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 z-[100] flex flex-col font-sans overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
        <header className="flex items-center px-4 py-4 bg-white dark:bg-slate-800 shadow-sm z-10 shrink-0">
          <button onClick={handleBack} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors mr-2">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">技能考核</h2>
            <p className="text-[11px] text-slate-500">{selectedSkill} · 认证测试</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-5 py-6">
          {quizState === 'submitting' ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium">试卷审核中...</p>
            </div>
          ) : quizState === 'passed' ? (
            <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">审核通过！</h2>
              <p className="text-slate-500 text-center text-sm px-8 mb-8 leading-relaxed">
                恭喜您，已成功通过<span className="font-bold text-primary-600 mx-1">{selectedSkill}</span>认证考核。<br/>认证已下发至您的技能库。
              </p>
              <button 
                onClick={handleFinish}
                className="w-full bg-primary-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-transform"
              >
                收下认证
              </button>
            </div>
          ) : (
            <div className="space-y-8 pb-10">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4 leading-relaxed">
                    <span className="text-primary-500 mr-2">{idx + 1}.</span>
                    {q.question}
                  </h3>
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[idx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                            isSelected 
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium' 
                              : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50'
                          }`}
                          onClick={() => setAnswers(prev => ({ ...prev, [idx]: optIdx }))}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < QUIZ_QUESTIONS.length}
                  className="w-full bg-primary-600 disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-primary-500/20 disabled:shadow-none active:scale-[0.98] transition-all"
                >
                  提交试卷
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 z-[100] flex flex-col font-sans overflow-hidden animate-in slide-in-from-bottom-full duration-300">
      <header className="flex items-center justify-between px-5 py-4 bg-white dark:bg-slate-800 shadow-sm shrink-0">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">技能库认证</h2>
        <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
          <X size={24} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6">
        <p className="text-sm text-slate-500 mb-6">选择适合您的技能类别，参与在线答题，审核通过后即可获得相关技能认证，接取更高报酬工单。</p>
        
        <div className="space-y-6">
          {CATEGORIES.map(category => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="bg-white dark:bg-slate-800 rounded-[1.5rem] p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${category.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{category.name}</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.skills.map((skill, index) => (
                    <button 
                      key={index} 
                      onClick={() => handleSelectSkill(skill)}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all group"
                    >
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill}</span>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
