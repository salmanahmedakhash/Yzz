
import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'hidden'>('all');

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">বই ব্যবস্থাপনা</h1>
          <p className="text-slate-400 font-medium text-lg">আপনার সংগ্রহের সবগুলো বই এখান থেকে নিয়ন্ত্রণ করুন।</p>
        </div>
        <Link 
          to="/books/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          <span>নতুন বই যুক্ত করুন</span>
        </Link>
      </div>

      {/* Navigation & Search Bar */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col xl:flex-row gap-8 items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl w-full xl:w-auto">
          {['all', 'published', 'hidden'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all capitalize ${
                activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'all' ? 'সব বই' : tab === 'published' ? 'প্রকাশিত' : 'লুকানো'}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto flex-1 xl:justify-end">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input 
              type="text" 
              placeholder="বই অথবা লেখক খুঁজুন..." 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Books Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-slate-400 uppercase text-xs font-bold tracking-widest border-b border-slate-50">
            <tr>
              <th className="px-10 py-6">বইয়ের তথ্য</th>
              <th className="px-10 py-6">ক্যাটাগরি</th>
              <th className="px-10 py-6">রেটিং</th>
              <th className="px-10 py-6 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-500">
                      <img src={`https://picsum.photos/seed/${i + 90}/200/300`} alt="Book" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">স্যাপিয়েন্স: এ ব্রিফ হিস্ট্রি</h4>
                      <p className="text-sm text-slate-400 font-semibold">ইউভাল নোয়াহ হারারি</p>
                      <div className="flex items-center gap-3 mt-2">
                        {i % 3 === 0 ? (
                          <span className="text-[10px] px-3 py-1 bg-red-50 text-red-500 rounded-full font-black uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> লুকানো
                          </span>
                        ) : (
                          <span className="text-[10px] px-3 py-1 bg-emerald-50 text-emerald-500 rounded-full font-black uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> প্রকাশিত
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <span className="px-5 py-2 bg-white border border-slate-100 text-slate-500 rounded-xl text-xs font-bold shadow-sm">
                    ইতিহাস
                  </span>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Star className="w-5 h-5 fill-amber-500" />
                    <span className="text-lg font-black text-slate-900">৪.৯</span>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-2xl transition-all shadow-sm">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-slate-400 hover:text-red-500 hover:bg-white rounded-2xl transition-all shadow-sm">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-400">মোট ২৮৪টি বই পাওয়া গেছে</p>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-slate-900 hover:shadow-md transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-11 h-11 flex items-center justify-center bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100">১</button>
            <button className="w-11 h-11 flex items-center justify-center bg-white border border-slate-100 text-slate-900 rounded-2xl font-black hover:shadow-md transition-all">২</button>
            <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-slate-900 hover:shadow-md transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
