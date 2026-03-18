"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Search, 
  Mail, 
  Shield, 
  RefreshCcw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const q = query(collection(db, "users_list"), limit(50));
      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    } catch (err) {
      console.error("Kullanıcı listeleme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail) return;

    setAddingUser(true);
    try {
      await addDoc(collection(db, "users_list"), {
        email: newUserEmail,
        role: "Kullanıcı",
        status: "Aktif",
        createdAt: serverTimestamp()
      });
      setNewUserEmail('');
      fetchUsers();
    } catch (err) {
      console.error("Kullanıcı ekleme hatası:", err);
      alert("Hata oluştu!");
    } finally {
      setAddingUser(false);
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    if (!confirm(`${email} kullanıcısını sistemden silmek istediğinizden emin misiniz?`)) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, "users_list", id));
      fetchUsers();
    } catch (err) {
      console.error("Kullanıcı silme hatası:", err);
      alert("Silme işlemi başarısız.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">KULLANICI HAVUZU</h1>
          <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] pl-1 italic">Yetki Grupları ve Kayıtlı Profil Analizi</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group self-end"
        >
          <RefreshCcw className={`w-4 h-4 text-white/40 group-hover:text-primary transition-all ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Add User Section */}
      <div className="glass-card p-10 border-primary/20 bg-primary/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-all">
           <UserPlus className="w-16 h-16 text-primary" />
        </div>
        
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 flex items-center gap-3">
          <Shield className="w-4 h-4" /> Manuel Erişim Tanımla
        </h3>
        <form onSubmit={handleAddUser} className="flex flex-col md:flex-row gap-6 relative z-10">
          <div className="flex-1 relative">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="email" 
              placeholder="KULLANICI E-POSTA ADRESİNİ GİRİN..."
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
              className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-[11px] font-black tracking-widest text-white outline-none focus:border-primary/50 transition-all shadow-inner"
            />
          </div>
          <button 
            type="submit"
            disabled={addingUser}
            className="px-12 py-5 bg-primary text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {addingUser ? <Loader2 className="w-4 h-4 animate-spin" /> : <>YETKİ VER <ChevronRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="glass-card overflow-hidden bg-[#0a0a0c] border-white/5 shadow-3xl">
        <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
           <div className="relative w-full max-w-md">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="PROFIL ARA..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-6 py-4 text-[10px] text-white outline-none focus:border-primary/30 font-black tracking-[0.4em]"
              />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0d0d12]/50 border-b border-white/5">
              <tr>
                <th className="px-10 py-5 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Profil Verisi</th>
                <th className="px-10 py-5 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Sorumluluk Alanı</th>
                <th className="px-10 py-5 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Protokol Durumu</th>
                <th className="px-10 py-5 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] text-right">Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="px-10 py-24 text-center text-white/10 uppercase font-black text-[12px] tracking-[0.5em] italic">
                    KRİTERLERE UYGUN PROFIL BULUNAMADI.
                  </td>
                </tr>
              )}
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.01] transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-xs text-primary group-hover:bg-primary/10 transition-all duration-500 shadow-xl shadow-black/50">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <div className="space-y-0.5">
                         <div className="text-[13px] font-black text-white tracking-tight uppercase group-hover:text-primary transition-colors italic">{user.email}</div>
                         <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-4 py-2 rounded-xl bg-white/5 text-[9px] font-black text-white/40 uppercase tracking-widest border border-white/5 italic">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                      <span className="text-[11px] font-black text-emerald-400 uppercase tracking-tighter italic">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button 
                      onClick={() => handleDeleteUser(user.id, user.email)}
                      className="p-4 bg-rose-500/5 text-rose-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white shadow-2xl shadow-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
