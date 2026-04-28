import React, { useEffect, useRef, useState } from 'react';
import { X, Camera, RefreshCw, AlertCircle } from 'lucide-react';
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5Qrcode } from 'html5-qrcode';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose, onScanSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(console.error);
        setIsScanning(false);
      }
      return;
    }

    const startScanner = async () => {
      try {
        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;
        
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
          },
          (decodedText) => {
            // Success callback
            if (scannerRef.current) {
              scannerRef.current.stop().then(() => {
                setIsScanning(false);
                onScanSuccess(decodedText);
              }).catch(console.error);
            }
          },
          (errorMessage) => {
            // Parse error, usually ignore
          }
        );
        setIsScanning(true);
        setError(null);
      } catch (err) {
        console.error("Error starting scanner:", err);
        setError("无法访问相机，请确保已授予相机权限");
      }
    };

    // Small delay to ensure the DOM element is ready
    const timer = setTimeout(() => {
      startScanner();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[95%]">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
              <Camera size={18} />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">扫一扫</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pt-4 pb-12 flex flex-col items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
            请将设备上的一维码或二维码放入框内
          </p>

          <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 flex-shrink-0">
            <div id="reader" className="w-full h-full [&>video]:object-cover"></div>
            
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/90 dark:bg-slate-800/90">
                <AlertCircle className="text-red-500 mb-2" size={32} />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  刷新页面重试
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerModal;
