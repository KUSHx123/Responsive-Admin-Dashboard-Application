import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  ChevronLeft,
  TrendingUp,
  Shield,
  HelpCircle
} from 'lucide-react';
import { cn } from '../../utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'performance', label: 'Performance', icon: TrendingUp },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeItem, 
  onItemClick 
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        'fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-300 ease-in-out',
        'lg:translate-x-0 lg:static lg:z-auto',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'w-64'
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">AdminPro</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          
          <nav className="flex-1 mt-6 px-4 pb-20">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onItemClick(item.id)}
                      className={cn(
                        'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            
            {/* Upgrade to Pro section moved here */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
                <h4 className="font-semibold text-sm">Upgrade to Pro</h4>
                <p className="text-xs opacity-90 mt-1">Get advanced features and analytics</p>
                <button className="mt-3 w-full bg-white/20 hover:bg-white/30 rounded-md py-2 px-3 text-xs font-medium transition-colors backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};