import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { SeatLayoutBuilder } from '../../components/coaches/SeatLayoutBuilder';
import { ArrowLeft, Save, Bus } from 'lucide-react';
import { MOCK_COACHES } from '../../services/mockData';
import { Coach } from '../../types';

export const CoachForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id;
  const existingCoach = MOCK_COACHES.find(c => c.id === id);

  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState<Partial<Coach>>(existingCoach || {
    name: '',
    registration: '',
    capacity: 0,
    status: 'active',
    amenities: []
  });

  const [layout, setLayout] = useState(existingCoach?.layout || {
    rows: 10,
    columns: 4,
    aisleAfter: 2,
    seats: []
  });

  const handleSave = () => {
    const finalData = {
       ...formData,
       layout,
       capacity: layout.seats.filter(s => s.type !== 'blocked' && s.type !== 'staff').length
    };
    console.log('Saving Coach:', finalData);
    navigate('/dashboard/coaches');
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
       <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/coaches')} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Novo Autocarro' : formData.name}</h1>
            <p className="text-gray-500">Detalhes do veículo e configuração de lugares.</p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save size={18} className="mr-2" />
          Guardar Veículo
        </Button>
      </div>

      <Tabs 
        activeTab={activeTab} 
        onChange={setActiveTab}
        tabs={[
          { id: 'info', label: 'Informação' },
          { id: 'layout', label: 'Mapa de Lugares' },
        ]}
      />

      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bus size={18} /> Dados do Veículo
            </h3>
            <div className="space-y-4">
              <Input 
                label="Nome Interno" 
                placeholder="Ex: Mercedes Tourismo 55" 
                defaultValue={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                label="Matrícula" 
                placeholder="00-AA-00" 
                defaultValue={formData.registration}
                className="uppercase"
              />
              <Select 
                label="Estado"
                options={[
                  { value: 'active', label: 'Ativo' },
                  { value: 'maintenance', label: 'Em Manutenção' },
                  { value: 'inactive', label: 'Inativo' },
                ]}
                defaultValue={formData.status}
              />
            </div>
          </Card>
          
          <Card>
            <h3 className="font-semibold mb-4">Comodidades</h3>
            <div className="space-y-2">
              {['wifi', 'wc', 'ac', 'usb', 'tv'].map(item => (
                <label key={item} className="flex items-center gap-3 p-2 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={formData.amenities?.includes(item)}
                    className="h-4 w-4 text-primary rounded border-gray-300" 
                  />
                  <span className="uppercase text-sm font-medium">{item}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'layout' && (
        <Card>
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Configurador de Lugares</h3>
            <p className="text-sm text-gray-500">Defina a disposição dos assentos arrastando ou clicando.</p>
          </div>
          <SeatLayoutBuilder 
            initialLayout={layout}
            onSave={setLayout}
          />
        </Card>
      )}
    </div>
  );
};