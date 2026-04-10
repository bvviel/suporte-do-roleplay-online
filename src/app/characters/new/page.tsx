'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewCharacter() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class_name: '',
    vitality_max: 10,
    appearance_url: '',
    equipment: '',
    personal_info: '',
    str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return alert('Você precisa estar logado!');

      const { name, class_name, vitality_max, appearance_url, equipment, personal_info, str, dex, con, int, wis, cha } = formData;

      const { error } = await supabase.from('characters').insert([
        { 
          name, class_name, vitality_max, vitality_current: vitality_max,
          appearance_url, equipment, personal_info,
          user_id: user.id,
          attributes: { STR: str, DEX: dex, CON: con, INT: int, WIS: wis, CHA: cha }
        }
      ]);

      if (error) throw error;
      router.push('/characters');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex bg-[#0a0a0d] min-h-screen text-white font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-12">
        <header className="mb-12">
          <h1 className="text-5xl font-serif italic text-[#cda66e] mb-2 font-medium">Forge a Legend</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#888] font-bold">AWAKEN A NEW SOUL FOR THE ARCHIVES</p>
        </header>

        <form onSubmit={handleSubmit} className="max-w-6xl flex flex-col xl:flex-row gap-12">
            
            {/* Lado Esquerdo - Detalhes */}
            <div className="flex-1 space-y-10">
                
                <section>
                    <h3 className="text-[10px] font-bold text-[#cda66e] uppercase tracking-[0.2em] border-b border-[#222] pb-2 mb-6 text-shadow-sm">IDENTITY & STATUS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                             <label className="text-[10px] text-[#888] uppercase font-bold tracking-widest mb-2 block">Full Name</label>
                             <input required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Alistair the Exile" 
                                className="w-full bg-[#16161a] border border-[#222] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#cda66e] transition-colors shadow-inner" />
                        </div>
                        <div>
                             <label className="text-[10px] text-[#888] uppercase font-bold tracking-widest mb-2 block">Class / Origin</label>
                             <input name="class_name" value={formData.class_name} onChange={handleChange} placeholder="e.g. Paladin of the Sun" 
                                className="w-full bg-[#16161a] border border-[#222] rounded-xl px-4 py-3 text-sm" />
                        </div>
                        <div>
                             <label className="text-[10px] text-[#888] uppercase font-bold tracking-widest mb-2 block">Maximum HP</label>
                             <input type="number" name="vitality_max" value={formData.vitality_max} onChange={handleChange} 
                                className="w-full bg-[#16161a] border border-[#222] rounded-xl px-4 py-3 text-sm" />
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-[10px] font-bold text-teal-400 opacity-60 uppercase tracking-[0.2em] border-b border-[#222] pb-2 mb-6">PRIMARY ATTRIBUTES</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                         {['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => (
                             <div key={stat} className="bg-[#111115] border border-[#222] rounded-xl p-4 flex flex-col items-center">
                                 <label className="text-[9px] font-bold text-[#555] uppercase mb-1">{stat}</label>
                                 <input type="number" name={stat} value={(formData as any)[stat]} onChange={handleChange} 
                                    className="w-10 text-center bg-transparent text-xl font-serif text-white focus:outline-none" />
                             </div>
                         ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <label className="text-[10px] text-[#888] uppercase font-bold tracking-widest mb-2 block">Artifacts & Gear</label>
                        <textarea name="equipment" value={formData.equipment} onChange={handleChange} rows={5} placeholder="What do they carry?" 
                            className="w-full bg-[#16161a] border border-[#222] rounded-xl px-4 py-3 text-sm resize-none" />
                    </div>
                    <div>
                        <label className="text-[10px] text-[#888] uppercase font-bold tracking-widest mb-2 block">Background Lore</label>
                        <textarea name="personal_info" value={formData.personal_info} onChange={handleChange} rows={5} placeholder="The echo of their past..." 
                            className="w-full bg-[#16161a] border border-[#222] rounded-xl px-4 py-3 text-sm resize-none" />
                    </div>
                </div>

            </div>

            {/* Lado Direito - Retrato & Preview */}
            <div className="w-full xl:w-80 shrink-0 space-y-8">
                 <section>
                    <h3 className="text-[10px] font-bold text-[#888] uppercase tracking-[0.2em] border-b border-[#222] pb-2 mb-6">SOUL PORTRAIT</h3>
                    
                    <div className="bg-[#16161a] border border-[#222] rounded-2xl h-[450px] relative overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                        {formData.appearance_url ? (
                            <img src={formData.appearance_url} alt="preview" className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-500" />
                        ) : (
                            <div className="text-[#333] flex flex-col items-center">
                                <svg className="w-20 h-20 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                <p className="text-[9px] uppercase font-bold tracking-widest">Awaiting Portrait Link</p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        
                        <div className="absolute bottom-6 left-6 right-6 z-10">
                             <label className="text-[9px] text-[#888] uppercase font-bold tracking-widest mb-2 block text-left">Portrait URL</label>
                             <input name="appearance_url" value={formData.appearance_url} onChange={handleChange} placeholder="Paste link here..." 
                                className="w-full bg-black/80 border border-[#444] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#cda66e]" />
                        </div>
                    </div>
                 </section>

                 <button type="submit" disabled={loading}
                    className="w-full py-5 bg-[#cda66e] hover:bg-[#e4c2a5] text-black font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-[0_0_20px_rgba(205,166,110,0.2)] disabled:opacity-50"
                 >
                    {loading ? 'AWAKENING...' : 'AWAKEN HERO'}
                 </button>
            </div>

        </form>
      </main>
    </div>
  );
}
