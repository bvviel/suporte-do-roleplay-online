'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Save, User, Crosshair, Shield, FileText } from 'lucide-react';

export default function NewCharacter() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class_name: '',
    vitality_max: 10,
    appearance_url: '',
    equipment: '',
    skills: '',
    personal_info: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Você precisa estar logado para criar uma ficha!');
        return;
      }

      const { error } = await supabase.from('characters').insert([
        { 
          ...formData, 
          user_id: user.id,
          vitality_current: formData.vitality_max,
          attributes: { FOR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }
        }
      ]);

      if (error) throw error;
      router.push('/dashboard');
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
    <div className="flex bg-[#121212] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 max-w-5xl">
        <header className="mb-10">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">FORJAR ALMA</h1>
          <p className="text-[#b0b0b0]">Dê vida ao seu próximo grande herói.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a]">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Seção Básica */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#e91e63] uppercase tracking-widest mb-2">
                <User size={16} /> Identidade
              </h3>
              <div className="space-y-1">
                <label className="text-xs text-[#555] uppercase font-bold">Nome do Personagem</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Alistair, o Audaz"
                  className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#e91e63] outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-[#555] uppercase font-bold">Classe / Arquétipo</label>
                <input 
                  name="class_name"
                  value={formData.class_name}
                  onChange={handleChange}
                  placeholder="Ex: Paladino de Obsidian"
                  className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#e91e63] outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-[#555] uppercase font-bold">URL da Imagem (Avatar)</label>
                <input 
                  name="appearance_url"
                  value={formData.appearance_url}
                  onChange={handleChange}
                  placeholder="https://sua-imagem.com/foto.jpg"
                  className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#e91e63] outline-none transition-all"
                />
              </div>
            </div>

            {/* Seção Atributos Rápidos */}
            <div className="space-y-4">
               <h3 className="flex items-center gap-2 text-sm font-bold text-[#e91e63] uppercase tracking-widest mb-2">
                <Shield size={16} /> Resistência
              </h3>
              <div className="space-y-1">
                <label className="text-xs text-[#555] uppercase font-bold">Vitalidade Máxima (HP)</label>
                <input 
                  type="number"
                  name="vitality_max"
                  value={formData.vitality_max}
                  onChange={handleChange}
                  className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#e91e63] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#e91e63] uppercase tracking-widest mb-2">
                                <Crosshair size={16} /> Equipamento & Itens
              </h3>
              <textarea 
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#e91e63] outline-none transition-all resize-none"
                placeholder="Ex: Espada Curta, Escudo de Madeira, 10 Moedas de Ouro..."
              />
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#e91e63] uppercase tracking-widest mb-2">
                                <FileText size={16} /> Lore & Antecedentes
              </h3>
              <textarea 
                name="personal_info"
                value={formData.personal_info}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#e91e63] outline-none transition-all resize-none"
                placeholder="Conte a história do seu personagem..."
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[#2a2a2a] flex justify-end">
            <button 
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#e91e63] hover:bg-[#ff4081] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#e91e63]/20 disabled:opacity-50"
            >
              <Save size={20} /> {loading ? 'Forjando...' : 'Salvar Ficha'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
