'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Github, Mail } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-[#121212] font-sans">
      <div className="max-w-md w-full p-8 bg-[#1e1e1e] rounded-xl shadow-2xl border border-[#2a2a2a]">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#e91e63] mb-2 tracking-tighter italic">
            Obsidian Codex
          </h1>
          <p className="text-[#b0b0b0]">Roleplay Support Platform</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('github')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#333] hover:bg-[#444] text-white rounded-lg transition-all border border-[#444]"
          >
            <Github size={20} />
            Continuar com GitHub
          </button>

          <button
            onClick={() => handleLogin('google')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg transition-all font-medium"
          >
            <Mail size={20} />
            Continuar com Google
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-[#555]">
          Ao entrar, você concorda com nossos termos de uso épicos.
        </p>
      </div>
    </div>
  );
}
