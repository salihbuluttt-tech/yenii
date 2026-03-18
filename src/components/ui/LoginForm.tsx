"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, Shield, Loader2, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Eğer kullanıcı adı "admin" ise otomatik olarak email formatına çeviriyoruz
      const loginEmail = email.toLowerCase() === 'admin' ? 'admin@trustbridge.com' : email;
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
      
      // Eğer giriş yapan kişi admin ise doğrudan admin paneline gönderiyoruz
      if (userCredential.user.email === 'admin@trustbridge.com') {
        router.push('/admin');
      }
    } catch (err: any) {
      setError("Geçersiz e-posta veya şifre.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Google ile giren de admin ise admin paneline gönderiyoruz
      if (userCredential.user.email === 'admin@trustbridge.com') {
        router.push('/admin');
      }
    } catch (err: any) {
      setError("Google ile giriş yapılamadı.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 glass-card border-white/10 rounded-3xl shadow-2xl relative overflow-hidden group">
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all duration-500 rounded-full" />
      
      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">Erişim Sağlayın</h2>
          <p className="text-white/50 text-sm">Platforma güvenli giriş yapın.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-widest pl-1">GİRİŞ KİMLİĞİ</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="E-posta veya Kullanıcı Adı"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 placeholder-white/10 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-widest pl-1">PAROLA</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 placeholder-white/10 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed border border-white/5 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                GİRİŞ YAP
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0a0a0c] px-2 text-white/30 tracking-widest">VEYA</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading}
          className="w-full py-4 bg-white text-gray-900 font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          GOOGLE İLE GİRİŞ
        </button>

        <p className="text-center text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] pt-2">
          GÜVENLİ ERİŞİM PROTOKOLÜ AKTİF
        </p>
      </div>
    </div>
  );
};

