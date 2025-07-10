import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginForm } from './components/auth/LoginForm';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { StatCard } from './components/dashboard/StatCard';
import { Chart } from './components/dashboard/Chart';
import { ActivityFeed } from './components/dashboard/ActivityFeed';
import { DataTable } from './components/dashboard/DataTable';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { 
  DollarSign, 
  Users, 
  UserCheck, 
  TrendingUp,
  BarChart3,
  Activity,
  Settings,
  FileText,
  Shield,
  HelpCircle
} from 'lucide-react';
import {
  generateMockStats,
  generateRevenueChart,
  generateUserActivityChart,
  generateSystemPerformanceChart,
  generateMockActivities,
  generateMockTableData
} from './services/mockData';

const DashboardContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState({
    stats: generateMockStats(),
    revenueChart: generateRevenueChart(),
    userChart: generateUserActivityChart(),
    performanceChart: generateSystemPerformanceChart(),
    activities: generateMockActivities(),
    tableData: generateMockTableData()
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        stats: generateMockStats(),
        activities: generateMockActivities()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      // This will be handled by individual components
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={dashboardData.stats.totalRevenue}
                change={dashboardData.stats.revenueGrowth}
                icon={<DollarSign className="w-6 h-6" />}
                format="currency"
                gradient="from-green-500 to-green-600"
              />
              <StatCard
                title="Total Users"
                value={dashboardData.stats.totalUsers}
                change={dashboardData.stats.userGrowth}
                icon={<Users className="w-6 h-6" />}
                format="number"
                gradient="from-blue-500 to-blue-600"
              />
              <StatCard
                title="Active Users"
                value={dashboardData.stats.activeUsers}
                change={dashboardData.stats.activeGrowth}
                icon={<UserCheck className="w-6 h-6" />}
                format="number"
                gradient="from-purple-500 to-purple-600"
              />
              <StatCard
                title="Conversion Rate"
                value={dashboardData.stats.conversionRate}
                change={dashboardData.stats.conversionGrowth}
                icon={<TrendingUp className="w-6 h-6" />}
                format="percentage"
                gradient="from-orange-500 to-orange-600"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Chart
                title="Revenue Trends"
                data={dashboardData.revenueChart}
                type="line"
                height={300}
              />
              <Chart
                title="User Activity"
                data={dashboardData.userChart}
                type="bar"
                height={300}
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <Chart
                  title="System Performance"
                  data={dashboardData.performanceChart}
                  type="line"
                  height={320}
                />
              </div>
              <ActivityFeed activities={dashboardData.activities} />
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Chart
                title="Revenue Analytics"
                data={dashboardData.revenueChart}
                type="line"
                height={350}
              />
              <Chart
                title="User Engagement"
                data={dashboardData.userChart}
                type="bar"
                height={350}
              />
            </div>
            <Chart
              title="Performance Metrics"
              data={dashboardData.performanceChart}
              type="line"
              height={400}
            />
          </div>
        );
      
      case 'users':
        return (
          <div className="space-y-6">
            <DataTable
              data={dashboardData.tableData}
              title="User Management"
            />
          </div>
        );
      
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Monthly Revenue"
                value={dashboardData.stats.totalRevenue}
                change={dashboardData.stats.revenueGrowth}
                icon={<DollarSign className="w-6 h-6" />}
                format="currency"
                gradient="from-green-500 to-green-600"
              />
              <StatCard
                title="Active Users"
                value={dashboardData.stats.activeUsers}
                change={dashboardData.stats.activeGrowth}
                icon={<UserCheck className="w-6 h-6" />}
                format="number"
                gradient="from-blue-500 to-blue-600"
              />
              <StatCard
                title="Conversion Rate"
                value={dashboardData.stats.conversionRate}
                change={dashboardData.stats.conversionGrowth}
                icon={<TrendingUp className="w-6 h-6" />}
                format="percentage"
                gradient="from-purple-500 to-purple-600"
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Chart
                title="Monthly Reports"
                data={dashboardData.revenueChart}
                type="line"
                height={300}
              />
              <ActivityFeed activities={dashboardData.activities} />
            </div>
          </div>
        );
      
      case 'performance':
        return (
          <div className="space-y-6">
            <Chart
              title="System Performance Overview"
              data={dashboardData.performanceChart}
              type="line"
              height={400}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Chart
                title="CPU Usage"
                data={dashboardData.performanceChart}
                type="bar"
                height={300}
              />
              <Chart
                title="Memory Usage"
                data={dashboardData.performanceChart}
                type="line"
                height={300}
              />
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Overview</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 dark:text-green-400">System Status</h3>
                  <p className="text-green-600 dark:text-green-300">All systems secure</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-400">Active Sessions</h3>
                  <p className="text-blue-600 dark:text-blue-300">24 active sessions</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-400">Pending Reviews</h3>
                  <p className="text-yellow-600 dark:text-yellow-300">3 items need review</p>
                </div>
              </div>
            </div>
            <ActivityFeed activities={dashboardData.activities} />
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">General Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                      <button className="bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full">
                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Auto Backup</span>
                      <button className="bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full">
                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Security Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Two-Factor Auth</span>
                      <button className="bg-gray-300 dark:bg-gray-600 relative inline-flex h-6 w-11 items-center rounded-full">
                        <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Login Alerts</span>
                      <button className="bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full">
                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'help':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-blue-600 hover:text-blue-800">Getting Started Guide</a></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-800">API Documentation</a></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-800">Video Tutorials</a></li>
                    <li><a href="#" className="text-blue-600 hover:text-blue-800">Community Forum</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Contact Support</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-300">Email: support@adminpro.com</p>
                    <p className="text-gray-700 dark:text-gray-300">Phone: +1 (555) 123-4567</p>
                    <p className="text-gray-700 dark:text-gray-300">Hours: 9AM - 6PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              This section is under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeItem={activeSection}
        onItemClick={handleSectionChange}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuToggle={handleSidebarToggle}
          isMobileMenuOpen={isSidebarOpen}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DashboardContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;