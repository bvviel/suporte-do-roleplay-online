'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };
    checkUser();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#e91e63] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
