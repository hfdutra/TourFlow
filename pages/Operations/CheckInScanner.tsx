import React, { useState } from 'react';
import { MOCK_BOOKINGS, MOCK_DEPARTURES } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { QrCode, Search, CheckCircle, User, MapPin, ArrowLeft, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CheckInScanner: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'scanner' | 'list'>('list');
  const [selectedDepartureId, setSelectedDepartureId] = useState(MOCK_DEPARTURES[0]?.id);

  // Filter bookings for the selected departure (mock logic, ideally filtering by departure_date/id)
  const departureBookings = MOCK_BOOKINGS.filter(b => b.status === 'confirmed' || b.status === 'paid');

  const filteredBookings = departureBookings.filter(b => 
    b.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScan = () => {
    // Simulation of camera scan
    alert('A câmara seria ativada aqui. Simulação: Reserva TF-2025-001 encontrada.');
    setSearchTerm('TF-2025-001');
    setActiveTab('list');
  };

  const handleCheckIn = (bookingId: string, paxIndex: number) => {
     // Mock update logic
     alert(`Passageiro ${paxIndex + 1} da reserva ${bookingId} marcado como presente.`);
  };

  return (
    <div className="space-y-4 animate-in fade-in pb-20 max-w-lg mx-auto">
      {/* Mobile Header */}
      <div className="flex items-center gap-3 py-2">
         <button onClick={() => navigate('/dashboard')} className="p-2 bg-gray-100 rounded-full text-gray-600">
            <ArrowLeft size={20} />
         </button>
         <div>
            <h1 className="text-xl font-bold text-gray-900">Check-in</h1>
            <p className="text-xs text-gray-500">Operações de Embarque</p>
         </div>
      </div>

      {/* Departure Selector */}
      <Card className="bg-primary text-white border-none">
         <div className="flex justify-between items-start mb-2">
            <div>
               <p className="text-primary-100 text-xs uppercase font-bold">Próxima Partida</p>
               <h3 className="font-bold text-lg">Douro Vinhateiro</h3>
            </div>
            <Badge className="bg-white/20 text-white border-none">09:00</Badge>
         </div>
         <div className="flex gap-4 text-sm text-primary-100">
            <div className="flex items-center gap-1">
               <User size={14} /> 12/20 Pax
            </div>
            <div className="flex items-center gap-1">
               <MapPin size={14} /> Cais de Gaia
            </div>
         </div>
      </Card>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-lg">
         <button 
           className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 ${activeTab === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
           onClick={() => setActiveTab('list')}
         >
            <Search size={16} /> Lista Manual
         </button>
         <button 
           className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 ${activeTab === 'scanner' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
           onClick={() => setActiveTab('scanner')}
         >
            <QrCode size={16} /> Scanner QR
         </button>
      </div>

      {activeTab === 'scanner' && (
         <div className="bg-black rounded-xl h-80 flex flex-col items-center justify-center text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 border-2 border-primary opacity-50 m-12 rounded-lg animate-pulse"></div>
            <Camera size={48} className="mb-4 text-gray-400" />
            <p className="font-bold mb-2">Aponte a câmara</p>
            <p className="text-sm text-gray-400">Enquadre o código QR do voucher do cliente.</p>
            <Button className="mt-6" onClick={handleScan}>Simular Leitura</Button>
         </div>
      )}

      {activeTab === 'list' && (
         <div className="space-y-4">
            <div className="relative">
               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Pesquisar passageiro..."
                 className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none"
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
            </div>

            <div className="space-y-3">
               {filteredBookings.map(booking => (
                  <div key={booking.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                     <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-gray-600">{booking.booking_reference}</span>
                        <StatusBadge status={booking.payment_status} />
                     </div>
                     <div className="p-4">
                        <div className="font-bold text-gray-900 mb-1">{booking.customer_name}</div>
                        <div className="text-sm text-gray-500 mb-3">{booking.passengers.length} Passageiros • {booking.pickup_point}</div>
                        
                        <div className="space-y-2">
                           {booking.passengers.map((pax, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100">
                                 <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                       {idx + 1}
                                    </div>
                                    <span className="text-sm font-medium">{pax.firstName} {pax.lastName}</span>
                                    <span className="text-xs text-gray-400">({pax.type})</span>
                                 </div>
                                 <button 
                                   onClick={() => handleCheckIn(booking.id, idx)}
                                   className={`p-1.5 rounded-full ${pax.checkedIn ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400 hover:bg-primary hover:text-white'}`}
                                 >
                                    <CheckCircle size={20} />
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
               {filteredBookings.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                     Nenhum passageiro encontrado.
                  </div>
               )}
            </div>
         </div>
      )}
    </div>
  );
};