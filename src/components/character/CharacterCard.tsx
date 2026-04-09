'use client';

import React from 'react';
import { Heart } from 'lucide-react';

interface CharacterCardProps {
  name: string;
  hpCurrent: number;
  hpMax: number;
  imageUrl: string;
  onClick: () => void;
}

export default function CharacterCard({ name, hpCurrent, hpMax, imageUrl, onClick }: CharacterCardProps) {
  const hpPercentage = Math.min(Math.max((hpCurrent / hpMax) * 100, 0), 100);

  return (
    <div 
      onClick={onClick}
      className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden cursor-pointer hover:border-[#e91e63] transition-all group shadow-lg"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imageUrl || 'https://via.placeholder.com/400x300?text=Sem+Imagem'} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent opacity-60" />
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold text-white truncate">{name}</h3>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[#b0b0b0] mb-1">
            <span className="flex items-center gap-1 text-red-500 font-bold uppercase tracking-wider">
              <Heart size={14} /> Vitalidade
            </span>
            <span>{hpCurrent} / {hpMax}</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
