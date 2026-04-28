import React, { useState } from 'react';
import { ArrowLeft, Banknote, TrendingUp, Calendar, Upload, ChevronRight, Search } from 'lucide-react';

interface EarningsDashboardProps {
  onMenuClick?: () => void;
  onViewFeeDetails?: (orderId: string) => void;
}

const mockOrders = [
  {
    id: '#88294012',
    status: '已支付',
    statusColor: 'bg-[#28cd41]',
    textColor: 'text-[#006e1a]',
    amount: '¥450.00',
    title: '光伏电站运维巡检',
    time: '11-24 14:30',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqZcjbSAbEnfFtZrEvYg6BH3zOJ-pK1MJGuIgksinNgr9jEquJzLEb0yj0Ivn8kT9jVUNery17EOZ8Lv7uQysYdn8ZPdTN3DOonU-wbMXy3S-LKXHRl_gxYbon1mCeko-vMh3eCECDNpTCv1PorZ28XlxeAUPyHeWLal0YNgrOd4XU6YBOIvFf8foiNzej6sgppw3BchG0-JlUnKr5uIfYEBw5YfAHXDcMUv2k1d1AEZkO4Uvwx8u5bW5BAig6XZbxLJeAvWMX3ac',
    details: ['基础人工 ¥300', '服务奖励 ¥150'],
  },
  {
    id: '#88293988',
    status: '待支付',
    statusColor: 'bg-[#fe9400]',
    textColor: 'text-[#8c5000]',
    amount: '¥1,200.00',
    title: '配电柜紧急抢修',
    time: '11-24 10:15',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-SkOzW2jRXzemzETjGEp5IKd4Iwlsnk97tEkKsAd_tdRyYmQI2A-CpDJku04O-U5NMrYhJdDQbWiEXtrjTKsAignwOGV4Kupot6RPUCAe2AZK8EDooDLZ3U9eVu0axDX41BF0zcBbtnc1ZHdveMY8wwCftiQ2yN0S7juBA7_TS4IfP62YHxG2fF-h0G389o0l-W29KrJycWYBDM5KnJmlxwELM0qcfXrPQXlOWmf4zzbN4BPGFxUH7OSdbkNT3MWgDJSwJGfTUMY',
    details: ['基础人工 ¥800', '物料抵扣 -¥100'],
  },
  {
    id: '#88293541',
    status: '待结算',
    statusColor: 'bg-blue-500',
    textColor: 'text-blue-700',
    amount: '¥350.00',
    title: '智能电表安装',
    time: '11-23 16:45',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClYbXO2210dpA_fxNcRYFYVYpuiaVPnMZvDkoY53nMePMN42BkufStK7ThZZb7Xc67Ov2EKU7G4t4qMC3JfyHb_9V5n05cjRTaU1oTBNVYNduUe0P8roUiaao5dNHS7cmv1pByDTLihff-k6Jw7xSWXcxHEW3r6--l1IpY7CRo_t08PpepioubtCvWDZLtmaG08dremQdD-5ZG0EyeuSrRDE1LDOA6_dy_V_Xv852BfNAOWCSFn-47rcrQ6rTUbqgs9DEeLsHhDI0',
    details: ['等待结算支付'],
  },
];

const EarningsDashboard: React.FC<EarningsDashboardProps> = ({ onMenuClick, onViewFeeDetails }) => {
  const [statusFilter, setStatusFilter] = useState<'全部' | '待支付' | '已支付' | '待结算'>('全部');

  const filteredOrders = mockOrders.filter(order => statusFilter === '全部' || order.status === statusFilter);

  return (
    <div className="flex-1 w-full bg-[#F8F9FC] dark:bg-slate-900 text-slate-900 dark:text-white font-sans overflow-y-auto no-scrollbar pb-32">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-5 py-4 pt-12 w-full">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">我的费用</h1>
        </div>
        <button className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <Search size={22} />
        </button>
      </header>

      <main className="px-6 space-y-8 mt-4">
        {/* Total Earnings Card */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 p-6 rounded-[1.5rem] shadow-xl shadow-primary-500/10">
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Banknote size={160} />
          </div>
          <div className="relative z-10 space-y-5">
            <div>
              <p className="text-white/80 text-xs font-medium tracking-wide">全部收入 (Total Revenue)</p>
              <div className="flex items-baseline mt-1">
                <span className="text-white text-xl font-semibold">¥</span>
                <h2 className="text-white text-4xl font-bold tracking-tight ml-1">12,840.50</h2>
              </div>
            </div>
            <div className="pt-3 border-t border-white/20 flex justify-between items-center">
              <div>
                <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest">本月收入 (THIS MONTH)</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-white text-lg font-bold">¥680.00</p>
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1">
                    <TrendingUp size={12} className="text-white" />
                    <span className="text-white text-[10px] font-bold">+12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Income Trend Section */}
        <section className="bg-white dark:bg-slate-800 rounded-[1.5rem] p-5 space-y-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-lg font-bold tracking-tight">收入趋势 (近半年)</h3>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] mt-0.5">Income Trend - Last 6 Months</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-600"></span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">收入金额</span>
            </div>
          </div>
          
          {/* Area Chart Placeholder with SVG */}
          <div className="w-full h-40">
            <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#059669" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path fill="url(#chartGradient)" d="M0 120 Q 40 100, 80 110 T 160 80 T 240 95 T 320 60 T 400 40 V 150 H 0 Z"></path>
              <path d="M0 120 Q 40 100, 80 110 T 160 80 T 240 95 T 320 60 T 400 40" fill="none" stroke="#059669" strokeLinecap="round" strokeWidth="3"></path>
              <circle cx="80" cy="110" fill="#059669" r="4"></circle>
              <circle cx="160" cy="80" fill="#059669" r="4"></circle>
              <circle cx="240" cy="95" fill="#059669" r="4"></circle>
              <circle cx="320" cy="60" fill="#059669" r="4"></circle>
              <circle cx="400" cy="40" fill="#059669" r="4"></circle>
            </svg>
            <div className="flex justify-between mt-2 px-1 text-[10px] font-bold text-slate-400">
              <span>12月</span>
              <span>1月</span>
              <span>2月</span>
              <span>3月</span>
              <span>4月</span>
            </div>
          </div>
        </section>

        {/* Time Filter Buttons */}
        <nav className="flex gap-2">
          <button className="flex-1 py-2.5 bg-primary-600 text-white rounded-[1rem] font-bold text-xs transition-all active:scale-95 shadow-sm">本月</button>
          <button className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs rounded-[1rem] transition-all active:scale-95 border border-slate-200 dark:border-slate-700">上月</button>
          <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-[1rem] flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-slate-200 dark:border-slate-700">
            <Calendar size={14} />
            <span className="font-bold text-xs whitespace-nowrap">自定义日期</span>
          </button>
        </nav>

        {/* Order Details List */}
        <section className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">订单详情</h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">共 {mockOrders.length} 笔</span>
            </div>
            <button className="flex items-center gap-1 text-primary-600 font-bold text-xs bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-full transition-all hover:bg-primary-100 dark:hover:bg-primary-900/50 active:scale-95">
              <Upload size={14} />
              导出
            </button>
          </div>

          {/* Status Filter Nav */}
          <nav className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
            {['全部', '待支付', '已支付', '待结算'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`flex-none px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                  statusFilter === status
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </nav>

          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-400">没有查找到符合条件的订单</div>
            ) : (
                filteredOrders.map((order, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 p-5 rounded-[1.25rem] transition-all hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none border border-slate-100 dark:border-slate-700 group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${order.statusColor}`}></span>
                        <span className={`text-[10px] font-bold ${order.textColor} tracking-wider uppercase`}>{order.status}</span>
                        <span className="text-[9px] font-medium text-slate-400 ml-1.5">{order.id}</span>
                      </div>
                      <p className="text-base font-bold text-slate-900 dark:text-white">{order.amount}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                        <img src={order.image} alt={order.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{order.title}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{order.time}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-700 flex justify-between items-center text-[9px] font-bold text-slate-500 tracking-wider">
                      <div className="flex gap-3">
                        {order.details.map((detail, i) => (
                          <span key={i}>{detail}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => onViewFeeDetails && onViewFeeDetails(order.id.replace('#', 'WO-'))}
                        className="p-1 -m-1 cursor-pointer"
                      >
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-600 transition-colors" />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default EarningsDashboard;
