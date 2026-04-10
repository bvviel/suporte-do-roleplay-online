import React from 'react';

export default function CharacterModal({ character, onClose }: { character: any; onClose: () => void }) {
  const getStatBonus = (stat: number) => {
      const bonus = Math.floor((stat - 10) / 2);
      return bonus >= 0 ? `+${bonus}` : `${bonus}`;
  };

  const attrs = character.attributes || { STR:10, DEX:10, CON:10, INT:10, WIS:10, CHA:10 };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm">
      <div className="w-[1100px] h-full max-h-[800px] bg-[#16161a] rounded-3xl overflow-hidden shadow-2xl flex relative animate-in fade-in zoom-in duration-300">
         
         <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 bg-[#222226] hover:bg-[#333] rounded-full flex items-center justify-center text-[#888] hover:text-white transition-colors z-20">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
         </button>

         {/* Lado Esquerdo - Retrato e Barras */}
         <div className="w-1/3 min-w-[320px] bg-[#1a1a1e] relative flex flex-col justify-end p-8 pb-12 overflow-hidden shadow-[10px_0_20px_rgba(0,0,0,0.5)] z-10">
             {character.appearance_url && (
                 <img src={character.appearance_url} alt="Profile" className="absolute inset-0 w-full h-full object-cover opacity-80" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-[#16161a]/80 to-transparent" />
             
             <div className="relative z-10">
                 <h2 className="text-4xl font-serif italic text-white mb-2">{character.name}</h2>
                 <p className="text-[10px] uppercase font-bold text-[#cda66e] tracking-widest mb-10">
                    {character.class_name || 'VAGABOND'}
                 </p>

                 <div className="space-y-6">
                     <div>
                         <div className="flex justify-between items-end mb-1">
                             <span className="text-[9px] uppercase font-bold text-[#888] tracking-wider">VITALITY (HP)</span>
                             <span className="text-[13px] font-serif italic text-[#cda66e]">{character.vitality_current || 10} / {character.vitality_max || 10}</span>
                         </div>
                         <div className="h-1.5 w-full bg-[#0a0a0c] rounded-full overflow-hidden border border-[#222]">
                             <div className="h-full bg-gradient-to-r from-[#cda66e] to-[#e4c2a5]" style={{ width: `${Math.max(1, ((character.vitality_current||10) / (character.vitality_max||10)) * 100)}%` }} />
                         </div>
                     </div>
                     <div>
                         <div className="flex justify-between items-end mb-1">
                             <span className="text-[9px] uppercase font-bold text-[#888] tracking-wider">ETHER (MANA)</span>
                             <span className="text-[13px] font-serif italic text-teal-300">14 / 22</span>
                         </div>
                         <div className="h-1.5 w-full bg-[#0a0a0c] rounded-full overflow-hidden border border-[#222]">
                             <div className="h-full bg-gradient-to-r from-teal-500 to-teal-300" style={{ width: '60%' }} />
                         </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4 mt-8 pt-4">
                         <div className="bg-[#1f1f23] rounded-xl p-4 border border-[#2a2a2e]">
                             <span className="text-[9px] uppercase font-bold text-[#888] tracking-wider block mb-1">ARMOR CLASS</span>
                             <span className="text-xl font-serif italic text-[#cda66e]">18</span>
                         </div>
                         <div className="bg-[#1f1f23] rounded-xl p-4 border border-[#2a2a2e]">
                             <span className="text-[9px] uppercase font-bold text-[#888] tracking-wider block mb-1">INITIATIVE</span>
                             <span className="text-xl font-serif italic text-teal-300">+4</span>
                         </div>
                     </div>
                 </div>
             </div>
         </div>

         {/* Lado Direito - Atributos e Detalhes */}
         <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-[#16161a]">
             
             <h3 className="font-serif italic text-2xl text-[#d4d4d4] mb-6 shadow-sm">Primary Attributes</h3>
             <div className="grid grid-cols-6 gap-3 mb-12">
                 {['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map(stat => {
                     const val = attrs[stat];
                     const isHigh = val >= 18;
                     return (
                         <div key={stat} className={`flex flex-col items-center justify-center p-4 rounded-xl border ${isHigh ? 'border-[#cda66e]/30 bg-[#cda66e]/5' : 'border-[#222226] bg-[#1a1a1e]'}`}>
                             <span className="text-[10px] uppercase font-bold text-[#888] tracking-wider mb-2">{stat}</span>
                             <span className={`text-2xl font-serif font-medium ${isHigh ? 'text-[#cda66e]' : 'text-white'}`}>{val}</span>
                             <span className="text-[10px] text-[#888] mt-1">{getStatBonus(val)}</span>
                         </div>
                     )
                 })}
             </div>

             <div className="grid grid-cols-2 gap-12">
                 
                 <div>
                     <div className="flex justify-between items-end mb-6 border-b border-[#222226] pb-2">
                         <h3 className="font-serif italic text-xl text-[#d4d4d4]">Proficiencies</h3>
                         <span className="text-[9px] uppercase font-bold text-teal-400 tracking-wider">BONUS: +4</span>
                     </div>
                     <ul className="space-y-2 text-sm text-[#a0a0a0]">
                         <li className="flex justify-between items-center py-2"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#444] rounded-full"/> Athletics</span> <span>+8</span></li>
                         <li className="flex justify-between items-center py-2"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#444] rounded-full"/> Arcana</span> <span>+3</span></li>
                         <li className="flex justify-between items-center py-2 px-3 bg-[#cda66e]/10 border border-[#cda66e]/20 rounded text-[#cda66e]"><span className="flex items-center gap-2 font-bold"><div className="w-1.5 h-1.5 bg-[#cda66e] rounded-full"/> Deception</span> <span>+9</span></li>
                         <li className="flex justify-between items-center py-2"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#444] rounded-full"/> Insight</span> <span>+4</span></li>
                     </ul>
                 </div>

                 <div>
                     <div className="flex justify-between items-end mb-6 border-b border-[#222226] pb-2">
                         <h3 className="font-serif italic text-xl text-[#d4d4d4]">Vault & Inventory</h3>
                     </div>
                     <div className="space-y-3">
                         {/* Card Especial de Arma */}
                         <div className="bg-[#1f1f23] rounded-xl p-4 border border-[#2a2a2e] flex gap-4">
                             <div className="w-10 h-10 rounded bg-[#cda66e]/10 border border-[#cda66e]/30 flex items-center justify-center text-[#cda66e] shrink-0">⚔️</div>
                             <div>
                                 <h4 className="font-serif text-white mb-0.5">Nightshade Rapier +2</h4>
                                 <p className="text-[9px] uppercase font-bold text-[#888] tracking-wider mb-2">RARE WEAPON • FINESSE, LIGHT</p>
                                 <p className="text-xs text-[#888] leading-relaxed">A blade forged from crystallized shadows, cold to the touch.</p>
                             </div>
                         </div>
                         <div className="flex justify-between items-center py-3 text-sm text-[#a0a0a0] border-b border-[#222]">
                            <span className="flex items-center gap-3"><span className="text-[#888]">🛡️</span> Studded Leather Armor</span>
                            <span className="text-[10px] text-[#666]">13 LBS</span>
                         </div>
                         <div className="flex justify-between items-center py-3 text-sm text-[#a0a0a0] border-b border-[#222]">
                            <span className="flex items-center gap-3"><span className="text-[#888]">✨</span> Rod of the Pact Keeper</span>
                            <span className="text-[10px] text-[#666]">2 LBS</span>
                         </div>
                     </div>
                 </div>

             </div>
             
             <div className="grid grid-cols-2 gap-12 mt-12">
                 <div>
                     <h3 className="font-serif italic text-xl text-[#d4d4d4] mb-4">Background</h3>
                     <div className="bg-[#1a1a1e] rounded-xl p-5 border border-[#222226]">
                         <p className="text-[9px] uppercase font-bold text-[#888] tracking-widest mb-3">ORIGIN: HAUNTED ONE</p>
                         <p className="text-xs text-[#a0a0a0] leading-relaxed">
                            {character.personal_info || "Exiled from the Spire of Echoes after discovering a forbidden ritual that bound his soul to the Void."}
                         </p>
                     </div>
                 </div>
                 <div>
                     <h3 className="font-serif italic text-xl text-[#d4d4d4] mb-4">Journal Entries & Notes</h3>
                     <div className="bg-[#1a1a1e] rounded-xl p-5 border border-[#222226] h-full">
                         <p className="text-xs text-[#a0a0a0] leading-relaxed mb-4">
                             <strong className="text-[#cda66e]">Journal:</strong> No entries yet for this legend.
                         </p>
                     </div>
                 </div>
             </div>

         </div>

      </div>
    </div>
  );
}
