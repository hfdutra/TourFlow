
import React from 'react';
import { PickupPoint } from '../../types';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import { MapPin, Clock, GripVertical, Trash, Edit2 } from 'lucide-react';

interface PickupPointListProps {
  points: PickupPoint[];
  onPointsChange: (points: PickupPoint[]) => void;
}

export const PickupPointList: React.FC<PickupPointListProps> = ({ points, onPointsChange }) => {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [newPoint, setNewPoint] = React.useState<Partial<PickupPoint>>({});
  const [isAdding, setIsAdding] = React.useState(false);

  const handleDelete = (id: string) => {
    onPointsChange(points.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    const id = `p-${Date.now()}`;
    const point: PickupPoint = {
      id,
      name: newPoint.name || 'Nova Paragem',
      address: newPoint.address || '',
      lat: 0,
      lng: 0,
      time_offset_minutes: newPoint.time_offset_minutes || -30,
      notes: newPoint.notes
    };
    onPointsChange([...points, point]);
    setIsAdding(false);
    setNewPoint({});
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
         <h3 className="font-medium text-sm text-gray-700">Sequência de Recolha</h3>
         <Button size="sm" variant="ghost" onClick={() => setIsAdding(true)}>+ Adicionar Paragem</Button>
      </div>

      {points.length === 0 && !isAdding && (
         <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-lg text-gray-500 text-sm">
           Sem pontos de recolha definidos.
         </div>
      )}

      <div className="space-y-2">
        {points.map((point, index) => (
          <div key={point.id} className="bg-white border border-gray-200 rounded-lg p-3 flex items-start gap-3 shadow-sm hover:border-primary/50 transition-colors group">
             <div className="mt-2 text-gray-400 cursor-move">
               <GripVertical size={16} />
             </div>
             
             <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                       <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">{index + 1}</span>
                       {point.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin size={12} /> {point.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1 text-gray-600" title="Tempo antes da partida">
                       <Clock size={12} /> {point.time_offset_minutes}m
                    </div>
                    <button onClick={() => handleDelete(point.id)} className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
             </div>
          </div>
        ))}

        {isAdding && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-in fade-in">
             <h4 className="font-medium text-sm text-blue-900 mb-3">Nova Paragem</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
               <Input 
                 placeholder="Nome (ex: Estação)" 
                 value={newPoint.name || ''} 
                 onChange={e => setNewPoint({...newPoint, name: e.target.value})} 
                 className="bg-white"
               />
               <Input 
                 type="number" 
                 placeholder="Minutos antes (-30)" 
                 value={newPoint.time_offset_minutes} 
                 onChange={e => setNewPoint({...newPoint, time_offset_minutes: parseInt(e.target.value)})}
                 className="bg-white" 
               />
             </div>
             <Input 
                placeholder="Morada completa" 
                value={newPoint.address || ''} 
                onChange={e => setNewPoint({...newPoint, address: e.target.value})} 
                className="bg-white mb-3"
             />
             <div className="flex justify-end gap-2">
                <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancelar</Button>
                <Button size="sm" onClick={handleAdd}>Adicionar</Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
