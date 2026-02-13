
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

const ModelDetails: React.FC = () => {
  const metrics = [
    { name: 'Accuracy', value: 94.2, color: '#3b82f6' },
    { name: 'Precision', value: 91.8, color: '#6366f1' },
    { name: 'Recall', value: 89.5, color: '#8b5cf6' },
    { name: 'F1 Score', value: 90.6, color: '#ec4899' },
  ];

  const confusionMatrix = [
    { name: 'True Negative', value: 450, color: '#10b981' },
    { name: 'False Positive', value: 30, color: '#ef4444' },
    { name: 'False Negative', value: 45, color: '#f59e0b' },
    { name: 'True Positive', value: 320, color: '#3b82f6' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4">Model Architecture & Performance</h2>
        <p className="text-slate-400">
          Trained on a dataset of 500,000+ historical claims across North America.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-8">Performance Metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {metrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-8">Confusion Matrix (Validation Set)</h3>
          <div className="grid grid-cols-2 gap-4 h-64">
            {confusionMatrix.map((item) => (
              <div key={item.name} className="flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                <span className="text-3xl font-bold mb-1" style={{ color: item.color }}>{item.value}</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-4">Features Analyzed</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Claim Amount", "Customer History", "Accident Type", "Location", 
              "Police Report Status", "Witness Count", "Policy Age", "Previous Deductibles",
              "Time of Incident", "Vehicle Age", "Severity of Damage"
            ].map((feature) => (
              <span key={feature} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-4">Algorithm Complexity</h3>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span>Layers</span>
              <span className="text-white font-mono">14 Deep Convolutional</span>
            </li>
            <li className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span>Parameters</span>
              <span className="text-white font-mono">2.4M Trainable</span>
            </li>
            <li className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span>Training Epochs</span>
              <span className="text-white font-mono">150 Early Stopping</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Loss Function</span>
              <span className="text-white font-mono">Binary Crossentropy</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
