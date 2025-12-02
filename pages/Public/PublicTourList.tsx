
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TOURS } from '../../services/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Clock, Users, Search, Filter } from 'lucide-react';

export const PublicTourList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const activeTours = MOCK_TOURS.filter(t => t.status === 'active' && t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Hero / Search Section */}
      <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
         <h1 className="text-3xl md:text-4xl font-bold mb-4">Descubra Portugal Connosco</h1>
         <p className="text-primary-100 text-lg mb-8 max-w-2xl">
           Explore as melhores experiências, day trips e tours guiados. Reserve online de forma segura e rápida.
         </p>
         
         <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2 max-w-3xl">
            <div className="flex-1 flex items-center px-4 bg-gray-50 rounded border border-transparent focus-within:border-primary focus-within:bg-white transition-colors">
               <Search className="text-gray-400 mr-2" size={20} />
               <input 
                 type="text" 
                 placeholder="Para onde quer ir?" 
                 className="bg-transparent border-none outline-none w-full py-3 text-gray-900 placeholder-gray-500"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-2">
               <button className="p-3 text-gray-500 bg-gray-50 rounded hover:bg-gray-100 border border-gray-100">
                  <Filter size={20} />
               </button>
               <Button size="lg" className="h-full md:w-32">
                  Pesquisar
               </Button>
            </div>
         </div>
      </div>

      {/* Tours Grid */}
      <div>
         <h2 className="text-xl font-bold text-gray-900 mb-6">Tours em Destaque</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTours.map(tour => (
              <div 
                key={tour.id} 
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
                onClick={() => navigate(tour.slug)}
              >
                 <div className="h-56 relative overflow-hidden">
                    <img 
                      src={tour.featured_image} 
                      alt={tour.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                       <Badge className="bg-white/90 backdrop-blur text-gray-900 shadow-sm font-semibold">
                          {tour.tour_type === 'day_trip' ? '1 Dia' : 'Multi-dias'}
                       </Badge>
                    </div>
                 </div>
                 
                 <div className="p-5">
                    <div className="flex gap-2 mb-3">
                       {tour.categories.slice(0, 2).map(cat => (
                         <span key={cat} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded">
                           {cat}
                         </span>
                       ))}
                    </div>
                    
                    <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {tour.name}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                       <div className="flex items-center gap-1.5">
                          <Clock size={16} className="text-gray-400" />
                          <span>{tour.duration_days > 1 ? `${tour.duration_days} dias` : `${tour.duration_hours} horas`}</span>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <Users size={16} className="text-gray-400" />
                          <span>Min. {tour.min_passengers} pax</span>
                       </div>
                    </div>
                    
                    <div className="flex items-end justify-between pt-4 border-t border-gray-50">
                       <div>
                          <p className="text-xs text-gray-400 mb-0.5">Desde</p>
                          <p className="text-2xl font-bold text-gray-900">€{tour.base_price}</p>
                       </div>
                       <Button>Ver Detalhes</Button>
                    </div>
                 </div>
              </div>
            ))}
            
            {activeTours.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500">
                <p>Não encontramos tours com esse nome.</p>
                <button onClick={() => setSearchTerm('')} className="text-primary font-medium mt-2 hover:underline">
                  Limpar pesquisa
                </button>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};
