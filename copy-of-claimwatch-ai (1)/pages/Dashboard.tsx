
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';
import { Users, FileText, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Claims', value: '12,482', icon: FileText, change: '+12%', color: 'blue' },
    { title: 'Fraud Detected', value: '412', icon: AlertTriangle, change: '+4%', color: 'red' },
    { title: 'Fraud Percentage', value: '3.3%', icon: TrendingUp, change: '-0.5%', color: 'purple' },
    { title: 'Loss Avoided', value: '$2.1M', icon: DollarSign, change: '+18%', color: 'green' },
  ];

  const trendData = [
    { month: 'Jan', total: 4000, fraud: 120 },
    { month: 'Feb', total: 3000, fraud: 98 },
    { month: 'Mar', total: 2000, fraud: 86 },
    { month: 'Apr', total: 2780, fraud: 110 },
    { month: 'May', total: 1890, fraud: 72 },
    { month: 'Jun', total: 2390, fraud: 90 },
    { month: 'Jul', total: 3490, fraud: 130 },
  ];

  const typeData = [
    { name: 'Collision', value: 45 },
    { name: 'Theft', value: 25 },
    { name: 'Natural', value: 15 },
    { name: 'Medical', value: 15 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Insights Overview</h2>
          <p className="text-slate-400">System-wide performance and fraud patterns for the current fiscal period.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-700">Export Report</button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 shadow-lg shadow-blue-500/20">Refresh Data</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-slate-800`}>
                  <Icon className={`w-6 h-6 text-slate-300`} />
                </div>
                <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-slate-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-8">Monthly Claims & Fraud Volume</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" />
                <Line type="monotone" dataKey="fraud" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-8">Fraud by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold mb-6">Recent Suspicious Activities</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="pb-4 text-slate-400 font-medium">Claim ID</th>
                <th className="pb-4 text-slate-400 font-medium">Policy Holder</th>
                <th className="pb-4 text-slate-400 font-medium">Risk Score</th>
                <th className="pb-4 text-slate-400 font-medium">Status</th>
                <th className="pb-4 text-slate-400 font-medium">Date Flagged</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: '#CLM-92381', holder: 'James Wilson', score: '94%', status: 'Under Review', date: '2024-05-12' },
                { id: '#CLM-92382', holder: 'Sarah Jenkins', score: '82%', status: 'Flagged', date: '2024-05-11' },
                { id: '#CLM-92383', holder: 'Robert Chen', score: '91%', status: 'Escalated', date: '2024-05-11' },
                { id: '#CLM-92384', holder: 'Emma Thompson', score: '78%', status: 'Under Review', date: '2024-05-10' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 font-mono text-blue-400">{row.id}</td>
                  <td className="py-4">{row.holder}</td>
                  <td className="py-4 font-bold text-red-500">{row.score}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-slate-800 text-xs rounded-full">{row.status}</span>
                  </td>
                  <td className="py-4 text-slate-400">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
