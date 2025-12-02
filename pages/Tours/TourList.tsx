import React, { useState } from 'react';
import { TourCard } from '../../components/tours/TourCard';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { MOCK_TOURS } from '../../services/mockData';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Search, Plus, Filter, Grid, List as ListIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TourList: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTours = MOCK_TOURS.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || tour.tour_type === filterType;
    const matchesStatus = filterStatus === 'all' || tour.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tours</h1>
          <p className="text-gray-500">Gerencie os seus produtos turísticos e itinerários.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/tours/new')}>
          <Plus size={18} className="mr-2" />
          Novo Tour
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto flex-1">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Pesquisar tours..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="hidden md:flex gap-2">
             <select 
               className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:border-primary outline-none bg-white"
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
             >
               <option value="all">Todos os tipos</option>
               <option value="day_trip">Day Trip</option>
               <option value="multi_day">Multi-day</option>
               <option value="express">Express</option>
             </select>
             <select 
               className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:border-primary outline-none bg-white"
               value={filterStatus}
               onChange={(e) => setFilterStatus(e.target.value)}
             >
               <option value="all">Todos os estados</option>
               <option value="active">Ativo</option>
               <option value="draft">Rascunho</option>
               <option value="archived">Arquivado</option>
             </select>
          </div>
        </div>

        <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Grid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <ListIcon size={20} />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.map(tour => (
            <TourCard key={tour.id} tour={tour} onEdit={() => navigate(`/dashboard/tours/${tour.id}`)} />
          ))}
          {filteredTours.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
               <p>Nenhum tour encontrado.</p>
               <Button variant="outline" className="mt-4" onClick={() => {setSearchTerm(''); setFilterType('all');}}>Limpar filtros</Button>
             </div>
          )}
        </div>
      )}

      {/* List View (Simplified Table) */}
      {viewMode === 'list' && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duração</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Base</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTours.map(tour => (
                <tr key={tour.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/tours/${tour.id}`)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {tour.featured_image ? (
                          <img className="h-10 w-10 rounded-full object-cover" src={tour.featured_image} alt="" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{tour.name}</div>
                        <div className="text-xs text-gray-500">/{tour.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tour.tour_type === 'day_trip' ? 'Day Trip' : tour.tour_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tour.duration_days > 1 ? `${tour.duration_days} dias` : `${tour.duration_hours}h`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    €{tour.base_price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={tour.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};