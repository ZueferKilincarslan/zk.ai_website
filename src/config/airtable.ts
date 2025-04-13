import { z } from 'zod';

const envSchema = z.object({
  VITE_AIRTABLE_API_KEY: z.string().min(1).default(''),
  VITE_AIRTABLE_BASE_ID: z.string().min(1).default(''),
  VITE_AIRTABLE_TABLE_NAME: z.string().min(1).default(''),
});

// Parse with defaults to prevent errors if env vars are missing
const env = envSchema.parse({
  VITE_AIRTABLE_API_KEY: import.meta.env.VITE_AIRTABLE_API_KEY || '',
  VITE_AIRTABLE_BASE_ID: import.meta.env.VITE_AIRTABLE_BASE_ID || '',
  VITE_AIRTABLE_TABLE_NAME: import.meta.env.VITE_AIRTABLE_TABLE_NAME || '',
});

export const AIRTABLE_CONFIG = {
  API_KEY: env.VITE_AIRTABLE_API_KEY,
  BASE_ID: env.VITE_AIRTABLE_BASE_ID,
  TABLE_NAME: env.VITE_AIRTABLE_TABLE_NAME,
  WAITLIST_TABLE_NAME: 'Waitlist',
} as const;