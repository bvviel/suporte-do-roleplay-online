import type { Metadata } from 'next';
import './globals.css';

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
       <body className="bg-[#121212] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
