import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input, Select, TextArea } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { ArrowLeft, Save, Upload, Plus, Trash } from 'lucide-react';
import { MOCK_TOURS } from '../../services/mockData';

export const TourForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id;
  
  // Mock fetching existing data if editing
  const existingTour = MOCK_TOURS.find(t => t.id === id);

  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(existingTour || {
    name: '',
    slug: '',
    tour_type: 'day_trip',
    duration_days: 1,
    duration_hours: 8,
    base_price: 0,
    status: 'draft',
    description: '',
    inclusions: [],
    highlights: [],
    min_passengers: 1
  });

  const handleSave = () => {
    // Simulate API save
    console.log('Saving tour:', formData);
    navigate('/dashboard/tours');
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-16 z-30 bg-gray-50/95 backdrop-blur py-4 border-b border-gray-200 -mx-6 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/tours')} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{isNew ? 'Novo Tour' : formData.name}</h1>
            <p className="text-xs text-gray-500">{isNew ? 'Criando novo produto' : 'Editando produto existente'}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard/tours')}>Cancelar</Button>
          <Button onClick={handleSave}>
            <Save size={18} className="mr-2" />
            Guardar Tour
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs 
            activeTab={activeTab} 
            onChange={setActiveTab}
            tabs={[
              { id: 'basic', label: 'Informação Básica' },
              { id: 'details', label: 'Detalhes & Descrição' },
              { id: 'pricing', label: 'Preços' },
              { id: 'media', label: 'Multimédia' },
            ]} 
          />

          {activeTab === 'basic' && (
            <Card>
              <div className="space-y-6">
                <Input 
                  label="Nome do Tour" 
                  placeholder="Ex: Douro Vinhateiro Premium"
                  defaultValue={formData.name} 
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Slug (URL)" 
                    placeholder="douro-vinhateiro-premium" 
                    defaultValue={formData.slug}
                    className="text-gray-500"
                  />
                  <Select 
                    label="Tipo de Tour"
                    options={[
                      { value: 'day_trip', label: 'Day Trip (1 dia)' },
                      { value: 'multi_day', label: 'Multi-day (+1 dia)' },
                      { value: 'express', label: 'Express / Transfer' },
                    ]}
                    defaultValue={formData.tour_type}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                   <Input 
                     label="Duração (Dias)" 
                     type="number" 
                     min="1"
                     defaultValue={formData.duration_days} 
                   />
                   <Input 
                     label="Duração (Horas)" 
                     type="number"
                     min="1"
                     defaultValue={formData.duration_hours} 
                   />
                   <Input 
                     label="Mín. Passageiros" 
                     type="number"
                     min="1"
                     defaultValue={formData.min_passengers} 
                   />
                </div>
                <Select 
                  label="Estado"
                  options={[
                    { value: 'draft', label: 'Rascunho (Oculto)' },
                    { value: 'active', label: 'Ativo (Público)' },
                    { value: 'archived', label: 'Arquivado' },
                  ]}
                  defaultValue={formData.status}
                />
              </div>
            </Card>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              <Card>
                <div className="space-y-4">
                  <TextArea 
                    label="Descrição Curta" 
                    rows={3} 
                    placeholder="Resumo apelativo para a listagem..."
                    defaultValue={formData.description}
                  />
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Descrição Completa</label>
                    <div className="border border-gray-300 rounded-md p-4 min-h-[200px] bg-gray-50 text-gray-500 italic text-center flex items-center justify-center">
                      Rich Text Editor (Tiptap) será integrado aqui.
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">O que está incluído</h3>
                    <Button variant="ghost" size="sm"><Plus size={16}/></Button>
                  </div>
                  <div className="space-y-2">
                    {['Transporte em autocarro', 'Guia Profissional', 'Almoço Típico'].map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input type="text" className="flex-1 border-gray-300 rounded-md text-sm" defaultValue={item} />
                        <button className="text-red-400 hover:text-red-600"><Trash size={16}/></button>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">O que NÃO está incluído</h3>
                    <Button variant="ghost" size="sm"><Plus size={16}/></Button>
                  </div>
                  <div className="space-y-2">
                     {['Gratificações', 'Despesas pessoais'].map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input type="text" className="flex-1 border-gray-300 rounded-md text-sm" defaultValue={item} />
                        <button className="text-red-400 hover:text-red-600"><Trash size={16}/></button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
             <Card>
               <h3 className="font-medium mb-4">Preços Base</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="font-medium text-sm mb-3">Adulto (Standard)</h4>
                    <Input 
                      label="Preço (€)" 
                      type="number" 
                      defaultValue={formData.base_price}
                      icon={<span className="text-gray-500">€</span>}
                    />
                 </div>
                 <div className="bg-gray-50 p-4 rounded-md border border-gray-200 opacity-75">
                    <div className="flex justify-between">
                       <h4 className="font-medium text-sm mb-3">Criança (4-12)</h4>
                       <input type="checkbox" defaultChecked />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input label="Desconto %" defaultValue={30} />
                      <Input label="Valor Final" disabled defaultValue={(formData.base_price * 0.7).toFixed(2)} />
                    </div>
                 </div>
               </div>
               
               <div className="mt-6 pt-6 border-t border-gray-100">
                 <h3 className="font-medium mb-4">Preços Sazonais</h3>
                 <div className="text-center py-8 bg-gray-50 rounded border border-dashed border-gray-300">
                   <p className="text-sm text-gray-500">Nenhuma regra de preço sazonal criada.</p>
                   <Button variant="outline" size="sm" className="mt-2">Adicionar Época Alta</Button>
                 </div>
               </div>
             </Card>
          )}

          {activeTab === 'media' && (
            <Card>
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                 <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                 <p className="text-sm font-medium text-gray-900">Arraste imagens para aqui</p>
                 <p className="text-xs text-gray-500 mt-1">PNG, JPG até 5MB</p>
               </div>
               
               <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="aspect-square bg-gray-100 rounded-lg relative group overflow-hidden">
                      <img src={`https://picsum.photos/300?random=${i}`} className="w-full h-full object-cover" alt="" />
                      <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash size={14} />
                      </button>
                   </div>
                 ))}
               </div>
            </Card>
          )}

        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-medium mb-4 text-sm text-gray-500 uppercase">Definições</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Seleção de Lugares</span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-sm">Recolha ao Domicílio</span>
                 <input type="checkbox" className="toggle" />
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Input label="Categorias" placeholder="Adicionar tags..." />
              </div>
            </div>
          </Card>

          <Card>
             <h3 className="font-medium mb-4 text-sm text-gray-500 uppercase">Resumo</h3>
             <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Criado em:</span>
                  <span>10 Mai 2025</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-gray-500">Última edicão:</span>
                   <span>Hoje, 14:30</span>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};