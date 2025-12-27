
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, Users, ArrowUpRight, ArrowDownRight, Clock, MapPin } from 'lucide-react';

const visitData = [
  { time: '00:00', users: 120 }, { time: '04:00', users: 80 }, { time: '08:00', users: 340 },
  { time: '12:00', users: 560 }, { time: '16:00', users: 780 }, { time: '20:00', users: 430 },
];

const sourceData = [
  { name: 'Direct', value: 40, color: '#3b82f6' },
  { name: 'Search', value: 30, color: '#6366f1' },
  { name: 'Social', value: 20, color: '#10b981' },
  { name: 'Referral', value: 10, color: '#f59e0b' },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Advanced Analytics</h1>
          <p className="text-slate-500 mt-1">Deep dive into your website's performance and engagement.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Download Report</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">Export CSV</button>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsightCard title="Average Session" value="4m 32s" trend="+12s" positive={true} icon={<Clock className="w-5 h-5 text-blue-600" />} />
        <InsightCard title="Bounce Rate" value="24.8%" trend="-2.1%" positive={true} icon={<TrendingUp className="w-5 h-5 text-emerald-600" />} />
        <InsightCard title="Active Now" value="142" trend="+8" positive={true} icon={<Users className="w-5 h-5 text-indigo-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Traffic Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Traffic Distribution</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                 <span className="text-xs font-semibold text-slate-500">Peak Hours</span>
               </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitData}>
                <defs>
                  <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={4} fill="url(#trafficGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Acquisition Sources</h3>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-4 w-full">
              {sourceData.map((src, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: src.color}}></div>
                    <span className="font-semibold text-slate-700">{src.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">{src.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Books */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">Top Performing Titles</h3>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[1,2,3,4].map((_, i) => (
             <div key={i} className="group cursor-pointer">
               <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4 shadow-md group-hover:shadow-xl transition-all">
                  <img src={`https://picsum.photos/seed/${i+200}/300/400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                    #{i+1} Trending
                  </div>
               </div>
               <h4 className="font-bold text-slate-800 truncate">Psychology of Money</h4>
               <div className="flex items-center justify-between mt-2">
                 <span className="text-sm text-slate-500">8.2k reads</span>
                 <span className="text-emerald-500 text-xs font-bold flex items-center">
                   <ArrowUpRight className="w-3 h-3" /> 12%
                 </span>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ title, value, trend, positive, icon }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
    <div className="bg-slate-50 p-3 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h4 className="text-2xl font-black text-slate-800">{value}</h4>
        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </span>
      </div>
    </div>
  </div>
);

export default Analytics;
