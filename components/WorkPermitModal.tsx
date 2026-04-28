import React, { useState } from 'react';

interface WorkPermitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLIENT_PERMITS = [
  {
    id: 1,
    company: '星巴克',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg'
  },
  {
    id: 2,
    company: '麦当劳',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1024px-McDonald%27s_Golden_Arches.svg.png'
  },
  {
    id: 3,
    company: '肯德基',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Kentucky_Fried_Chicken_2006_logo.svg/500px-Kentucky_Fried_Chicken_2006_logo.svg.png'
  }
];

const WorkPermitModal: React.FC<WorkPermitModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  if (!isOpen) return null;

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex(prev => (prev + 1) % CLIENT_PERMITS.length);
    }
    if (isRightSwipe) {
      setCurrentIndex(prev => (prev - 1 + CLIENT_PERMITS.length) % CLIENT_PERMITS.length);
    }
  };

  const currentClient = CLIENT_PERMITS[currentIndex];

  return (
    <div className="absolute inset-0 z-[100] flex items-end sm:items-center justify-center p-4 font-sans overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div 
        className="relative z-10 w-full max-w-[340px] animate-in slide-in-from-bottom-8 duration-300 pb-6"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/60 dark:border-slate-700/60 transition-all duration-300">
          
          {/* Watermark Text Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-[0.04] dark:opacity-[0.08] p-3 flex flex-wrap content-start">
             {Array.from({ length: 30 }).map((_, i) => (
                <span key={i} className="text-[7px] font-extrabold uppercase leading-[4] tracking-[0.5px] mr-2 whitespace-nowrap text-slate-900 dark:text-white">
                  Alex Engineer | 8829340 | 2026-04-03 14:30
                </span>
             ))}
          </div>

          {/* Background Siren Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none z-0 transition-opacity duration-300">
            <img 
              key={currentClient.id}
              alt="" 
              className="w-[240px] h-[240px] object-contain grayscale animate-in fade-in duration-300" 
              src={currentClient.logo}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Drag Handle */}
          <div className="w-10 h-1.5 bg-slate-300/60 dark:bg-slate-600/60 rounded-full mx-auto mt-4 mb-2 relative z-20"></div>

          {/* Pagination Indicators */}
          <div className="absolute top-6 left-0 right-0 flex justify-center gap-1.5 z-30">
            {CLIENT_PERMITS.map((_, idx) => (
              <div 
                key={idx} 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${idx === currentIndex ? 'w-5 bg-primary-500' : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
              />
            ))}
          </div>

          {/* Content Area */}
          <div className="relative z-20 px-8 pt-4 pb-8 flex flex-col items-center select-none">
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-6">
              数字工作许可证
            </span>

            {/* Client/Authorized Badge */}
            <div className="absolute top-12 right-6 flex flex-col items-end">
              <img 
                key={`badge-${currentClient.id}`}
                alt={currentClient.company} 
                className="w-14 h-14 object-contain mb-1 drop-shadow-sm mix-blend-multiply dark:mix-blend-normal rounded-full bg-white p-0.5 animate-in fade-in zoom-in duration-300" 
                src={currentClient.logo}
                referrerPolicy="no-referrer"
              />
              <span className="text-[7px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter text-right leading-tight mt-1">
                {currentClient.company}<br/>认证工程师
              </span>
            </div>

            {/* Profile Section */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full border-[3px] border-primary-500 p-1 bg-white dark:bg-slate-800 shadow-md">
                <img 
                  alt="Alex Engineer" 
                  className="w-full h-full object-cover rounded-full" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfAGP3S9sdHvsxuOPi0mKzfzNu0BjliVVdCKTM3LUMTp96c6_9-FOp6N4wtGg6rD2KsqKq6Cnu6oIO-5hnMx-8lhbD1vXfFYN8yaRE0EkJhulZgEag7pJfgeFsN_-jfddRiH9PYM3hoHSBivQUj3DpKU8ri1hdYdex0bXOLKeT4bRKm5c37ABYMZ9WGlFZy3t_s_yNK68SzLeSeDpG760LHSZ1jKkuDbxFEsH2r7j2I_i_CiU1m6PFrbl90DamFRCZlmqq4NAHoiE"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Integrated Verified Badge */}
              <div className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 rounded-full p-0.5 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 11.99l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 11.99l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 11.99zm-13.06 5.14l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z"/>
                </svg>
              </div>
            </div>

            {/* Info Section */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Alex Engineer</h2>
              <p className="text-primary-600 dark:text-primary-400 font-extrabold text-[11px] uppercase tracking-wider">高级认证工程师</p>
              
              <div className="pt-3 flex flex-col items-center">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">认证 ID</span>
                <span className="text-base font-mono font-bold text-slate-900 dark:text-white">8829340</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-6 px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">已实名认证</span>
            </div>

            {/* Action Button */}
            <button onClick={onClose} className="w-full mt-8 bg-primary-600 text-white text-sm font-bold py-4 rounded-2xl shadow-xl shadow-primary-600/25 hover:brightness-105 active:scale-[0.98] transition-all relative z-20">
              Done
            </button>
          </div>

          {/* Subtle Tonal Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-bl-full z-0"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/5 rounded-tr-full z-0"></div>
        </div>
      </div>
    </div>
  );
}

export default WorkPermitModal;
