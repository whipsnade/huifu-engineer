import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { 
  Menu, 
  Search, 
  MessageSquare, 
  Bell, 
  CheckCircle,
  Clock,
  MapPin,
  PauseCircle,
  AlertTriangle,
  User,
  Home,
  ClipboardList,
  FolderKanban,
  CircleDollarSign
} from 'lucide-react';
import { OrderStatus, WorkOrder, EngineerProfile } from './types';
import { MOCK_ORDERS, MOCK_PROFILE, MOCK_PROFILE_2 } from './constants';
import { useHorizontalScroll } from './hooks/useHorizontalScroll';
import Sidebar from './components/Sidebar';
import WorkOrderCard from './components/WorkOrderCard';
import ChatWidget from './components/ChatWidget';
import WorkOrderDetail from './components/WorkOrderDetail';
import ProjectDetailModal from './components/ProjectDetailModal';
import WorkPermitModal from './components/WorkPermitModal';
import HomeDashboard from './components/HomeDashboard';
import ProjectsDashboard from './components/ProjectsDashboard';
import EarningsDashboard from './components/EarningsDashboard';
import ProfileDashboard from './components/ProfileDashboard';
import ScannerModal from './components/ScannerModal';
import StatusBar from './components/StatusBar';
import SettingsModal from './components/SettingsModal';
import ApprovalsModal from './components/ApprovalsModal';
import RespondModal from './components/RespondModal';
import TransferModal from './components/TransferModal';
import StopMeterModal from './components/StopMeterModal';
import ReturnOrderModal from './components/ReturnOrderModal';
import TechUpgradeModal from './components/TechUpgradeModal';
import EvaluateModal from './components/EvaluateModal';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import { CompleteJobModal, RepairGuideModal, NavigationModal, PartsSelectionModal } from './components/Modals';

const CustomAchievementIcon = ({ size = 26, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Trophy */}
    <path d="M5 2h6v1.5H5V2zm-1 2h8v3c0 2-1.5 3.7-3.4 3.9v1.6h2.4v1.5H5v-1.5h2.4V10.9C5.5 10.7 4 9 4 7V4zM2 4h2v3c0 .8.5 1.5 1.2 1.8C4.2 8 3 6.6 3 5V4H2zm12 0h2v1c0 1.6-1.2 3-2.2 3.8.7-.3 1.2-1 1.2-1.8V4z" />
    {/* Star */}
    <path d="M8 4.5l.6 1.5 1.4.2-1.1.9.3 1.4-1.2-.8-1.2.8.3-1.4-1.1-.9 1.4-.2L8 4.5z" />
    {/* Gear */}
    <path d="M19 1.5l.5.8h1v1l.8.5-.8.5v1h-1l-.5.8-.5-.8h-1v-1l-.8-.5.8-.5v-1h1l.5-.8zm0 1.2a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
    {/* Podium */}
    <path d="M16 12h4v12h-4V12zm-5 5h4v7h-4v-7zm-5 3h4v4H6v-4z" />
    {/* Flag */}
    <path d="M17.5 8h3.5v2.5h-3.5V8zm0 2.5v1.5h1v-1.5h-1z" />
    {/* Curved lines */}
    <path d="M11 8.5a5 5 0 0 1 3-1.2l.2 1a4 4 0 0 0-2.5 1l-.7-.8zm.5 2.5a6 6 0 0 1 3.5-1.2l.2 1a5 5 0 0 0-3 1l-.7-.8z" />
  </svg>
);

const App: React.FC = () => {
  console.log('[App] Rendering');
  
  React.useEffect(() => {
    console.log('[App] Mounted');
    return () => console.log('[App] Unmounted');
  }, []);

  // Shared View Check
  const [sharedOrderId, setSharedOrderId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('shareWorkOrder');
  });

  if (sharedOrderId) {
    const sharedOrder = MOCK_ORDERS.find(o => o.id === sharedOrderId) || { ...MOCK_ORDERS[0], id: sharedOrderId };
    return (
      <div className="font-sans antialiased text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 min-h-[100dvh] w-full max-w-full overflow-hidden flex flex-col items-center">
         <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl overflow-hidden flex flex-col h-[100dvh] relative">
            <WorkOrderDetail
               order={sharedOrder}
               onBack={() => {
                  window.history.pushState({}, document.title, window.location.pathname);
                  setSharedOrderId(null);
               }}
               onAction={() => {}}
               initialTab="overview"
               isSharedView={true}
            />
         </div>
      </div>
    );
  }

  // State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') !== 'false';
  });
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);
  const [activeTab, setActiveTab] = useState<OrderStatus>(OrderStatus.IN_PROGRESS);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [isWorkPermitOpen, setWorkPermitOpen] = useState(false);
  const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);
  const [isGuideModalOpen, setGuideModalOpen] = useState(false);
  const [isNavModalOpen, setNavModalOpen] = useState(false);
  const [isPartsModalOpen, setPartsModalOpen] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isApprovalsOpen, setApprovalsOpen] = useState(false);
  const [isRespondModalOpen, setRespondModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  const [isStopMeterModalOpen, setStopMeterModalOpen] = useState(false);
  const [isReturnOrderModalOpen, setReturnOrderModalOpen] = useState(false);
  const [isTechUpgradeModalOpen, setTechUpgradeModalOpen] = useState(false);
  const [isEvaluateModalOpen, setEvaluateModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [viewingOrder, setViewingOrder] = useState<WorkOrder | null>(null);
  const [viewingProject, setViewingProject] = useState<any>(null); // To store ProjectData
  const [detailTab, setDetailTab] = useState<'overview' | 'tasks' | 'timeline' | 'parts' | 'fee'>('overview');
  const [sortBy, setSortBy] = useState<'default' | 'distance' | 'cost' | 'priority'>('default');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [orders, setOrders] = useState<WorkOrder[]>(() => {
    return MOCK_ORDERS.map(order => {
      if (order.status === OrderStatus.PENDING) {
        return { ...order, dispatchTime: new Date().toISOString() };
      }
      return order;
    });
  });
  const [profile, setProfile] = useState<EngineerProfile>(MOCK_PROFILE);
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);

  const handleSwitchCompany = useCallback(() => {
    const profiles = [MOCK_PROFILE, MOCK_PROFILE_2];
    const nextIndex = (activeCompanyIndex + 1) % profiles.length;
    setActiveCompanyIndex(nextIndex);
    setProfile(profiles[nextIndex]);
  }, [activeCompanyIndex]);

  const [activeNav, setActiveNav] = useState(() => {
    return localStorage.getItem('activeNav') || 'home';
  });

  useEffect(() => {
    localStorage.setItem('activeNav', activeNav);
  }, [activeNav]);

  // Hook to check for closed orders that need to be archived
  useEffect(() => {
    const updateArchivedOrders = () => {
      setOrders(prevOrders => {
        let hasChanges = false;
        const now = new Date().getTime();
        const fortyEightHoursMs = 48 * 60 * 60 * 1000;

        const updated = prevOrders.map(order => {
          if (order.status === OrderStatus.CLOSED && order.closedAt) {
            const closedTime = new Date(order.closedAt).getTime();
            if (now - closedTime >= fortyEightHoursMs) {
              hasChanges = true;
              return { ...order, status: OrderStatus.ARCHIVED };
            }
          }
          return order;
        });

        return hasChanges ? updated : prevOrders;
      });
    };

    // Run once on mount
    updateArchivedOrders();

    // Set interval to check every minute
    const interval = setInterval(updateArchivedOrders, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollRef = useHorizontalScroll();

  // Derived State
  const filteredOrders = useMemo(() => {
    let result = orders;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(o => 
        o.id.toLowerCase().includes(query) ||
        (o.storeNumber && o.storeNumber.toLowerCase().includes(query)) ||
        o.storeName.toLowerCase().includes(query) ||
        o.address.toLowerCase().includes(query) ||
        o.customerName.toLowerCase().includes(query) ||
        (o.reporter && o.reporter.toLowerCase().includes(query))
      );
    }

    if (activeTab === OrderStatus.ALL) return result;
    
    if (activeTab === OrderStatus.IN_PROGRESS) {
      const inProgressStatuses = [
        OrderStatus.IN_PROGRESS,
        OrderStatus.ACCEPTED,
        OrderStatus.STOP_METER_APPLIED,
        OrderStatus.STOP_METERING,
        OrderStatus.STOP_METER_REJECTED,
        OrderStatus.METER_OPENED,
        OrderStatus.TECH_UPGRADE_APPLIED,
        OrderStatus.TECH_EXPERT_SOLVING,
        OrderStatus.TECH_UPGRADE_REJECTED,
        OrderStatus.TRANSFERRED,
        OrderStatus.FEE_CHANGE_APPLIED,
        OrderStatus.FEE_CHANGED,
        OrderStatus.FEE_CHANGE_REJECTED,
        OrderStatus.RECEIPT_APPLIED,
        OrderStatus.RECEIPTED,
        OrderStatus.RECEIPT_REJECTED,
        OrderStatus.DEPARTED,
        OrderStatus.ARRIVED,
        OrderStatus.REPAIRING,
        OrderStatus.RESTART
      ];
      return result.filter(order => inProgressStatuses.includes(order.status));
    }

    if (activeTab === OrderStatus.COMPLETED) {
      const completedStatuses = [
        OrderStatus.COMPLETED,
        OrderStatus.CLOSED,
        OrderStatus.ARCHIVED,
        OrderStatus.CANCELLED
      ];
      return result.filter(order => completedStatuses.includes(order.status));
    }

    return result.filter(order => order.status === activeTab);
  }, [activeTab, orders, searchQuery]);

  const sortedOrders = useMemo(() => {
    let result = [...filteredOrders];

    if (sortBy === 'distance') {
      result.sort((a, b) => {
        const distA = parseFloat(a.distance.replace(/[^\d.]/g, '')) || 0;
        const distB = parseFloat(b.distance.replace(/[^\d.]/g, '')) || 0;
        return sortOrder === 'asc' ? distA - distB : distB - distA;
      });
    } else if (sortBy === 'cost') {
      result.sort((a, b) => {
        const costA = a.cost || 0;
        const costB = b.cost || 0;
        return sortOrder === 'asc' ? costA - costB : costB - costA;
      });
    } else if (sortBy === 'priority') {
      const priorityMap: Record<string, number> = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      result.sort((a, b) => {
        const pA = priorityMap[a.priority] || 0;
        const pB = priorityMap[b.priority] || 0;
        return sortOrder === 'asc' ? pA - pB : pB - pA;
      });
    }

    return result;
  }, [filteredOrders, sortBy, sortOrder]);

  const activeOrdersForChat = useMemo(() => {
    const chatStatuses = [
        OrderStatus.IN_PROGRESS,
        OrderStatus.PENDING,
        OrderStatus.RESTART,
        OrderStatus.ACCEPTED,
        OrderStatus.STOP_METERING,
        OrderStatus.TECH_EXPERT_SOLVING,
        OrderStatus.REPAIRING
    ];
    return orders.filter(order => chatStatuses.includes(order.status));
  }, [orders]);

  // Handlers
  const handleAction = React.useCallback((action: string, order: WorkOrder, data?: any) => {
    console.log(`[App] handleAction: ${action} on order ${order.id}`);
    setSelectedOrder(order);
    switch (action) {
      case 'view':
        setDetailTab('overview');
        setViewingOrder(order);
        break;
      case 'complete':
        setCompleteModalOpen(true);
        break;
      case 'guide':
        setGuideModalOpen(true);
        break;
      case 'navigate':
        setNavModalOpen(true);
        break;
      case 'parts':
        setPartsModalOpen(true);
        break;
      case 'tech_upgrade':
        setTechUpgradeModalOpen(true);
        break;
      case 'evaluate':
        setEvaluateModalOpen(true);
        break;
      case 'support':
        setChatOpen(true);
        break;
      case 'accept':
        {
          const updatedOrder = { ...order, status: OrderStatus.ACCEPTED };
          setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
          setViewingOrder(updatedOrder);
          console.log(`Action ${action} on order ${order.id} - Status updated to ACCEPTED`);
        }
        break;
      case 'reject':
        {
          const updatedOrder = { ...order, status: OrderStatus.CANCELLED };
          setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
          setViewingOrder(null);
          console.log(`Action ${action} on order ${order.id} - Status updated to CANCELLED`);
        }
        break;
      case 'confirm_arrival':
        {
          const updatedOrder = { ...order, status: OrderStatus.ARRIVED };
          setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
          setViewingOrder(updatedOrder);
          console.log(`Action ${action} on order ${order.id} - Status updated to ARRIVED`);
        }
        break;
      case 'respond':
        {
          setRespondModalOpen(true);
        }
        break;
      case 'depart':
        {
          const updatedOrder = { ...order, status: OrderStatus.DEPARTED };
          setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
          setViewingOrder(updatedOrder);
          console.log(`Action ${action} on order ${order.id} - Status updated to DEPARTED`);
        }
        break;
      case 'arrive':
        {
          const updatedOrder = { ...order, status: OrderStatus.ARRIVED };
          setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
          setViewingOrder(updatedOrder);
          console.log(`Action ${action} on order ${order.id} - Status updated to ARRIVED`);
          
          setTimeout(() => {
            setOrders(prev => {
              const orderToUpdate = prev.find(o => o.id === order.id);
              if (orderToUpdate && orderToUpdate.status === OrderStatus.ARRIVED) {
                const repairingOrder = { ...orderToUpdate, status: OrderStatus.REPAIRING };
                setViewingOrder(currentViewing => currentViewing?.id === order.id ? repairingOrder : currentViewing);
                return prev.map(o => o.id === order.id ? repairingOrder : o);
              }
              return prev;
            });
          }, 10 * 60 * 1000);
        }
        break;
      case 'transfer':
        setTransferModalOpen(true);
        break;
      case 'submit_fee':
        if (data) {
          handleFeeChangeSubmit(data);
        }
        break;
      case 'pause':
        {
          setStopMeterModalOpen(true);
        }
        break;
      case 'return_order':
        {
          setReturnOrderModalOpen(true);
        }
        break;
      case 'resume':
        {
          const updatedOrder = { ...order, status: OrderStatus.IN_PROGRESS };
          setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
          setViewingOrder(updatedOrder);
        }
        break;
      case 'withdraw_completion':
        {
          const newTimelineEvent = {
            id: `tl-${Date.now()}`,
            type: '撤回工单完成申请',
            timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
            description: `工程师已撤回验收申请，工单恢复为处理中状态。`
          };

          const updatedOrder = {
             ...order,
             status: OrderStatus.IN_PROGRESS,
             submittedForAcceptanceAt: undefined,
             timeline: order.timeline ? [newTimelineEvent, ...order.timeline] : [newTimelineEvent]
          };

          setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
          setViewingOrder(updatedOrder);
        }
        break;
      default:
        break;
    }
  }, []);

  const tabs = [
    { id: OrderStatus.PENDING, label: '待接单', icon: <Clock size={16} /> },
    { id: OrderStatus.TO_BE_VISITED, label: '待上门', icon: <MapPin size={16} /> },
    { id: OrderStatus.IN_PROGRESS, label: '处理中', icon: <CheckCircle size={16} /> },
    { id: OrderStatus.TO_BE_ACCEPTED, label: '待验收', icon: <CheckCircle size={16} /> },
    { id: OrderStatus.PENDING_PAYMENT, label: '待付款', icon: <AlertTriangle size={16} /> },
    { id: OrderStatus.TO_BE_REVIEWED, label: '待评价', icon: <MessageSquare size={16} /> },
    { id: OrderStatus.COMPLETED, label: '已完成', icon: <CheckCircle size={16} /> },
    { id: OrderStatus.ALL, label: '全部', icon: <ClipboardList size={16} /> },
  ];

  const handleBack = React.useCallback(() => {
    console.log('[App] handleBack called');
    console.trace();
    setViewingOrder(null);
  }, []);

  const handleRespondSubmit = (data: any) => {
    if (!selectedOrder) return;
    
    let feeChangeText = '不变';
    if (data.feeChangeType === 'increase') {
      feeChangeText = `增加 ¥${data.feeChangeAmount}`;
    } else if (data.feeChangeType === 'decrease') {
      feeChangeText = `减少 ¥${data.feeChangeAmount}`;
    }

    const newTimelineEvent = {
      id: `tl-${Date.now()}`,
      type: '工单响应',
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
      description: `已响应工单。联系人: ${data.contactPerson}。故障确认: ${data.faultConfirmation}。维修费用变更: ${feeChangeText}。${data.needsSpareParts ? '需要携带备件。' : '无需携带备件。'}预计到达时间: ${data.estimatedArrivalTime}。${data.remarks ? `备注: ${data.remarks}` : ''}`
    };

    const updatedOrder = { 
      ...selectedOrder, 
      status: OrderStatus.ACCEPTED,
      timeline: selectedOrder.timeline ? [newTimelineEvent, ...selectedOrder.timeline] : [newTimelineEvent]
    };
    
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    if (viewingOrder?.id === selectedOrder.id) {
      setViewingOrder(updatedOrder);
    }
    setRespondModalOpen(false);
  };

  const handleTransferSubmit = (data: any) => {
    if (!selectedOrder) return;
    
    // Remove the order from the current user's list
    setOrders(prev => prev.filter(o => o.id !== selectedOrder.id));
    
    if (viewingOrder?.id === selectedOrder.id) {
      setViewingOrder(null);
    }
    setTransferModalOpen(false);
    
    // In a real app, you would make an API call here to reassign the order
    console.log(`Order ${selectedOrder.id} transferred to ${data.engineerName} (${data.engineerId}). Reason: ${data.reason}`);
  };

  const handleCompleteSubmit = (data: any) => {
    if (!selectedOrder) return;
    
    const newTimelineEvent = {
      id: `tl-${Date.now()}`,
      type: '工单完成',
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
      description: `工程师已提交完成。解决方式: ${data.solution}。${data.notes ? `备注: ${data.notes}` : ''}`
    };

    const updatedOrder = { 
      ...selectedOrder, 
      status: OrderStatus.TO_BE_ACCEPTED,
      submittedForAcceptanceAt: Date.now(),
      timeline: selectedOrder.timeline ? [newTimelineEvent, ...selectedOrder.timeline] : [newTimelineEvent]
    };
    
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    setViewingOrder(updatedOrder);
    setDetailTab('overview');
    setCompleteModalOpen(false);
  };

  const handleStopMeterSubmit = (data: any) => {
    if (!selectedOrder) return;
    
    const newTimelineEvent = {
      id: `tl-${Date.now()}`,
      type: '申请停表',
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
      description: `已提交停表申请。原因: ${data.reason}。预计开表时间: ${data.resumeTime}。${data.remarks ? `备注: ${data.remarks}` : ''}`
    };

    const updatedOrder = { 
      ...selectedOrder, 
      status: OrderStatus.STOP_METER_APPLIED,
      timeline: selectedOrder.timeline ? [newTimelineEvent, ...selectedOrder.timeline] : [newTimelineEvent]
    };
    
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    if (viewingOrder?.id === selectedOrder.id) {
      setViewingOrder(updatedOrder);
    }
    setStopMeterModalOpen(false);
  };

  const handleReturnOrderSubmit = (data: any) => {
    if (!selectedOrder) return;
    
    // Remove the order from the current user's list
    setOrders(prev => prev.filter(o => o.id !== selectedOrder.id));
    
    if (viewingOrder?.id === selectedOrder.id) {
      setViewingOrder(null);
    }
    setReturnOrderModalOpen(false);
    
    console.log(`Order ${selectedOrder.id} returned to 400 service desk. Reason: ${data.reason}`);
  };

  const handleTechUpgradeSubmit = (expertName: string, description: string) => {
    if (selectedOrder) {
      const updatedOrder = { ...selectedOrder, status: OrderStatus.TECH_UPGRADE_APPLIED };
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
      if (viewingOrder?.id === selectedOrder.id) {
        setViewingOrder(updatedOrder);
      }
    }
    setTechUpgradeModalOpen(false);
  };

  const handleFeeChangeSubmit = (data: { total: number, items: any[] }) => {
    if (!selectedOrder) return;
    
    const newTimelineEvent = {
      id: `tl-${Date.now()}`,
      type: '费用变更',
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
      description: `已提交费用变更申请，新总金额: ¥${data.total.toFixed(2)}。已发送至客户端，等待客户确认。`
    };

    const updatedOrder = { 
      ...selectedOrder, 
      status: OrderStatus.FEE_CHANGE_APPLIED,
      timeline: selectedOrder.timeline ? [newTimelineEvent, ...selectedOrder.timeline] : [newTimelineEvent]
    };
    
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    if (viewingOrder?.id === selectedOrder.id) {
      setViewingOrder(updatedOrder);
    }
  };

  const handleEvaluateSubmit = (rating: number, comment: string) => {
    if (!selectedOrder) return;
    
    const newTimelineEvent = {
        id: `tl-${Date.now()}`,
        type: '评价工单',
        timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
        description: `已评价工单。评分: ${rating}星。${comment ? `内容: ${comment}` : ''}`
    };

    const updatedOrder = { 
        ...selectedOrder, 
        status: OrderStatus.COMPLETED,
        timeline: selectedOrder.timeline ? [newTimelineEvent, ...selectedOrder.timeline] : [newTimelineEvent]
    };
    
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    if (viewingOrder?.id === selectedOrder.id) {
        setViewingOrder(updatedOrder);
    }
    setEvaluateModalOpen(false);
  };

  return (
    <div className="h-full w-full bg-slate-50 dark:bg-slate-900 flex flex-col font-sans relative overflow-hidden">
      <StatusBar />
      
      {/* Conditional Content based on activeNav */}
      {activeNav === 'home' ? (
        <HomeDashboard 
          profile={profile} 
          orders={orders}
          onAction={handleAction}
          onAvatarClick={() => setSidebarOpen(true)} 
          onChatClick={() => setChatOpen(true)}
          onScanClick={() => setScannerOpen(true)}
          onWorkPermitClick={() => setWorkPermitOpen(true)}
          onViewMore={() => setActiveNav('orders')}
          onViewApprovals={() => setApprovalsOpen(true)}
          onViewProfile={() => setActiveNav('profile')}
        />
      ) : activeNav === 'projects' ? (
        <ProjectsDashboard 
          onMenuClick={() => setSidebarOpen(true)}
          onViewProject={(project) => {
            setViewingProject(project);
          }}
        />
      ) : activeNav === 'earnings' ? (
        <EarningsDashboard 
          onMenuClick={() => setSidebarOpen(true)}
          onViewFeeDetails={(orderId) => {
            const order = orders.find(o => o.id === orderId);
            if (order) {
              setViewingOrder({ ...order, status: OrderStatus.COMPLETED });
              setDetailTab('overview');
            } else {
              setViewingOrder({ ...orders[0], id: orderId, status: OrderStatus.COMPLETED });
              setDetailTab('overview');
            }
          }}
        />
      ) : activeNav === 'profile' ? (
        <ProfileDashboard onMenuClick={() => setSidebarOpen(true)} />
      ) : (
        <>
          {/* Fixed Top Section (Header + Tabs) */}
          <div className="flex-none bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-30 shadow-sm border-b border-slate-200/80 dark:border-slate-800/80">
            {/* App Bar */}
            <header className="flex items-center justify-between px-5 py-4 pt-12">
               {isSearchOpen ? (
                 <div className="flex-1 flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-200">
                   <div className="relative flex-1">
                     <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input
                       type="text"
                       autoFocus
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       placeholder="搜索编号/门店/地址/联系人..."
                       className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none text-slate-900 dark:text-white placeholder-slate-400"
                     />
                   </div>
                   <button 
                     onClick={() => {
                       setIsSearchOpen(false);
                       setSearchQuery('');
                     }}
                     className="p-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                   >
                     取消
                   </button>
                 </div>
               ) : (
                 <>
                   <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">我的工单</h1>
                   <button 
                     onClick={() => setIsSearchOpen(true)}
                     className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                   >
                     <Search size={22} />
                   </button>
                 </>
               )}
            </header>

            {/* Tab Navigation */}
            <div 
              ref={scrollRef}
              className="w-full overflow-x-auto no-scrollbar px-4 pt-2 scroll-smooth touch-pan-x overscroll-x-contain flex-none cursor-grab active:cursor-grabbing"
            >
              <div className="flex gap-6 min-w-max pr-8">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  let count = 0;
                  
                  if (tab.id === OrderStatus.ALL) {
                    count = orders.length;
                  } else if (tab.id === OrderStatus.IN_PROGRESS) {
                    const inProgressStatuses = [
                        OrderStatus.IN_PROGRESS, OrderStatus.ACCEPTED, OrderStatus.STOP_METER_APPLIED,
                        OrderStatus.STOP_METERING, OrderStatus.STOP_METER_REJECTED, OrderStatus.METER_OPENED,
                        OrderStatus.TECH_UPGRADE_APPLIED, OrderStatus.TECH_EXPERT_SOLVING, OrderStatus.TECH_UPGRADE_REJECTED,
                        OrderStatus.TRANSFERRED, OrderStatus.FEE_CHANGE_APPLIED, OrderStatus.FEE_CHANGED,
                        OrderStatus.FEE_CHANGE_REJECTED, OrderStatus.RECEIPT_APPLIED, OrderStatus.RECEIPTED,
                        OrderStatus.RECEIPT_REJECTED, OrderStatus.DEPARTED, OrderStatus.ARRIVED,
                        OrderStatus.REPAIRING, OrderStatus.RESTART
                    ];
                    count = orders.filter(o => inProgressStatuses.includes(o.status)).length;
                  } else if (tab.id === OrderStatus.COMPLETED) {
                    const completedStatuses = [OrderStatus.COMPLETED, OrderStatus.CLOSED, OrderStatus.ARCHIVED, OrderStatus.CANCELLED];
                    count = orders.filter(o => completedStatuses.includes(o.status)).length;
                  } else {
                    count = orders.filter(o => o.status === tab.id).length;
                  }
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 pb-3 pt-2 relative group transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                    >
                      <span className="text-sm font-bold whitespace-nowrap">{tab.label}</span>
                      {count > 0 && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary-100 text-primary-700' : 'bg-slate-200 text-slate-600'}`}>
                            {count}
                        </span>
                      )}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full shadow-[0_-2px_6px_rgba(20,112,55,0.3)]"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content (Scrollable) */}
          <main className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 space-y-4 animate-in fade-in duration-500 pb-24 block">
             {/* List Header */}
             <div className="flex items-center justify-between shrink-0">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <span>{tabs.find(t => t.id === activeTab)?.label || activeTab}</span>
                    <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full text-xs">{filteredOrders.length}</span>
                </h2>
                <div className="flex items-center gap-2">
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none rounded-lg px-2 py-1 outline-none cursor-pointer focus:ring-2 focus:ring-primary-500/20"
                    >
                        <option value="default">默认排序</option>
                        <option value="distance">距离</option>
                        <option value="cost">费用</option>
                        <option value="priority">SLA紧急程度</option>
                    </select>
                    {sortBy !== 'default' && (
                        <button
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`}>
                                <path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>
                            </svg>
                        </button>
                    )}
                </div>
             </div>

             {sortedOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
                        <CheckCircle size={48} className="text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-lg font-medium">没找到相关工单</p>
                </div>
             ) : (
                 sortedOrders.map(order => (
                     <WorkOrderCard 
                        key={order.id} 
                        order={order} 
                        onAction={handleAction} 
                     />
                 ))
             )}
             {/* Spacer for bottom nav */}
             <div className="h-24 w-full shrink-0"></div>
          </main>
        </>
      )}

      {/* Overlays (Absolute to contain within mobile view) */}
      
      {!isLoggedIn && !isRegistering && (
        <div className="absolute inset-0 z-[200]">
          <LoginScreen onLogin={() => setIsLoggedIn(true)} onRegisterClick={() => setIsRegistering(true)} />
        </div>
      )}

      {isRegistering && (
        <RegisterScreen 
          onBack={() => setIsRegistering(false)} 
          onRegister={() => {
            setIsRegistering(false);
            setIsLoggedIn(true);
          }} 
        />
      )}

      {/* Detail View Overlay */}
      {viewingOrder && (
          <WorkOrderDetail 
            key={viewingOrder.id}
            order={viewingOrder} 
            onBack={handleBack} 
            onAction={handleAction} 
            initialTab={detailTab}
          />
      )}

      {/* Project Detail Overlay */}
      {viewingProject && (
        <ProjectDetailModal 
          project={viewingProject} 
          onBack={() => setViewingProject(null)} 
        />
      )}

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        profile={profile}
        toggleOnline={() => setProfile(p => ({...p, isOnline: !p.isOnline}))}
        onSwitchCompany={handleSwitchCompany}
        onSettingsClick={() => {
          setSidebarOpen(false);
          setSettingsOpen(true);
        }}
        onLogout={() => {
          setSidebarOpen(false);
          setIsLoggedIn(false);
        }}
        onOpenChat={() => {
          setSidebarOpen(false);
          setChatOpen(true);
        }}
        onAddCertification={(cert) => {
          setProfile(p => ({
            ...p,
            certifications: [...(p.certifications || []), cert]
          }));
        }}
      />
      
      <ChatWidget 
        isOpen={isChatOpen} 
        onClose={() => setChatOpen(false)} 
        activeOrders={activeOrdersForChat}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
        onLogout={() => {
          setSettingsOpen(false);
          setIsLoggedIn(false);
        }}
        onOpenChat={() => {
          setSettingsOpen(false);
          setChatOpen(true);
        }}
      />

      <CompleteJobModal 
        isOpen={isCompleteModalOpen} 
        onClose={() => setCompleteModalOpen(false)} 
        order={selectedOrder} 
        onSubmit={handleCompleteSubmit}
        onEditFee={() => {
          setCompleteModalOpen(false);
          setDetailTab('fee');
          if (!viewingOrder && selectedOrder) {
            setViewingOrder(selectedOrder);
          }
        }}
      />
      
      <RepairGuideModal 
        isOpen={isGuideModalOpen} 
        onClose={() => setGuideModalOpen(false)} 
        order={selectedOrder} 
      />
      
      <NavigationModal
        isOpen={isNavModalOpen}
        onClose={() => setNavModalOpen(false)}
        order={selectedOrder}
      />
      
      <PartsSelectionModal
        isOpen={isPartsModalOpen}
        onClose={() => setPartsModalOpen(false)}
        order={selectedOrder}
      />

      {/* Bottom Navigation */}
      {!viewingOrder && !viewingProject && (
        <nav className="absolute bottom-0 left-0 right-0 z-50 flex justify-center pb-8 pointer-events-none">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-[20px] w-[90%] rounded-[2rem] flex justify-around items-center py-2 px-3 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.4)] pointer-events-auto border border-slate-200/50 dark:border-slate-800/50">
            <button
              onClick={() => setActiveNav('home')}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 active:scale-95 ${
                activeNav === 'home' ? 'bg-gradient-to-b from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:text-primary-600'
              }`}
            >
              <Home size={22} className={activeNav === 'home' ? 'fill-current' : ''} />
            </button>

            <button
              onClick={() => setActiveNav('orders')}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 active:scale-95 ${
                activeNav === 'orders' ? 'bg-gradient-to-b from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:text-primary-600'
              }`}
            >
              <ClipboardList size={22} className={activeNav === 'orders' ? 'fill-current' : ''} />
            </button>

            <button
              onClick={() => setActiveNav('projects')}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 active:scale-95 ${
                activeNav === 'projects' ? 'bg-gradient-to-b from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:text-primary-600'
              }`}
            >
              <FolderKanban size={22} className={activeNav === 'projects' ? 'fill-current' : ''} />
            </button>

            <button
              onClick={() => setActiveNav('earnings')}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 active:scale-95 ${
                activeNav === 'earnings' ? 'bg-gradient-to-b from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:text-primary-600'
              }`}
            >
              <CircleDollarSign size={22} className={activeNav === 'earnings' ? 'fill-current' : ''} />
            </button>

            <button
              onClick={() => setActiveNav('profile')}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 active:scale-95 ${
                activeNav === 'profile' ? 'bg-gradient-to-b from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:text-primary-600'
              }`}
            >
              <CustomAchievementIcon size={22} />
            </button>
          </div>
        </nav>
      )}

      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={(decodedText) => {
          console.log("Scanned:", decodedText);
          alert(`扫码成功: ${decodedText}`);
          setScannerOpen(false);
        }}
      />

      <ApprovalsModal
        isOpen={isApprovalsOpen}
        onClose={() => setApprovalsOpen(false)}
        orders={orders}
        onAction={handleAction}
      />

      <RespondModal
        isOpen={isRespondModalOpen}
        onClose={() => setRespondModalOpen(false)}
        order={selectedOrder}
        onSubmit={handleRespondSubmit}
      />

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        order={selectedOrder}
        onSubmit={handleTransferSubmit}
      />

      <StopMeterModal
        isOpen={isStopMeterModalOpen}
        onClose={() => setStopMeterModalOpen(false)}
        order={selectedOrder}
        onSubmit={handleStopMeterSubmit}
      />

      <ReturnOrderModal
        isOpen={isReturnOrderModalOpen}
        onClose={() => setReturnOrderModalOpen(false)}
        order={selectedOrder}
        onSubmit={handleReturnOrderSubmit}
      />

      <TechUpgradeModal
        isOpen={isTechUpgradeModalOpen}
        onClose={() => setTechUpgradeModalOpen(false)}
        order={selectedOrder}
        onSubmit={handleTechUpgradeSubmit}
      />

      <WorkPermitModal
        isOpen={isWorkPermitOpen}
        onClose={() => setWorkPermitOpen(false)}
      />

      <EvaluateModal
        isOpen={isEvaluateModalOpen}
        onClose={() => setEvaluateModalOpen(false)}
        order={selectedOrder}
        onSubmit={handleEvaluateSubmit}
      />
    </div>
  );
};

export default App;