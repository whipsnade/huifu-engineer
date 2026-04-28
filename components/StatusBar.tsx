import React, { useState, useEffect } from 'react';
import { Wifi, Signal, BatteryFull } from 'lucide-react';

const StatusBar: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-12 px-6 flex items-center justify-between text-slate-900 dark:text-white text-[14px] font-semibold z-[100] absolute top-0 left-0 right-0 pointer-events-none drop-shadow-sm">
      <div className="w-16 flex justify-start tracking-tight">{time}</div>
      
      {/* Dynamic Island / Notch */}
      <div className="w-28 h-7 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2 shadow-sm"></div>

      <div className="w-16 flex justify-end items-center gap-1.5">
        <Signal size={14} className="fill-current" />
        <Wifi size={14} />
        <BatteryFull size={16} className="fill-current" />
      </div>
    </div>
  );
};

export default StatusBar;
