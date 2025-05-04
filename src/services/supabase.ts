import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const logPageView = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('page_views')
      .insert([
        {
          timestamp: new Date().toISOString(),
          user_id: user?.id || null,
          session_id: crypto.randomUUID()
        }
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Error logging page view:', error);
  }
};

export const getMonthlyUsers = async () => {
  const { data, error } = await supabase
    .from('monthly_users')
    .select('*')
    .order('month');

  if (error) throw error;
  return data;
};