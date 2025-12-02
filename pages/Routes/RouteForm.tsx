
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input, TextArea } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { PickupPointList } from '../../components/routes/PickupPointList';
import { RouteMap } from '../../components/routes/RouteMap';
import { ArrowLeft, Save, Map } from 'lucide-react';
import { MOCK_ROUTES } from '../../services/mockData';
import { Route } from '../../types';

export const RouteForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id;
  const existingRoute = MOCK_ROUTES.find(r => r.id === id);

  const [formData, setFormData] = useState<Partial<Route>>(existingRoute || {
    name: '',
    description: '',
    pickup_points: []
  });

  const handleSave = () => {
    console.log('Saving Route:', formData);
    navigate('/dashboard/routes'); // Corrected path from previous /dashboard/coaches copy-paste
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
       <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/tours')} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Nova Rota' : formData.name}</h1>
            <p className="text-gray-500">Definição de itinerário e pontos de recolha.</p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save size={18} className="mr-2" />
          Guardar Rota
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & Points List */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Map size={18} /> Informação Geral
            </h3>
            <div className="space-y-4">
              <Input 
                label="Nome da Rota" 
                placeholder="Ex: Rota Norte (Braga)" 
                defaultValue={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <TextArea 
                label="Descrição Interna" 
                placeholder="Detalhes operacionais..." 
                defaultValue={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </Card>

          <Card>
            <PickupPointList 
              points={formData.pickup_points || []} 
              onPointsChange={(points) => setFormData({...formData, pickup_points: points})}
            />
          </Card>
        </div>

        {/* Right Column: Map Preview */}
        <div className="lg:col-span-2">
           <Card className="h-full min-h-[500px] flex flex-col">
              <div className="mb-4 flex justify-between items-center">
                 <h3 className="font-semibold">Mapa Visual</h3>
                 <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Mapbox GL Integration</span>
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
                 <RouteMap points={formData.pickup_points || []} className="h-full w-full absolute inset-0" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                 <div className="p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-500 uppercase">Distância Total</div>
                    <div className="font-bold text-lg">{(formData.pickup_points?.length || 0) * 15} km</div>
                 </div>
                 <div className="p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-500 uppercase">Tempo Estimado</div>
                    <div className="font-bold text-lg">{(formData.pickup_points?.length || 0) * 20} min</div>
                 </div>
                 <div className="p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-500 uppercase">Paragens</div>
                    <div className="font-bold text-lg">{formData.pickup_points?.length || 0}</div>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};
