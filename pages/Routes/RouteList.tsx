
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ROUTES } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Map, Plus, MapPin, Clock, ChevronRight } from 'lucide-react';

export const RouteList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rotas e Recolhas</h1>
          <p className="text-gray-500">Gerencie itinerários e pontos de encontro.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/routes/new')}>
          <Plus size={18} className="mr-2" />
          Nova Rota
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ROUTES.map(route => (
          <div key={route.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => navigate(`/dashboard/routes/${route.id}`)}>
            <div className="h-32 bg-gray-100 relative border-b border-gray-100 flex items-center justify-center">
               {/* Simple visualization preview */}
               <div className="flex items-center gap-1 opacity-50">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div className="w-8 h-0.5 bg-gray-400"></div>
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div className="w-8 h-0.5 bg-gray-400"></div>
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
               </div>
               <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-mono text-gray-600 backdrop-blur">
                  {route.distance_km} km
               </div>
            </div>
            
            <div className="p-5">
               <div className="flex justify-between items-start mb-2">
                 <div>
                   <h3 className="font-bold text-gray-900">{route.name}</h3>
                   <p className="text-sm text-gray-500">{route.description}</p>
                 </div>
               </div>

               <div className="flex gap-4 my-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center gap-1">
                     <MapPin size={14} className="text-primary"/>
                     <span>{route.pickup_points.length} paragens</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <Clock size={14} className="text-primary"/>
                     <span>~{route.estimated_duration_min} min</span>
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                 <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Principais paragens</span>
                 {route.pickup_points.slice(0, 2).map(p => (
                   <div key={p.id} className="text-sm flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      {p.name}
                   </div>
                 ))}
                 {route.pickup_points.length > 2 && (
                   <div className="text-xs text-gray-400 pl-3.5">+ {route.pickup_points.length - 2} outros</div>
                 )}
               </div>

               <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end text-primary text-sm font-medium group-hover:underline">
                  Ver detalhes <ChevronRight size={16} />
               </div>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add New Card */}
        <button onClick={() => navigate('/dashboard/routes/new')} className="border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors bg-gray-50 hover:bg-white">
           <Map size={48} className="mb-4 opacity-50" />
           <span className="font-medium">Criar Nova Rota</span>
        </button>
      </div>
    </div>
  );
};
