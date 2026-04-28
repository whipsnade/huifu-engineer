export enum OrderStatus {
    PENDING = 'PENDING',           // 待接单
    TO_BE_VISITED = 'TO_BE_VISITED', // 待上门
    IN_PROGRESS = 'IN_PROGRESS',   // 处理中
    RESTART = 'RESTART',           // 重启
    TO_BE_ACCEPTED = 'TO_BE_ACCEPTED', // 待验收
    PENDING_PAYMENT = 'PENDING_PAYMENT', // 待付款
    TO_BE_REVIEWED = 'TO_BE_REVIEWED',   // 待评价
    COMPLETED = 'COMPLETED',        // 已完成
    ALL = 'ALL',                     // 全部
    
    // New In-Progress Sub-statuses
    ACCEPTED = 'ACCEPTED', // 已接单
    STOP_METER_APPLIED = 'STOP_METER_APPLIED', // 申请停表
    STOP_METERING = 'STOP_METERING', // 停表中
    STOP_METER_REJECTED = 'STOP_METER_REJECTED', // 停表拒绝
    METER_OPENED = 'METER_OPENED', // 已开表
    TECH_UPGRADE_APPLIED = 'TECH_UPGRADE_APPLIED', // 申请技术升级
    TECH_EXPERT_SOLVING = 'TECH_EXPERT_SOLVING', // 技术专家解决中
    TECH_UPGRADE_REJECTED = 'TECH_UPGRADE_REJECTED', // 技术升级拒绝
    TRANSFERRED = 'TRANSFERRED', // 已转单
    FEE_CHANGE_APPLIED = 'FEE_CHANGE_APPLIED', // 申请费用变更
    FEE_CHANGED = 'FEE_CHANGED', // 费用已变更
    FEE_CHANGE_REJECTED = 'FEE_CHANGE_REJECTED', // 费用变更拒绝
    RECEIPT_APPLIED = 'RECEIPT_APPLIED', // 申请回单
    RECEIPTED = 'RECEIPTED', // 已回单
    RECEIPT_REJECTED = 'RECEIPT_REJECTED', // 回单拒绝
    DEPARTED = 'DEPARTED', // 已出发
    ARRIVED = 'ARRIVED', // 已到达
    REPAIRING = 'REPAIRING', // 到店维修中

    // New Completed Sub-statuses
    CLOSED = 'CLOSED', // 已关闭
    ARCHIVED = 'ARCHIVED', // 已归档
    CANCELLED = 'CANCELLED', // 已取消
    ON_HOLD = 'ON_HOLD', // 暂停
    AFTER_SALES = 'AFTER_SALES' // 售后
  }

  export interface Attachment {
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnailUrl?: string;
  }
  
  export interface TimelineEvent {
    id: string;
    type: string;
    timestamp: string;
    description: string;
    evidenceUrl?: string;
    attachments?: Attachment[];
  }

  export interface WorkOrder {
    id: string;
    customerName: string;
    storeName: string;
    storeNumber?: string; // 用户编号
    storePhone: string; // Added phone number
    address: string;
    distance: string;
    faultDescription: string;
    status: OrderStatus;
    statusLabel?: string; // Specific label for the status
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    startTime?: string;
    lat: number;
    lng: number;
    type: string; // e.g., HVAC, Plumbing, Network
    afterSalesStatus?: string; // e.g., "Pending Review", "Parts Ordered"
    attachments?: Attachment[];
    cost?: number;
    paidAmount?: number; // 用户已支付金额
    expectedOnSiteTime?: string;
    estimatedDuration?: string; // 预计工时
    dispatchTime?: string; // 派单时间
    slaExpiryTime?: string; // SLA到期时间
    closedAt?: string; // 关闭时间 (ISO string)
    submittedForAcceptanceAt?: number; // 提交验收时间 (timestamp)
    brand?: string; // 用户品牌
    reporter?: string; // 报修人
    equipmentInfo?: string; // 设备信息
    isVIP?: boolean; // VIP用户标识
    slaStatus?: 'Normal' | 'Warning' | 'Timeout'; // SLA超时状态
    timeline?: TimelineEvent[]; // 操作过程信息
    
    // Project fields
    projectName?: string;
    responsiblePerson?: string;
    startDate?: string;
    endDate?: string;
    plannedProgress?: number;
    actualProgress?: number;
  }

  export type CertificationLevel = 'C' | 'B' | 'A' | 'S';

  export interface Certification {
    name: string;
    level: CertificationLevel;
  }
  
  export interface EngineerProfile {
    name: string;
    avatarUrl: string;
    isOnline: boolean;
    company: string;
    todayOrders: number;
    balance: number;
    creditScore: number;
    satisfactionCount: number;
    complaintCount: number;
    certifications: Certification[];
  }

  export interface Part {
    id: string;
    name: string;
    type: string; // Matches WorkOrder.type
    partPrice: number;
    installationPrice: number;
    shippingFee: number;
    imageUrl?: string;
  }
  
  export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'support';
    timestamp: Date;
    attachedOrderId?: string;
  }