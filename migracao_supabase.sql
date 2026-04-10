-- Rode isso no SQL Editor do seu Supabase para criar/atualizar as tabelas

-- Tabela de Campanhas (Mural do Mestre)
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    theme TEXT,
    description TEXT,
    cover_url TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Personagens (Atributos agora em JSONB estruturado via React)
CREATE TABLE IF NOT EXISTS public.characters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    class_name TEXT,
    appearance_url TEXT,
    vitality_max INTEGER DEFAULT 10,
    vitality_current INTEGER DEFAULT 10,
    equipment TEXT,
    attributes JSONB,
    personal_info TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitando RLS para segurança! (MUITO IMPORTANTE SE NÃO NÃO SALVA NADA)
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

-- Limpando policies antigas se existirem
DROP POLICY IF EXISTS "Users can create their own campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Users can view all campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Users can create their own characters" ON public.characters;
DROP POLICY IF EXISTS "Users can view all characters" ON public.characters;
DROP POLICY IF EXISTS "Users can update their own characters" ON public.characters;

-- Criando novas Policies Limpas
CREATE POLICY "Users can create their own campaigns" ON public.campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view all campaigns" ON public.campaigns FOR SELECT USING (true);

CREATE POLICY "Users can create their own characters" ON public.characters FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view all characters" ON public.characters FOR SELECT USING (true);
CREATE POLICY "Users can update their own characters" ON public.characters FOR UPDATE USING (auth.uid() = user_id);
