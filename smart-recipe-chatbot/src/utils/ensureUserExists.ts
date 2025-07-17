// src/utils/ensureUserExists.ts
import { supabase } from './supabaseClient';

export const ensureUserExists = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (!data && !error) {
    const { error: insertError } = await supabase.from('users').insert([{ email }]);
    if (insertError) {
      console.error('Error inserting user:', insertError.message);
    }
  }
};

