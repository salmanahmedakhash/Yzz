
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Upload, Wand2, Check, X, 
  Bold, Italic, Type, AlignLeft, AlignCenter, AlignRight, Save, Trash2,
  ChevronDown, Maximize2, Sparkles
} from 'lucide-react';
import { generateBookDescription } from '../services/geminiService';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    content: '',
    rating: '5.0',
    isHidden: false
  });

  const [coverUrl, setCoverUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFormat, setActiveFormat] = useState<string | null>(null);

  // ImgBB Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: local preview for instant feedback
    const reader = new FileReader();
    reader.onload = (event) => {
      // We don't set coverUrl yet, just showing it's loading
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    // Note: This is a demo key, for production users should use their own
    const api_key = '018653e0026e959600e5f2a1738740c0'; 
    const body = new FormData();
    body.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${api_key}`, {
        method: 'POST',
        body: body
      });
      const data = await response.json();
      if (data.success) {
        setCoverUrl(data.data.url);
      } else {
        alert('ছবি আপলোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      }
    } catch (error) {
      console.error(error);
      alert('ইন্টারনেট সংযোগ চেক করুন অথবা সঠিক ফাইল আপলোড করুন।');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAiWrite = async () => {
    if (!formData.title || !formData.author) {
      alert("আগে শিরোনাম এবং লেখকের নাম লিখুন।");
      return;
    }
    setIsGenerating(true);
    const desc = await generateBookDescription(formData.title, formData.author, formData.category || "General");
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleTextAction = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    let replacement = '';
    if (tag === 'bold') replacement = `**${selected}**`;
    else if (tag === 'italic') replacement = `*${selected}*`;
    else if (tag === 'large') replacement = `### ${selected}`;
    else if (tag === 'small') replacement = `_${selected}_`;

    setFormData(prev => ({ ...prev, content: before + replacement + after }));
    
    // Focus back and set selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 10);
  };

  const categories = ["বাংলা সাহিত্য", "ইংরেজি ক্লাসিক্স", "বিজ্ঞান কল্পকাহিনী", "ইতিহাস ও সংস্কৃতি", "প্রোগ্রামিং ও টেক"];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 pb-32">
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => navigate('/books')}
            className="w-14 h-14 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-[1.2rem] transition-all shadow-sm border border-slate-50 flex items-center justify-center group"
          >
            <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </button>
          <div className="space-y-1">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">নতুন সৃষ্টি</h1>
            <p className="text-slate-400 font-medium text-lg">আপনার সংগ্রহের নতুন পালক যোগ করুন।</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="px-10 py-5 bg-white text-slate-400 font-bold rounded-[2rem] border border-slate-100 hover:text-slate-900 transition-all"
            onClick={() => navigate('/books')}
          >
            বাতিল
          </button>
          <button className="px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-4 group">
            <Check className="w-6 h-6 transition-transform group-hover:scale-125" />
            পাবলিশ করুন
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
        {/* Main Content Area (8 cols) */}
        <div className="xl:col-span-8 space-y-16">
          
          {/* Metadata Section */}
          <div className="bg-white p-16 rounded-[3.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-50 space-y-12">
            <div className="flex items-center justify-between border-b border-slate-50 pb-8">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-5">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-sm font-black">০১</div>
                বইয়ের মৌলিক তথ্য
              </h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-100"></div>
                <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] ml-2">বইয়ের শিরোনাম</label>
                <input 
                  type="text" 
                  placeholder="যেমন: হিমুর হাতে নীলপদ্ম" 
                  className="w-full px-10 py-6 bg-slate-50/50 border-none rounded-[1.8rem] focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-700 transition-all text-lg placeholder:text-slate-300"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] ml-2">লেখকের নাম</label>
                <input 
                  type="text" 
                  placeholder="যেমন: হুমায়ূন আহমেদ" 
                  className="w-full px-10 py-6 bg-slate-50/50 border-none rounded-[1.8rem] focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-700 transition-all text-lg placeholder:text-slate-300"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] ml-2">বিষয় বা ক্যাটাগরি</label>
                <div className="relative">
                  <select 
                    className="w-full px-10 py-6 bg-slate-50/50 border-none rounded-[1.8rem] focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-700 cursor-pointer appearance-none text-lg"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">নির্বাচন করুন</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] ml-2">গড় রেটিং</label>
                <input 
                  type="text" 
                  placeholder="৫.০" 
                  className="w-full px-10 py-6 bg-slate-50/50 border-none rounded-[1.8rem] focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-700 transition-all text-lg"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center ml-2">
                <label className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">সংক্ষিপ্ত বর্ণনা</label>
                <button 
                  onClick={handleAiWrite}
                  disabled={isGenerating}
                  className="flex items-center gap-3 text-[11px] font-black text-blue-600 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-2xl transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'AI জেনারেট করছে...' : 'GEMINI AI দিয়ে লিখুন'}
                </button>
              </div>
              <textarea 
                rows={4} 
                placeholder="বইটি সম্পর্কে পাঠকদের একটি আকর্ষণীয় ধারণা দিন..." 
                className="w-full px-10 py-8 bg-slate-50/50 border-none rounded-[2.5rem] focus:ring-4 focus:ring-blue-50 outline-none resize-none font-medium text-slate-700 leading-relaxed text-lg placeholder:text-slate-300"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          {/* Full Content Section */}
          <div className="bg-white p-16 rounded-[3.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-50 space-y-12">
            <div className="flex items-center justify-between border-b border-slate-50 pb-8">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-5">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-sm font-black">০২</div>
                বইয়ের সম্পূর্ণ লেখা
              </h3>
              <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Luxury Text Toolbar */}
              <div className="flex flex-wrap gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm sticky top-10 z-10 mx-auto w-fit">
                <div className="flex items-center gap-2 pr-4 border-r border-slate-100">
                  <EditorBtn icon={<Bold className="w-4 h-4" />} onClick={() => handleTextAction('bold')} title="বোল্ড" />
                  <EditorBtn icon={<Italic className="w-4 h-4" />} onClick={() => handleTextAction('italic')} title="ইটালিক" />
                </div>
                
                <div className="flex items-center gap-2 px-4 border-r border-slate-100">
                  <EditorBtn icon={<div className="font-black text-sm">H1</div>} onClick={() => handleTextAction('large')} title="বড় লেখা" />
                  <EditorBtn icon={<div className="font-medium text-xs underline">sm</div>} onClick={() => handleTextAction('small')} title="ছোট লেখা" />
                </div>

                <div className="flex items-center gap-2 pl-4">
                  <EditorBtn icon={<AlignLeft className="w-4 h-4" />} onClick={() => {}} title="বামে" />
                  <EditorBtn icon={<AlignCenter className="w-4 h-4" />} onClick={() => {}} title="মাঝখানে" />
                  <EditorBtn icon={<AlignRight className="w-4 h-4" />} onClick={() => {}} title="ডানে" />
                </div>
              </div>

              <textarea 
                ref={textareaRef}
                id="book-content"
                rows={20} 
                placeholder="আপনার অমর লেখনী এখানে শুরু করুন..." 
                className="w-full px-12 py-12 bg-slate-50/30 border-none rounded-[3.5rem] focus:ring-8 focus:ring-indigo-50/50 outline-none resize-none font-medium text-slate-800 leading-[2] text-xl transition-all"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar: Media & Publish (4 cols) */}
        <div className="xl:col-span-4 space-y-16">
          
          {/* Cover Photo Upload */}
          <div className="bg-white p-12 rounded-[3.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-50 space-y-10 sticky top-10">
            <h3 className="text-xl font-black text-slate-900 border-b border-slate-50 pb-6">বইয়ের কভার ফটো</h3>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative group cursor-pointer aspect-[3/4.2] rounded-[3rem] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden ${
                coverUrl ? 'border-emerald-100 bg-emerald-50/5' : 'border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'
              }`}
            >
              {isUploading && (
                <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-6 p-10">
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-center">
                    <p className="text-sm font-black text-blue-600 uppercase tracking-widest">IMGBB তে আপলোড হচ্ছে</p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">কিছুক্ষণ অপেক্ষা করুন...</p>
                  </div>
                </div>
              )}

              {coverUrl ? (
                <>
                  <img src={coverUrl} alt="Cover Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCoverUrl(''); }}
                      className="w-16 h-16 bg-white text-red-500 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-12 space-y-6">
                  <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-sm border border-white">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-900 tracking-tight">গ্যালারি থেকে ছবি সিলেক্ট করুন</p>
                    <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-widest">PNG, JPG অথবা JPEG</p>
                  </div>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-5 p-6 bg-slate-50/80 rounded-[2rem] border border-slate-100/50 group cursor-pointer transition-all hover:bg-blue-50">
                <div 
                  onClick={() => setFormData({...formData, isHidden: !formData.isHidden})}
                  className={`w-14 h-8 rounded-full relative transition-all duration-300 p-1 flex items-center ${formData.isHidden ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all transform ${formData.isHidden ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
                <div className="flex-1 select-none">
                  <h4 className="text-sm font-black text-slate-900">ড্রাফট হিসেবে রাখুন</h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-widest">এখনই পাবলিশ হবে না</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black shadow-xl hover:bg-black transition-all flex items-center justify-center gap-4">
                  <Save className="w-6 h-6" />
                  তথ্য সেভ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditorBtn = ({ icon, onClick, title }: any) => (
  <button 
    onClick={onClick}
    className="w-12 h-12 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-2xl transition-all border border-transparent hover:border-blue-50 hover:shadow-sm"
    title={title}
  >
    {icon}
  </button>
);

export default AddBook;
