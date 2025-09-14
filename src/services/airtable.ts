import Airtable from 'airtable';
import { AIRTABLE_CONFIG } from '../config/airtable';

interface WaitlistData {
  fullName: string;
  email: string;
  services: string[];
  language?: 'en' | 'de' | 'tr';
}

// Map of service IDs to their exact Airtable field option names
const serviceNameMap: Record<string, string> = {
  'cold-email': 'Cold Email Outreach',
  'personalized-email': 'Personalized Email Outreach',
  'social-media': 'Social Media Outreach',
  'phone-callers': 'AI Phone Callers',
  'instagram': 'Instagram Automation',
  'twitter': 'Twitter Terminal',
  'telegram': 'Telegram Bot'
};

// Initialize Airtable with base configuration
const getAirtableBase = () => {
  const base = new Airtable({ apiKey: AIRTABLE_CONFIG.API_KEY }).base(AIRTABLE_CONFIG.BASE_ID);
  return base;
};

export const submitToWaitlist = async (waitlistData: WaitlistData): Promise<void> => {
  try {
    const table = getAirtableBase()(AIRTABLE_CONFIG.WAITLIST_TABLE_NAME);
    
    // Map service IDs to their exact Airtable field option names
    const mappedServices = waitlistData.services.map(serviceId => {
      const mappedName = serviceNameMap[serviceId];
      if (!mappedName) {
        console.warn(`No mapping found for service ID: ${serviceId}`);
        return null;
      }
      return mappedName;
    }).filter((name): name is string => name !== null);

    if (mappedServices.length === 0) {
      throw new Error('No valid services selected');
    }

    const records = await table.create([
      {
        fields: {
          Name: waitlistData.fullName,
          Email: waitlistData.email,
          Services: mappedServices,
          Language: waitlistData.language || 'en'
        }
      }
    ]);

    if (!records || records.length === 0) {
      throw new Error('Failed to create waitlist record in Airtable.');
    }

    return Promise.resolve();
  } catch (error: any) {
    let errorMessage = 'Failed to submit to waitlist';
    
    if (error.error?.type === 'AUTHENTICATION_REQUIRED') {
      errorMessage = 'Invalid Airtable API key. Please check your credentials.';
    } else if (error.error?.type === 'TABLE_NOT_FOUND') {
      errorMessage = 'Waitlist table not found. Please check your table name.';
    } else if (error.error?.type === 'INVALID_PERMISSIONS') {
      errorMessage = 'Insufficient permissions to access Airtable. Please check your API key permissions.';
    } else if (error.error?.type === 'INVALID_VALUE_FOR_COLUMN') {
      errorMessage = 'One or more selected services are not configured in Airtable. Please contact support.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    console.error('Waitlist submission error:', error);
    throw new Error(errorMessage);
  }
};