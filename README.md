# Insure-safe-Ai
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { Claim } from '../types';

const data = [
  { name: 'Jan', claims: 45, fraud: 12 },
  { name: 'Feb', claims: 52, fraud: 15 },
  { name: 'Mar', claims: 38, fraud: 8 },
  { name: 'Apr', claims: 65, fraud: 22 },
  { name: 'May', claims: 48, fraud: 10 },
];

const riskData = [
  { name: 'Low Risk', value: 65, color: '#10B981' },
  { name: 'Medium Risk', value: 20, color: '#F59E0B' },
  { name: 'High Risk', value: 10, color: '#EF4444' },
  { name: 'Critical', value: 5, color: '#7F1D1D' },
];

interface DashboardProps {
  claims: Claim[];
}

const Dashboard: React.FC<DashboardProps> = ({ claims }) => {
  const totalClaims = claims.length;
  const highRisk = claims.filter(c => (c.fraudScore || 0) > 70).length;
  const totalAmount = claims.reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Claims', value: totalClaims, trend: '+12%', icon: '📑', color: 'indigo' },
          { label: 'Suspected Fraud', value: highRisk, trend: '-2%', icon: '⚠️', color: 'amber' },
          { label: 'Potential Loss Saved', value: `$${(totalAmount * 0.15).toLocaleString()}`, trend: '+8%', icon: '💰', color: 'emerald' },
          { label: 'Avg Risk Score', value: '34.2', trend: '-5%', icon: '📈', color: 'slate' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`w-10 h-10 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center text-xl`}>
                {stat.icon}
              </span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Claim Volume vs. Flagged Fraud</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="claims" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Total Claims" />
                <Bar dataKey="fraud" fill="#EF4444" radius={[4, 4, 0, 0]} name="Flagged Fraud" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Risk Distribution</h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-bold text-slate-800">82%</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Low Risk</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {riskData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Alerts */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold">High Priority Alerts</h3>
          <button className="text-indigo-600 text-sm font-medium hover:underline">View all alerts</button>
        </div>
        <div className="divide-y divide-slate-100">
          {claims.filter(c => (c.fraudScore || 0) > 60).map((claim) => (
            <div key={claim.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center font-bold">!</div>
                <div>
                  <p className="font-semibold text-slate-800">{claim.claimantName}</p>
                  <p className="text-xs text-slate-500">{claim.id} • {claim.incidentType}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-rose-600">Score: {claim.fraudScore}</p>
                <p className="text-xs text-slate-400">Flagged 2h ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
