'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Dashboard() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      let charsQuery = supabase.from('characters').select('*').order('created_at', { ascending: false }).limit(4);
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
    <div className="flex bg-[#0a0a0d] min-h-screen text-[#c2c2c2] font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col">
          
        <header className="px-12 py-6 flex justify-between items-center bg-[#111113] border-b border-[#1a1a1e]">
            <h1 className="text-xl font-serif italic text-[#cda66e]">Suporte do Roleplay Online</h1>
            <div className="flex items-center gap-6 text-[#666]">
               <div className="w-8 h-8 rounded-full border border-[#333] bg-[#000]" />
            </div>
        </header>

        <div className="p-12 pb-32 flex-1">
            
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-4xl font-serif text-[#e0e0e0] mb-2 font-medium">Archive Overview</h2>
                    <p className="text-[10px] uppercase font-bold text-[#888] tracking-widest leading-relaxed">
                        Manage your ongoing narratives and the journey of your heroes.
                    </p>
                </div>
                <Link href="/campaigns/new" className="px-6 py-3 bg-[#222226] hover:bg-[#333] text-[#cda66e] hover:text-white rounded text-[10px] font-bold uppercase tracking-widest border border-[#303035] transition-colors">
                    + ADD NEW CAMPAIGN
                </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                
                <div className="xl:col-span-2 space-y-10">
                    
                    {activeCampaign ? (
                      <div className="bg-[#1f1f23] rounded-2xl overflow-hidden border border-[#2a2a2e] relative h-80 group cursor-pointer shadow-lg">
                          <img src={activeCampaign.cover_url || "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200"} 
                               alt="cover" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent" />
                          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                              <div>
                                  <span className="inline-block px-3 py-1 bg-[#cda66e] text-black text-[9px] font-bold uppercase tracking-widest rounded mb-3">ACTIVE CAMPAIGN</span>
                                  <h3 className="text-4xl font-serif text-white tracking-wide mb-2">{activeCampaign.name}</h3>
                                  <p className="text-xs text-[#a0a0a0] font-serif italic">{activeCampaign.description || 'The adventure continues...'}</p>
                              </div>
                          </div>
                      </div>
                    ) : (
                      <div className="bg-[#1a1a1e] rounded-2xl border border-[#222226] border-dashed flex items-center justify-center h-80">
                         <span className="text-[#666] font-serif italic text-lg">No active campaigns.</span>
                      </div>
                    )}

                    <div>
                        <div className="flex justify-between items-end mb-4 border-b border-[#222225] pb-2">
                             <h3 className="font-serif italic text-xl text-[#d4d4d4]">The Party</h3>
                             <Link href="/characters" className="text-[9px] uppercase font-bold text-[#888] hover:text-white tracking-wider">MANAGE ALL</Link>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             {characters.length > 0 ? characters.map(char => (
                                 <div key={char.id} className="bg-[#1c1c20] rounded-xl border border-[#252528] p-3 flex gap-3 cursor-pointer hover:bg-[#202025]">
                                      <div className="w-12 h-16 rounded overflow-hidden bg-black shrink-0 relative">
                                          {char.appearance_url ? (
                                            <img src={char.appearance_url} className="w-full h-full object-cover opacity-80" />
                                          ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#333]">
                                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                            </div>
                                          )}
                                      </div>
                                      <div className="flex flex-col justify-center w-full">
                                          <h4 className="font-serif text-sm text-white mb-0.5">{char.name}</h4>
                                          <div className="flex items-center justify-between mt-auto">
                                             <div className="flex-1 mr-3 h-1 bg-[#111] rounded-full overflow-hidden">
                                                 <div className="h-full bg-[#cda66e]" style={{width: `${(char.vitality_current / (char.vitality_max || 10)) * 100}%`}}/>
                                             </div>
                                             <span className="text-[8px] text-[#888] font-bold">{char.vitality_current || 0}/{char.vitality_max || 10} HP</span>
                                          </div>
                                      </div>
                                 </div>
                             )) : <span className="text-sm text-[#666]">Your roster is empty.</span>}
                         </div>
                    </div>

                </div>

                <div className="space-y-10">
                    
                    <div className="bg-[#1c1c20] rounded-2xl border border-[#252528] p-8 text-center relative overflow-hidden">
                        <svg className="absolute -top-10 -right-10 w-48 h-48 text-[#222226] opacity-30" fill="currentColor" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="16" r="1.5"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="8" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>
                        
                        <div className="flex justify-between items-center mb-10 relative z-10 w-full text-left">
                            <h3 className="font-serif italic text-xl text-[#d4d4d4]">Fate's Hand</h3>
                        </div>

                        <div className="relative z-10 mb-10">
                            <div className="w-24 h-24 mx-auto rounded-2xl bg-[#151518] border border-[#2a2a2e] flex items-center justify-center shadow-inner cursor-pointer hover:border-[#cda66e]/50 transition-colors">
                                <svg className="w-10 h-10 text-[#cda66e]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zm0 2.8L19.2 12 12 19.2 4.8 12 12 4.8z"/></svg>
                            </div>
                            <span className="block mt-4 text-[9px] text-[#666] font-bold uppercase tracking-widest">CLICK TO ROLL THE DIE</span>
                        </div>

                        <div className="flex gap-2 justify-center relative z-10">
                            {['D4','D6','D8','D12'].map(d => (
                                <button key={d} className="w-12 h-10 bg-[#16161a] border border-[#2a2a2e] rounded hover:border-white text-[10px] font-bold text-white transition-colors">{d}</button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-end mb-4 border-b border-[#222225] pb-2">
                             <h3 className="font-serif italic text-xl text-[#d4d4d4]">Grimoire Entries</h3>
                        </div>
                        <div className="bg-[#1c1c20] rounded-2xl border border-[#252528] p-6 text-sm">
                            <div className="relative pl-6 py-2 border-l border-[#2a2a2e] space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[25px] top-1 w-[2px] h-full bg-[#cda66e]" />
                                    <span className="text-[9px] text-[#888] font-bold tracking-widest uppercase block mb-1">SYSTEM INSIGHT</span>
                                    <h5 className="font-serif text-[#e4e4e4] text-base mb-1">Archive Secure</h5>
                                    <p className="text-[#a0a0a0] leading-relaxed text-xs">Your chronicle is being synchronized with the digital vault.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
      </main>
    </div>
  );
}
