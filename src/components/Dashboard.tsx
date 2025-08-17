import React from 'react';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Database,
  Shield,
  FileText,
  BarChart3,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const complianceMetrics = [
    { label: 'Overall Compliance Score', value: '94%', change: '+2%', trend: 'up' },
    { label: 'Active Policies', value: '47', change: '+3', trend: 'up' },
    { label: 'Models Under Review', value: '12', change: '-5', trend: 'down' },
    { label: 'Bias Alerts', value: '3', change: '+1', trend: 'up' },
  ];

  const recentActivities = [
    { action: 'Model bias check completed', model: 'Customer Scoring Model v2.1', status: 'passed', time: '2 hours ago' },
    { action: 'Policy violation detected', model: 'Hiring Algorithm v1.3', status: 'warning', time: '4 hours ago' },
    { action: 'Audit trail exported', model: 'Credit Risk Model', status: 'completed', time: '6 hours ago' },
    { action: 'New policy created', model: 'PII Data Protection Policy', status: 'active', time: '1 day ago' },
  ];

  const biasMetrics = [
    { metric: 'Demographic Parity', value: 0.89, threshold: 0.8, status: 'pass' },
    { metric: 'Equal Opportunity', value: 0.76, threshold: 0.8, status: 'fail' },
    { metric: 'Calibration', value: 0.92, threshold: 0.8, status: 'pass' },
    { metric: 'Treatment Equality', value: 0.85, threshold: 0.8, status: 'pass' },
  ];

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold">Enterprise Governance Status</h2>
            </div>
            <p className="text-blue-100 text-lg">All AI governance and compliance systems operational</p>
            <p className="text-blue-200 text-sm mt-2">Last system check: {new Date().toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-1">94.7%</div>
              <div className="text-sm text-blue-100">Overall Compliance</div>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-1">47</div>
              <div className="text-sm text-blue-100">Active Policies</div>
            </div>
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold px-2 py-1 rounded-full ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bias Detection Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">AI Fairness Metrics</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Real-time</span>
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-4">
            {biasMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        metric.status === 'pass' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${metric.value * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">{metric.value}</span>
                  {metric.status === 'pass' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">System Activity Feed</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Live</span>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'passed' || activity.status === 'completed' || activity.status === 'active'
                    ? 'bg-green-500'
                    : activity.status === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.model}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Compliance Trend Analysis</h3>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
              const values = [88, 91, 89, 94, 96, 94];
              return (
                <div key={month} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 w-10">{month}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${values[index]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">{values[index]}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Policy Violations */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Risk Assessment Matrix</h3>
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div className="space-y-3">
            {[
              { type: 'Data Quality', count: 12, severity: 'high' },
              { type: 'Bias Detection', count: 3, severity: 'critical' },
              { type: 'Access Control', count: 7, severity: 'medium' },
              { type: 'Documentation', count: 15, severity: 'low' },
            ].map((violation, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    violation.severity === 'critical' ? 'bg-red-500' :
                    violation.severity === 'high' ? 'bg-orange-500' :
                    violation.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="text-sm font-semibold text-gray-900">{violation.type}</span>
                </div>
                <span className="text-lg font-bold text-gray-800 bg-white px-3 py-1 rounded-full">{violation.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;