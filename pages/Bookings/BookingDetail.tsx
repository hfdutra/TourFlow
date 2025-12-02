
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_BOOKINGS } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  ArrowLeft, Calendar, User, Mail, Phone, MapPin, 
  CreditCard, Printer, Send, XCircle, CheckSquare
} from 'lucide-react';

export const BookingDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = MOCK_BOOKINGS.find(b => b.id === id);

  if (!booking) return <div>Reserva não encontrada</div>;

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 border-b border-gray-200 pb-4">
         <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard/bookings')} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
               <ArrowLeft size={20} />
            </button>
            <div>
               <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">{booking.booking_reference}</h1>
                  <StatusBadge status={booking.status} />
               </div>
               <p className="text-sm text-gray-500">
                 Criada em {new Date(booking.created_at).toLocaleString('pt-PT')} via {booking.source}
               </p>
            </div>
         </div>
         <div className="flex gap-3">
            <Button variant="outline">
               <Printer size={16} className="mr-2" /> Voucher
            </Button>
            <Button variant="outline">
               <Send size={16} className="mr-2" /> Reenviar Email
            </Button>
            {booking.status !== 'cancelled' && (
              <Button variant="danger" size="sm">
                 <XCircle size={16} className="mr-2" /> Cancelar
              </Button>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Tour & Departure Info */}
            <Card>
               <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Calendar size={18} /> Detalhes da Viagem
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <p className="text-xs text-gray-500 uppercase font-bold mb-1">Tour</p>
                     <p className="font-medium text-gray-900">{booking.tour_name}</p>
                     <p className="text-sm text-gray-500">ID: {booking.tour_id}</p>
                  </div>
                  <div>
                     <p className="text-xs text-gray-500 uppercase font-bold mb-1">Partida</p>
                     <p className="font-medium text-gray-900">
                        {new Date(booking.departure_date).toLocaleDateString('pt-PT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                     </p>
                     <p className="text-sm text-gray-500">{booking.departure_time}</p>
                  </div>
                  <div>
                     <p className="text-xs text-gray-500 uppercase font-bold mb-1">Ponto de Recolha</p>
                     <div className="flex items-center gap-2 text-gray-900">
                        <MapPin size={16} className="text-primary" />
                        <span className="font-medium">{booking.pickup_point}</span>
                     </div>
                     <p className="text-sm text-gray-500 pl-6">{booking.pickup_time}</p>
                  </div>
                  {booking.notes && (
                    <div className="col-span-2 bg-yellow-50 p-3 rounded border border-yellow-100">
                       <p className="text-xs text-yellow-700 uppercase font-bold mb-1">Notas Internas</p>
                       <p className="text-sm text-yellow-800">{booking.notes}</p>
                    </div>
                  )}
               </div>
            </Card>

            {/* Passengers (Manifest) */}
            <Card>
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                     <User size={18} /> Passageiros ({booking.passengers.length})
                  </h3>
                  <Button variant="ghost" size="sm">Editar Lista</Button>
               </div>
               
               <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Lugar</th>
                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-in</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200 bg-white">
                        {booking.passengers.map((pax, i) => (
                           <tr key={i}>
                              <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                                 {pax.firstName} {pax.lastName}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500 capitalize">{pax.type}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                                 {pax.seatId || '-'}
                              </td>
                              <td className="px-4 py-3">
                                 {pax.checkedIn ? (
                                    <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded">
                                       <CheckSquare size={12} /> Checked-in
                                    </span>
                                 ) : (
                                    <button className="text-gray-400 hover:text-primary text-xs border border-gray-300 px-2 py-1 rounded">
                                       Marcar
                                    </button>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </Card>
         </div>

         {/* Sidebar: Customer & Payment */}
         <div className="lg:col-span-1 space-y-6">
            
            {/* Customer Card */}
            <Card>
               <h3 className="font-bold mb-4 text-sm text-gray-500 uppercase">Cliente</h3>
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                     {booking.customer_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                     <p className="font-bold text-gray-900">{booking.customer_name}</p>
                     <p className="text-xs text-gray-500">ID: {booking.customer_id || 'N/A'}</p>
                  </div>
               </div>
               <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                     <Mail size={16} /> {booking.customer_email || 'Não disponível'}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                     <Phone size={16} /> {booking.customer_phone || 'Não disponível'}
                  </div>
               </div>
               <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => booking.customer_id && navigate(`/dashboard/customers/${booking.customer_id}`)}>
                     Ver Perfil Completo
                  </Button>
               </div>
            </Card>

            {/* Payment Info */}
            <Card>
               <h3 className="font-bold mb-4 text-sm text-gray-500 uppercase">Pagamento</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-gray-600 text-sm">Estado</span>
                     <StatusBadge status={booking.payment_status} />
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-gray-600 text-sm">Método</span>
                     <span className="text-sm font-medium flex items-center gap-1">
                        <CreditCard size={14} /> Cartão Crédito
                     </span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3 mt-2">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600 text-sm">Subtotal</span>
                        <span className="text-gray-900 text-sm">€{booking.amount.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between items-center font-bold text-lg mt-2">
                        <span>Total</span>
                        <span className="text-primary">€{booking.amount.toFixed(2)}</span>
                     </div>
                  </div>

                  {booking.payment_status !== 'paid' && (
                     <Button className="w-full">Registar Pagamento</Button>
                  )}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};
