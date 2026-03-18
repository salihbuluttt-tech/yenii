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
  AlertCircle
} from 'lucide-react';
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');

  // Kullanıcıları Çekme
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "users_list")); // Auth kullanıcılarını direkt çekemeyiz, Firestore'daki listeyi çekiyoruz
      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    } catch (err) {
      console.error("Kullanıcı çekme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Yeni Kullanıcı Ekleme
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
      alert("Kullanıcı başarıyla listeye eklendi.");
      fetchUsers();
    } catch (err) {
      alert("Hata oluştu. Yetkinizi kontrol edin.");
    } finally {
      setAddingUser(false);
    }
  };

  // Kullanıcı Silme
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) return;

    try {
      await deleteDoc(doc(db, "users_list", id));
      alert("Kullanıcı silindi.");
      fetchUsers();
    } catch (err) {
      alert("Silme işlemi başarısız.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">Kullanıcı Yönetimi</h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-1">Platform Kayıtlı Kullanıcıları ve Yetkileri</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
        >
          <RefreshCcw className={`w-4 h-4 text-white ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Add User Section */}
      <div className="glass-card p-6 border-primary/20 bg-primary/5">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Manuel Kullanıcı Ekle
        </h3>
        <form onSubmit={handleAddUser} className="flex gap-4">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="email" 
              placeholder="Kullanıcı E-posta Adresi"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
              className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:border-primary/50 transition-all outline-none"
            />
          </div>
          <button 
            type="submit"
            disabled={addingUser}
            className="px-8 py-3 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {addingUser ? <Loader2 className="w-4 h-4 animate-spin" /> : "EKLE"}
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
           <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Listede ara..."
                className="w-full bg-[#0a0a0c] border border-white/5 rounded-lg pl-10 pr-4 py-2 text-[10px] text-white outline-none focus:border-primary/30"
              />
           </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-[#0d0d12] border-b border-white/5">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Kullanıcı</th>
              <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Rol</th>
              <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Durum</th>
              <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-white/20 uppercase font-black text-xs italic">
                  Henüz kullanıcı eklenmemiş.
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-[10px] text-primary">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-white">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md bg-white/5 text-[9px] font-black text-white/50 uppercase tracking-tighter border border-white/5 italic">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span className="text-[10px] font-black text-emerald-400 uppercase">{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-white/20 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
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
  );
}
