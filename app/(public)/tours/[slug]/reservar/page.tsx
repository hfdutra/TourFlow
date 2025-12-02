'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct hook for App Router
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Calendar,
  User,
  MapPin,
  CheckCircle,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  AlertCircle
} from 'lucide-react';
import { getTourBySlug, getDeparturesByTour } from '@/lib/supabase';
import { MOCK_ROUTES } from '@/services/mockData'; // Still using mock data directly for complex objects
import type { Tour, Departure, Passenger } from '@/types';

// --- Types ---
// Reusing types from global types file or defining local state types

// --- Step Components (Inline for now to facilitate porting) ---

const StepDeparture = ({
  departures,
  onSelect,
  selectedId
}: {
  departures: Departure[],
  onSelect: (dep: Departure) => void, 
  selectedId?: string 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg mb-4">Selecione uma data</h3>
      {departures.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Não existem partidas agendadas para este tour.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {departures.map(dep => {
            const isSelected = dep.id === selectedId;
            const available = dep.total_capacity - dep.booked_seats;
            return (
              <div 
                key={dep.id} 
                onClick={() => onSelect(dep)}
                className={`
                  p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center
                  ${isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 bg-white'}
                `}
              >
                <div>
                   <div className="font-bold text-gray-900">
                     {new Date(dep.departure_date).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
                   </div>
                   <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                     <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">{dep.departure_time}</span>
                     {available < 5 && <span className="text-red-500 text-xs font-medium">Apenas {available} lugares!</span>}
                   </div>
                </div>
                <div className="text-right">
                   {isSelected && <CheckCircle className="text-primary" size={24} />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const StepPassengers = ({
  passengers,
  onChange
}: {
  passengers: Passenger[],
  onChange: (pax: Passenger[]) => void
}) => {
  
  const addPassenger = (type: Passenger['type']) => {
    onChange([...passengers, { type, firstName: '', lastName: '' }]);
  };

  const removePassenger = (index: number) => {
    const newPax = [...passengers];
    newPax.splice(index, 1);
    onChange(newPax);
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const newPax = [...passengers];
    newPax[index] = { ...newPax[index], [field]: value };
    onChange(newPax);
  };

  return (
    <div className="space-y-6">
       <div className="flex gap-4 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" onClick={() => addPassenger('adult')}>+ Adulto</Button>
          <Button variant="outline" size="sm" onClick={() => addPassenger('child')}>+ Criança</Button>
          <Button variant="outline" size="sm" onClick={() => addPassenger('senior')}>+ Sénior</Button>
       </div>

       {passengers.length === 0 ? (
         <div className="text-center py-8 bg-gray-50 rounded border border-dashed border-gray-200 text-gray-500">
            Adicione passageiros para continuar.
         </div>
       ) : (
         <div className="space-y-4">
           {passengers.map((pax, idx) => (
             <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
                <div className="flex justify-between items-center mb-3">
                   <Badge className="capitalize">{pax.type === 'adult' ? 'Adulto' : pax.type === 'child' ? 'Criança' : 'Sénior'}</Badge>
                   <button onClick={() => removePassenger(idx)} className="text-xs text-red-500 hover:underline">Remover</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <Input 
                     placeholder="Nome Próprio" 
                     value={pax.firstName}
                     onChange={(e) => updatePassenger(idx, 'firstName', e.target.value)}
                     className="text-sm"
                   />
                   <Input 
                     placeholder="Apelido" 
                     value={pax.lastName}
                     onChange={(e) => updatePassenger(idx, 'lastName', e.target.value)}
                     className="text-sm"
                   />
                </div>
             </div>
           ))}
         </div>
       )}
    </div>
  );
};

const StepPickup = ({
  onSelect,
  selectedId
}: {
  onSelect: (id: string) => void,
  selectedId?: string
}) => {
  // In a real app, we would fetch routes associated with the selected departure
  const route = MOCK_ROUTES[0];

  return (
    <div className="space-y-4">
       <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-sm text-blue-800">
          <MapPin size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Rota: {route.name}</p>
            <p className="opacity-80">Selecione o local onde pretende iniciar a viagem.</p>
          </div>
       </div>

       <div className="space-y-2">
          {route.pickup_points.map(point => {
             const isSelected = point.id === selectedId;
             return (
               <div 
                 key={point.id}
                 onClick={() => onSelect(point.id)}
                 className={`
                    p-4 rounded-lg border cursor-pointer flex items-center gap-3 transition-colors
                    ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/30'}
                 `}
               >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
                     {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div className="flex-1">
                     <p className="font-medium text-gray-900">{point.name}</p>
                     <p className="text-xs text-gray-500">{point.address}</p>
                  </div>
                  <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                     {point.time_offset_minutes}m
                  </div>
               </div>
             );
          })}
       </div>
    </div>
  );
};

// --- Page Component ---

export default function BookingPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(true);

  // State
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    departure: null as Departure | null,
    passengers: [] as Passenger[],
    pickupId: '',
    customer: { name: '', email: '', phone: '' }
  });

  useEffect(() => {
    // Client-side data fetching for now
    const loadData = async () => {
      const t = await getTourBySlug(params.slug);
      if (t) {
        setTour(t as unknown as Tour); // Type casting due to strict checks
        const d = await getDeparturesByTour(t.id);
        setDepartures(d as unknown as Departure[]);
      }
      setLoading(false);
    };
    loadData();
  }, [params.slug]);

  if (loading) return <div className="p-10 text-center">A carregar...</div>;
  if (!tour) return <div className="p-10 text-center">Tour não encontrado.</div>;

  const totalAmount = bookingData.passengers.reduce((acc, pax) => {
    let price = tour?.base_price || 0;
    if (pax.type === 'child') price *= 0.7;
    return acc + price;
  }, 0);

  const canProceed = () => {
    if (step === 1) return !!bookingData.departure;
    if (step === 2) return bookingData.passengers.length > 0 && bookingData.passengers.every(p => p.firstName && p.lastName);
    if (step === 3) return !!bookingData.pickupId;
    if (step === 4) return !!bookingData.customer.name && !!bookingData.customer.email;
    return true;
  };

  const handleNext = () => {
    if (canProceed()) {
      if (step === 4) {
        // Submit logic would go here
        alert('Reserva efetuada com sucesso! (Simulação)');
        router.push('/');
      } else {
        setStep(step + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-20">
      
      {/* Header / Progress */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reservar: {tour.name}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
           <span className={step >= 1 ? 'text-primary font-bold' : ''}>1. Data</span>
           <ChevronRight size={14} />
           <span className={step >= 2 ? 'text-primary font-bold' : ''}>2. Passageiros</span>
           <ChevronRight size={14} />
           <span className={step >= 3 ? 'text-primary font-bold' : ''}>3. Recolha</span>
           <ChevronRight size={14} />
           <span className={step >= 4 ? 'text-primary font-bold' : ''}>4. Pagamento</span>
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4 overflow-hidden">
           <div className="bg-primary h-full transition-all duration-300" style={{ width: `${step * 25}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Steps Content */}
        <div className="lg:col-span-2 space-y-6">
           {step === 1 && (
             <StepDeparture 
               departures={departures}
               selectedId={bookingData.departure?.id}
               onSelect={(dep) => setBookingData({...bookingData, departure: dep})}
             />
           )}

           {step === 2 && (
             <StepPassengers 
               passengers={bookingData.passengers}
               onChange={(pax) => setBookingData({...bookingData, passengers: pax})}
             />
           )}

           {step === 3 && (
             <StepPickup 
               onSelect={(id) => setBookingData({...bookingData, pickupId: id})}
               selectedId={bookingData.pickupId}
             />
           )}

           {step === 4 && (
             <div className="space-y-6">
                <Card>
                   <h3 className="font-bold mb-4 flex items-center gap-2">
                     <User size={20} /> Os seus dados
                   </h3>
                   <div className="space-y-4">
                      <Input 
                        label="Nome Completo" 
                        value={bookingData.customer.name}
                        onChange={(e) => setBookingData({...bookingData, customer: {...bookingData.customer, name: e.target.value}})}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input 
                          label="Email" 
                          type="email"
                          value={bookingData.customer.email}
                          onChange={(e) => setBookingData({...bookingData, customer: {...bookingData.customer, email: e.target.value}})}
                        />
                        <Input 
                          label="Telemóvel" 
                          type="tel"
                          value={bookingData.customer.phone}
                          onChange={(e) => setBookingData({...bookingData, customer: {...bookingData.customer, phone: e.target.value}})}
                        />
                      </div>
                   </div>
                </Card>

                <Card className="bg-gray-50 border-gray-200">
                   <h3 className="font-bold mb-4 flex items-center gap-2">
                     <CreditCard size={20} /> Pagamento
                   </h3>
                   <div className="p-4 border border-blue-200 bg-blue-50 rounded text-sm text-blue-800 flex items-center gap-3 mb-4">
                      <AlertCircle size={20} />
                      <p>Nesta demonstração, nenhum pagamento será processado.</p>
                   </div>
                   <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 border border-gray-300 rounded bg-white cursor-pointer">
                         <input type="radio" name="payment" defaultChecked className="text-primary focus:ring-primary" />
                         <span className="font-medium">Cartão de Crédito</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-gray-300 rounded bg-white cursor-pointer">
                         <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                         <span className="font-medium">MBWay</span>
                      </label>
                   </div>
                </Card>
             </div>
           )}

           {/* Navigation Buttons */}
           <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                   <ChevronLeft size={16} className="mr-2" /> Anterior
                </Button>
              ) : (
                <div />
              )}
              
              <Button 
                 onClick={handleNext} 
                 disabled={!canProceed()}
                 className={!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}
              >
                 {step === 4 ? 'Confirmar Reserva' : 'Continuar'} <ChevronRight size={16} className="ml-2" />
              </Button>
           </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
           <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Resumo da Reserva</h3>
              
              <div className="space-y-4 text-sm">
                 <div className="pb-4 border-b border-gray-100">
                    <p className="text-gray-500 text-xs uppercase font-bold mb-1">Experiência</p>
                    <p className="font-semibold text-primary">{tour.name}</p>
                 </div>

                 {bookingData.departure && (
                   <div className="pb-4 border-b border-gray-100">
                      <p className="text-gray-500 text-xs uppercase font-bold mb-1">Data e Hora</p>
                      <p className="font-medium">{new Date(bookingData.departure.departure_date).toLocaleDateString('pt-PT')}</p>
                      <p className="text-gray-600">{bookingData.departure.departure_time}</p>
                   </div>
                 )}

                 {bookingData.passengers.length > 0 && (
                   <div className="pb-4 border-b border-gray-100">
                      <p className="text-gray-500 text-xs uppercase font-bold mb-1">Passageiros</p>
                      <div className="space-y-1">
                         {bookingData.passengers.map((p, i) => (
                           <div key={i} className="flex justify-between">
                              <span className="capitalize text-gray-600">{p.type}</span>
                              {p.type === 'child' ? (
                                <span className="font-mono">€{(tour.base_price * 0.7).toFixed(2)}</span>
                              ) : (
                                <span className="font-mono">€{tour.base_price}</span>
                              )}
                           </div>
                         ))}
                      </div>
                   </div>
                 )}
                 
                 <div className="pt-2 flex justify-between items-end">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary">€{totalAmount.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
