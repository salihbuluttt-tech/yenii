"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Key, 
  Users, 
  Settings, 
  LogOut,
  ShieldAlert,
  Loader2,
  Lock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Admin kontrolü (kullanıcı adı admin ise e-posta admin@trustbridge.com olur)
  const isAdmin = user?.email === 'admin@trustbridge.com';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
          <Lock className="w-10 h-10 text-rose-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white">YETKİSİZ ERİŞİM</h1>
          <p className="text-white/40 max-w-sm mx-auto uppercase text-xs font-bold tracking-[0.2em] leading-relaxed">
            Bu alan sadece sistem yetkilileri içindir. Lütfen uygun bir hesapla giriş yapın veya ana sayfaya dönün.
          </p>
        </div>
        <Link 
          href="/" 
          className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white"
        >
          ANA SAYFAYA DÖN
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0d0d12] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-sm">
              TB
            </div>
            <span className="font-bold tracking-tight">TrustBridge <span className="text-white/40 text-[10px] uppercase font-black">Admin</span></span>
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
          <button 
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 transition-colors text-sm font-medium text-rose-500 group"
          >
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
              <div className="text-xs font-bold text-white">Yönetici</div>
              <div className="text-[10px] text-white/40 uppercase font-black">{user?.email}</div>
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

