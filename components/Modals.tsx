import React, { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle, Video, AlertOctagon, Camera, Film, Navigation, MapPin, Car, ExternalLink, Package, ShoppingCart, Plus, Minus, Trash2, ChevronDown, CreditCard, Edit, Mic } from 'lucide-react';
import { WorkOrder, Part } from '../types';
import { MOCK_PARTS } from '../constants';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    fullScreen?: boolean;
}

const ModalBase: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, fullScreen }) => {
    if (!isOpen) return null;
    return (
        <div className="absolute inset-0 z-[60] flex items-end sm:items-center justify-center sm:px-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative bg-white dark:bg-slate-800 w-full ${fullScreen ? 'h-full rounded-none' : 'h-[90vh] rounded-t-3xl'} sm:h-auto sm:max-w-md sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-200 flex flex-col sm:max-h-[85vh]`}>
                <div className="flex-none flex items-center justify-between p-4 border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500">
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar p-4 relative">
                    {children}
                </div>
                {footer && (
                    <div className="flex-none p-4 border-t dark:border-slate-700 bg-white dark:bg-slate-800">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

// Complete Job Modal
export const CompleteJobModal: React.FC<{ isOpen: boolean; onClose: () => void; order: WorkOrder | null; onSubmit: (data: any) => void; onEditFee?: () => void }> = ({ isOpen, onClose, order, onSubmit, onEditFee }) => {
    const [notes, setNotes] = useState('');
    const [solution, setSolution] = useState('');
    
    const { isRecording, startRecording: handleVoiceInput } = useVoiceInput((transcript) => {
        setNotes(prev => prev + (prev ? ' ' : '') + transcript);
    });

    const solutionOptions = [
        "更换配件",
        "固件升级",
        "硬件重置",
        "清洁/保养",
        "配置调整",
        "其他"
    ];

    // Reset state when the order ID changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setNotes('');
            setSolution('');
        }
    }, [isOpen, order?.id]);

    const handleSubmit = () => {
        console.log(`Submitting completion for Order #${order?.id}. Solution: ${solution}. Notes: ${notes}`);
        onSubmit({ solution, notes });
        onClose();
    };

    const footer = (
        <button 
            onClick={handleSubmit}
            disabled={!solution}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-900/20 active:scale-[0.98]"
        >
            <CheckCircle size={20} />
            提交完成
        </button>
    );

    return (
        <ModalBase isOpen={isOpen} onClose={onClose} title="完成工单" footer={footer} fullScreen>
            <div className="space-y-5">
                {/* Header Info */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex justify-between items-center border border-slate-100 dark:border-slate-700">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">工单编号</p>
                        <p className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">{order?.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">门店</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 max-w-[150px] truncate">{order?.storeName}</p>
                    </div>
                </div>

                {/* Solution Radio Group */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                        解决方式 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {solutionOptions.map((opt) => (
                            <label 
                                key={opt} 
                                className={`
                                    relative flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200
                                    ${solution === opt 
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 shadow-sm ring-1 ring-primary-500' 
                                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                                    }
                                `}
                            >
                                <input 
                                    type="radio" 
                                    name="solution" 
                                    value={opt} 
                                    checked={solution === opt}
                                    onChange={(e) => setSolution(e.target.value)}
                                    className="sr-only" // Hide default radio button
                                />
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${solution === opt ? 'border-primary-600 bg-primary-600' : 'border-slate-300'}`}>
                                    {solution === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                                <span className="text-xs font-bold">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label htmlFor={`notes-${order?.id}`} className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        备注 / 说明
                    </label>
                    <div className="relative">
                        <textarea 
                            id={`notes-${order?.id}`}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[100px] text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 pl-3 pr-10 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none transition-shadow" 
                            placeholder="请描述维修详情..."
                        ></textarea>
                        <button
                            type="button"
                            onClick={handleVoiceInput}
                            className={`absolute right-3 bottom-3 p-2 rounded-full transition-colors ${
                                isRecording 
                                ? 'bg-red-100 text-red-500 animate-pulse' 
                                : 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 hover:bg-primary-50 dark:hover:bg-slate-500 hover:text-primary-500'
                            }`}
                            title="语音输入"
                        >
                            <Mic size={18} />
                        </button>
                    </div>
                </div>

                {/* Media Upload */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        附件
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-primary-400 transition-all cursor-pointer group">
                        <div className="flex gap-4 mb-3">
                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Camera size={24} className="text-blue-500" />
                            </div>
                            <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 delay-75">
                                <Film size={24} className="text-purple-500" />
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary-600 transition-colors">
                            上传照片或视频
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                            点击浏览相册或拍照
                        </span>
                    </div>
                </div>

                {/* Fee Details */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                            维修费用明细
                        </label>
                        {onEditFee && (
                            <button 
                                onClick={onEditFee}
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 p-1 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                            >
                                <Edit size={16} />
                            </button>
                        )}
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                        <div className="space-y-3 mb-3 pl-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">上门费</span>
                                <span className="font-medium text-slate-700 dark:text-slate-300">¥50.00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">工时费</span>
                                <span className="font-medium text-slate-700 dark:text-slate-300">¥100.00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">配件/资源费</span>
                                <span className="font-medium text-slate-700 dark:text-slate-300">¥0.00</span>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center pl-2">
                            <span className="font-bold text-slate-900 dark:text-white">合计费用</span>
                            <span className="text-lg font-black text-orange-600 dark:text-orange-500">¥150.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};

// Repair Guide Modal
export const RepairGuideModal: React.FC<{ isOpen: boolean; onClose: () => void; order: WorkOrder | null }> = ({ isOpen, onClose, order }) => {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose} title="Repair Guide">
            <div className="space-y-4">
                <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative group cursor-pointer overflow-hidden">
                    <img src="https://picsum.photos/seed/video/600/400" alt="Video Thumbnail" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 group-hover:scale-110 transition-transform">
                             <Video size={32} className="text-white fill-white" />
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{order?.type} Standard Procedure</h4>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                        <ul className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li>Isolate power supply before opening panel.</li>
                            <li>Check error codes on main board.</li>
                            <li>Reset sensor array if applicable.</li>
                            <li>Verify voltage levels on rails A and B.</li>
                            <li>Clean all contacts before reassembly.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};

// Navigation Modal
export const NavigationModal: React.FC<{ isOpen: boolean; onClose: () => void; order: WorkOrder | null }> = ({ isOpen, onClose, order }) => {
    if (!order) return null;

    const openExternalMap = (service: 'google' | 'apple') => {
        const query = `${order.lat},${order.lng}`;
        let url = '';
        if (service === 'google') {
            url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
        } else {
            url = `http://maps.apple.com/?daddr=${query}`;
        }
        window.open(url, '_blank');
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose} title="Navigation">
            <div className="flex flex-col h-full">
                {/* Simulated Map Visual */}
                <div className="relative w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-700 group">
                    {/* Map Background Pattern */}
                    <div className="absolute inset-0 opacity-20 dark:opacity-10" 
                        style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                    </div>
                    
                    {/* Road Path (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path 
                            d="M 60 200 Q 120 180 150 120 T 300 50" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="4" 
                            strokeLinecap="round"
                            strokeDasharray="10 4"
                            className="animate-[dash_1s_linear_infinite]"
                        >
                             <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite" />
                        </path>
                    </svg>
                    
                    {/* Start Point (Engineer) */}
                    <div className="absolute left-8 bottom-8 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow-lg z-10">
                            <Car size={16} className="text-blue-500" />
                        </div>
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold mt-1 shadow">
                            You
                        </div>
                    </div>

                    {/* End Point (Store) */}
                    <div className="absolute right-12 top-8 flex flex-col items-center">
                         <div className="w-8 h-8 rounded-full bg-primary-600 border-2 border-white flex items-center justify-center shadow-lg animate-bounce z-10">
                            <MapPin size={16} className="text-white" />
                        </div>
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold mt-1 shadow truncate max-w-[100px]">
                            {order.storeName}
                        </div>
                    </div>
                </div>

                {/* Route Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                     <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                         <p className="text-xs text-slate-500 uppercase font-bold">Est. Time</p>
                         <p className="text-xl font-bold text-slate-900 dark:text-white">14 min</p>
                         <p className="text-xs text-green-600 font-medium">Traffic Normal</p>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                         <p className="text-xs text-slate-500 uppercase font-bold">Distance</p>
                         <p className="text-xl font-bold text-slate-900 dark:text-white">{order.distance}</p>
                         <p className="text-xs text-slate-400 font-medium">{order.address}</p>
                     </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button 
                        onClick={() => openExternalMap('google')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-between px-6 shadow-sm transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Navigation size={20} />
                            <span>Google Maps</span>
                        </div>
                        <ExternalLink size={16} className="opacity-70" />
                    </button>
                    
                    <button 
                        onClick={() => openExternalMap('apple')}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl flex items-center justify-between px-6 shadow-sm transition-colors"
                    >
                        <div className="flex items-center gap-3">
                             <MapPin size={20} />
                            <span>Apple Maps</span>
                        </div>
                        <ExternalLink size={16} className="opacity-70" />
                    </button>
                </div>
            </div>
        </ModalBase>
    );
};

// Parts Selection Modal
export const PartsSelectionModal: React.FC<{ isOpen: boolean; onClose: () => void; order: WorkOrder | null }> = ({ isOpen, onClose, order }) => {
    const [selectedParts, setSelectedParts] = useState<Set<string>>(new Set());
    const [currentType, setCurrentType] = useState<string>('');
    const [isTypeSelectorOpen, setIsTypeSelectorOpen] = useState(false);

    // Get unique types from MOCK_PARTS
    const allTypes = useMemo(() => Array.from(new Set(MOCK_PARTS.map(p => p.type))), []);

    // Update currentType when order changes or modal opens
    useEffect(() => {
        if (isOpen && order) {
            setCurrentType(order.type);
            setSelectedParts(new Set());
            setIsTypeSelectorOpen(false);
        }
    }, [isOpen, order?.id]);

    // Filter parts based on currentType
    const availableParts = useMemo(() => {
        if (!currentType) return [];
        return MOCK_PARTS.filter(part => part.type === currentType);
    }, [currentType]);

    // Calculate totals
    const totalCost = useMemo(() => {
        let total = 0;
        availableParts.forEach(part => {
            if (selectedParts.has(part.id)) {
                total += part.partPrice + part.installationPrice + part.shippingFee;
            }
        });
        return total;
    }, [selectedParts, availableParts]);

    const togglePart = (partId: string) => {
        const newSelected = new Set(selectedParts);
        if (newSelected.has(partId)) {
            newSelected.delete(partId);
        } else {
            newSelected.add(partId);
        }
        setSelectedParts(newSelected);
    };

    useEffect(() => {
        if (isOpen) {
            setSelectedParts(new Set());
        }
    }, [isOpen, order?.id]);

    const formatCurrency = (val: number) => `$${val.toFixed(2)}`;

    return (
        <ModalBase isOpen={isOpen} onClose={onClose} title="Order Parts">
             <div className="flex flex-col h-full relative">
                
                {/* Info Header & Selector */}
                <div className="relative z-10 mb-4">
                    <div 
                        onClick={() => setIsTypeSelectorOpen(!isTypeSelectorOpen)}
                        className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex items-center gap-3 border border-blue-100 dark:border-blue-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                        <Package className="text-blue-600 dark:text-blue-400 shrink-0" size={24} />
                        <div className="flex-1">
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">Equipment Type</p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{currentType} Parts</p>
                                <ChevronDown size={14} className={`text-blue-600 dark:text-blue-400 transition-transform ${isTypeSelectorOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                    </div>

                    {/* Type Dropdown */}
                    {isTypeSelectorOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden py-1 animate-in slide-in-from-top-2 duration-200">
                            {allTypes.map(type => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setCurrentType(type);
                                        setSelectedParts(new Set()); // Clear selections when changing type
                                        setIsTypeSelectorOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                                        currentType === type 
                                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/10 font-bold' 
                                        : 'text-slate-700 dark:text-slate-200'
                                    }`}
                                >
                                    <span>{type}</span>
                                    {currentType === type && <CheckCircle size={14} />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Parts List */}
                <div className="flex-1 space-y-3 mb-4 overflow-y-auto min-h-0">
                    {availableParts.length === 0 ? (
                        <div className="text-center py-10 text-slate-500">
                            <p>No specific parts found for {currentType}.</p>
                        </div>
                    ) : (
                        availableParts.map(part => {
                            const isSelected = selectedParts.has(part.id);
                            const itemTotal = part.partPrice + part.installationPrice + part.shippingFee;

                            return (
                                <div 
                                    key={part.id}
                                    onClick={() => togglePart(part.id)}
                                    className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer group ${
                                        isSelected 
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                                        : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${isSelected ? 'bg-primary-500 border-primary-500 text-white' : 'border-slate-300 bg-white'}`}>
                                                {isSelected && <CheckCircle size={12} />}
                                            </div>
                                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{part.name}</span>
                                        </div>
                                        <span className="font-black text-slate-900 dark:text-white">{formatCurrency(itemTotal)}</span>
                                    </div>

                                    {/* Breakdown */}
                                    <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg">
                                        <div className="flex flex-col">
                                            <span>Unit</span>
                                            <span className="text-slate-700 dark:text-slate-300">{formatCurrency(part.partPrice)}</span>
                                        </div>
                                        <div className="flex flex-col border-l border-slate-200 dark:border-slate-700 pl-2">
                                            <span>Labor</span>
                                            <span className="text-slate-700 dark:text-slate-300">{formatCurrency(part.installationPrice)}</span>
                                        </div>
                                        <div className="flex flex-col border-l border-slate-200 dark:border-slate-700 pl-2">
                                            <span>Ship</span>
                                            <span className="text-slate-700 dark:text-slate-300">{formatCurrency(part.shippingFee)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Summary */}
                <div className="mt-auto border-t border-slate-100 dark:border-slate-700 pt-4 bg-white dark:bg-slate-800 z-10">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-500 text-sm">Selected ({selectedParts.size})</span>
                        <div className="text-right">
                             <span className="text-xs text-slate-400 block">Total Estimate</span>
                             <span className="text-2xl font-bold text-primary-600">{formatCurrency(totalCost)}</span>
                        </div>
                     </div>
                     <button 
                        disabled={selectedParts.size === 0}
                        onClick={onClose}
                        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20 active:scale-[0.98] transition-all"
                    >
                        <ShoppingCart size={20} />
                        Request Parts
                    </button>
                </div>

             </div>
        </ModalBase>
    );
}