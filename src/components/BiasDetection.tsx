import React, { useState } from 'react';
import {
  Upload,
  Play,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Shield,
  FileText,
  Settings
} from 'lucide-react';

const BiasDetection = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const models = [
    { id: 'model-1', name: 'Customer Scoring Model v2.1', type: 'Classification', lastAnalyzed: '2024-01-15' },
    { id: 'model-2', name: 'Hiring Algorithm v1.3', type: 'Ranking', lastAnalyzed: '2024-01-14' },
    { id: 'model-3', name: 'Credit Risk Assessment', type: 'Regression', lastAnalyzed: '2024-01-12' },
  ];

  const mockResults = {
    overall_score: 0.87,
    metrics: [
      { name: 'Demographic Parity', value: 0.89, threshold: 0.8, status: 'pass', description: 'Equal positive prediction rates across groups' },
      { name: 'Equal Opportunity', value: 0.76, threshold: 0.8, status: 'fail', description: 'Equal true positive rates across groups' },
      { name: 'Equalized Odds', value: 0.92, threshold: 0.8, status: 'pass', description: 'Equal TPR and FPR across groups' },
      { name: 'Calibration', value: 0.85, threshold: 0.8, status: 'pass', description: 'Predicted probabilities match actual outcomes' },
    ],
    recommendations: [
      'Consider re-balancing training data to improve Equal Opportunity metric',
      'Review feature selection to reduce potential bias sources',
      'Implement post-processing techniques to improve fairness',
    ]
  };

  const handleAnalyze = () => {
    if (!selectedModel) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bias Detection & Fairness Analysis</h2>
          <p className="text-gray-600">Analyze AI models for potential bias and fairness violations</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Model Selection and Upload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Model for Analysis</h3>
          <div className="space-y-3">
            {models.map((model) => (
              <div 
                key={model.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedModel === model.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{model.name}</h4>
                    <p className="text-sm text-gray-500">{model.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Last analyzed</p>
                    <p className="text-sm font-medium text-gray-900">{model.lastAnalyzed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Training Data</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop your training data file here</p>
            <p className="text-sm text-gray-400 mb-4">Supports CSV, JSON, Parquet files up to 100MB</p>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Choose File
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Fairness Analysis Configuration</h3>
          <Settings className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Protected Attributes</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Gender, Race, Age</option>
              <option>Gender</option>
              <option>Race</option>
              <option>Age</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fairness Threshold</label>
            <input 
              type="number" 
              defaultValue="0.8"
              step="0.1"
              min="0"
              max="1"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleAnalyze}
              disabled={!selectedModel || isAnalyzing}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-full justify-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Run Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Overall Fairness Score</h3>
              <Shield className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Fairness Score</span>
                  <span className="text-lg font-bold text-gray-900">{(analysisResults.overall_score * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      analysisResults.overall_score >= 0.8 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${analysisResults.overall_score * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                analysisResults.overall_score >= 0.8 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {analysisResults.overall_score >= 0.8 ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                )}
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Fairness Metrics</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-6">
              {analysisResults.metrics.map((metric, index) => (
                <div key={index} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{metric.name}</h4>
                      {metric.status === 'pass' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <span className="text-lg font-bold text-gray-900">{metric.value.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.status === 'pass' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.value * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      Threshold: {metric.threshold}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
            </div>
            <div className="space-y-3">
              {analysisResults.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasDetection;