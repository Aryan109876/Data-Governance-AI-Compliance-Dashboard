import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Calendar,
  Eye,
  User,
  Database,
  Shield,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

const AuditTrail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  const auditLogs = [
    {
      id: 'audit-001',
      timestamp: '2024-01-15 14:23:12',
      user: 'sarah.johnson@company.com',
      action: 'Model Data Access',
      resource: 'Customer Scoring Model v2.1',
      status: 'success',
      ip: '192.168.1.100',
      details: 'Accessed training dataset for bias analysis',
      category: 'data_access'
    },
    {
      id: 'audit-002',
      timestamp: '2024-01-15 13:45:33',
      user: 'john.doe@company.com',
      action: 'Policy Update',
      resource: 'PII Data Protection Policy',
      status: 'success',
      ip: '192.168.1.101',
      details: 'Updated retention period from 2 years to 3 years',
      category: 'policy_change'
    },
    {
      id: 'audit-003',
      timestamp: '2024-01-15 12:18:45',
      user: 'automated-system',
      action: 'Compliance Violation',
      resource: 'Hiring Algorithm v1.3',
      status: 'warning',
      ip: 'system',
      details: 'Bias threshold exceeded for gender attribute',
      category: 'violation'
    },
    {
      id: 'audit-004',
      timestamp: '2024-01-15 11:32:17',
      user: 'mike.wilson@company.com',
      action: 'Data Export',
      resource: 'Audit Trail Report',
      status: 'success',
      ip: '192.168.1.102',
      details: 'Exported compliance report for Q4 2023',
      category: 'data_export'
    },
    {
      id: 'audit-005',
      timestamp: '2024-01-15 10:15:22',
      user: 'jane.smith@company.com',
      action: 'Model Deployment',
      resource: 'Credit Risk Assessment v2.0',
      status: 'failed',
      ip: '192.168.1.103',
      details: 'Deployment failed due to missing bias check approval',
      category: 'deployment'
    },
    {
      id: 'audit-006',
      timestamp: '2024-01-15 09:47:55',
      user: 'automated-system',
      action: 'Bias Analysis',
      resource: 'Customer Scoring Model v2.1',
      status: 'success',
      ip: 'system',
      details: 'Automated bias detection completed successfully',
      category: 'analysis'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      data_access: 'bg-blue-100 text-blue-800',
      policy_change: 'bg-purple-100 text-purple-800',
      violation: 'bg-red-100 text-red-800',
      data_export: 'bg-green-100 text-green-800',
      deployment: 'bg-orange-100 text-orange-800',
      analysis: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || log.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Trail</h2>
          <p className="text-gray-600">Track all system activities and compliance events</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="data_access">Data Access</option>
              <option value="policy_change">Policy Changes</option>
              <option value="violation">Violations</option>
              <option value="data_export">Data Export</option>
              <option value="deployment">Deployment</option>
              <option value="analysis">Analysis</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Eye className="h-4 w-4" />
            <span>Real-time View</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Events', value: '1,247', icon: FileText, color: 'text-blue-600' },
          { label: 'Policy Violations', value: '8', icon: AlertTriangle, color: 'text-red-600' },
          { label: 'Data Access Events', value: '156', icon: Database, color: 'text-green-600' },
          { label: 'Active Users', value: '23', icon: User, color: 'text-purple-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Audit Events</h3>
          <p className="text-sm text-gray-600">Showing {filteredLogs.length} of {auditLogs.length} events</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.resource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(log.status)}
                      <span className="text-sm text-gray-900 capitalize">{log.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(log.category)}`}>
                      {log.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Compliance Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
            <p className="text-sm text-gray-600">GDPR Compliance</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
            <p className="text-sm text-gray-600">Data Access Requests</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">2.3 hrs</div>
            <p className="text-sm text-gray-600">Avg. Response Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;