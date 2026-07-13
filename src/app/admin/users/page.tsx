"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FiUser, FiShield } from "react-icons/fi";

export default function AdminUsersPage() {
  const supabase = createClient();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    // Fetch from profiles
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('role', { ascending: true }); // admin first

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-on-surface">Manajemen User</h2>
        <p className="text-on-surface-variant">Daftar semua akun yang terdaftar di sistem BEM STMIK Tazkia.</p>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-variant/20 text-on-surface-variant text-sm border-b border-outline-variant/20">
                <th className="py-4 px-6 font-medium">Pengguna</th>
                <th className="py-4 px-6 font-medium">ID Pengguna</th>
                <th className="py-4 px-6 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-on-surface-variant/70">Loading...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-on-surface-variant/70">Belum ada pengguna.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-surface-variant/20/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <FiUser size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-on-surface">{user.full_name || 'Tanpa Nama'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <code className="text-xs text-on-surface-variant bg-surface-variant/30 px-2 py-1 rounded">{user.id}</code>
                    </td>
                    <td className="py-4 px-6">
                      {user.role === 'admin' ? (
                        <span className="flex items-center gap-1.5 w-fit bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                          <FiShield /> Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 w-fit bg-surface-variant/30 text-on-surface-variant px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider">
                          <FiUser /> User
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
