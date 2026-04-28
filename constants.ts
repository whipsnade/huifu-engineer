import { OrderStatus, WorkOrder, EngineerProfile, Part } from './types';

export const MOCK_PROFILE: EngineerProfile = {
  name: "Alex Engineer",
  avatarUrl: "https://picsum.photos/200",
  isOnline: true,
  company: "TechFix Solutions",
  todayOrders: 5,
  balance: 145.50,
  creditScore: 98,
  satisfactionCount: 420,
  complaintCount: 0,
  certifications: [
    { name: "YUM", level: "S" },
    { name: "Starbucks", level: "A" },
    { name: "Burger King", level: "B" },
    { name: "Tesla Charging", level: "C" }
  ]
};

export const MOCK_PROFILE_2: EngineerProfile = {
  name: "Alex Engineer",
  avatarUrl: "https://picsum.photos/201",
  isOnline: true,
  company: "Global Maintenance Corp",
  todayOrders: 12,
  balance: 850.00,
  creditScore: 100,
  satisfactionCount: 890,
  complaintCount: 1,
  certifications: [
    { name: "Cisco Networks", level: "S" },
    { name: "HVAC Advanced", level: "S" }
  ]
};

export const MOCK_ORDERS: WorkOrder[] = [
  {
    id: "WO-29384",
    customerName: "公司A",
    storeName: "世贸天阶店JK053",
    storePhone: "+1 (555) 010-1024",
    address: "1024 Innovation Dr, Floor 1",
    distance: "0.8 mi",
    faultDescription: "Elevator Door Jam - Main Lobby. Unit is unresponsive to reset.",
    status: OrderStatus.IN_PROGRESS,
    priority: "High",
    startTime: "45m ago",
    lat: 37.7749,
    lng: -122.4194,
    type: "Elevator",
    cost: 150.00,
    paidAmount: 150.00,
    expectedOnSiteTime: "Today, 14:00",
    storeNumber: "ST-8821",
    estimatedDuration: "2.5h",
    dispatchTime: "2026-04-01 08:30",
    slaExpiryTime: "2026-04-01 16:00",
    brand: "Otis",
    reporter: "Zhang San",
    equipmentInfo: "Model X-1000, SN: 99283-A",
    slaStatus: "Normal",
    timeline: [
        { id: 't1', type: '接单/响应', timestamp: '2026-04-01 08:45', description: '工程师已接单并响应', evidenceUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop' },
        { id: 't2', type: '出发', timestamp: '2026-04-01 09:00', description: '工程师已出发前往现场', evidenceUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=200&auto=format&fit=crop' },
        { id: 't3', type: '到达', timestamp: '2026-04-01 09:15', description: '工程师已到达门店现场', evidenceUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200&auto=format&fit=crop' },
        { 
          id: 't4', 
          type: '维修中', 
          timestamp: '2026-04-01 09:30', 
          description: '正在进行设备检修与故障排查', 
          attachments: [
            { id: 'att-t1', type: 'image', url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop' },
            { id: 'att-t2', type: 'image', url: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=400&auto=format&fit=crop' },
            { id: 'att-t3', type: 'image', url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=400&auto=format&fit=crop' }
          ]
        }
    ],
    attachments: [
        {
            id: 'att-1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
            thumbnailUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: 'att-2',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop',
            thumbnailUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=200&auto=format&fit=crop'
        }
    ]
  },
  {
    id: "WO-8852",
    customerName: "公司B",
    storeName: "Northside Grocery #118",
    storePhone: "+1 (555) 012-3456",
    address: "8842 Market St, Downtown",
    distance: "2.4 mi",
    faultDescription: "Cooling leak reported near dairy section. Temperature rising.",
    status: OrderStatus.RESTART,
    priority: "Medium",
    lat: 37.7849,
    lng: -122.4094,
    type: "Refrigeration",
    cost: 85.50,
    paidAmount: 85.50,
    expectedOnSiteTime: "Today, 16:30",
    attachments: [
        {
            id: 'att-3',
            type: 'video',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Sample video
            thumbnailUrl: 'https://images.unsplash.com/photo-1584622412117-b1cc5440e2b3?q=80&w=200&auto=format&fit=crop'
        }
    ]
  },
  {
    id: "WO-1029",
    customerName: "公司C",
    storeName: "City Center Mall",
    storePhone: "+1 (555) 098-7654",
    address: "500 Main St, 3rd Floor",
    distance: "5.1 mi",
    faultDescription: "POS Terminal #4 network connectivity intermittent.",
    status: OrderStatus.PENDING,
    priority: "Low",
    lat: 37.7649,
    lng: -122.4294,
    type: "IT/Network",
    cost: 45.00,
    paidAmount: 45.00,
    expectedOnSiteTime: "Tomorrow, 09:00",
    isVIP: true
  },
  {
    id: "WO-9921",
    customerName: "公司D",
    storeName: "Westside Clinic",
    storePhone: "+1 (555) 111-2222",
    address: "1200 Health Blvd",
    distance: "12.0 mi",
    faultDescription: "HVAC Unit 4B making loud grinding noises.",
    status: OrderStatus.PENDING,
    priority: "Critical",
    lat: 37.7549,
    lng: -122.4394,
    type: "HVAC",
    cost: 220.00,
    expectedOnSiteTime: "ASAP",
    isVIP: true
  },
  {
    id: "WO-4432",
    customerName: "公司E",
    storeName: "Burger Joint #55",
    storePhone: "+1 (555) 333-4444",
    address: "99 Fast Food Ln",
    distance: "1.2 mi",
    faultDescription: "Fryer thermostat calibration required.",
    status: OrderStatus.TO_BE_ACCEPTED,
    priority: "Medium",
    lat: 37.7949,
    lng: -122.3994,
    type: "Kitchen Equip"
  },
  {
    id: "WO-3321",
    customerName: "公司F",
    storeName: "Coffee House Deluxe",
    storePhone: "+1 (555) 555-6666",
    address: "42 Bean St",
    distance: "0.5 mi",
    faultDescription: "Espresso machine group head leaking.",
    status: OrderStatus.PENDING_PAYMENT,
    priority: "High",
    afterSalesStatus: "Waiting for customer feedback",
    lat: 37.8049,
    lng: -122.4094,
    type: "Coffee Machine"
  },
  {
    id: "WO-1111",
    customerName: "公司G",
    storeName: "Retail Store X",
    storePhone: "+1 (555) 777-8888",
    address: "101 Shopper Ave",
    distance: "3.0 mi",
    faultDescription: "Automatic door sensor malfunction.",
    status: OrderStatus.TO_BE_REVIEWED,
    priority: "Low",
    lat: 37.7749,
    lng: -122.4194,
    type: "Door Systems"
  },
  {
    id: "WO-0001",
    customerName: "公司H",
    storeName: "Old Town Bakery",
    storePhone: "+1 (555) 888-9999",
    address: "123 Pastry Way",
    distance: "4.5 mi",
    faultDescription: "Oven door seal replacement completed.",
    status: OrderStatus.COMPLETED,
    priority: "Low",
    lat: 37.7849,
    lng: -122.4194,
    type: "Kitchen Equip"
  },
  {
    id: "WO-5566",
    customerName: "公司I",
    storeName: "Tech Hub Store",
    storePhone: "+1 (555) 999-0000",
    address: "777 Silicon Valley Blvd",
    distance: "1.5 mi",
    faultDescription: "Server rack cooling fan failure.",
    status: OrderStatus.ACCEPTED,
    priority: "High",
    lat: 37.7849,
    lng: -122.4194,
    type: "IT/Network"
  },
  {
    id: "WO-7788",
    customerName: "公司J",
    storeName: "Fashion Outlet",
    storePhone: "+1 (555) 111-3333",
    address: "555 Style St",
    distance: "2.2 mi",
    faultDescription: "Lighting system upgrade required.",
    status: OrderStatus.TECH_EXPERT_SOLVING,
    priority: "Medium",
    lat: 37.7849,
    lng: -122.4194,
    type: "Electrical"
  },
  {
    id: "WO-9900",
    customerName: "公司K",
    storeName: "Gourmet Bistro",
    storePhone: "+1 (555) 222-4444",
    address: "888 Foodie Ave",
    distance: "0.3 mi",
    faultDescription: "Dishwasher drainage issue.",
    status: OrderStatus.CANCELLED,
    priority: "Low",
    lat: 37.7849,
    lng: -122.4194,
    type: "Plumbing"
  },
  {
    id: "WO-88294012",
    customerName: "公司L",
    storeName: "光伏电站A区",
    storePhone: "+1 (555) 333-5555",
    address: "Solar Park 1",
    distance: "12.5 mi",
    faultDescription: "光伏电站运维巡检完成。",
    status: OrderStatus.TO_BE_ACCEPTED,
    priority: "Medium",
    lat: 37.7849,
    lng: -122.4194,
    type: "Electrical"
  },
  {
    id: "WO-88293988",
    customerName: "公司M",
    storeName: "配电房B区",
    storePhone: "+1 (555) 444-6666",
    address: "Power Station 2",
    distance: "8.2 mi",
    faultDescription: "配电柜紧急抢修完成。",
    status: OrderStatus.IN_PROGRESS,
    priority: "High",
    lat: 37.7849,
    lng: -122.4194,
    type: "Electrical"
  },
  {
    id: "WO-88293541",
    customerName: "公司N",
    storeName: "智能电表安装点C",
    storePhone: "+1 (555) 555-7777",
    address: "Smart Grid Area 3",
    distance: "5.4 mi",
    faultDescription: "智能电表安装完成。",
    status: OrderStatus.IN_PROGRESS,
    priority: "Low",
    lat: 37.7849,
    lng: -122.4194,
    type: "Electrical"
  },
  {
    id: "WO-12345678",
    customerName: "测试公司",
    storeName: "闭环测试门店",
    storePhone: "+1 (555) 999-0000",
    address: "Auto Archive Test St",
    distance: "1.0 mi",
    faultDescription: "测试超期自动归档",
    status: OrderStatus.COMPLETED,
    closedAt: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString(),
    priority: "Low",
    lat: 37.7849,
    lng: -122.4194,
    type: "Testing"
  },
  {
    id: "WO-105",
    customerName: "未知公司",
    storeName: "未知门店 #105",
    storePhone: "+1 (555) 000-0105",
    address: "Unknown St 105",
    distance: "3.2 mi",
    faultDescription: "配电柜紧急抢修完成。",
    status: OrderStatus.COMPLETED,
    priority: "High",
    lat: 37.7849,
    lng: -122.4194,
    type: "Electrical"
  },
  {
    id: "WO-106",
    customerName: "未知公司",
    storeName: "未知门店 #106",
    storePhone: "+1 (555) 000-0106",
    address: "Unknown St 106",
    distance: "4.5 mi",
    faultDescription: "智能电表安装完成。",
    status: OrderStatus.COMPLETED,
    priority: "Medium",
    lat: 37.7849,
    lng: -122.4194,
    type: "Electrical"
  }
];

export const MOCK_PARTS: Part[] = [
    // Elevator
    { id: 'p-el-1', name: 'Main Control Board V2', type: 'Elevator', partPrice: 450.00, installationPrice: 150.00, shippingFee: 25.00 },
    { id: 'p-el-2', name: 'Door Sensor Kit', type: 'Elevator', partPrice: 120.00, installationPrice: 80.00, shippingFee: 15.00 },
    { id: 'p-el-3', name: 'Hydraulic Pump Seal', type: 'Elevator', partPrice: 35.00, installationPrice: 200.00, shippingFee: 10.00 },
    // Refrigeration
    { id: 'p-ref-1', name: 'Compressor Unit 5HP', type: 'Refrigeration', partPrice: 800.00, installationPrice: 300.00, shippingFee: 100.00 },
    { id: 'p-ref-2', name: 'Thermostat Digital', type: 'Refrigeration', partPrice: 60.00, installationPrice: 40.00, shippingFee: 10.00 },
    // IT/Network
    { id: 'p-it-1', name: 'Cat6 Ethernet Spool', type: 'IT/Network', partPrice: 120.00, installationPrice: 100.00, shippingFee: 20.00 },
    { id: 'p-it-2', name: 'Network Switch 24-Port', type: 'IT/Network', partPrice: 250.00, installationPrice: 50.00, shippingFee: 15.00 },
    // HVAC
    { id: 'p-hvac-1', name: 'Blower Motor', type: 'HVAC', partPrice: 180.00, installationPrice: 120.00, shippingFee: 30.00 },
    { id: 'p-hvac-2', name: 'Capacitor 45/5', type: 'HVAC', partPrice: 25.00, installationPrice: 60.00, shippingFee: 8.00 },
    // Kitchen Equip
    { id: 'p-kit-1', name: 'Heating Element', type: 'Kitchen Equip', partPrice: 85.00, installationPrice: 75.00, shippingFee: 12.00 },
    { id: 'p-kit-2', name: 'Fryer Basket', type: 'Kitchen Equip', partPrice: 45.00, installationPrice: 0.00, shippingFee: 15.00 },
    // Coffee Machine
    { id: 'p-cof-1', name: 'Group Head Gasket', type: 'Coffee Machine', partPrice: 8.00, installationPrice: 40.00, shippingFee: 5.00 },
    { id: 'p-cof-2', name: 'Water Pump Assembly', type: 'Coffee Machine', partPrice: 140.00, installationPrice: 90.00, shippingFee: 15.00 },
    // Door Systems
    { id: 'p-door-1', name: 'Motion Sensor Radar', type: 'Door Systems', partPrice: 210.00, installationPrice: 80.00, shippingFee: 10.00 },
];