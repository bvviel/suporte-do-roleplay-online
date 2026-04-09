'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import CharacterCard from '@/components/character/CharacterCard';
import CharacterModal from '@/components/character/CharacterModal';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Info } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCharacters(data || []);
    } catch (error: any) {
      console.error('Error fetching:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const openCharacter = (char: any) => {
    setSelectedCharacter(char);
    setIsModalOpen(true);
  };

  return (
    <div className="flex bg-[#121212] min-h-screen text-white">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">GRIMÓRIO</h1>
            <p className="text-[#b0b0b0]">Suas fichas e campanhas em um só lugar.</p>
          </div>
          <Link 
            href="/characters/new"
            className="flex items-center gap-2 bg-[#e91e63] hover:bg-[#ff4081] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#e91e63]/20"
          >
            <Plus size={20} /> Criar Nova Ficha
          </Link>
        </header>

        {/* Mural de Campanhas (Placeholder Figma Style) */}
        <section className="mb-12">
           <div className="bg-[#1e1e1e] border border-dashed border-[#2a2a2a] p-8 rounded-2xl flex flex-col items-center justify-center text-center">
              <Info size={40} className="text-[#555] mb-4" />
              <h3 className="text-xl font-bold text-[#888] mb-2">Mural do Mestre</h3>
              <p className="text-[#555] max-w-sm">Você ainda não faz parte de nenhuma campanha ativa. Peça o link de convite ao seu Mestre.</p>
           </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-black text-[#555] uppercase tracking-[0.3em]">Meus Personagens</h2>
            <div className="h-[1px] flex-1 bg-[#2a2a2a]" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[#1e1e1e] h-72 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : characters.length === 0 ? (
            <div className="text-center py-20 bg-[#1e1e1e]/50 rounded-2xl border border-[#2a2a2a]">
              <p className="text-[#555]">Nenhum personagem encontrado. Comece sua aventura acima!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((char) => (
                <CharacterCard 
                  key={char.id}
                  name={char.name}
                  hpCurrent={char.vitality_current}
                  hpMax={char.vitality_max}
                  imageUrl={char.appearance_url}
                  onClick={() => openCharacter(char)}
                />
              ))}
            </div>
          )}
        </section>

        <CharacterModal 
          character={selectedCharacter}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}
