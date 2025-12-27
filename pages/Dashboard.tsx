
import React from 'react';
import { BookOpen, Layers, Eye, Star, TrendingUp } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Mon', visits: 400 },
  { name: 'Tue', visits: 300 },
  { name: 'Wed', visits: 600 },
  { name: 'Thu', visits: 800 },
  { name: 'Fri', visits: 500 },
  { name: 'Sat', visits: 900 },
  { name: 'Sun', visits: 1100 },
];

const categoryData = [
  { name: 'বাংলা সাহিত্য', count: 45, color: '#3b82f6' },
  { name: 'ইংরেজি ক্লাসিক্স', count: 32, color: '#6366f1' },
  { name: 'বিজ্ঞান কল্পকাহিনী', count: 12, color: '#10b981' },
  { name: 'ইতিহাস', count: 25, color: '#f59e0b' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">সুস্বাগতম!</h1>
        <p className="text-slate-400 font-medium text-lg">আপনার লাইব্রেরির আজকের সারসংক্ষেপ এখানে দেখুন।</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="মোট বই" value="১,২৮৪" change="+১২% গত মাস" icon={<BookOpen className="w-6 h-6" />} color="text-blue-600 bg-blue-50" />
        <StatCard label="ক্যাটাগরি" value="২৪" change="কোন পরিবর্তন নেই" icon={<Layers className="w-6 h-6" />} color="text-indigo-600 bg-indigo-50" />
        <StatCard label="মোট ভিজিটর" value="১৮,৪৯২" change="+৫.৪% গত সপ্তাহ" icon={<Eye className="w-6 h-6" />} color="text-emerald-600 bg-emerald-50" />
        <StatCard label="গড় রেটিং" value="৪.৮" change="+০.২ উন্নতি" icon={<Star className="w-6 h-6" />} color="text-amber-500 bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-50 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-slate-900">ভিজিটর ট্রেন্ডস</h2>
            <select className="bg-slate-50 border-none rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 outline-none cursor-pointer">
              <option>গত ৭ দিন</option>
              <option>গত ৩০ দিন</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.08)', padding: '15px'}}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col transition-all hover:shadow-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">জনপ্রিয় ক্যাটাগরি</h2>
          <div className="space-y-10 flex-1">
            {categoryData.map((cat, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-700 text-base">{cat.name}</span>
                  <span className="text-slate-400 font-bold">{cat.count}টি বই</span>
                </div>
                <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(cat.count/50)*100}%`, backgroundColor: cat.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-12 w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all">
            সব ক্যাটাগরি দেখুন
          </button>
        </div>
      </div>

      {/* Recent Books Section */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-50">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">সম্প্রতি যুক্ত করা বই</h2>
          <Link to="/books" className="px-6 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all">সবগুলো দেখুন</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex gap-6 p-6 rounded-3xl hover:bg-slate-50 transition-all group">
              <div className="w-24 h-32 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm transition-transform group-hover:scale-105">
                <img src={`https://picsum.photos/seed/${i+42}/200/300`} className="w-full h-full object-cover" alt="Cover" />
              </div>
              <div className="flex flex-col justify-center gap-1.5">
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">আধুনিক রিঅ্যাক্ট গাইড</h4>
                <p className="text-sm text-slate-400 font-medium">জেসিকা কুপার</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">Programming</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, change, icon, color }: any) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100 group">
    <div className="flex items-center gap-6">
      <div className={`${color} p-4 rounded-2xl transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-500">
      <TrendingUp className="w-4 h-4" />
      <span>{change}</span>
    </div>
  </div>
);

export default Dashboard;
