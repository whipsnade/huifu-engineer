import React, { useState, useRef } from 'react';
import { ChevronLeft, Upload, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';

interface RealNameAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

const RealNameAuthModal: React.FC<RealNameAuthModalProps> = ({ isOpen, onClose, onVerified }) => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognizedData, setRecognizedData] = useState<{ name: string; idNumber: string } | null>(null);
  
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'front') {
          setFrontImage(reader.result as string);
        } else {
          setBackImage(reader.result as string);
        }
        
        // Simulate recognition if both images are uploaded, or just one for demo purposes
        // Let's trigger recognition if front is uploaded, as it contains the main info
        if (side === 'front' || (side === 'back' && frontImage)) {
           simulateRecognition();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateRecognition = () => {
    setIsRecognizing(true);
    setRecognizedData(null);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsRecognizing(false);
      setRecognizedData({
        name: '张三',
        idNumber: '110105199001011234'
      });
    }, 2000);
  };

  const handleSubmit = () => {
    if (recognizedData) {
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
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">实名认证</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6 no-scrollbar">
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">上传身份证照片</h2>
            
            <div className="space-y-4">
              {/* Front Image */}
              <div 
                onClick={() => frontInputRef.current?.click()}
                className="relative h-40 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors overflow-hidden bg-slate-50 dark:bg-slate-900/50"
              >
                {frontImage ? (
                  <img src={frontImage} alt="身份证正面" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-2">
                      <ImageIcon size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">点击上传人像面</span>
                    <span className="text-xs text-slate-500 mt-1">请确保照片清晰，边缘完整</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={frontInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload('front', e)}
                />
              </div>

              {/* Back Image */}
              <div 
                onClick={() => backInputRef.current?.click()}
                className="relative h-40 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors overflow-hidden bg-slate-50 dark:bg-slate-900/50"
              >
                {backImage ? (
                  <img src={backImage} alt="身份证反面" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-2">
                      <ImageIcon size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">点击上传国徽面</span>
                    <span className="text-xs text-slate-500 mt-1">请确保照片清晰，边缘完整</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={backInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload('back', e)}
                />
              </div>
            </div>
          </div>

          {/* Recognition Status & Data */}
          {(isRecognizing || recognizedData) && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">身份信息</h2>
              
              {isRecognizing ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <Loader2 size={32} className="text-primary-500 animate-spin mb-3" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">正在识别身份证信息，请稍候...</p>
                </div>
              ) : recognizedData ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">姓名</label>
                    <input 
                      type="text" 
                      value={recognizedData.name}
                      readOnly
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">身份证号</label>
                    <input 
                      type="text" 
                      value={recognizedData.idNumber}
                      readOnly
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mt-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <CheckCircle2 size={16} />
                    <span className="text-sm font-medium">识别成功，请核对信息无误</span>
                  </div>
                </div>
              ) : null}
            </div>
          )}

        </div>
      </main>

      {/* Footer Button */}
      <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-8">
        <button 
          onClick={handleSubmit}
          disabled={!recognizedData}
          className={`w-full font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
            recognizedData 
              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-900/20' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
          }`}
        >
          确认并提交
        </button>
      </div>
    </div>
  );
};

export default RealNameAuthModal;
