"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, Shield } from 'lucide-react';

export const LoginForm = () => {
  return (
    <div className="w-full max-w-md p-8 glass-card border-white/10 rounded-3xl shadow-2xl relative overflow-hidden group">
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all duration-500 rounded-full" />
      
      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Erişim Sağlayın</h2>
          <p className="text-white/50 text-sm">Platforma güvenli giriş yapın.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-widest pl-1">E-POSTA</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="admin"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-widest pl-1">PAROLA</label>
            <div className="relative">
              <input 
                type="password" 
                defaultValue="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <button className="w-full py-4 bg-[#1e293b] hover:bg-[#334155] border border-white/5 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group/btn active:scale-95 shadow-lg">
            GİRİŞ YAP
            <div className="w-4 h-[2px] bg-white/40 group-hover/btn:w-6 transition-all" />
          </button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#111116] px-2 text-white/30">VEYA</span>
          </div>
        </div>

        <button className="w-full py-4 bg-white text-gray-900 font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          GOOGLE İLE GİRİŞ
        </button>

        <p className="text-center text-xs text-white/30 font-medium tracking-tight">
          HESABINIZ YOK MU? <span className="text-white/60 hover:text-white cursor-pointer underline underline-offset-4 decoration-primary/50">HEMEN KATILIN</span>
        </p>
      </div>

      {/* Admin Panel Link */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity">
        <Link href="/admin" className="text-[10px] uppercase tracking-[0.2em] flex items-center gap-1 font-bold">
          <Shield className="w-3 h-3" /> YÖNETİCİ ERİŞİMİ
        </Link>
      </div>
    </div>
  );
};
