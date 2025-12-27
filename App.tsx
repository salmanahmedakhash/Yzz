
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  BarChart3, 
  Settings, 
  LogOut,
  Search,
  Bell,
  User,
  Menu,
  X
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Categories from './pages/Categories';
import Analytics from './pages/Analytics';
import SettingsPage from './pages/Settings';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transition-all duration-300 lg:translate-x-0 lg:static lg:block ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-24 px-10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">বইঘর <span className="text-blue-600 font-medium">Admin</span></span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="px-6 py-4 space-y-3">
            <SidebarLink to="/" icon={<LayoutDashboard className="w-5 h-5" />} label="ড্যাশবোর্ড" />
            <SidebarLink to="/books" icon={<BookOpen className="w-5 h-5" />} label="বই ব্যবস্থাপনা" />
            <SidebarLink to="/categories" icon={<Layers className="w-5 h-5" />} label="ক্যাটাগরি" />
            <SidebarLink to="/analytics" icon={<BarChart3 className="w-5 h-5" />} label="অ্যানালিটিক্স" />
            <SidebarLink to="/settings" icon={<Settings className="w-5 h-5" />} label="সেটিংস" />
          </nav>

          <div className="absolute bottom-10 w-full px-6">
            <button className="flex items-center gap-4 w-full px-6 py-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 font-medium group">
              <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span>লগআউট</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Header */}
          <header className="h-24 bg-white/50 backdrop-blur-xl px-10 flex items-center justify-between z-40">
            <div className="flex items-center gap-8">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 text-slate-500 hover:bg-white rounded-2xl shadow-sm">
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative hidden md:block group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="বই অথবা লেখক খুঁজুন..." 
                  className="pl-12 pr-6 py-3.5 bg-white border border-transparent rounded-2xl text-sm w-80 focus:ring-4 focus:ring-blue-50 focus:border-blue-100 transition-all outline-none shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="relative p-3 text-slate-400 hover:text-slate-900 hover:bg-white rounded-2xl transition-all shadow-sm">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">অ্যাডমিন</p>
                  <p className="text-xs text-slate-400 font-medium">সুপার ইউজার</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-inner overflow-hidden border border-white">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Admin" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto px-10 pb-12 pt-4">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/add" element={<AddBook />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/books' && location.pathname === '/books/add');

  return (
    <Link 
      to={to} 
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold ${
        isActive 
          ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' 
          : 'text-slate-400 hover:text-slate-900 hover:bg-white'
      }`}
    >
      <span className={isActive ? 'text-white' : 'text-slate-400'}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default App;
