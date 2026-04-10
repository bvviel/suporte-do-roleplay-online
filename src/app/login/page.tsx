'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider: 'github' | 'google') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/dashboard',
        },
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#c8a995] flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="px-10 py-6 flex justify-between items-center border-b border-[#222]">
        <h1 className="text-xl md:text-2xl font-serif italic text-[#cda66e] font-bold tracking-tight">Suporte do Roleplay Online</h1>
        <span className="text-[10px] text-[#555] uppercase tracking-[0.2em] font-bold">GRIMÓRIO V1.0</span>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        
        <div className="w-full max-w-[1000px] bg-[#1a1a1c] rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-[#222226]">
          
          {/* Lado Esquerdo */}
          <div className="md:w-1/2 relative bg-[#0e0e0e] min-h-[400px] border-r border-[#222226] flex items-end p-10">
             <div className="relative z-10 w-full mb-8">
                 <h2 className="text-4xl font-serif italic text-white mb-4 shadow-sm font-medium">Acesse o Arquivo Digital</h2>
                 <p className="text-[#a0a0a0] text-sm leading-relaxed max-w-sm font-sans">
                   Suas campanhas, personagens e crônicas aguardam por você nas profundezas do obsidian.
                 </p>
             </div>
          </div>

          {/* Lado Direito */}
          <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center relative bg-[#202022]">
             
             <div className="mb-14 text-center md:text-left">
               <h3 className="text-3xl font-serif text-[#e4e4e4]">Seja bem-vindo</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest text-[#888] mt-4 font-sans">SELECIONE O MEIO PARA TER ACESSO AOS ARQUIVOS</p>
             </div>

             <div className="flex flex-col gap-6">
                <button
                  onClick={() => handleLogin('google')}
                  disabled={loading}
                  className="flex items-center justify-center gap-4 py-4 px-6 bg-[#2a2a2e] border border-[#333] hover:border-[#555] hover:bg-[#323236] text-[#e4e4e4] rounded-xl text-sm font-bold transition-all shadow-sm font-sans"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  </svg>
                  AUTENTICAR COM O GOOGLE
                </button>
                
                <button
                  onClick={() => handleLogin('github')}
                  disabled={loading}
                  className="flex items-center justify-center gap-4 py-4 px-6 bg-[#2a2a2e] border border-[#333] hover:border-[#555] hover:bg-[#323236] text-[#e4e4e4] rounded-xl text-sm font-bold transition-all shadow-sm font-sans"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  CONECTAR VIA GITHUB
                </button>
             </div>

          </div>

        </div>

      </main>

      <footer className="px-10 py-6 flex flex-col md:flex-row justify-between items-center border-t border-[#111] gap-4">
         <div className="flex gap-6 text-[9px] uppercase tracking-widest text-[#555] font-bold font-sans">
            <a href="#" className="hover:text-[#888]">TERMOS DE USO</a>
            <a href="#" className="hover:text-[#888]">PRIVACIDADE</a>
            <a href="#" className="hover:text-[#888]">SUPORTE</a>
         </div>
         <div className="flex items-center gap-2 font-sans">
            <div className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="text-[9px] uppercase tracking-widest text-[#555] font-bold">SERVIDORES ONLINE</span>
         </div>
      </footer>

    </div>
  );
}
