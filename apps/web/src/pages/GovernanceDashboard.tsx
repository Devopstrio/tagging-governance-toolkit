import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Tag, 
  ShieldCheck, 
  Database, 
  Target,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Globe,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Zap,
  BarChart4
} from 'lucide-react';

const complianceData = [
  { name: 'Mon', score: 82 },
  { name: 'Tue', score: 84 },
  { name: 'Wed', score: 81 },
  { name: 'Thu', score: 88 },
  { name: 'Fri', score: 85 },
  { name: 'Sat', score: 83 },
  { name: 'Sun', score: 84.5 },
];

const KPI_CARDS = [
  { title: 'Global Compliance', value: '84.5%', trend: '+2.4%', color: 'indigo', icon: ShieldCheck },
  { title: 'Missing Tags', value: '1,242', trend: '-15%', color: 'rose', icon: AlertTriangle },
  { title: 'Allocated Cost', value: '$1.2M', trend: '92%', color: 'emerald', icon: Target },
  { title: 'Active Policies', value: '14', trend: 'v2.1', color: 'indigo', icon: Tag },
];

const GovernanceDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tagging Governance Overview</h1>
          <p className="text-slate-400">Enterprise resource metadata enforcement and cost allocation intelligence.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-slate-700">
            Export Audit Logs
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-600/20">
            Scan Resources
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-indigo-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-indigo-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') || card.trend.includes('-') && card.title.includes('Missing') ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Trend */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Global Tagging Compliance Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={complianceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#6366f1" fill="url(#colorScore)" name="Compliance Score (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Violations by Type */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Violation Breakdown</h3>
          <div className="flex-1 space-y-6">
            {[
              { type: 'Missing Environment', count: 450, pct: 36, color: 'bg-rose-500' },
              { type: 'Invalid CostCenter', count: 320, pct: 25, color: 'bg-amber-500' },
              { type: 'Format Mismatch', count: 180, pct: 14, color: 'bg-indigo-500' },
              { type: 'Missing Owner', count: 292, pct: 25, color: 'bg-slate-500' },
            ].map((v) => (
              <div key={v.type} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{v.type}</span>
                  <span className="text-slate-400">{v.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${v.color}`} style={{ width: `${v.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex gap-3">
            <Zap className="text-indigo-400 shrink-0" size={18} />
            <p className="text-xs text-slate-400">Drift Detected: <span className="text-indigo-400 font-bold">12 resources</span> in 'prod-vpc' have lost their 'Environment' tag in the last 24h.</p>
          </div>
        </div>
      </div>

      {/* Resource Compliance Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Governance Inventory</h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View All Resources</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Resource ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Score</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: 'i-0a1b2c3d...', name: 'prod-api-svr', type: 'EC2', status: 'COMPLIANT', score: 100 },
                { id: 'sql-stag-db', name: 'staging-db', type: 'SQL', status: 'NON-COMPLIANT', score: 66.7 },
                { id: 'dev-bucket-9', name: 'sandbox-stor', type: 'S3', status: 'CRITICAL', score: 33.3 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-200">{row.name}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{row.type}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      row.status === 'COMPLIANT' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      row.status === 'NON-COMPLIANT' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' : 
                      'text-rose-400 border-rose-500/20 bg-rose-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1 bg-slate-800 rounded-full">
                        <div className={`h-full ${row.score === 100 ? 'bg-emerald-500' : row.score > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${row.score}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-400">{row.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                      Remediate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GovernanceDashboard;
