export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'manager';
  isOnline: boolean;
  lastSeen?: Date;
}

export interface DashboardStats {
  totalRevenue: number;
  totalUsers: number;
  activeUsers: number;
  conversionRate: number;
  revenueGrowth: number;
  userGrowth: number;
  activeGrowth: number;
  conversionGrowth: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
  }[];
}

export interface Activity {
  id: string;
  type: 'user_signup' | 'purchase' | 'login' | 'system' | 'update';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  amount?: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface TableData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastActivity: Date;
  revenue: number;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}