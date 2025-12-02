
import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MOCK_AGENTS, MOCK_BOOKINGS } from '../../services/mockData';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { TrendingUp, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AgentHome: React.FC = () => {
  const navigate = useNavigate();
  // Simulating the logged-in agent
  const currentAgent = MOCK_AGENTS[0]; 
  
  // Filter bookings for this agent (mock logic)
  const myBookings = MOCK_BOOKINGS.filter(b => b.source === 'agent').slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Section */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
         <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Olá, {currentAgent.contact_name}</h1>
            <p className="text-gray-500">
               Bem-vindo ao portal de parceiros. A sua comissão atual é de <span className="font-bold text-indigo-600">{currentAgent.commission_rate}%</span>.
            </p>
         </div>
         <div className="flex gap-3 w-full md:w-auto">
            <Button onClick={() => navigate('/agent/bookings')} variant="outline" className="flex-1 md:flex-none">
               Ver Histórico
            </Button>
            <Button onClick={() => navigate('/p/vertical-tur')} className="flex-1 md:flex-none">
               Reservar Agora
            </Button>
         </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-white/20 rounded-lg">
                  <TrendingUp size={24} className="text-white" />
               </div>
               <div>
                  <p className="text-indigo-100 text-sm font-medium">Vendas Totais</p>
                  <p className="text-2xl font-bold">€{currentAgent.total_sales.toFixed(2)}</p>
               </div>
            </div>
         </Card>
         
         <Card>
            <div className="flex items-center gap-4">
               <div className="p-3 bg-green-100 rounded-lg text-green-600">
                  <DollarSign size={24} />
               </div>
               <div>
                  <p className="text-gray-500 text-sm font-medium">Comissão Pendente</p>
                  <p className="text-2xl font-bold text-gray-900">€{currentAgent.pending_commission.toFixed(2)}</p>
               </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
               <button className="text-sm text-indigo-600 font-medium hover:underline">Solicitar Pagamento</button>
            </div>
         </Card>

         <Card>
            <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <Calendar size={24} />
               </div>
               <div>
                  <p className="text-gray-500 text-sm font-medium">Reservas este mês</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
               </div>
            </div>
         </Card>
      </div>

      {/* Recent Bookings */}
      <div>
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Últimas Reservas</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/agent/bookings')}>Ver todas</Button>
         </div>
         
         <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referência</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tour</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comissão</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                  {myBookings.length > 0 ? myBookings.map(booking => (
                     <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600 font-medium">
                           {booking.booking_reference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                           {booking.customer_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                           {booking.tour_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                           {new Date(booking.departure_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                           €{booking.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                           €{(booking.amount * (currentAgent.commission_rate / 100)).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           <StatusBadge status={booking.status} />
                        </td>
                     </tr>
                  )) : (
                     <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                           Ainda não tem reservas registadas.
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
