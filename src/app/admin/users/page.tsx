"use client";

import React from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  Shield, 
  MoreVertical, 
  Mail,
  Calendar,
  UserPlus
} from 'lucide-react';

export default function UserManagement() {
  const users = [
    { id: '1', name: 'Salih Bulut', email: 'salih@kod.com', role: 'Süper Admin', joined: '12 Mart 2026', status: 'Aktif' },
    { id: '2', name: 'Test Kullanıcı', email: 'test@user.xyz', role: 'Editör', joined: '15 Mart 2026', status: 'Beklemede' },
    { id: '3', name: 'Emlak Ofisi X', email: 'x@emlak.com', role: 'Kurumsal', joined: '17 Mart 2026', status: 'Aktif' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Kullanıcı Yönetimi</h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-1">Erişim Yetkileri ve Kullanıcı Listesi</p>
        </div>
        <button className="btn-primary py-3 px-6 text-sm font-black uppercase tracking-widest flex items-center gap-3 active:scale-95 transition-all">
          <UserPlus className="w-4 h-4" /> Yeni Kullanıcı Ekle
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="KULLANICI VEYA E-POSTA ARA..."
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs font-bold tracking-widest placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all uppercase"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Kullanıcı</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Yetki</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Katılım Tarihi</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Durum</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary text-xs border border-primary/20">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{user.name}</div>
                        <div className="text-xs text-white/40 flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                       <Shield className={`w-3 h-3 ${user.role === 'Süper Admin' ? 'text-primary' : 'text-white/20'}`} /> {user.role}
                    </span>
                  </td>
                  <td className="p-6 text-xs font-bold text-white/40 flex items-center gap-2 mt-4">
                    <Calendar className="w-3 h-3" /> {user.joined}
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      user.status === 'Aktif' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-white/20 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
