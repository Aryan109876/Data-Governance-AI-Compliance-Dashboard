import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  Settings,
  FileText,
  Shield,
  Clock,
  Users,
  Database
} from 'lucide-react';

const PolicyEngine = () => {
  const [showCreatePolicy, setShowCreatePolicy] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const policies = [
    {
      id: 'policy-001',
      name: 'PII Data Protection',
      description: 'Prevents personally identifiable information from being used in model training',
      category: 'data_privacy',
      status: 'active',
      severity: 'critical',
      created: '2024-01-10',
      lastModified: '2024-01-14',
      violations: 3,
      conditions: ['Contains PII fields', 'Data not anonymized'],
      actions: ['Block training', 'Send alert', 'Log violation']
    },
    {
      id: 'policy-002',
      name: 'Bias Threshold Monitoring',
      description: 'Monitors model fairness metrics and triggers alerts when thresholds are exceeded',
      category: 'bias_monitoring',
      status: 'active',
      severity: 'high',
      created: '2024-01-08',
      lastModified: '2024-01-12',
      violations: 1,
      conditions: ['Demographic parity < 0.8', 'Equal opportunity < 0.8'],
      actions: ['Send alert', 'Require review', 'Log violation']
    },
    {
      id: 'policy-003',
      name: 'Model Documentation Requirements',
      description: 'Ensures all models have complete documentation before deployment',
      category: 'documentation',
      status: 'active',
      severity: 'medium',
      created: '2024-01-05',
      lastModified: '2024-01-10',
      violations: 5,
      conditions: ['Missing model card', 'No bias analysis', 'Incomplete testing docs'],
      actions: ['Block deployment', 'Send notification', 'Log violation']
    },
    {
      id: 'policy-004',
      name: 'Data Retention Compliance',
      description: 'Enforces data retention policies and automated deletion schedules',
      category: 'data_retention',
      status: 'active',
      severity: 'medium',
      created: '2024-01-03',
      lastModified: '2024-01-08',
      violations: 0,
      conditions: ['Data age > 3 years', 'No business justification'],
      actions: ['Auto-delete', 'Send notification', 'Log action']
    },
    {
      id: 'policy-005',
      name: 'External API Usage Monitoring',
      description: 'Monitors and controls usage of external APIs for data processing',
      category: 'api_governance',
      status: 'draft',
      severity: 'low',
      created: '2024-01-15',
      lastModified: '2024-01-15',
      violations: 0,
      conditions: ['Unauthorized API usage', 'Exceeds rate limits'],
      actions: ['Block requests', 'Send alert', 'Log usage']
    }
  ];

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'text-red-600 bg-red-100',
      high: 'text-orange-600 bg-orange-100',
      medium: 'text-yellow-600 bg-yellow-100',
      low: 'text-green-600 bg-green-100'
    };
    return colors[severity] || 'text-gray-600 bg-gray-100';
  };

  const getCategoryColor = (category) => {
    const colors = {
      data_privacy: 'text-red-600 bg-red-100',
      bias_monitoring: 'text-purple-600 bg-purple-100',
      documentation: 'text-blue-600 bg-blue-100',
      data_retention: 'text-green-600 bg-green-100',
      api_governance: 'text-indigo-600 bg-indigo-100'
    };
    return colors[category] || 'text-gray-600 bg-gray-100';
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Policy Engine</h2>
          <p className="text-gray-600">Define and manage governance policies with automated enforcement</p>
        </div>
        <button 
          onClick={() => setShowCreatePolicy(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Policy</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Policies', value: '4', icon: Shield, color: 'text-green-600' },
          { label: 'Total Violations', value: '9', icon: AlertTriangle, color: 'text-red-600' },
          { label: 'Draft Policies', value: '1', icon: FileText, color: 'text-yellow-600' },
          { label: 'Compliance Score', value: '94%', icon: CheckCircle, color: 'text-blue-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-lg bg-gray-50">
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

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="data_privacy">Data Privacy</option>
            <option value="bias_monitoring">Bias Monitoring</option>
            <option value="documentation">Documentation</option>
            <option value="data_retention">Data Retention</option>
            <option value="api_governance">API Governance</option>
          </select>
          <div className="flex space-x-2">
            <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
              Active ({policies.filter(p => p.status === 'active').length})
            </button>
            <button className="flex-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
              Draft ({policies.filter(p => p.status === 'draft').length})
            </button>
          </div>
        </div>
      </div>

      {/* Policies List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPolicies.map((policy) => (
          <div key={policy.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{policy.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    policy.status === 'active' ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Created: {policy.created}</span>
                  <span>Modified: {policy.lastModified}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(policy.category)}`}>
                  {policy.category.replace('_', ' ')}
                </span>
              </div>
              <div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(policy.severity)}`}>
                  {policy.severity} priority
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Conditions</h4>
                <div className="space-y-1">
                  {policy.conditions.map((condition, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                      {condition}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Actions</h4>
                <div className="space-y-1">
                  {policy.actions.map((action, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded">
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-600">{policy.violations} violations</span>
              </div>
              <button className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                policy.status === 'active' 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              } transition-colors`}>
                {policy.status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Disable</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Activate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Policy Modal */}
      {showCreatePolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Policy</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Policy Name</label>
                <input 
                  type="text" 
                  placeholder="Enter policy name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Describe what this policy does"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Data Privacy</option>
                    <option>Bias Monitoring</option>
                    <option>Documentation</option>
                    <option>Data Retention</option>
                    <option>API Governance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button 
                onClick={() => setShowCreatePolicy(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowCreatePolicy(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyEngine;