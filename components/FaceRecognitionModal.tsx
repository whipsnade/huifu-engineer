import React, { useState, useEffect } from 'react';
import { ChevronLeft, ScanFace, CheckCircle2, Loader2 } from 'lucide-react';

interface FaceRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

const FaceRecognitionModal: React.FC<FaceRecognitionModalProps> = ({ isOpen, onClose, onVerified }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(false);
      setScanComplete(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startScan = () => {
    setIsScanning(true);
    // Simulate face scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const handleSubmit = () => {
    if (scanComplete) {
      onVerified();
      onClose();
    }
  };

  return (
    <div className="absolute inset-0 z-[100] flex flex-col bg-[#F4F6F8] dark:bg-slate-900 font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-center px-5 py-4 pt-12 w-full bg-[#F4F6F8] dark:bg-slate-900">
        <button onClick={onClose} className="absolute left-5 p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">人脸识别</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-5 py-6 no-scrollbar">
        <div className="w-full max-w-sm flex flex-col items-center">
          
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {scanComplete ? '识别成功' : isScanning ? '正在识别...' : '请正对手机屏幕'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {scanComplete 
                ? '已完成人脸特征比对' 
                : '请确保光线充足，不要遮挡面部'}
            </p>
          </div>

          {/* Scanner UI */}
          <div className="relative w-64 h-64 mb-12">
            {/* Outer Ring */}
            <div className={`absolute inset-0 rounded-full border-4 ${scanComplete ? 'border-green-500' : 'border-primary-100 dark:border-primary-900/30'}`}></div>
            
            {/* Scanning Animation */}
            {isScanning && (
              <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
            )}
            
            {/* Inner Content */}
            <div className="absolute inset-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
              {scanComplete ? (
                <div className="flex flex-col items-center text-green-500 animate-in zoom-in duration-300">
                  <CheckCircle2 size={64} />
                </div>
              ) : (
                <div className={`text-slate-300 dark:text-slate-600 ${isScanning ? 'animate-pulse' : ''}`}>
                  <ScanFace size={100} strokeWidth={1} />
                </div>
              )}
            </div>

            {/* Scan Line */}
            {isScanning && (
              <div className="absolute left-0 right-0 h-1 bg-primary-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
            )}
          </div>

          {!isScanning && !scanComplete && (
            <div className="w-full space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">录入人脸信息</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  录入成功后，您可以使用人脸识别进行系统登录和工单结案，提升操作的安全性和便捷性。
                </p>
              </div>
              <button 
                onClick={startScan}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <ScanFace size={20} />
                开始识别
              </button>
            </div>
          )}

          {scanComplete && (
            <button 
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 animate-in slide-in-from-bottom-4"
            >
              完成
            </button>
          )}

        </div>
      </main>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FaceRecognitionModal;
