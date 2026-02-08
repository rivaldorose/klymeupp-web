-- KlymeUpp Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- ============================================
-- 1. PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'jongere' CHECK (role IN ('jongere', 'bedrijf', 'admin')),
  bio TEXT,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  interests TEXT[] DEFAULT '{}',
  goals TEXT[] DEFAULT '{}',
  preferred_sectors TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 2. SKILL TRACKS & NODES
-- ============================================
CREATE TABLE IF NOT EXISTS public.skill_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL DEFAULT 'school',
  color TEXT NOT NULL DEFAULT '#e9208f',
  category TEXT NOT NULL DEFAULT 'soft-skills',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.skill_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID REFERENCES public.skill_tracks(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL DEFAULT 'star',
  xp_reward INTEGER NOT NULL DEFAULT 50,
  position_x FLOAT NOT NULL DEFAULT 0,
  position_y FLOAT NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  prerequisites UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_skill_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  node_id UUID REFERENCES public.skill_nodes(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'active', 'completed')),
  progress INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, node_id)
);

-- ============================================
-- 3. CHALLENGES
-- ============================================
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'training' CHECK (category IN ('case-study', 'training', 'bedrijf', 'dagelijks')),
  difficulty TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  xp_reward INTEGER NOT NULL DEFAULT 100,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  image_url TEXT,
  company_id UUID REFERENCES public.profiles(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.challenge_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  step_type TEXT NOT NULL DEFAULT 'quiz' CHECK (step_type IN ('quiz', 'open', 'upload', 'reflection', 'video')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  content JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'nieuw' CHECK (status IN ('nieuw', 'bezig', 'voltooid')),
  progress INTEGER NOT NULL DEFAULT 0,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

CREATE TABLE IF NOT EXISTS public.user_challenge_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  step_id UUID REFERENCES public.challenge_steps(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  answer JSONB DEFAULT '{}',
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, step_id)
);

-- ============================================
-- 4. BADGES
-- ============================================
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'emoji_events',
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'skill' CHECK (category IN ('skill', 'challenge', 'streak', 'special', 'community')),
  requirement_type TEXT NOT NULL DEFAULT 'manual',
  requirement_value INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- ============================================
-- 5. PORTFOLIO
-- ============================================
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  item_type TEXT NOT NULL DEFAULT 'project' CHECK (item_type IN ('project', 'certificate', 'achievement')),
  image_url TEXT,
  external_url TEXT,
  skills TEXT[] DEFAULT '{}',
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 6. OPPORTUNITIES (Stages & Banen)
-- ============================================
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  opportunity_type TEXT NOT NULL DEFAULT 'stage' CHECK (opportunity_type IN ('stage', 'baan', 'freelance')),
  location TEXT,
  is_remote BOOLEAN NOT NULL DEFAULT false,
  skills_required TEXT[] DEFAULT '{}',
  sector TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  deadline DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'nieuw' CHECK (status IN ('nieuw', 'bekeken', 'interview', 'geaccepteerd', 'afgewezen')),
  match_percentage INTEGER DEFAULT 0,
  cover_message TEXT,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

-- ============================================
-- 7. COMMUNITY
-- ============================================
CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 8. WELLBEING
-- ============================================
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  mood TEXT NOT NULL CHECK (mood IN ('geweldig', 'goed', 'oké', 'meh', 'slecht')),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  mood TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 9. XP TRANSACTIONS (Audit trail)
-- ============================================
CREATE TABLE IF NOT EXISTS public.xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('challenge', 'skill', 'badge', 'streak', 'daily', 'bonus')),
  source_id UUID,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 10. NOTIFICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT NOT NULL DEFAULT 'info' CHECK (notification_type IN ('info', 'achievement', 'challenge', 'match', 'community')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to add XP and update level
CREATE OR REPLACE FUNCTION public.add_xp(
  p_user_id UUID,
  p_amount INTEGER,
  p_source_type TEXT,
  p_source_id UUID DEFAULT NULL,
  p_description TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_new_xp INTEGER;
  v_new_level INTEGER;
BEGIN
  -- Add XP transaction
  INSERT INTO public.xp_transactions (user_id, amount, source_type, source_id, description)
  VALUES (p_user_id, p_amount, p_source_type, p_source_id, p_description);

  -- Update user XP
  UPDATE public.profiles
  SET xp = xp + p_amount
  WHERE id = p_user_id
  RETURNING xp INTO v_new_xp;

  -- Calculate new level (100 XP base, 1.5x multiplier)
  v_new_level := 1 + FLOOR(LOG(1.5, (v_new_xp::FLOAT / 100) + 1));
  IF v_new_level < 1 THEN v_new_level := 1; END IF;

  -- Update level
  UPDATE public.profiles SET level = v_new_level WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Skill progress: own data
CREATE POLICY "Users can view own skill progress" ON public.user_skill_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own skill progress" ON public.user_skill_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skill progress" ON public.user_skill_progress FOR UPDATE USING (auth.uid() = user_id);

-- Challenges: viewable by all, user data is own
CREATE POLICY "Users can view own challenges" ON public.user_challenges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own challenges" ON public.user_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own challenges" ON public.user_challenges FOR UPDATE USING (auth.uid() = user_id);

-- Challenge steps: own data
CREATE POLICY "Users can view own challenge steps" ON public.user_challenge_steps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own challenge steps" ON public.user_challenge_steps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own challenge steps" ON public.user_challenge_steps FOR UPDATE USING (auth.uid() = user_id);

-- Badges: own data
CREATE POLICY "Users can view own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Portfolio: public items viewable, own manageable
CREATE POLICY "Public portfolio items viewable" ON public.portfolio_items FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can manage own portfolio" ON public.portfolio_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own portfolio" ON public.portfolio_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own portfolio" ON public.portfolio_items FOR DELETE USING (auth.uid() = user_id);

-- Applications: own data
CREATE POLICY "Users can view own applications" ON public.user_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can apply" ON public.user_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Community: viewable by all, own manageable
CREATE POLICY "Community posts viewable by all" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own posts" ON public.community_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts" ON public.community_posts FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Likes viewable by all" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like" ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Comments viewable by all" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users can comment" ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.post_comments FOR DELETE USING (auth.uid() = user_id);

-- Wellbeing: own data only
CREATE POLICY "Users can view own mood" ON public.mood_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add mood" ON public.mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own journal" ON public.journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add journal" ON public.journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own journal" ON public.journal_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own journal" ON public.journal_entries FOR DELETE USING (auth.uid() = user_id);

-- XP: own data
CREATE POLICY "Users can view own xp" ON public.xp_transactions FOR SELECT USING (auth.uid() = user_id);

-- Notifications: own data
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Public tables (no RLS restrictions for read)
-- Skill tracks and nodes are public
-- Challenges and badges definitions are public

-- ============================================
-- SEED DATA
-- ============================================

-- Seed skill tracks
INSERT INTO public.skill_tracks (title, description, icon, color, category, sort_order) VALUES
('Soft Skills', 'Communicatie, samenwerking, leiderschap en meer', 'psychology', '#e9208f', 'soft-skills', 1),
('Digitale Vaardigheden', 'Technologie, data en digitale tools', 'computer', '#40a9ff', 'digital', 2),
('Ondernemerschap', 'Business planning, marketing en financiën', 'business_center', '#ff9f43', 'business', 3),
('Creatief Denken', 'Design thinking, innovatie en probleemoplossing', 'lightbulb', '#2cc069', 'creative', 4);

-- Seed badges
INSERT INTO public.badges (name, description, icon, category, requirement_type, requirement_value) VALUES
('Eerste Stap', 'Voltooi je eerste challenge', 'emoji_events', 'challenge', 'challenges_completed', 1),
('Streak Master', 'Houd een streak van 7 dagen vol', 'local_fire_department', 'streak', 'streak_days', 7),
('Vaardigheidsheld', 'Voltooi 5 skill nodes', 'star', 'skill', 'skills_completed', 5),
('Community Builder', 'Schrijf je eerste community post', 'groups', 'community', 'posts_created', 1),
('Portfolio Pro', 'Voeg 3 projecten toe aan je portfolio', 'work', 'special', 'portfolio_items', 3),
('Challenge Kampioen', 'Voltooi 10 challenges', 'military_tech', 'challenge', 'challenges_completed', 10),
('Level 5', 'Bereik level 5', 'trending_up', 'special', 'level_reached', 5),
('Welzijnsster', 'Log 7 dagen achter elkaar je stemming', 'favorite', 'special', 'mood_streak', 7);

-- Seed challenges
INSERT INTO public.challenges (title, description, category, difficulty, xp_reward, duration_minutes) VALUES
('Ontdek je Communicatiestijl', 'Leer welk type communicator je bent en hoe je dit kunt inzetten.', 'training', 'beginner', 100, 15),
('Marketing Plan Challenge', 'Maak een marketingplan voor een fictief startup.', 'case-study', 'intermediate', 250, 45),
('Teamwork Simulatie', 'Werk samen met anderen aan een virtueel project.', 'training', 'beginner', 150, 30),
('CV & LinkedIn Masterclass', 'Bouw een professioneel CV en optimaliseer je LinkedIn.', 'training', 'beginner', 200, 60),
('Elevator Pitch', 'Oefen je elevator pitch in 60 seconden.', 'dagelijks', 'beginner', 75, 10),
('Data Analyse Basics', 'Leer de basis van data-analyse met echte datasets.', 'training', 'intermediate', 200, 40),
('Sollicitatiegesprek Simulatie', 'Oefen een sollicitatiegesprek met AI-feedback.', 'case-study', 'advanced', 300, 45),
('Financieel Plan Opstellen', 'Maak een financieel plan voor een startup.', 'case-study', 'advanced', 350, 60);
