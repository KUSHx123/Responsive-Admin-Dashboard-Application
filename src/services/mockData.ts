import { DashboardStats, ChartData, Activity, Notification, TableData } from '../types';

export const generateMockStats = (): DashboardStats => ({
  totalRevenue: 127500,
  totalUsers: 15420,
  activeUsers: 9876,
  conversionRate: 12.4,
  revenueGrowth: 8.2,
  userGrowth: 15.7,
  activeGrowth: 22.1,
  conversionGrowth: -2.3
});

export const generateRevenueChart = (): ChartData => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue',
    data: [12000, 19000, 15000, 25000, 22000, 30000],
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    fill: true
  }]
});

export const generateUserActivityChart = (): ChartData => ({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Active Users',
    data: [1200, 1900, 1500, 2100, 1800, 900, 1300],
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    fill: true
  }]
});

export const generateSystemPerformanceChart = (): ChartData => ({
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
  datasets: [{
    label: 'CPU Usage',
    data: [45, 52, 68, 71, 59, 48],
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    fill: true
  }, {
    label: 'Memory Usage',
    data: [35, 42, 58, 65, 49, 38],
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    fill: true
  }]
});

export const generateMockActivities = (): Activity[] => [
  {
    id: '1',
    type: 'user_signup',
    title: 'New User Registration',
    description: 'Sarah Johnson signed up for Pro plan',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    user: 'Sarah Johnson'
  },
  {
    id: '2',
    type: 'purchase',
    title: 'Payment Received',
    description: 'Subscription payment processed',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    user: 'Michael Chen',
    amount: 99.99
  },
  {
    id: '3',
    type: 'system',
    title: 'System Update',
    description: 'Database maintenance completed',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '4',
    type: 'login',
    title: 'Admin Login',
    description: 'Administrator logged in from new device',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    user: 'Admin User'
  }
];

export const generateMockNotifications = (): Notification[] => [
  {
    id: '1',
    type: 'warning',
    title: 'Server Load High',
    message: 'CPU usage has exceeded 80% for the last 10 minutes',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    read: false
  },
  {
    id: '2',
    type: 'success',
    title: 'Backup Completed',
    message: 'Daily backup has been successfully completed',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false
  },
  {
    id: '3',
    type: 'info',
    title: 'New Feature Available',
    message: 'Advanced analytics dashboard is now available',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true
  }
];

export const generateMockTableData = (): TableData[] => [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
    lastActivity: new Date(Date.now() - 10 * 60 * 1000),
    revenue: 15420
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'User',
    status: 'active',
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
    revenue: 8750
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    role: 'Manager',
    status: 'inactive',
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    revenue: 23100
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'User',
    status: 'pending',
    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
    revenue: 5200
  }
];