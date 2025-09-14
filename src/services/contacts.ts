import { supabase } from './supabase';

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          message: formData.message
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to submit contact form: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from contact form submission');
    }

    console.log('Contact form submitted successfully:', data.id);
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    throw new Error(error.message || 'Failed to submit contact form. Please try again later.');
  }
};

export const getContacts = async () => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      throw new Error(`Failed to fetch contacts: ${error.message}`);
    }

    return data || [];
  } catch (error: any) {
    console.error('Fetch contacts error:', error);
    throw new Error(error.message || 'Failed to fetch contacts');
  }
};