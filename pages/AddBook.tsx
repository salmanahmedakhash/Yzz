
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Upload, Wand2, Check, X, Image as ImageIcon, 
  Bold, Italic, Type, AlignLeft, AlignCenter, AlignRight, Save, Trash2
} from 'lucide-react';
import { generateBookDescription } from '../services/geminiService';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // ImgBB Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const api_key = '018653e0026e959600e5f2a1738740c0'; // Shared Demo Key or User provided
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
        alert('ছবি আপলোড করতে সমস্যা হয়েছে।');
      }
    } catch (error) {
      console.error(error);
      alert('ইন্টারনেট সংযোগ চেক করুন।');
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
    // Simple text wrapping implementation for demonstration
    // In a production app, use a real library like Tiptap or React-Quill
    const textarea = document.getElementById('book-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    let replacement = '';
    if (tag === 'bold') replacement = `<b>${selected}</b>`;
    else if (tag === 'italic') replacement = `<i>${selected}</i>`;
    else if (tag === 'large') replacement = `<large>${selected}</large>`;
    else if (tag === 'small') replacement = `<small>${selected}</small>`;

    setFormData(prev => ({ ...prev, content: before + replacement + after }));
  };

  const categories = ["বাংলা সাহিত্য", "ইংরেজি ক্লাসিক্স", "কল্পকাহিনী", "ইতিহাস", "প্রোগ্রামিং"];

  return (
    <div className="animate-in fade-in slide-in-from-right-10 duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => navigate('/books')}
          className="p-4 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-3xl transition-all shadow-sm border border-slate-50"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">নতুন বই পাবলিশ করুন</h1>
          <p className="text-slate-400 font-medium">লাইব্রেরিতে নতুন একটি অমর সৃষ্টি যুক্ত করার মাহেন্দ্রক্ষণ।</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Main Form Area */}
        <div className="xl:col-span-2 space-y-12">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-50 space-y-10">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4">
              <span className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-sm font-black">০১</span>
              সাধারণ তথ্য
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">বইয়ের শিরোনাম</label>
                <input 
                  type="text" 
                  placeholder="উদা: হিমুর হাতে নীলপদ্ম" 
                  className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-700 transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">লেখকের নাম</label>
                <input 
                  type="text" 
                  placeholder="উদা: হুমায়ূন আহমেদ" 
                  className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-700 transition-all"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">ক্যাটাগরি</label>
                <select 
                  className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-700 cursor-pointer appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">নির্বাচন করুন</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">রেটিং (১-৫)</label>
                <input 
                  type="text" 
                  placeholder="৫.০" 
                  className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-700 transition-all"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest">বইয়ের বর্ণনা (সংক্ষিপ্ত)</label>
                <button 
                  onClick={handleAiWrite}
                  disabled={isGenerating}
                  className="flex items-center gap-2 text-[10px] font-black text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all disabled:opacity-50"
                >
                  <Wand2 className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'তৈরি হচ্ছে...' : 'Gemini AI দিয়ে লিখুন'}
                </button>
              </div>
              <textarea 
                rows={3} 
                placeholder="বইটি সম্পর্কে পাঠকদের একটি আকর্ষণীয় বর্ণনা দিন..." 
                className="w-full px-8 py-6 bg-slate-50 border-none rounded-[2rem] focus:ring-4 focus:ring-blue-50 outline-none resize-none font-medium text-slate-700 leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          {/* Section 2: Book Content with Editor Controls */}
          <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-50 space-y-10">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4">
              <span className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-sm font-black">০২</span>
              বইয়ের মূল কথা (সম্পূর্ণ বই)
            </h3>
            
            <div className="space-y-6">
              {/* Simple Editor Toolbar */}
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <EditorBtn icon={<Bold className="w-4 h-4" />} onClick={() => handleTextAction('bold')} label="Bold" />
                <EditorBtn icon={<Italic className="w-4 h-4" />} onClick={() => handleTextAction('italic')} label="Italic" />
                <div className="w-px h-6 bg-slate-200 mx-2 self-center"></div>
                <EditorBtn icon={<Type className="w-4 h-4" />} onClick={() => handleTextAction('large')} label="Big Text" />
                <EditorBtn icon={<Type className="w-3 h-3" />} onClick={() => handleTextAction('small')} label="Small Text" />
                <div className="w-px h-6 bg-slate-200 mx-2 self-center"></div>
                <EditorBtn icon={<AlignLeft className="w-4 h-4" />} onClick={() => {}} label="Left" />
                <EditorBtn icon={<AlignCenter className="w-4 h-4" />} onClick={() => {}} label="Center" />
                <EditorBtn icon={<AlignRight className="w-4 h-4" />} onClick={() => {}} label="Right" />
              </div>

              <textarea 
                id="book-content"
                rows={15} 
                placeholder="এখানে আপনার সম্পূর্ণ বইটি লিখুন..." 
                className="w-full px-10 py-10 bg-slate-50 border-none rounded-[3rem] focus:ring-4 focus:ring-indigo-50 outline-none resize-none font-medium text-slate-700 leading-[1.8] text-lg"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar: Upload & Preview */}
        <div className="space-y-12">
          {/* Image Upload Card */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 space-y-8 sticky top-10">
            <h3 className="text-xl font-black text-slate-900">বইয়ের কভার ফটো</h3>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative group cursor-pointer aspect-[3/4] rounded-[2.5rem] border-4 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden ${
                coverUrl ? 'border-emerald-50' : 'border-slate-100 hover:border-blue-200 hover:bg-blue-50/20'
              }`}
            >
              {isUploading && (
                <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest">আপলোড হচ্ছে...</p>
                </div>
              )}

              {coverUrl ? (
                <>
                  <img src={coverUrl} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCoverUrl(''); }}
                      className="p-4 bg-white text-red-500 rounded-3xl shadow-xl hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 space-y-4">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">গ্যালারি থেকে ছবি সিলেক্ট করুন</p>
                    <p className="text-xs text-slate-400 font-medium mt-1">PNG, JPG অথবা JPEG ফাইল</p>
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

            <div className="flex items-center gap-4 p-5 bg-slate-50/50 rounded-2xl">
              <input 
                type="checkbox" 
                id="hideBook" 
                className="w-5 h-5 rounded-lg text-blue-600 focus:ring-blue-100 transition-all cursor-pointer"
                checked={formData.isHidden}
                onChange={(e) => setFormData({...formData, isHidden: e.target.checked})}
              />
              <label htmlFor="hideBook" className="text-xs font-bold text-slate-600 cursor-pointer select-none">
                আপাতত ড্রাফট হিসেবে সেভ করে রাখুন
              </label>
            </div>

            <div className="flex flex-col gap-4">
              <button className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                <Save className="w-6 h-6" />
                পাবলিশ করুন
              </button>
              <button 
                onClick={() => navigate('/books')}
                className="w-full py-5 text-slate-400 font-bold hover:text-slate-900 transition-all"
              >
                পরে করবো
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditorBtn = ({ icon, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className="p-3 bg-white hover:bg-white text-slate-400 hover:text-blue-600 rounded-xl transition-all shadow-sm hover:shadow-md border border-slate-50 flex items-center gap-2 group"
    title={label}
  >
    {icon}
    <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">{label}</span>
  </button>
);

export default AddBook;
