import React, { useState } from 'react';
import { 
  BarChart3,
  Shield,
  FileText,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  User
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import BiasDetection from './components/BiasDetection';
import AuditTrail from './components/AuditTrail';
import PolicyEngine from './components/PolicyEngine';

type TabType = 'dashboard' | 'bias' | 'audit' | 'policy';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: BarChart3 },
    { id: 'bias' as TabType, label: 'Bias Detection', icon: Shield },
    { id: 'audit' as TabType, label: 'Audit Trail', icon: FileText },
    { id: 'policy' as TabType, label: 'Policy Engine', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'bias':
        return <BiasDetection />;
      case 'audit':
        return <AuditTrail />;
      case 'policy':
        return <PolicyEngine />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">IBM Watsonx Governance</h1>
                  <p className="text-xs text-gray-500">AI Compliance & Risk Management Platform</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                Enterprise Edition
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 block h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                <HelpCircle className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Dr. Sarah Chen</p>
                  <p className="text-xs text-gray-500">Chief AI Ethics Officer</p>
                </div>
                <div className="relative">
                  <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-sm font-semibold text-white">SC</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-semibold text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-700 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 bg-gray-50 min-h-screen">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-6">
            <span>© 2024 IBM Corporation</span>
            <span>•</span>
            <span>Watsonx Governance Platform v2.1.0</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>System Operational</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Last Updated: {new Date().toLocaleString()}</span>
            <span>•</span>
            <span>SOC 2 Type II Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;