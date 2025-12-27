
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, Check, ArrowUpDown } from 'lucide-react';
import { Category } from '../types';

const Categories: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories] = useState<Category[]>([
    { id: '1', name: 'বাংলা সাহিত্য', slug: 'bengali', order: 1 },
    { id: '2', name: 'ইংরেজি ক্লাসিক্স', slug: 'english-classics', order: 2 },
    { id: '3', name: 'বিজ্ঞান কল্পকাহিনী', slug: 'sci-fi', order: 3 },
    { id: '4', name: 'ইতিহাস ও সংস্কৃতি', slug: 'history', order: 4 },
  ]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">ক্যাটাগরি</h1>
          <p className="text-slate-400 font-medium text-lg">বইগুলোকে সঠিক গ্রুপে সাজিয়ে পাঠকদের সাহায্য করুন।</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          <span>নতুন ক্যাটাগরি</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Categories List */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6 bg-slate-50/30">
            <h2 className="text-2xl font-black text-slate-900">সক্রিয় ক্যাটাগরিগুলো</h2>
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="ক্যাটাগরি খুঁজুন..." 
                className="pl-14 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-indigo-50 transition-all w-64 shadow-sm font-medium"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                <tr>
                  <th className="px-10 py-6">ক্রমিক</th>
                  <th className="px-10 py-6">নাম</th>
                  <th className="px-10 py-6">স্লাগ (URL)</th>
                  <th className="px-10 py-6 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl font-black text-sm shadow-inner">{cat.order}</span>
                        <ArrowUpDown className="w-4 h-4 text-slate-200 cursor-move" />
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="text-lg font-bold text-slate-900">{cat.name}</span>
                    </td>
                    <td className="px-10 py-8">
                      <code className="bg-white border border-slate-100 text-indigo-500 px-4 py-2 rounded-xl text-xs font-black shadow-sm tracking-wide">/{cat.slug}</code>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-white rounded-2xl transition-all shadow-sm">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 text-slate-300 hover:text-red-500 hover:bg-white rounded-2xl transition-all shadow-sm">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-10">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-10 rounded-[2.5rem] text-white shadow-[0_40px_80px_-15px_rgba(79,70,229,0.3)]">
             <h3 className="font-black text-2xl mb-4">ক্যাটাগরি টিপস</h3>
             <p className="text-indigo-100 text-sm mb-10 leading-relaxed font-medium">
               বইয়ের ক্যাটাগরিগুলো ছোট এবং অর্থবহ রাখলে পাঠকদের বই খুঁজতে সুবিধা হয়। ক্যাটাগরি পরিবর্তন করলে তার URL স্লাগটিও চেক করে নিন।
             </p>
             <div className="space-y-6">
               <div className="flex justify-between items-end">
                 <span className="text-xs font-bold uppercase tracking-widest opacity-60">ভারসাম্য বজায় আছে</span>
                 <span className="text-3xl font-black">৮৫%</span>
               </div>
               <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full bg-white rounded-full w-[85%] transition-all duration-1000 delay-500"></div>
               </div>
             </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-50 space-y-8">
            <h3 className="text-xl font-black text-slate-900">দ্রুত অ্যাকশন</h3>
            <div className="space-y-4">
              <QuickAction label="সব ক্যাটাগরি রি-অর্ডার করুন" />
              <QuickAction label="অব্যবহৃত ক্যাটাগরি পরিষ্কার করুন" />
              <QuickAction label="নতুন এসইও রিপোর্ট" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Spacey & Clean */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-white/40 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-50 overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-900">নতুন ক্যাটাগরি</h3>
              <button onClick={() => setShowModal(false)} className="p-4 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-3xl transition-all">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="p-12 space-y-10">
              <InputGroup label="ক্যাটাগরির নাম" placeholder="উদা: বিজ্ঞান ও প্রযুক্তি" />
              <InputGroup label="URL স্লাগ" placeholder="উদা: science-tech" />
              <InputGroup label="ক্রমিক নম্বর" type="number" placeholder="১" />
            </div>
            <div className="p-10 bg-slate-50/30 border-t border-slate-50 flex gap-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-5 text-slate-400 font-bold hover:text-slate-900 transition-all">বাতিল</button>
              <button className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all">সংরক্ষণ করুন</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const QuickAction = ({ label }: any) => (
  <button className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group">
    <span className="font-bold text-slate-600 group-hover:text-slate-900 text-sm">{label}</span>
    <Plus className="w-4 h-4 text-slate-400 group-hover:rotate-90 transition-transform" />
  </button>
);

const InputGroup = ({ label, placeholder, type = "text" }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-700 transition-all"
    />
  </div>
);

export default Categories;
