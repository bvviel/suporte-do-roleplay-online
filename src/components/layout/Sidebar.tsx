'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'INÍCIO', href: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'PERSONAGENS', href: '/characters', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'CAMPANHAS', href: '/campaigns', icon: 'M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' },
    { name: 'DADOS', href: '/dice', icon: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="w-64 min-h-screen bg-[#111113] border-r border-[#1a1a1e] flex flex-col pt-12 pb-8 fixed left-0 top-0 text-[#8a8a93] font-sans">
      
      <div className="px-10 mb-12">
        <h2 className="text-xl font-serif text-[#cda66e] mb-2 tracking-wide">
          O Arquivo
        </h2>
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#555]">
           GRIMÓRIO V1.0
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-10 py-3.5 text-xs font-bold tracking-widest transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#cda66e]/5 to-transparent text-[#cda66e] border-l-2 border-[#cda66e]'
                  : 'hover:text-[#ccc] border-l-2 border-transparent'
              }`}
            >
              <svg className="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1">
        <div className="flex items-center gap-4 px-10 py-3 text-xs font-bold tracking-widest text-[#555] cursor-not-allowed">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            HISTÓRIA
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-10 py-3 text-xs font-bold tracking-widest text-[#8a8a93] hover:text-[#ccc] border-l-2 border-transparent transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          SAIR
        </button>
      </div>

    </div>
  );
}
