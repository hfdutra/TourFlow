
import React, { useState } from 'react';
import { MOCK_BOOKINGS, MOCK_AGENTS } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AgentBookings: React.FC = () => {
  const navigate = useNavigate();
  const currentAgent = MOCK_AGENTS[0];
  const [searchTerm, setSearchTerm] = useState('');

  // In a real app, this would filter by bookings where agent_id === currentAgent.id
  // For mock, we filter by source='agent'
  const agentBookings = MOCK_BOOKINGS.filter(b => 
    b.source === 'agent' && 
    (b.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) || 
     b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Reservas</h1>
          <p className="text-gray-500">Consulte o histórico e o estado das suas reservas.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" /> Exportar
          </Button>
          <Button onClick={() => navigate('/p/vertical-tur')}>
            <Plus size={18} className="mr-2" /> Nova Reserva
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Pesquisar por referência ou cliente..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <Button variant="outline" className="text-gray-600">
           <Filter size={18} className="mr-2" /> Filtros
         </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referência</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour / Data</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passageiros</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sua Comissão</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agentBookings.map(booking => (
              <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-medium text-indigo-600">{booking.booking_reference}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.customer_name}</div>
                  <div className="text-xs text-gray-500">{booking.customer_email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.tour_name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(booking.departure_date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.passengers.length} pax
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">Voucher</Button>
                </td>
              </tr>
            ))}
            {agentBookings.length === 0 && (
               <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500 bg-gray-50">
                     Nenhuma reserva encontrada para os filtros selecionados.
                  </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
