import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Obsidian Codex | Suporte do Roleplay Online',
  description: 'Gerenciamento de fichas e campanhas de RPG de alto nível.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
       <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#111111] text-[#c2c2c2] overflow-x-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
