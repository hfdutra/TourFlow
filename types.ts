
// Core User Roles
export type UserRole = 'super_admin' | 'operator_admin' | 'agent' | 'customer';

// Status Types
export type TourStatus = 'draft' | 'active' | 'archived';
export type BookingStatus = 'pending' | 'confirmed' | 'paid' | 'checked_in' | 'completed' | 'cancelled' | 'no_show';
export type DepartureStatus = 'scheduled' | 'confirmed' | 'departed' | 'completed' | 'cancelled';
export type TourType = 'day_trip' | 'multi_day' | 'express' | 'charter';
export type SeatType = 'regular' | 'premium' | 'accessible' | 'staff' | 'blocked' | 'driver' | 'guide';

// Entity: Operator (Tenant)
export interface Operator {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  subscription_tier: 'starter' | 'professional' | 'business';
}

// Entity: User
export interface User {
  id: string;
  operator_id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
}

export interface TeamMember extends User {
  status: 'active' | 'invited' | 'disabled';
  last_active?: string;
}

// Entity: Customer (CRM)
export interface Customer {
  id: string;
  operator_id: string;
  full_name: string;
  email: string;
  phone: string;
  nif?: string;
  country: string;
  city?: string;
  total_bookings: number;
  total_spent: number;
  last_booking_date?: string;
  tags: string[]; // e.g. "VIP", "Frequent", "New"
  source: 'website' | 'agent' | 'phone' | 'walkin';
  notes?: string;
  created_at: string;
  avatar_url?: string;
  preferences?: {
    seat?: 'window' | 'aisle' | 'front';
    dietary?: string;
    language?: string;
  };
}

// Entity: Agent (B2B)
export interface Agent {
  id: string;
  operator_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  nif: string;
  status: 'active' | 'inactive' | 'pending';
  commission_model: 'percentage' | 'net_rate';
  commission_rate: number; // percentage
  total_sales: number;
  pending_commission: number;
  logo_url?: string;
  created_at: string;
}

// Entity: Tour
export interface Tour {
  id: string;
  operator_id: string;
  name: string;
  slug: string;
  description?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  tour_type: TourType;
  duration_days: number;
  duration_hours: number;
  base_price: number;
  categories: string[];
  featured_image?: string;
  gallery?: string[];
  status: TourStatus;
  min_passengers: number;
  max_passengers?: number;
}

// Entity: Departure
export interface Departure {
  id: string;
  tour_id: string;
  operator_id: string;
  departure_date: string; // ISO Date YYYY-MM-DD
  departure_time: string; // HH:mm
  return_date?: string;
  return_time?: string;
  coach_id?: string;
  guide_id?: string;
  total_capacity: number;
  booked_seats: number;
  price_override?: number;
  status: DepartureStatus;
  min_passengers: number;
  tour?: Tour; // Joined for display
}

// Entity: Coach & Seats
export interface Seat {
  id: string; // "1A"
  row: number;
  col: string; // "A"
  type: SeatType;
  priceModifier: number; // Added to base price
  isBooked?: boolean; // For booking flow
}

export interface CoachLayout {
  rows: number;
  columns: number; // Total columns (e.g., 4)
  aisleAfter: number; // Index after which aisle exists (e.g., 2 means A,B | C,D)
  seats: Seat[];
}

export interface Coach {
  id: string;
  operator_id: string;
  name: string;
  registration: string;
  capacity: number;
  amenities: string[]; // 'wifi', 'wc', 'usb', 'ac'
  layout: CoachLayout;
  status: 'active' | 'maintenance' | 'inactive';
  photo_url?: string;
}

// Entity: Route & Pickup Points
export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  time_offset_minutes: number; // e.g., -30 means 30 mins before tour start
  capacity_limit?: number;
  notes?: string;
}

export interface Route {
  id: string;
  operator_id: string;
  name: string;
  description?: string;
  default_start_point?: string; // Name of the main start location
  pickup_points: PickupPoint[];
  created_at: string;
  distance_km?: number;
  estimated_duration_min?: number;
}

// Entity: Booking
export interface Booking {
  id: string;
  booking_reference: string;
  customer_name: string;
  customer_id?: string;
  customer_email?: string;
  customer_phone?: string;
  tour_name: string;
  tour_id?: string;
  departure_date: string;
  departure_time: string;
  amount: number;
  status: BookingStatus;
  created_at: string;
  payment_status: 'paid' | 'pending' | 'refunded' | 'partially_paid';
  passengers: Passenger[];
  pickup_point?: string;
  pickup_time?: string;
  notes?: string;
  source: 'website' | 'agent' | 'phone' | 'manual';
}

// Entity: Invoice & Transactions (Sales)
export interface Invoice {
  id: string;
  booking_id?: string;
  invoice_number: string; // e.g., FT 2025/123
  customer_name: string;
  customer_nif?: string;
  amount: number;
  tax_amount: number;
  date: string;
  due_date: string;
  status: 'paid' | 'pending' | 'overdue' | 'voided';
  items: { description: string; quantity: number; unit_price: number }[];
  pdf_url?: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'payment' | 'refund';
  method: 'credit_card' | 'mbway' | 'multibanco' | 'bank_transfer' | 'cash';
  status: 'success' | 'pending' | 'failed';
  reference?: string;
  description: string;
}

// Entity: Communication
export type MessageChannel = 'email' | 'sms' | 'whatsapp';

export interface MessageTemplate {
  id: string;
  operator_id: string;
  name: string;
  channel: MessageChannel;
  subject?: string; // for email
  content: string;
  category: 'confirmation' | 'reminder' | 'marketing' | 'post_trip';
  variables: string[];
}

export interface MessageLog {
  id: string;
  booking_id?: string;
  customer_name: string;
  channel: MessageChannel;
  template_name?: string;
  sent_at: string;
  status: 'sent' | 'delivered' | 'failed' | 'read';
  content_preview: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  active: boolean;
  trigger_type: 'booking_created' | 'before_departure' | 'after_tour' | 'payment_received';
  trigger_value?: number; // e.g. 24 (hours)
  channel: MessageChannel;
  template_id: string;
}

// Booking Wizard Types
export interface Passenger {
  type: 'adult' | 'child' | 'senior' | 'infant';
  firstName: string;
  lastName: string;
  seatId?: string;
  checkedIn?: boolean;
}

export interface BookingRequest {
  tourId: string;
  departureId: string;
  passengers: Passenger[];
  pickupPointId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

// KPI Data Structure
export interface DashboardKPI {
  revenue_month: number;
  revenue_growth: number;
  bookings_month: number;
  occupancy_rate: number;
  next_departures_count: number;
}
