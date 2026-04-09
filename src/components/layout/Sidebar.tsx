'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: '📖 Grimório', href: '/dashboard' },
    { name: '👤 Personagens', href: '/characters' },
    { name: '🎲 Dados', href: '/dice' },
    { name: '⚙️ Configurações', href: '/settings' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="w-64 h-screen bg-[#1e1e1e] border-r border-[#2a2a2a] flex flex-col p-4 fixed left-0 top-0">
      <div className="mb-10 px-4">
        <h2 className="text-2xl font-black text-[#e91e63] italic tracking-tighter">
          OBSIDIAN
        </h2>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#e91e63]/10 text-[#e91e63] font-bold'
                  : 'text-[#b0b0b0] hover:bg-[#2a2a2a] hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-[#555] hover:text-red-400 transition-colors mt-auto"
      >
        🚪 Deslogar
      </button>
    </div>
  );
}
