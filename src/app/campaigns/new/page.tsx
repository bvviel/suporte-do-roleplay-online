'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewCampaign() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    theme: '',
    description: '',
    cover_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return alert('Você precisa estar logado!');
      const { error } = await supabase.from('campaigns').insert([{ ...formData, user_id: user.id }]);
      if (error) throw error;
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex bg-[#0a0a0d] min-h-screen text-[#c2c2c2] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-12">
        <header className="mb-12">
            <span className="text-[9px] uppercase font-bold text-[#888] tracking-[0.3em] flex items-center gap-2 mb-2">
                CHRONICLE CREATION
            </span>
            <h1 className="text-5xl font-serif italic text-[#cda66e] font-medium">Forge a new Campaign</h1>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row gap-16 max-w-[1240px]">
              
            {/* Lado Esquerdo - Detalhes */}
            <div className="flex-1 space-y-10">
                <div>
                    <label className="text-[10px] text-[#888] uppercase font-bold tracking-widest mb-3 block">Campaign Name</label>
                    <input 
                        required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Shadows over Eldoria"
                        className="w-full px-5 py-4 bg-[#16161a] border border-[#222] rounded-xl text-white placeholder-[#444] focus:outline-none focus:border-[#cda66e] transition-colors"
                    />
                </div>

                <div>
                    <label className="text-[10px] text-[#888] uppercase font-bold tracking-widest mb-3 block">Lore & Premise</label>
                    <textarea 
                        required name="description" value={formData.description} onChange={handleChange} rows={8} placeholder="Describe the world, the threat, and the stakes..."
                        className="w-full px-5 py-4 bg-[#16161a] border border-[#222] rounded-xl text-white placeholder-[#444] focus:outline-none focus:border-[#cda66e] transition-colors resize-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-[#111115] border border-[#222] p-6 rounded-xl">
                        <label className="text-[10px] text-[#888] uppercase font-bold tracking-widest mb-4 block">Game System</label>
                        <input 
                            name="theme" value={formData.theme} onChange={handleChange} placeholder="e.g. D&D 5e / Pathfinder"
                            className="w-full bg-black/40 border border-[#333] rounded px-4 py-2 text-sm focus:outline-none focus:border-[#cda66e]"
                        />
                    </div>
                </div>
            </div>

            {/* Lado Direito - Banner Preview */}
            <div className="w-full xl:w-96 shrink-0 space-y-8">
                <div>
                   <label className="text-[10px] text-[#888] uppercase font-bold tracking-widest mb-4 block">Campaign Banner</label>
                   
                   <div className="bg-[#111] border border-[#222] rounded-2xl h-[450px] relative overflow-hidden flex flex-col items-center justify-center p-8 text-center group shadow-2xl">
                       {formData.cover_url ? (
                           <img src={formData.cover_url} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-700" alt="Cover Preview" />
                       ) : (
                           <div className="relative z-10 opacity-30">
                               <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                               <span className="text-[9px] uppercase font-bold tracking-widest">Awaiting Banner URL</span>
                           </div>
                       )}
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                       
                       <div className="absolute bottom-8 left-8 right-8 z-10 space-y-4">
                           <div className="text-left">
                               <label className="text-[9px] text-white/50 uppercase font-bold tracking-widest mb-1 block">Image URL</label>
                               <input name="cover_url" placeholder="https://..." value={formData.cover_url} onChange={handleChange} 
                                 className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#cda66e]" />
                           </div>
                       </div>
                   </div>
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full py-5 bg-[#cda66e] hover:bg-[#e4c2a5] text-black font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg disabled:opacity-50"
                >
                   {loading ? 'BINDING...' : 'BIND THE TOME'}
                </button>
            </div>

        </form>
      </main>
    </div>
  );
}
