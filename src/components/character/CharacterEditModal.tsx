'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CharacterEditModal({ character, onClose, onRefresh }: { character: any; onClose: () => void; onRefresh: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: character.name || '',
    class_name: character.class_name || '',
    appearance_url: character.appearance_url || '',
    vitality_max: character.vitality_max || 10,
    vitality_current: character.vitality_current || 10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('characters')
        .update(formData)
        .eq('id', character.id);
      
      if (error) throw error;
      onRefresh();
      onClose();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? parseInt(value) || 0 : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-8 bg-black/95 backdrop-blur-xl">
      <div className="w-[850px] bg-[#1a1a1e] border border-[#333] rounded-3xl overflow-hidden shadow-2xl flex relative animate-in zoom-in duration-300">
         
         {/* Lado Esquerdo - Preview */}
         <div className="w-1/2 bg-black relative flex items-center justify-center overflow-hidden border-r border-[#333]">
            {formData.appearance_url ? (
                <img src={formData.appearance_url} alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            ) : (
                <div className="opacity-20 flex flex-col items-center">
                    <svg className="w-24 h-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span className="text-[10px] uppercase font-bold tracking-widest">No Portrait Linked</span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1e] via-transparent to-transparent" />
            <div className="relative z-10 p-10 text-center">
                <h3 className="text-3xl font-serif italic text-white mb-2">{formData.name || 'New Hero'}</h3>
                <p className="text-[10px] uppercase font-bold text-[#cda66e] tracking-widest">{formData.class_name || 'Classless'}</p>
            </div>
         </div>

         {/* Lado Direito - Form */}
         <div className="flex-1 p-10 space-y-6">
            <header className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-serif text-[#cda66e] italic">Edit Legend</h2>
                <button onClick={onClose} className="text-[#555] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="text-[9px] font-bold text-[#888] uppercase tracking-widest block mb-2">Display Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#111] border border-[#2a2a2e] rounded-xl px-4 py-3 text-sm text-white focus:border-[#cda66e] outline-none transition-colors" required />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-[#888] uppercase tracking-widest block mb-2">Class / Role</label>
                    <input name="class_name" value={formData.class_name} onChange={handleChange} className="w-full bg-[#111] border border-[#2a2a2e] rounded-xl px-4 py-3 text-sm text-white focus:border-[#cda66e] outline-none transition-colors" />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-[#888] uppercase tracking-widest block mb-2">Portrait Image URL</label>
                    <input name="appearance_url" value={formData.appearance_url} onChange={handleChange} className="w-full bg-[#111] border border-[#2a2a2e] rounded-xl px-4 py-3 text-xs text-[#cda66e] focus:border-[#cda66e] outline-none transition-colors" placeholder="https://..." />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-bold text-[#888] uppercase tracking-widest block mb-2">Vitality (HP)</label>
                      <input type="number" name="vitality_current" value={formData.vitality_current} onChange={handleChange} className="w-full bg-[#111] border border-[#2a2a2e] rounded-xl px-4 py-3 text-sm text-white" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-[#888] uppercase tracking-widest block mb-1 opacity-0">Max</label>
                      <div className="flex items-center gap-2">
                          <span className="text-[#444]">/</span>
                          <input type="number" name="vitality_max" value={formData.vitality_max} onChange={handleChange} className="w-full bg-[#111] border border-[#2a2a2e] rounded-xl px-4 py-3 text-sm text-white" />
                      </div>
                    </div>
                  </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={loading} className="flex-1 py-4 bg-[#cda66e] hover:bg-[#e4c2a5] text-black text-[10px] font-bold rounded-xl uppercase tracking-widest transition-all shadow-lg">
                  {loading ? 'SAVING...' : 'UPDATE LEGEND'}
                </button>
              </div>
            </form>
         </div>

      </div>
    </div>
  );
}
