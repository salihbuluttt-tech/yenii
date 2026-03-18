"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, LayoutDashboard, History, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070709]/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
             <span className="text-lg font-black tracking-tighter text-white uppercase italic">TrustBridge</span>
             <div className="text-[8px] font-black text-primary uppercase tracking-[0.3em] -mt-1">PREMIUM_CORE</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="/roadmap" className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-[0.3em] transition-colors italic flex items-center gap-2">
            <History className="w-3 h-3" /> REHBER
          </Link>
          <Link href="/#services" className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-[0.3em] transition-colors italic flex items-center gap-2">
            <LayoutDashboard className="w-3 h-3" /> HİZMETLER
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
               {/* Minimalist Profile Area */}
               <div className="flex flex-col items-end pr-4 border-r border-white/10">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{user.email}</span>
                  <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">AKTİF OTURUM</span>
               </div>
               
               <button 
                onClick={async () => {
                  await logout();
                  router.push('/');
                }}
                className="p-3 bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 border border-white/5 rounded-xl transition-all group"
                title="Sistemden Çıkış Yap"
               >
                  <LogOut className="w-4 h-4" />
               </button>
            </div>
          ) : (
            <Link href="/" className="px-6 py-2.5 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-primary transition-all">
              GİRİŞ YAP
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
