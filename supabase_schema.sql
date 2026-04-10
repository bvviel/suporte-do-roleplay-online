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

-- Tabela de Personagens (Caso ainda não tenha as colunas exatas do projeto)
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

-- Políticas RLS (Row Level Security) para permitir que os usuários acessem seus proprios dados
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own campaigns" ON public.campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view all campaigns" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Users can create their own characters" ON public.characters FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view all characters" ON public.characters FOR SELECT USING (true);
