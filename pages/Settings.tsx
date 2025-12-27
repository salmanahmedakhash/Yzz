
import React from 'react';
import { Shield, Bell, Globe, Database, HelpCircle, Save } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">সিস্টেম সেটিংস</h1>
        <p className="text-slate-400 font-medium text-lg">আপনার বুকস্টোরের সকল গ্লোবাল কনফিগারেশন এখান থেকে সেট করুন।</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
        <nav className="space-y-3">
          <SettingsNavLink icon={<Globe className="w-5 h-5" />} label="সাধারণ সেটিংস" active={true} />
          <SettingsNavLink icon={<Shield className="w-5 h-5" />} label="নিরাপত্তা ও অ্যাক্সেস" />
          <SettingsNavLink icon={<Bell className="w-5 h-5" />} label="নোটিফিকেশন" />
          <SettingsNavLink icon={<Database className="w-5 h-5" />} label="ডাটা ও ব্যাকআপ" />
          <SettingsNavLink icon={<HelpCircle className="w-5 h-5" />} label="সহায়তা" />
        </nav>

        <div className="xl:col-span-3 space-y-12">
          {/* Site Identity */}
          <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-50 space-y-10 transition-all hover:shadow-md">
            <h3 className="text-2xl font-black text-slate-900 border-b border-slate-50 pb-6">ওয়েবসাইট পরিচিতি</h3>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">ওয়েবসাইটের নাম</label>
                <input 
                  type="text" 
                  defaultValue="আমার বইঘর" 
                  className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">সাইট ডেসক্রিপশন</label>
                <textarea 
                  rows={4}
                  defaultValue="বাংলা এবং আন্তর্জাতিক বই অনলাইনে পড়ার সেরা প্ল্যাটফর্ম।"
                  className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] focus:ring-4 focus:ring-blue-50 outline-none resize-none font-medium text-slate-700 leading-relaxed"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Visibility Controls */}
          <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-50 space-y-10 transition-all hover:shadow-md">
            <h3 className="text-2xl font-black text-slate-900 border-b border-slate-50 pb-6">ভিজিবিলিটি কন্ট্রোল</h3>
            <div className="space-y-10">
              <ToggleItem label="মেইনটেন্যান্স মোড" description="কাজ চলার সময় পাবলিক অ্যাক্সেস বন্ধ রাখুন।" />
              <ToggleItem label="গেস্ট রিভিউ অনুমোদন" description="রেজিস্ট্রেশন ছাড়াই পাঠকদের রিভিউ দিতে দিন।" />
              <ToggleItem label="ভিউ কাউন্ট দেখান" description="বইটি কতবার পড়া হয়েছে তা ওয়েবসাইটে প্রদর্শন করুন।" active={true} />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-[2rem] font-black shadow-2xl shadow-blue-100 transition-all flex items-center gap-4 group">
              <Save className="w-6 h-6 transition-transform group-hover:scale-110" />
              সেভ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsNavLink = ({ icon, label, active = false }: any) => (
  <button className={`w-full flex items-center gap-4 px-8 py-5 rounded-2xl text-sm font-black transition-all ${
    active ? 'bg-white text-blue-600 shadow-xl shadow-slate-100' : 'text-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-sm'
  }`}>
    <span className={active ? 'text-blue-600' : 'text-slate-300'}>{icon}</span>
    {label}
  </button>
);

const ToggleItem = ({ label, description, active = false }: any) => {
  const [isOn, setIsOn] = React.useState(active);
  return (
    <div className="flex items-center justify-between group">
      <div className="pr-10 space-y-1.5">
        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-none">{label}</h4>
        <p className="text-sm text-slate-400 font-medium">{description}</p>
      </div>
      <div 
        onClick={() => setIsOn(!isOn)}
        className={`w-16 h-8 rounded-full relative transition-all duration-300 cursor-pointer shadow-inner p-1 ${isOn ? 'bg-blue-600' : 'bg-slate-100'}`}
      >
         <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 transform ${isOn ? 'translate-x-8' : 'translate-x-0'}`}></div>
      </div>
    </div>
  );
};

export default Settings;
