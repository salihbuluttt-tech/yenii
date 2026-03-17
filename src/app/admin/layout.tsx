import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Key, 
  Users, 
  Settings, 
  LogOut,
  ShieldAlert
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0d0d12] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-sm">
              TB
            </div>
            <span className="font-bold tracking-tight">TrustBridge <span className="text-white/40 text-[10px] uppercase">Admin</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium text-white group"
          >
            <LayoutDashboard className="w-4 h-4 text-primary" />
            Dashboard
          </Link>
          <Link 
            href="/admin/codes" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium text-white/60 hover:text-white group"
          >
            <Key className="w-4 h-4 text-primary/60 group-hover:text-primary" />
            Kod Yönetimi
          </Link>
          <Link 
            href="/admin/users" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium text-white/60 hover:text-white group"
          >
            <Users className="w-4 h-4 text-primary/60 group-hover:text-primary" />
            Kullanıcılar
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link 
            href="/admin/settings" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium text-white/60 hover:text-white group"
          >
            <Settings className="w-4 h-4 text-primary/60 group-hover:text-primary" />
            Ayarlar
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 transition-colors text-sm font-medium text-rose-500 group">
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#0d0d12]/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Güvenli Yönetim Paneli</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs font-bold">Admin</div>
              <div className="text-[10px] text-white/40 uppercase font-black">Süper Yetkili</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary">
              A
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
