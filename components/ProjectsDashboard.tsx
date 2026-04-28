import React, { useState } from 'react';
import { Menu, Search, Calendar, ClipboardList, CheckCircle2, ChevronDown, X, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ, Percent, Clock } from 'lucide-react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';

interface ProjectsDashboardProps {
  onMenuClick?: () => void;
  onViewProject?: (project: any) => void;
}

const MOCK_PROJECTS = [
  {
    id: 'p1',
    name: '2026巡检项目',
    region: '华北区域巡检',
    status: '进行中',
    progress: 75,
    completedTasks: 37,
    totalTasks: 50,
    stats: {
      inProgress: 12,
      pending: 5,
      completed: 37
    }
  },
  {
    id: 'p2',
    name: '星巴克网络改造',
    region: '全国门店',
    status: '进行中',
    progress: 40,
    completedTasks: 40,
    totalTasks: 100,
    stats: {
      inProgress: 25,
      pending: 35,
      completed: 40
    }
  },
  {
    id: 'p3',
    name: '汉堡王设备维护',
    region: 'Q2季度',
    status: '收尾中',
    progress: 90,
    completedTasks: 18,
    totalTasks: 20,
    stats: {
      inProgress: 2,
      pending: 0,
      completed: 18
    }
  }
];

const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({ onMenuClick, onViewProject }) => {
  const [activeProjectId, setActiveProjectId] = useState(MOCK_PROJECTS[0].id);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'处理中' | '待验收' | '已完成' | null>('处理中');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [sortOption, setSortOption] = useState<'time-desc' | 'time-asc' | 'progress-desc' | 'progress-asc' | null>(null);
  const scrollRef = useHorizontalScroll();
  
  const activeProject = MOCK_PROJECTS.find(p => p.id === activeProjectId) || MOCK_PROJECTS[0];

  const projectOrders = [
    {
      id: '88294012', // matches WO-88294012
      title: '光伏电站运维巡检',
      status: '待验收',
      statusColor: 'secondary',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEGNE8bNfUkdI1VFNLIkm3Fz-V9i3JguR7m7ff8o-X3IatHiXXEclkiXs9RT1uiGr4gxbmfhwIg0vCOXvIe1Be_O_ag59VCXQHF58o7JLrChtaKPcaYcaKhgaUTNKtoccqLjqJ6QIoTRW7gtJAAn6IMsc-Q7L2S_bMAkhYh2-brdYDBt5EMiMK-DIpQ-Hz3DXOVelVNkW1sgFm98GdMnRwKIICsWj3LT_AkBUQfOGIEGlxRyq0rfcMsO1vt87XENsVtpOifRECCFk',
      companyName: '公司L',
      storeName: '光伏电站A区',
      brand: 'Otis',
      projectName: '2026巡检项目',
      responsiblePerson: '张三',
      startDate: '2026-04-01',
      endDate: '2026-06-30',
      plannedProgress: 50,
      actualProgress: 45
    },
    {
      id: '88293988', // matches WO-88293988
      title: '配电房B区抢修',
      status: '处理中',
      statusColor: 'primary',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_RMz5SxgGBeWpV2eBUHRa17C0zlgpJ4Mpvs_7kCt4DGgZOgnjVT9whKVPF4WZjnpOmUc-UIsrrKjIBndcgqUK7OhOKbuIYgexZNOGI2Lf_Z5KlabX1YaD-YmGpukRyUyPyziz1l-xGVhrjt-ObgFaM0Awk8HBZEE9buNE73iPTyIta8ZPcAnAnofNzQicjmi7_odWcaJVajpLWxzZxRiuwI0g0Ytaa5Bsw__UXm2z1gv0W8pAD_p5Pk2aDECAHto2rhQB_QIVqP4',
      companyName: '公司M',
      storeName: '配电房B区',
      brand: 'Schneider',
      projectName: '星巴克网络改造',
      responsiblePerson: '李四',
      startDate: '2026-04-10',
      endDate: '2026-05-15',
      plannedProgress: 30,
      actualProgress: 35
    },
    {
      id: '88293541', // Matches WO-88293541
      title: '智能电表安装点C',
      status: '处理中',
      statusColor: 'primary',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIsN0iDjsEl_SV9E4-6kN-PBcDX-CHnQ-TlleMbxELhRNDTbavMI4q3yfbGnWtwkbEBoQzHqZkBDL-ctSv7fM8ju-kqN8cGgUzfhTfzjyKJcVzyiwmyJ2odNMpTzxK5McIkXcxatso-5rT61aLa8dhSz-8V2RkuHZ4MtuXU-kuCZRysKMB-dbrEj7hzSLMRRiKDWMhlqh3hqgBGJep7gH-at5rh4Q4liSwMG32ZChkXHheSz4WgyamP104ypuHpPIFNl6K-z8ef4c',
      companyName: '公司N',
      storeName: '智能电表安装点C',
      brand: 'GE',
      projectName: '汉堡王设备维护',
      responsiblePerson: '王五',
      startDate: '2026-04-15',
      endDate: '2026-04-20',
      plannedProgress: 80,
      actualProgress: 75
    },
    {
      id: '12345678', // matches WO-12345678
      title: '闭环测试门店',
      status: '已完成',
      statusColor: 'success',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqZcjbSAbEnfFtZrEvYg6BH3zOJ-pK1MJGuIgksinNgr9jEquJzLEb0yj0Ivn8kT9jVUNery17EOZ8Lv7uQysYdn8ZPdTN3DOonU-wbMXy3S-LKXHRl_gxYbon1mCeko-vMh3eCECDNpTCv1PorZ28XlxeAUPyHeWLal0YNgrOd4XU6YBOIvFf8foiNzej6sgppw3BchG0-JlUnKr5uIfYEBw5YfAHXDcMUv2k1d1AEZkO4Uvwx8u5bW5BAig6XZbxLJeAvWMX3ac',
      companyName: '测试公司',
      storeName: '闭环测试门店',
      brand: 'TestBrand',
      projectName: '内部测试项目',
      responsiblePerson: '赵六',
      startDate: '2026-03-01',
      endDate: '2026-03-31',
      plannedProgress: 100,
      actualProgress: 100
    },
    {
      id: '105', 
      title: '配电柜紧急抢修',
      status: '已完成',
      statusColor: 'success',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-SkOzW2jRXzemzETjGEp5IKd4Iwlsnk97tEkKsAd_tdRyYmQI2A-CpDJku04O-U5NMrYhJdDQbWiEXtrjTKsAignwOGV4Kupot6RPUCAe2AZK8EDooDLZ3U9eVu0axDX41BF0zcBbtnc1ZHdveMY8wwCftiQ2yN0S7juBA7_TS4IfP62YHxG2fF-h0G389o0l-W29KrJycWYBDM5KnJmlxwELM0qcfXrPQXlOWmf4zzbN4BPGFxUH7OSdbkNT3MWgDJSwJGfTUMY',
      companyName: '未知公司',
      storeName: '未知门店 #105',
      brand: '未知品牌',
      projectName: '紧急抢修专项',
      responsiblePerson: '陈七',
      startDate: '2026-04-20',
      endDate: '2026-04-21',
      plannedProgress: 100,
      actualProgress: 100
    },
    {
      id: '106',
      title: '智能电表安装',
      status: '已完成',
      statusColor: 'success',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClYbXO2210dpA_fxNcRYFYVYpuiaVPnMZvDkoY53nMePMN42BkufStK7ThZZb7Xc67Ov2EKU7G4t4qMC3JfyHb_9V5n05cjRTaU1oTBNVYNduUe0P8roUiaao5dNHS7cmv1pByDTLihff-k6Jw7xSWXcxHEW3r6--l1IpY7CRo_t08PpepioubtCvWDZLtmaG08dremQdD-5ZG0EyeuSrRDE1LDOA6_dy_V_Xv852BfNAOWCSFn-47rcrQ6rTUbqgs9DEeLsHhDI0',
      companyName: '未知公司',
      storeName: '未知门店 #106',
      brand: '未知品牌',
      projectName: '新装电表一期',
      responsiblePerson: '刘八',
      startDate: '2026-04-22',
      endDate: '2026-04-25',
      plannedProgress: 100,
      actualProgress: 100
    }
  ];

  const filteredAndSortedOrders = projectOrders
    .filter(order => statusFilter ? order.status === statusFilter : true)
    .sort((a, b) => {
      if (sortOption === 'time-desc') return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      if (sortOption === 'time-asc') return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (sortOption === 'progress-desc') return (b.actualProgress || 0) - (a.actualProgress || 0);
      if (sortOption === 'progress-asc') return (a.actualProgress || 0) - (b.actualProgress || 0);
      return 0;
    });

  return (
    <div className="flex-1 w-full bg-[#F8F9FC] dark:bg-slate-900 text-slate-900 dark:text-white font-sans overflow-y-auto no-scrollbar pb-32 relative">
      {/* Dynamic Hero Section */}
      <section className="relative px-6 pt-6 pb-16 bg-gradient-to-br from-[#1d4ed8] to-[#1e3a8a] overflow-hidden shrink-0 rounded-b-[2rem]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-[#4f46e5]/40 blur-2xl"></div>
        </div>
        
        <header className="relative z-20 flex items-center justify-between mb-8 text-white pt-2">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-white drop-shadow-sm">我的项目</h1>
          </div>
          <button className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors">
            <Search size={22} className="text-white drop-shadow-sm" />
          </button>
        </header>

        <div className="relative z-10 pl-1">
          <div className="mb-6 flex items-baseline gap-3">
            <div>
              <p className="text-blue-100 text-[12px] font-medium mb-1 drop-shadow-sm">进行中项目</p>
              <h1 className="text-[3.5rem] leading-none font-semibold text-white tracking-tight drop-shadow-md">123</h1>
            </div>
            <div className="flex gap-8 ml-auto mr-4 text-right items-end pb-1">
              <div>
                <p className="text-blue-200 text-[10px] font-medium mb-1 drop-shadow-sm uppercase">已关闭</p>
                <p className="text-xl font-bold text-white tracking-tight drop-shadow-sm">76</p>
              </div>
              <div>
                <p className="text-blue-200 text-[10px] font-medium mb-1 drop-shadow-sm uppercase">累计</p>
                <p className="text-xl font-bold text-white tracking-tight drop-shadow-sm">8492</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats Card as Filter */}
      <div className="sticky top-2 z-30 px-5 -mt-8 pb-4">
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 p-4 ring-1 ring-slate-100 dark:ring-slate-700/50 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3 px-2">
            <div className="w-1.5 h-3.5 bg-primary-500 rounded-full"></div>
            <h2 className="text-[13px] font-bold text-slate-900 dark:text-white">进行中的项目统计</h2>
          </div>
          <div className="flex justify-between items-center text-center">
            {[
              { id: '处理中', label: '处理中', count: projectOrders.filter(o => o.status === '处理中').length },
              { id: '待验收', label: '待验收', count: projectOrders.filter(o => o.status === '待验收').length },
               { id: null, label: '全部', count: projectOrders.length }
            ].map((tab, i, arr) => {
              const isActive = statusFilter === tab.id;
              return (
                <React.Fragment key={tab.label}>
                  <button 
                    onClick={() => setStatusFilter(tab.id)} 
                    className={`flex-1 flex flex-col items-center py-2 rounded-xl transition-all ${isActive ? 'bg-primary-50 dark:bg-primary-900/20 scale-105' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                    <div className={`text-2xl font-light mb-1 ${isActive ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-slate-700 dark:text-slate-200'}`}>
                      {tab.count}
                    </div>
                    <div className={`text-[11px] font-medium ${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-slate-500'}`}>
                      {tab.label}
                    </div>
                  </button>
                  {i < arr.length - 1 && <div className="w-px h-8 bg-slate-100 dark:bg-slate-700/50 mx-0.5"></div>}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

      <main className="space-y-4">
        {/* Recent Work Orders */}
        <section className="px-6 pt-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
               最近工单 
               {statusFilter && <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-400">{statusFilter}</span>}
            </h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFilterSidebarOpen(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors ${sortOption ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                <SlidersHorizontal size={13} />
                <span className="text-[10px] font-bold">快捷筛选</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredAndSortedOrders.map((order) => (
              <div 
                key={order.id} 
                onClick={() => onViewProject && onViewProject({
                  id: `N${new Date().getFullYear()}0912324534${order.id.slice(-3)}`,
                  status: order.status,
                  plannedStartTime: order.startDate,
                  plannedEndTime: order.endDate,
                  storeCode: 'BJN001',
                  storeName: order.storeName,
                  region: '华南区域',
                  manager: order.responsiblePerson,
                  phone: '13456787654',
                  provinceArea: '北京市朝阳区',
                  address: '北京市朝阳区东大桥',
                  description: order.projectName + '安装，请安排',
                  openDate: '2026-05-21',
                  workDays: 98,
                  plannedProgress: order.plannedProgress,
                  actualProgress: order.actualProgress,
                  currentPhase: '办理手续',
                  tasks: [
                    { name: '收房', status: 'completed' },
                    { name: '外墙拆除', status: 'completed' },
                    { name: '办理手续', status: 'active' },
                    { name: '厨房墙砖', status: 'active' },
                    { name: '室外空调安装机组', status: 'gray' },
                    { name: '大厅地砖铺', status: 'active' },
                  ],
                  plannedTimeline: [
                    { task: '收房', date: `截止${order.startDate}完成`, assign: order.responsiblePerson },
                    { task: '外墙拆除', date: `截止${order.startDate}完成`, assign: order.responsiblePerson },
                    { task: '大厅地砖铺', date: `截止${order.endDate}完成`, assign: order.responsiblePerson },
                  ],
                  actualTimeline: [
                    { task: '收房', date: `${order.startDate} 已完成`, assign: order.responsiblePerson, status: 'completed' },
                    { task: '外墙拆除', date: `${order.startDate} 已完成`, assign: order.responsiblePerson, status: 'completed' },
                    { task: '大厅地砖铺', date: '未开始', assign: '', status: 'pending' },
                  ],
                  team: [
                    { name: order.responsiblePerson, role: '客户管理人员', avatar: 'https://ui-avatars.com/api/?name=' + order.responsiblePerson + '&background=0D8ABC&color=fff' },
                    { name: '李四', role: '供应商管理人员', avatar: 'https://ui-avatars.com/api/?name=李四&background=F59E0B&color=fff' },
                  ]
                })}
                className="bg-white dark:bg-slate-800 rounded-[1.25rem] p-3 flex flex-col gap-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-700 transition-transform active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">
                       #{order.id}
                     </span>
                     <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                       {order.brand}
                     </span>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    order.statusColor === 'success'
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/50'
                      : order.statusColor === 'primary' 
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800/50' 
                      : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700">
                    <img src={order.img} alt={`Work Order ${order.id}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white text-[13px] mb-1 truncate">{order.title}</h4>
                    <div className="flex flex-col gap-0.5">
                       <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 block"></span>
                          {order.companyName}
                       </p>
                       <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 block"></span>
                          {order.storeName}
                       </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5 mt-1 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                   <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="truncate">项目: <span className="font-medium text-slate-700 dark:text-slate-300">{order.projectName}</span></span>
                      <span className="shrink-0">负责: <span className="text-slate-600 dark:text-slate-300">{order.responsiblePerson}</span></span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="shrink-0">时间: {order.startDate} ~ {order.endDate}</span>
                   </div>
                   <div className="mt-1 space-y-2">
                     <div className="flex items-center gap-2">
                       <span className="text-[9px] w-12 shrink-0 text-slate-500">计划进度</span>
                       <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                         <div className="h-full bg-slate-400 dark:bg-slate-500 rounded-full" style={{ width: `${order.plannedProgress}%` }}></div>
                       </div>
                       <span className="text-[9px] font-medium text-slate-600 dark:text-slate-400 w-6 text-right">{order.plannedProgress}%</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <span className="text-[9px] w-12 shrink-0 text-primary-600 dark:text-primary-400 font-medium">实际进度</span>
                       <div className="flex-1 h-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-full overflow-hidden">
                         <div className={`h-full rounded-full ${order.actualProgress! >= order.plannedProgress! ? 'bg-primary-500' : 'bg-red-500'}`} style={{ width: `${order.actualProgress}%` }}></div>
                       </div>
                       <span className={`text-[9px] font-bold w-6 text-right ${order.actualProgress! >= order.plannedProgress! ? 'text-primary-600 dark:text-primary-400' : 'text-red-500'}`}>{order.actualProgress}%</span>
                     </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Project Selector Modal */}
      {isSelectorOpen && (
        <div className="absolute inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSelectorOpen(false)} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300 pb-6">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">切换项目</h3>
              <button onClick={() => setIsSelectorOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
              {MOCK_PROJECTS.map(project => (
                <button
                  key={project.id}
                  onClick={() => {
                    setActiveProjectId(project.id);
                    setIsSelectorOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    activeProjectId === project.id 
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 dark:border-primary-500/50' 
                      : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-bold ${activeProjectId === project.id ? 'text-primary-700 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                      {project.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{project.progress}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{project.region}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Sidebar Modal */}
      {isFilterSidebarOpen && (
        <div className="absolute inset-0 z-[100] flex justify-end overflow-hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterSidebarOpen(false)} />
          <div className="relative w-[85%] max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-primary-500" />
                快捷筛选
              </h3>
              <button onClick={() => setIsFilterSidebarOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8">
              {/* Sort by Time */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock size={16} className="text-slate-400" />
                  派单时间
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSortOption('time-desc')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors ${sortOption === 'time-desc' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    <ArrowDownAZ size={14} /> 最新优先
                  </button>
                  <button
                    onClick={() => setSortOption('time-asc')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors ${sortOption === 'time-asc' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    <ArrowUpAZ size={14} /> 最早优先
                  </button>
                </div>
              </div>

              {/* Sort by Progress */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Percent size={16} className="text-slate-400" />
                  实际进度
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSortOption('progress-desc')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors ${sortOption === 'progress-desc' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    <ArrowUpAZ size={14} /> 由高到低
                  </button>
                  <button
                    onClick={() => setSortOption('progress-asc')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors ${sortOption === 'progress-asc' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    <ArrowDownAZ size={14} /> 由低到高
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button 
                onClick={() => setSortOption(null)}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm active:opacity-70 transition-opacity"
              >
                重置
              </button>
              <button 
                onClick={() => setIsFilterSidebarOpen(false)}
                className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-transform"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsDashboard;
