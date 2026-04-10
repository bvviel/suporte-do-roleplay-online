'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function CampaignsPage() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      let charsQuery = supabase.from('characters').select('*').order('created_at', { ascending: false }).limit(3);
      let campsQuery = supabase.from('campaigns').select('*').order('created_at', { ascending: false });

      if (user) {
         charsQuery = charsQuery.eq('user_id', user.id);
         campsQuery = campsQuery.eq('user_id', user.id);
      }

      const [charsRes, campsRes] = await Promise.all([charsQuery, campsQuery]);
      setCharacters(charsRes.data || []);
      setCampaigns(campsRes.data || []);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const activeCampaign = campaigns.length > 0 ? campaigns[0] : null;

  return (
    <div className="flex bg-[#16161a] min-h-screen text-[#c2c2c2] font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col">
          
        {/* Top Header Mockado */}
        <header className="px-12 py-6 flex justify-between items-center bg-[#111113] border-b border-[#1a1a1e]">
            <h1 className="text-xl font-serif italic text-[#e4c2a5]">Suporte do Roleplay Online</h1>
            <div className="flex items-center gap-6 text-[#666]">
               <div className="w-8 h-8 rounded-full border border-[#333] bg-[#000]" />
            </div>
        </header>

        <div className="p-12 pb-32 flex-1">
            
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-4xl font-serif text-[#e0e0e0] mb-2 font-medium">Campaign Archives</h2>
                    <p className="text-[10px] uppercase font-bold text-[#888] tracking-widest leading-relaxed">
                        Manage your ongoing narratives, chronicle the journey of<br/>your heroes, and prepare for the next encounter.
                    </p>
                </div>
                <Link href="/campaigns/new" className="px-6 py-3 bg-[#222226] hover:bg-[#333] text-[#e4c2a5] hover:text-white rounded text-[10px] font-bold uppercase tracking-widest border border-[#303035] transition-colors">
                    + ADD NEW CAMPAIGN
                </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                
                {/* Lado Esquerdo Principal (Coluna dupla) */}
                <div className="xl:col-span-2 space-y-10">
                    
                    {/* Active Campaign Banner Gigante */}
                    {activeCampaign ? (
                      <div className="bg-[#1f1f23] rounded-2xl overflow-hidden border border-[#2a2a2e] relative h-80 group cursor-pointer shadow-lg">
                          <img src={activeCampaign.cover_url || "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200"} 
                               alt="cover" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-[#16161a]/60 to-transparent" />
                          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                              <div>
                                  <span className="inline-block px-3 py-1 bg-[#ff4d6e] text-white text-[9px] font-bold uppercase tracking-widest rounded mb-3">ACTIVE CAMPAIGN</span>
                                  <h3 className="text-4xl font-serif text-white tracking-wide mb-2">{activeCampaign.name}</h3>
                                  <p className="text-xs text-[#a0a0a0] font-serif italic">"{activeCampaign.description || 'The ancient seals are breaking. Something stirs in the abyss.'}"</p>
                              </div>
                              <div className="flex -space-x-3 opacity-90">
                                  <div className="w-10 h-10 rounded-full bg-yellow-600 border-2 border-[#16161a]" />
                                  <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-[#16161a]" />
                                  <div className="w-10 h-10 rounded-full bg-[#333] border-2 border-[#16161a] flex items-center justify-center text-[10px] text-white font-bold">+3</div>
                              </div>
                          </div>
                      </div>
                    ) : (
                      <div className="bg-[#1a1a1e] rounded-2xl border border-[#222226] border-dashed flex items-center justify-center h-80">
                         <span className="text-[#666] font-serif italic text-lg">No active campaigns.</span>
                      </div>
                    )}

                    {/* Archive Vault (Grid de Companhas Finalizadas/Inativas) */}
                    <div className="pt-8">
                        <h3 className="font-serif italic text-2xl text-[#d4d4d4] mb-6">Archive Vault</h3>
                        <div className="grid grid-cols-3 gap-6">
                            {campaigns.slice(1).map(camp => (
                                <div key={camp.id} className="bg-[#1c1c20] border border-[#252528] rounded-2xl overflow-hidden hover:border-[#333] transition-colors cursor-pointer p-4 pb-2">
                                    <div className="h-28 bg-[#111] rounded-lg mb-4 overflow-hidden relative">
                                        {camp.cover_url && <img src={camp.cover_url} className="w-full h-full object-cover opacity-70" />}
                                    </div>
                                    <h4 className="font-serif text-white text-lg mb-1">{camp.name}</h4>
                                    <p className="text-[10px] text-[#888] font-bold uppercase tracking-widest mb-4">STATUS: ON HIATUS</p>
                                    <div className="flex justify-between items-center text-[#555] border-t border-[#222] pt-3 mt-auto">
                                        <span className="text-[9px] font-bold tracking-widest">12 SESSIONS</span>
                                        <span>→</span>
                                    </div>
                                </div>
                            ))}
                            <Link href="/campaigns/new" className="bg-[#18181b] border-2 border-[#252528] border-dashed rounded-2xl flex flex-col justify-center items-center h-full min-h-[200px] text-[#555] hover:border-[#ff4d6e]/50 cursor-pointer transition-colors">
                                <span className="text-2xl mb-2">📁</span>
                                <span className="text-[9px] uppercase font-bold tracking-widest hover:text-[#e4c2a5]">Forging a New Campaign</span>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Coluna Lateral Direita */}
                <div className="space-y-10">
                    
                    {/* Fate's Hand */}
                    <div className="bg-[#1c1c20] rounded-2xl border border-[#252528] p-8 text-center relative overflow-hidden">
                        <svg className="absolute -top-10 -right-10 w-48 h-48 text-[#222226] opacity-30" fill="currentColor" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="16" r="1.5"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="8" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>
                        
                        <div className="flex justify-between items-center mb-10 relative z-10 w-full text-left">
                            <h3 className="font-serif italic text-xl text-[#d4d4d4]">Fate's Hand</h3>
                        </div>

                        <div className="relative z-10 mb-10">
                            <div className="w-24 h-24 mx-auto rounded-2xl bg-[#151518] border border-[#2a2a2e] flex items-center justify-center shadow-inner cursor-pointer hover:border-[#ff4d6e]/50 transition-colors">
                                <svg className="w-10 h-10 text-[#ff8095]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zm0 2.8L19.2 12 12 19.2 4.8 12 12 4.8z"/></svg>
                            </div>
                            <span className="block mt-4 text-[9px] text-[#666] font-bold uppercase tracking-widest">CLICK TO ROLL THE DIE</span>
                        </div>

                        <div className="flex gap-2 justify-center relative z-10">
                            {['D4','D6','D8','D12'].map(d => (
                                <button key={d} className="w-12 h-10 bg-[#16161a] border border-[#2a2a2e] rounded hover:border-white text-[10px] font-bold text-white transition-colors">{d}</button>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
      </main>
    </div>
  );
}
