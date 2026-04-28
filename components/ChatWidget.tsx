import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Plus, Sparkles, Mic } from 'lucide-react';
import { WorkOrder, ChatMessage } from '../types';
import { MOCK_ORDERS } from '../constants';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrders: WorkOrder[];
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, activeOrders }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isRecording, startRecording } = useVoiceInput((transcript) => {
    setInputValue(prev => prev + transcript);
  });

  const faqCards = [
    { title: "想了解账号绑定？这样说：", quote: "如何在账户绑定我的门店 / 企业信息" },
    { title: "想了解费用计算？这样说：", quote: "报修服务的费用是怎么计算的" },
    { title: "想了解提现退款？这样说：", quote: "账户余额如何提现 / 退款" },
    { title: "想了解账户充值？这样说：", quote: "如何为账户充值" },
    { title: "需要人工帮助？这样说：", quote: "400服务台联系方式" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate support response
    setTimeout(() => {
        const response: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: "感谢您的反馈，我们会尽快为您处理。",
            sender: 'support',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div className="bg-black/20 absolute inset-0 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div className="bg-gradient-to-b from-[#F0F4FF] via-[#F8FAFF] to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 w-full sm:w-[500px] h-full sm:h-[750px] sm:rounded-3xl shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-bottom duration-300 overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-12 pb-4 sm:pt-6">
          <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-slate-700 dark:text-slate-300" />
          </button>
          <div className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-1">
            智能客服助手 <Sparkles size={18} className="text-blue-400" />
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          
          {/* History Divider */}
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-700"></div>
            <span className="text-xs text-slate-400">点击查看历史</span>
            <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-700"></div>
          </div>

          {/* Avatar & Greeting */}
          <div className="flex flex-col items-center mt-6 mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-100 border-4 border-white dark:border-slate-800 shadow-md">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e0f2fe" 
                  alt="AI Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#A5D6A7] text-slate-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border-2 border-white dark:border-slate-800 shadow-sm">
                AI
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                👋嗨，我是您的智能客服助手
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 px-8">
                您可以在下方选择问题，或直接向我提问。
              </p>
            </div>
          </div>

          {/* FAQ Cards or Chat Messages */}
          <div className="px-5 space-y-4">
            {messages.length === 0 ? (
              // Show FAQ Cards if no messages
              faqCards.map((card, idx) => (
                <div key={idx} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 dark:border-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">{card.title}</div>
                  <div className="flex justify-between items-center gap-4">
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-[15px] leading-snug">
                      “{card.quote}”
                    </div>
                    <button 
                      onClick={() => handleSend(card.quote)}
                      className="shrink-0 text-blue-600 dark:text-blue-400 font-bold text-sm bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      去试试
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // Show Chat Messages
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-100 dark:border-slate-700'
                  }`}>
                    <p className="text-[15px] leading-relaxed font-medium">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/80 backdrop-blur-md pt-4 pb-8 px-5">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-full shadow-inner border border-slate-200/50 dark:border-slate-700 p-1.5 flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
              <Plus size={24} />
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="直接向我提问..." 
              className="flex-1 bg-transparent outline-none px-2 text-[15px] text-slate-800 dark:text-white placeholder:text-slate-400 min-w-0" 
            />
            <button 
              onClick={startRecording}
              className={`shrink-0 p-2 rounded-full transition-colors ${
                  isRecording 
                  ? 'bg-red-100 text-red-500 animate-pulse' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="语音输入"
            >
              <Mic size={20} />
            </button>
            <button 
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="shrink-0 whitespace-nowrap bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-[15px] px-6 py-2.5 rounded-full disabled:opacity-50 transition-colors hover:bg-blue-200 dark:hover:bg-blue-900/60"
            >
              发送
            </button>
          </div>
          <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-4 font-medium">
            内容由 AI 生成，可能会有偏差
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;