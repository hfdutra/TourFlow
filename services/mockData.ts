
import { Operator, User, Tour, Booking, DashboardKPI, Departure, Coach, CoachLayout, Route, Customer, Agent, Invoice, Transaction, MessageTemplate, MessageLog, AutomationRule, TeamMember } from '../types';

export const MOCK_OPERATOR: Operator = {
  id: 'op-123',
  name: 'Vertical Tur',
  slug: 'vertical-tur',
  logo_url: 'https://picsum.photos/200',
  subscription_tier: 'professional'
};

export const MOCK_USER: User = {
  id: 'usr-1',
  operator_id: 'op-123',
  email: 'admin@verticaltur.pt',
  full_name: 'João Silva',
  role: 'operator_admin',
  avatar_url: 'https://picsum.photos/id/64/200/200'
};

export const MOCK_TEAM: TeamMember[] = [
  { ...MOCK_USER, status: 'active', last_active: '2025-05-15T10:00:00' } as TeamMember,
  {
    id: 'usr-2',
    operator_id: 'op-123',
    email: 'maria.costa@verticaltur.pt',
    full_name: 'Maria Costa',
    role: 'operator_admin', // simplified role for demo
    status: 'active',
    last_active: '2025-05-14T18:30:00',
    avatar_url: 'https://i.pravatar.cc/150?u=20'
  },
  {
    id: 'usr-3',
    operator_id: 'op-123',
    email: 'pedro.guia@verticaltur.pt',
    full_name: 'Pedro Guia',
    role: 'agent', // acting as staff/guide
    status: 'invited',
    last_active: undefined,
  }
];

export const MOCK_KPIS: DashboardKPI = {
  revenue_month: 12450,
  revenue_growth: 15.4,
  bookings_month: 86,
  occupancy_rate: 78,
  next_departures_count: 12
};

// Helper to generate a basic 50 seat layout
const generateLayout = (rows: number, cols: number, aisleAfter: number): CoachLayout => {
  const seats = [];
  const colLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (let r = 1; r <= rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Last row often has 5 seats (no aisle)
      if (r < rows && c === aisleAfter && cols > aisleAfter) continue; // Skip aisle space logic handled in renderer, but here we just generate data
      
      seats.push({
        id: `${r}${colLetters[c]}`,
        row: r,
        col: colLetters[c],
        type: r === 1 ? 'premium' : 'regular',
        priceModifier: r === 1 ? 10 : 0
      } as any);
    }
  }
  return {
    rows,
    columns: cols,
    aisleAfter,
    seats
  };
};

export const MOCK_COACHES: Coach[] = [
  {
    id: 'c-1',
    operator_id: 'op-123',
    name: 'Autocarro A (Mercedes)',
    registration: '22-XX-44',
    capacity: 53,
    amenities: ['wifi', 'ac', 'usb', 'wc'],
    status: 'active',
    photo_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    layout: generateLayout(13, 4, 2)
  },
  {
    id: 'c-2',
    operator_id: 'op-123',
    name: 'Minibus Sprinter',
    registration: 'AA-00-BB',
    capacity: 19,
    amenities: ['ac', 'usb'],
    status: 'active',
    photo_url: 'https://images.unsplash.com/photo-1562916172-20c2d398d5c4?auto=format&fit=crop&q=80&w=800',
    layout: generateLayout(6, 3, 1) // 1+2 config
  }
];

export const MOCK_ROUTES: Route[] = [
  {
    id: 'r-1',
    operator_id: 'op-123',
    name: 'Rota Porto - Douro',
    description: 'Recolhas principais no centro do Porto e Gaia',
    default_start_point: 'Cais de Gaia',
    distance_km: 120,
    estimated_duration_min: 90,
    created_at: '2025-01-10',
    pickup_points: [
      {
        id: 'p-1',
        name: 'Estação Campanhã',
        address: 'Largo da Estação, Porto',
        lat: 41.1496,
        lng: -8.5855,
        time_offset_minutes: -60,
        notes: 'Paragem dos autocarros turismo'
      },
      {
        id: 'p-2',
        name: 'Aliados (Mc)',
        address: 'Avenida dos Aliados, Porto',
        lat: 41.1469,
        lng: -8.6111,
        time_offset_minutes: -45,
        notes: 'Frente ao Banco de Portugal'
      },
      {
        id: 'p-3',
        name: 'Cais de Gaia',
        address: 'Av. de Diogo Leite, Vila Nova de Gaia',
        lat: 41.1375,
        lng: -8.6141,
        time_offset_minutes: -15,
        notes: 'Junto ao teleférico'
      }
    ]
  },
  {
    id: 'r-2',
    operator_id: 'op-123',
    name: 'Rota Norte (Braga/Guimarães)',
    description: 'Transferências de cidades periféricas',
    default_start_point: 'Aeroporto OPO',
    distance_km: 80,
    estimated_duration_min: 60,
    created_at: '2025-02-15',
    pickup_points: [
      {
        id: 'p-4',
        name: 'Braga Centro',
        address: 'Praça da República, Braga',
        lat: 41.5518,
        lng: -8.4229,
        time_offset_minutes: -90,
      },
      {
        id: 'p-5',
        name: 'Guimarães Shopping',
        address: 'Alameda Dr. Mariano Felgueiras',
        lat: 41.4416,
        lng: -8.2963,
        time_offset_minutes: -60,
      }
    ]
  }
];

export const MOCK_TOURS: Tour[] = [
  {
    id: 't-1',
    operator_id: 'op-123',
    name: 'Douro Vinhateiro Premium',
    slug: 'douro-vinhateiro',
    tour_type: 'day_trip',
    duration_days: 1,
    duration_hours: 8,
    base_price: 120.00,
    status: 'active',
    categories: ['Vinho', 'Natureza', 'Premium'],
    featured_image: 'https://images.unsplash.com/photo-1571406604297-b86129994c50?auto=format&fit=crop&q=80&w=800',
    description: 'Um dia inesquecível pelo coração do Douro com prova de vinhos e almoço típico.',
    min_passengers: 4
  },
  {
    id: 't-2',
    operator_id: 'op-123',
    name: 'Porto City Tour',
    slug: 'porto-city',
    tour_type: 'day_trip',
    duration_days: 1,
    duration_hours: 4,
    base_price: 45.00,
    status: 'active',
    categories: ['Cultura', 'Urbano'],
    featured_image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&q=80&w=800',
    min_passengers: 2
  },
  {
    id: 't-3',
    operator_id: 'op-123',
    name: 'Gerês Nature & Falls',
    slug: 'geres-nature',
    tour_type: 'day_trip',
    duration_days: 1,
    duration_hours: 9,
    base_price: 85.00,
    status: 'draft',
    categories: ['Natureza', 'Aventura'],
    featured_image: 'https://images.unsplash.com/photo-1533284133458-7c8bb17c4617?auto=format&fit=crop&q=80&w=800',
    min_passengers: 4
  },
  {
    id: 't-4',
    operator_id: 'op-123',
    name: 'Rota do Românico - 3 Dias',
    slug: 'rota-romanico',
    tour_type: 'multi_day',
    duration_days: 3,
    duration_hours: 72,
    base_price: 450.00,
    status: 'active',
    categories: ['História', 'Cultural'],
    featured_image: 'https://images.unsplash.com/photo-1548662891-628d68961724?auto=format&fit=crop&q=80&w=800',
    min_passengers: 6
  }
];

export const MOCK_DEPARTURES: Departure[] = [
  {
    id: 'd-1',
    tour_id: 't-1',
    operator_id: 'op-123',
    departure_date: '2025-05-15',
    departure_time: '09:00',
    total_capacity: 20,
    booked_seats: 12,
    status: 'confirmed',
    min_passengers: 4,
    tour: MOCK_TOURS[0],
    coach_id: 'c-2'
  },
  {
    id: 'd-2',
    tour_id: 't-1',
    operator_id: 'op-123',
    departure_date: '2025-05-16',
    departure_time: '09:00',
    total_capacity: 20,
    booked_seats: 4,
    status: 'scheduled',
    min_passengers: 4,
    tour: MOCK_TOURS[0]
  },
  {
    id: 'd-3',
    tour_id: 't-2',
    operator_id: 'op-123',
    departure_date: '2025-05-15',
    departure_time: '14:00',
    total_capacity: 50,
    booked_seats: 35,
    status: 'confirmed',
    min_passengers: 10,
    tour: MOCK_TOURS[1],
    coach_id: 'c-1'
  },
  {
    id: 'd-4',
    tour_id: 't-4',
    operator_id: 'op-123',
    departure_date: '2025-05-20',
    departure_time: '08:00',
    return_date: '2025-05-22',
    total_capacity: 16,
    booked_seats: 0,
    status: 'scheduled',
    min_passengers: 6,
    tour: MOCK_TOURS[3]
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    operator_id: 'op-123',
    full_name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+351 912 345 678',
    country: 'Portugal',
    city: 'Lisboa',
    total_bookings: 3,
    total_spent: 450.00,
    last_booking_date: '2025-05-10',
    tags: ['VIP', 'Frequente'],
    source: 'website',
    created_at: '2024-01-15',
    avatar_url: 'https://i.pravatar.cc/150?u=1',
    preferences: { seat: 'window', language: 'Português' }
  },
  {
    id: 'cust-2',
    operator_id: 'op-123',
    full_name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+44 7700 900077',
    country: 'Reino Unido',
    city: 'London',
    total_bookings: 1,
    total_spent: 120.00,
    last_booking_date: '2025-04-20',
    tags: ['Novo'],
    source: 'agent',
    created_at: '2025-04-10',
    avatar_url: 'https://i.pravatar.cc/150?u=2',
    preferences: { language: 'English' }
  },
  {
    id: 'cust-3',
    operator_id: 'op-123',
    full_name: 'Pierre Dubois',
    email: 'pierre@email.fr',
    phone: '+33 6 12 34 56 78',
    country: 'França',
    city: 'Paris',
    total_bookings: 2,
    total_spent: 240.50,
    last_booking_date: '2025-03-15',
    tags: [],
    source: 'website',
    created_at: '2025-02-01',
    avatar_url: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: 'cust-4',
    operator_id: 'op-123',
    full_name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '+351 933 444 555',
    country: 'Portugal',
    city: 'Porto',
    total_bookings: 5,
    total_spent: 890.00,
    last_booking_date: '2025-05-01',
    tags: ['VIP', 'Local'],
    source: 'phone',
    created_at: '2023-11-20',
    avatar_url: 'https://i.pravatar.cc/150?u=4'
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-1',
    booking_reference: 'TF-2025-001',
    customer_name: 'Maria Santos',
    customer_id: 'cust-1',
    customer_email: 'maria.santos@email.com',
    customer_phone: '+351 912 345 678',
    tour_name: 'Douro Vinhateiro',
    tour_id: 't-1',
    departure_date: '2025-05-15',
    departure_time: '09:00',
    amount: 150.00,
    status: 'confirmed',
    created_at: '2025-05-10T10:00:00Z',
    payment_status: 'paid',
    source: 'website',
    pickup_point: 'Estação Campanhã',
    pickup_time: '08:00',
    passengers: [
      { firstName: 'Maria', lastName: 'Santos', type: 'adult', seatId: '1A', checkedIn: true },
      { firstName: 'Pedro', lastName: 'Santos', type: 'adult', seatId: '1B' }
    ]
  },
  {
    id: 'bk-2',
    booking_reference: 'TF-2025-002',
    customer_name: 'António Costa',
    customer_email: 'antonio@email.com',
    customer_phone: '+351 911 222 333',
    tour_name: 'Porto City Tour',
    tour_id: 't-2',
    departure_date: '2025-05-15',
    departure_time: '14:00',
    amount: 45.00,
    status: 'paid',
    created_at: '2025-05-10T11:30:00Z',
    payment_status: 'paid',
    source: 'website',
    pickup_point: 'Aliados (Mc)',
    pickup_time: '13:45',
    passengers: [
      { firstName: 'António', lastName: 'Costa', type: 'adult', seatId: '3A' }
    ]
  },
  {
    id: 'bk-3',
    booking_reference: 'TF-2025-003',
    customer_name: 'Sarah Smith',
    customer_id: 'cust-6', // non-existent user profile
    customer_email: 'sarah.smith@email.uk',
    customer_phone: '+44 789 456 123',
    tour_name: 'Gerês Nature',
    tour_id: 't-3',
    departure_date: '2025-05-16',
    departure_time: '09:00',
    amount: 85.00,
    status: 'pending',
    created_at: '2025-05-11T09:15:00Z',
    payment_status: 'pending',
    source: 'website',
    pickup_point: 'Hotel pickup',
    passengers: [
      { firstName: 'Sarah', lastName: 'Smith', type: 'adult' }
    ]
  },
  {
    id: 'bk-4',
    booking_reference: 'TF-2025-004',
    customer_name: 'Grupo Escolar 5ºB',
    customer_email: 'escola@email.pt',
    customer_phone: '+351 222 333 444',
    tour_name: 'Braga Romana',
    tour_id: 't-1', // Assuming mapped to tour
    departure_date: '2025-05-20',
    departure_time: '08:30',
    amount: 450.00,
    status: 'confirmed',
    created_at: '2025-05-12T14:20:00Z',
    payment_status: 'partially_paid',
    source: 'manual',
    notes: 'Pagamento restante no dia',
    passengers: [
       { firstName: 'Prof.', lastName: 'Silva', type: 'adult' },
       { firstName: 'João', lastName: 'Aluno', type: 'child' },
       { firstName: 'Ana', lastName: 'Aluno', type: 'child' },
       // ... simplified list
    ]
  },
  {
    id: 'bk-5',
    booking_reference: 'TF-2025-005',
    customer_name: 'Pierre Dubois',
    customer_id: 'cust-3',
    customer_email: 'pierre@email.fr',
    customer_phone: '+33 6 12 34 56 78',
    tour_name: 'Douro Vinhateiro',
    tour_id: 't-1',
    departure_date: '2025-05-15',
    departure_time: '09:00',
    amount: 240.00,
    status: 'cancelled',
    created_at: '2025-05-01T10:00:00Z',
    payment_status: 'refunded',
    source: 'website',
    passengers: [
      { firstName: 'Pierre', lastName: 'Dubois', type: 'adult' },
      { firstName: 'Marie', lastName: 'Dubois', type: 'adult' }
    ]
  }
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'ag-1',
    operator_id: 'op-123',
    company_name: 'Viagens Norte',
    contact_name: 'Ana Silva',
    email: 'ana@viagensnorte.pt',
    phone: '+351 222 333 444',
    nif: '500123456',
    status: 'active',
    commission_model: 'percentage',
    commission_rate: 15,
    total_sales: 12500.00,
    pending_commission: 450.00,
    created_at: '2024-02-10'
  },
  {
    id: 'ag-2',
    operator_id: 'op-123',
    company_name: 'Porto Experience',
    contact_name: 'Carlos Oliveira',
    email: 'carlos@portoexp.com',
    phone: '+351 912 345 678',
    nif: '500987654',
    status: 'active',
    commission_model: 'percentage',
    commission_rate: 10,
    total_sales: 4500.00,
    pending_commission: 120.00,
    created_at: '2024-03-15'
  },
  {
    id: 'ag-3',
    operator_id: 'op-123',
    company_name: 'Hotel Ribeira',
    contact_name: 'Recepção',
    email: 'info@hotelribeira.pt',
    phone: '+351 223 334 445',
    nif: '500555444',
    status: 'pending',
    commission_model: 'net_rate',
    commission_rate: 0,
    total_sales: 0,
    pending_commission: 0,
    created_at: '2025-05-10'
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoice_number: 'FT 2025/123',
    customer_name: 'Maria Santos',
    customer_nif: '234567890',
    amount: 150.00,
    tax_amount: 34.50,
    date: '2025-05-10',
    due_date: '2025-05-10',
    status: 'paid',
    items: [{ description: 'Douro Vinhateiro x2', quantity: 2, unit_price: 75.00 }]
  },
  {
    id: 'inv-2',
    invoice_number: 'FT 2025/124',
    customer_name: 'António Costa',
    customer_nif: '123456789',
    amount: 45.00,
    tax_amount: 10.35,
    date: '2025-05-10',
    due_date: '2025-05-10',
    status: 'paid',
    items: [{ description: 'Porto City Tour x1', quantity: 1, unit_price: 45.00 }]
  },
  {
    id: 'inv-3',
    invoice_number: 'FT 2025/125',
    customer_name: 'Grupo Escolar 5ºB',
    customer_nif: '500111222',
    amount: 450.00,
    tax_amount: 103.50,
    date: '2025-05-12',
    due_date: '2025-05-20',
    status: 'pending',
    items: [{ description: 'Excursão Braga Romana', quantity: 30, unit_price: 15.00 }]
  }
];

export const MOCK_REVENUE_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Abr', value: 9000 },
  { name: 'Mai', value: 12450 },
  { name: 'Jun', value: 8000 },
];

export const MOCK_CHANNEL_DATA = [
    { name: 'Website', value: 65, color: '#6366F1' },
    { name: 'Agentes', value: 20, color: '#10B981' },
    { name: 'Telefone', value: 10, color: '#F59E0B' },
    { name: 'Balcão', value: 5, color: '#8B5CF6' },
];

export const MOCK_TEMPLATES: MessageTemplate[] = [
  {
    id: 'tpl-1',
    operator_id: 'op-123',
    name: 'Confirmação Reserva (PT)',
    channel: 'email',
    category: 'confirmation',
    subject: 'Reserva Confirmada - {{tour_name}}',
    content: 'Olá {{customer_name}},\n\nA sua reserva para {{tour_name}} no dia {{departure_date}} está confirmada.\n\nDetalhes:\nReferência: {{booking_reference}}\nPonto de Encontro: {{pickup_point}}\n\nAté breve!',
    variables: ['customer_name', 'tour_name', 'departure_date', 'booking_reference', 'pickup_point']
  },
  {
    id: 'tpl-2',
    operator_id: 'op-123',
    name: 'Lembrete 24h (SMS)',
    channel: 'sms',
    category: 'reminder',
    content: 'Olá {{customer_name}}, lembramos que o seu tour {{tour_name}} é amanhã às {{departure_time}}. Por favor esteja no local 10min antes.',
    variables: ['customer_name', 'tour_name', 'departure_time']
  }
];

export const MOCK_MESSAGES: MessageLog[] = [
  {
    id: 'msg-1',
    booking_id: 'bk-1',
    customer_name: 'Maria Santos',
    channel: 'email',
    template_name: 'Confirmação Reserva (PT)',
    sent_at: '2025-05-10T10:05:00',
    status: 'read',
    content_preview: 'Olá Maria Santos, A sua reserva para Douro Vinhateiro...'
  },
  {
    id: 'msg-2',
    booking_id: 'bk-2',
    customer_name: 'António Costa',
    channel: 'sms',
    template_name: 'Lembrete 24h (SMS)',
    sent_at: '2025-05-14T09:00:00',
    status: 'delivered',
    content_preview: 'Olá António Costa, lembramos que o seu tour...'
  }
];

export const MOCK_AUTOMATIONS: AutomationRule[] = [
  {
    id: 'auto-1',
    name: 'Enviar Confirmação Email',
    active: true,
    trigger_type: 'booking_created',
    channel: 'email',
    template_id: 'tpl-1'
  },
  {
    id: 'auto-2',
    name: 'Lembrete SMS 24h',
    active: true,
    trigger_type: 'before_departure',
    trigger_value: 24,
    channel: 'sms',
    template_id: 'tpl-2'
  }
];
