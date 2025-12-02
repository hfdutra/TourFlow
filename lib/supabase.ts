
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// This is a client-side wrapper. In a real scenario with Next.js App Router,
// we might use @supabase/ssr for server components.
export const supabase = createClient(supabaseUrl, supabaseKey);

// --- Mock Data Services (Simulation) ---
// Since we don't have a real DB connected in this environment,
// we'll create helper functions that act like DB calls but return our mock data.

import { MOCK_TOURS, MOCK_DEPARTURES } from '../services/mockData';

export async function getFeaturedTours() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_TOURS.slice(0, 3); // Return first 3 as featured
}

export async function getTours(filters?: any) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_TOURS;
}

export async function getTourBySlug(slug: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_TOURS.find(t => t.slug === slug);
}

export async function getDeparturesByTour(tourId: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_DEPARTURES.filter(d => d.tour_id === tourId);
}
