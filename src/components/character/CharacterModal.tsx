'use client';

import React from 'react';
import { X, Shield, Star, Minus, FileText } from 'lucide-react';

interface CharacterModalProps {
  character: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  if (!isOpen || !character) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#2a2a2a] relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-3 gap-0">
          {/* Coluna Imagem/Básico */}
          <div className="md:col-span-1 bg-[#121212] p-8 border-r border-[#2a2a2a]">
            <img 
              src={character.appearance_url || 'https://via.placeholder.com/400x500'} 
              className="w-full aspect-[3/4] object-cover rounded-lg shadow-xl mb-6 border-2 border-[#e91e63]/20"
              alt={character.name}
            />
            <h2 className="text-3xl font-black text-[#e91e63] italic mb-1 uppercase tracking-tighter">
              {character.name}
            </h2>
            <p className="text-[#b0b0b0] font-medium mb-6">{character.class_name || 'Aventureiro(a)'}</p>
            
            <div className="space-y-4">
              <StatItem label="Vida" value={`${character.vitality_current}/${character.vitality_max}`} color="text-red-500" />
              <StatItem label="Poder" value={character.power_points || 0} color="text-blue-400" />
              <StatItem label="Deslocamento" value={character.speed || '9m'} color="text-green-400" />
            </div>
          </div>

          {/* Coluna Detalhes/Atributos */}
          <div className="md:col-span-2 p-8 space-y-8 bg-[#1e1e1e]">
            {/* Atributos Grid */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#555] uppercase tracking-widest mb-4">
                              <Shield size={16} /> Atributos Primários
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {['FOR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((attr) => (
                  <div key={attr} className="bg-[#2a2a2a] p-3 rounded-lg text-center border border-[#333]">
                    <div className="text-xs text-[#555] font-bold">{attr}</div>
                    <div className="text-xl font-black text-white">10</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipamento e Perícias */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#555] uppercase tracking-widest mb-4">
                                  <Minus size={16} /> Equipamento
                </h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed whitespace-pre-wrap">
                  {character.equipment || 'Nenhum equipamento listado.'}
                </p>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#555] uppercase tracking-widest mb-4">
                                  <FileText size={16} /> Perícias & Notas
                </h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed whitespace-pre-wrap">
                  {character.skills || 'Nenhuma perícia listada.'}
                </p>
              </div>
            </div>

            {/* Notas Adicionais */}
            <div className="pt-6 border-t border-[#2a2a2a]">
               <h3 className="text-sm font-bold text-[#555] uppercase tracking-widest mb-2">Lore & Antecedentes</h3>
               <p className="text-[#888] text-sm italic">
                 {character.personal_info || 'A história deste herói ainda está sendo escrita...'}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string; value: any; color: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[#222]">
      <span className="text-xs font-bold uppercase tracking-wider text-[#555]">{label}</span>
      <span className={`font-black ${color}`}>{value}</span>
    </div>
  );
}
