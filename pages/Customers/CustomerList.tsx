
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CUSTOMERS } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Search, Download, Filter, UserPlus, Mail, Phone, MoreHorizontal } from 'lucide-react';

export const CustomerList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => {
    const matchesSearch = 
      c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSegment = segmentFilter === 'all' || 
      (segmentFilter === 'vip' && c.tags.includes('VIP')) ||
      (segmentFilter === 'new' && c.tags.includes('Novo'));

    return matchesSearch && matchesSegment;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500">Gerencie a sua base de dados de clientes e CRM.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" /> Exportar
          </Button>
          <Button>
            <UserPlus size={18} className="mr-2" /> Novo Cliente
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto flex-1">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Pesquisar por nome ou email..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
             className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:border-primary outline-none bg-white"
             value={segmentFilter}
             onChange={(e) => setSegmentFilter(e.target.value)}
           >
             <option value="all">Todos os segmentos</option>
             <option value="vip">Clientes VIP</option>
             <option value="new">Novos Clientes</option>
           </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reservas</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map(customer => (
              <tr 
                key={customer.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/dashboard/customers/${customer.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={customer.avatar_url} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer.full_name}</div>
                      <div className="text-xs text-gray-500">{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.city}</div>
                  <div className="text-xs text-gray-500">{customer.country}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-col">
                     <span className="font-medium text-gray-900">{customer.total_bookings}</span>
                     <span className="text-[10px]">Última: {customer.last_booking_date}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  €{customer.total_spent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    {customer.tags.map(tag => (
                      <Badge key={tag} variant={tag === 'VIP' ? 'warning' : 'info'}>{tag}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                   <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-gray-100">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-gray-100">
                        <Phone size={16} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
