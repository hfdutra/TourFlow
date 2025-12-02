import React from 'react';
import { MOCK_COACHES } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Plus, Wifi, Wind, Zap, Coffee, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AmenityIcon: React.FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case 'wifi': return <Wifi size={14} className="text-blue-500" />;
    case 'ac': return <Wind size={14} className="text-cyan-500" />;
    case 'usb': return <Zap size={14} className="text-yellow-500" />;
    case 'wc': return <Coffee size={14} className="text-gray-500" />; // placeholder
    default: return null;
  }
};

export const CoachList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Frota</h1>
          <p className="text-gray-500">Gerencie autocarros e layouts de lugares.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/coaches/new')}>
          <Plus size={18} className="mr-2" />
          Novo Veículo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COACHES.map(coach => (
          <div key={coach.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="h-40 bg-gray-200 relative">
               <img src={coach.photo_url} alt={coach.name} className="w-full h-full object-cover" />
               <div className="absolute top-2 right-2">
                 <StatusBadge status={coach.status} />
               </div>
            </div>
            
            <div className="p-5">
               <div className="flex justify-between items-start mb-2">
                 <div>
                   <h3 className="font-bold text-gray-900">{coach.name}</h3>
                   <p className="text-sm text-gray-500 font-mono">{coach.registration}</p>
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-bold text-primary">{coach.capacity}</div>
                   <div className="text-xs text-gray-400">lugares</div>
                 </div>
               </div>

               <div className="flex gap-2 mb-4">
                 {coach.amenities.map(am => (
                   <div key={am} className="p-1.5 bg-gray-50 rounded-full border border-gray-100" title={am}>
                     <AmenityIcon name={am} />
                   </div>
                 ))}
               </div>

               <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    Layout Configurado
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/coaches/${coach.id}`)}>
                    <Edit size={16} className="mr-2" /> Editar
                  </Button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};