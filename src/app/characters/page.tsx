'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import CharacterModal from '@/components/character/CharacterModal';
import CharacterEditModal from '@/components/character/CharacterEditModal';

export default function CharactersPage() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChar, setSelectedChar] = useState<any>(null);
  const [editingChar, setEditingChar] = useState<any>(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      let query = supabase.from('characters').select('*').order('created_at', { ascending: false });
      if (user) query = query.eq('user_id', user.id);
      
      const { data, error } = await query;
      if (error) throw error;
      setCharacters(data || []);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#0a0a0d] min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col">
          
        <header className="px-12 py-6 flex justify-between items-center bg-[#111113] border-b border-[#1a1a1e]">
            <h1 className="text-xl font-serif italic text-[#cda66e]">Suporte do Roleplay Online</h1>
            <div className="flex items-center gap-6 text-[#666]">
               <div className="w-8 h-8 rounded-full border border-[#333] bg-[#000]" />
            </div>
        </header>

        <div className="p-12 pb-32 flex-1 relative">
            <h2 className="text-5xl font-serif italic text-white mb-2 font-medium">Characters</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#888] font-bold mb-12">MANAGE YOUR LEGENDS AND MISCREANTS</p>

            <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                
                {characters.map(char => (
                    <div key={char.id} className="w-64 shrink-0 bg-[#141416] border border-[#222225] rounded-xl overflow-hidden shadow-xl flex flex-col h-[400px]">
                        
                        <div className="relative h-[250px] w-full bg-[#0a0a0c]">
                            {char.appearance_url ? (
                              <img src={char.appearance_url} alt="portrait" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-[#111] text-[#333]">
                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141416]" />
                            <div className="absolute bottom-4 left-5 right-5 text-shadow-sm">
                                <h3 className="text-xl font-serif text-white font-medium mb-1 drop-shadow-md">{char.name}</h3>
                                <p className="text-[9px] uppercase text-[#cda66e] font-black tracking-widest">{char.class_name || 'CLASSLESS'}</p>
                            </div>
                        </div>

                        <div className="px-5 py-4 pb-5 flex-1 flex flex-col justify-end">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[9px] uppercase font-bold text-[#888] tracking-wider">HEALTH POINTS</span>
                                <span className="text-xs font-bold text-white">{char.vitality_current || 10} / {char.vitality_max || 10} HP</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#0a0a0c] rounded-full overflow-hidden border border-[#222]">
                                <div className="h-full bg-gradient-to-r from-[#cda66e] to-[#e4c2a5]" style={{ width: `${Math.max(1, ((char.vitality_current||10) / (char.vitality_max||10)) * 100)}%` }} />
                            </div>

                            <div className="flex gap-2 mt-5">
                                <button onClick={() => setSelectedChar(char)} className="flex-1 py-3 border border-[#333338] hover:border-[#555] rounded transition-colors text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#1a1a20]">
                                    OPEN SHEET
                                </button>
                                <button onClick={() => setEditingChar(char)} className="w-10 flex items-center justify-center border border-[#333338] hover:border-[#555] rounded text-[#888] hover:text-[#cda66e] transition-colors">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <Link href="/characters/new" className="w-56 shrink-0 bg-[#121214] border-2 border-dashed border-[#26262a] rounded-xl flex flex-col items-center justify-center h-[400px] text-[#555] hover:border-[#cda66e]/50 hover:text-[#e4c2a5] transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <span className="font-serif italic text-lg text-white mb-2">Summon a Legend</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest">CREATE NEW CHARACTER</span>
                </Link>

            </div>

            <div className="mt-12 flex gap-6">
                 <div className="flex-1 bg-[#1a1a1e] rounded-2xl p-8 border border-[#232328] relative overflow-hidden flex items-center justify-between">
                     <svg className="absolute -right-8 -top-8 w-64 h-64 text-[#26262c] opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                     <div className="relative z-10 w-full">
                         <h3 className="font-serif italic text-xl text-white mb-6">Archive Insights</h3>
                         <div className="text-sm text-[#888] leading-relaxed max-w-md">
                            Your roster is growing. Use the grimoire to track the progress of your heroes and villains across the realms.
                         </div>
                     </div>
                 </div>

                 <div className="w-80 shrink-0 bg-gradient-to-br from-[#1a1a1e] to-[#0a0a0d] rounded-2xl p-8 border border-[#2a2a2e] flex flex-col justify-center">
                     <div className="w-8 h-8 rounded-full bg-[#cda66e]/20 flex items-center justify-center text-[#cda66e] mb-4">
                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                     </div>
                     <h3 className="font-serif italic text-xl text-white mb-2">Vault Master</h3>
                     <p className="text-[10px] uppercase font-bold text-[#888] tracking-widest leading-relaxed">
                         TRACKING {characters.length} LEGENDS IN THE ARCHIVE.
                     </p>
                 </div>
                 
            </div>
            
            <div className="absolute bottom-12 right-12">
               <Link href="/characters/new" className="px-8 py-4 rounded-full bg-[#cda66e] text-black shadow-[0_0_20px_rgba(205,166,110,0.4)] text-[10px] uppercase font-bold tracking-widest hover:bg-[#e4c2a5] transition-colors">
                  + CREATE NEW CHARACTER
               </Link>
            </div>
        </div>
      </main>

      {selectedChar && (
          <CharacterModal character={selectedChar} onClose={() => setSelectedChar(null)} />
      )}

      {editingChar && (
          <CharacterEditModal character={editingChar} onClose={() => setEditingChar(null)} onRefresh={fetchCharacters} />
      )}
    </div>
  );
}
