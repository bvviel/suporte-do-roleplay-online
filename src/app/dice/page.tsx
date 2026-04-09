'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function DicePage() {
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 20) + 1;
      setResult(roll);
      setHistory((prev) => [roll, ...prev].slice(0, 10));
      setRolling(false);
    }, 600);
  };

  return (
    <div className="flex bg-[#121212] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-10 flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white italic tracking-tighter mb-4">
            🎲 DADO D20 INTELIGENTE
          </h1>
          <p className="text-[#b0b0b0] max-w-md mx-auto">
            Role o destino da sua sessão. O Obsidian Codex nunca mente (quase nunca).
          </p>
        </div>

        <div className="relative group mb-16">
          <div 
            onClick={!rolling ? rollDice : undefined}
            className={`w-64 h-64 bg-[#1e1e1e] border-4 border-[#2a2a2a] rounded-3xl flex items-center justify-center cursor-pointer transition-all hover:border-[#e91e63] shadow-2xl relative ${rolling ? 'animate-bounce scale-95' : 'hover:scale-105'}`}
          >
            <span className={`text-8xl font-black ${result === 20 ? 'text-[#e91e63] drop-shadow-[0_0_15px_rgba(233,30,99,0.5)]' : 'text-white'}`}>
              {rolling ? '?' : (result || 20)}
            </span>
            
            {result === 20 && !rolling && (
              <div className="absolute -top-4 -right-4 bg-[#e91e63] text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                Crítico! ⚡
              </div>
            )}
            
            <div className="absolute bottom-4 text-[#555] text-xs font-bold uppercase tracking-widest">
              {rolling ? 'Rolando...' : 'Clique para Rolar'}
            </div>
          </div>
        </div>

        <div className="w-full max-w-md bg-[#1e1e1e] rounded-xl p-6 border border-[#2a2a2a]">
          <h3 className="text-sm font-bold text-[#b0b0b0] uppercase tracking-widest mb-4 border-b border-[#2a2a2a] pb-2">
            🕐 Histórico de Rolagem
          </h3>
          <div className="flex flex-wrap gap-2">
            {history.length === 0 ? (
              <p className="text-[#555] text-sm italic">Nenhuma rolagem ainda...</p>
            ) : (
              history.map((roll, i) => (
                <div 
                  key={i} 
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-bold ${
                    roll === 20 ? 'bg-[#e91e63]/20 border-[#e91e63] text-[#e91e63]' : 'bg-[#2a2a2a] border-[#333] text-[#888]'
                  }`}
                >
                  {roll}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
