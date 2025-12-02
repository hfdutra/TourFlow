
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_AGENTS } from '../../services/mockData';
import { Agent } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input, Select, TextArea } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { ArrowLeft, Save, Briefcase, DollarSign } from 'lucide-react';

export const AgentForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id;
  const existingAgent = MOCK_AGENTS.find(a => a.id === id);

  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<Partial<Agent>>(existingAgent || {
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    nif: '',
    status: 'pending',
    commission_model: 'percentage',
    commission_rate: 10,
  });

  const handleSave = () => {
    console.log('Saving Agent:', formData);
    navigate('/dashboard/agents');
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
       
       {/* Header */}
       <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/agents')} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Novo Parceiro' : formData.company_name}</h1>
            <p className="text-gray-500">Configuração de conta e condições comerciais.</p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save size={18} className="mr-2" />
          Guardar Agente
        </Button>
      </div>

      <Tabs 
        activeTab={activeTab} 
        onChange={setActiveTab}
        tabs={[
          { id: 'general', label: 'Dados da Empresa' },
          { id: 'financial', label: 'Comissões & Financeiro' },
        ]}
      />

      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Briefcase size={18} /> Identificação
            </h3>
            <div className="space-y-4">
              <Input 
                label="Nome da Empresa" 
                placeholder="Ex: Viagens Norte Lda" 
                defaultValue={formData.company_name}
                onChange={e => setFormData({...formData, company_name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                 <Input 
                   label="NIF / NIPC" 
                   placeholder="500000000" 
                   defaultValue={formData.nif}
                   onChange={e => setFormData({...formData, nif: e.target.value})}
                 />
                 <Select 
                   label="Estado"
                   options={[
                     { value: 'active', label: 'Ativo' },
                     { value: 'pending', label: 'Pendente' },
                     { value: 'inactive', label: 'Inativo' },
                   ]}
                   defaultValue={formData.status}
                   onChange={e => setFormData({...formData, status: e.target.value as any})}
                 />
              </div>
              <TextArea label="Morada de Faturação" rows={3} />
            </div>
          </Card>
          
          <Card>
            <h3 className="font-semibold mb-4">Contacto Principal</h3>
            <div className="space-y-4">
              <Input 
                label="Nome do Responsável" 
                placeholder="Ex: Ana Silva" 
                defaultValue={formData.contact_name}
                onChange={e => setFormData({...formData, contact_name: e.target.value})}
              />
              <Input 
                label="Email (Login)" 
                type="email"
                placeholder="email@empresa.pt" 
                defaultValue={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <Input 
                label="Telefone" 
                placeholder="+351..." 
                defaultValue={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'financial' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                 <DollarSign size={18} /> Condições Comerciais
              </h3>
              <div className="space-y-4">
                 <Select 
                   label="Modelo de Comissão"
                   options={[
                     { value: 'percentage', label: 'Percentagem sobre PVP' },
                     { value: 'net_rate', label: 'Tarifa Net (Markup)' },
                   ]}
                   defaultValue={formData.commission_model}
                   onChange={e => setFormData({...formData, commission_model: e.target.value as any})}
                 />
                 
                 <div className="p-4 bg-gray-50 rounded border border-gray-200">
                    <Input 
                      label={formData.commission_model === 'percentage' ? "Taxa de Comissão (%)" : "Desconto Net (%)"}
                      type="number"
                      defaultValue={formData.commission_rate}
                      onChange={e => setFormData({...formData, commission_rate: parseFloat(e.target.value)})}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                       {formData.commission_model === 'percentage' 
                         ? 'O agente vende ao PVP e recebe esta % posteriormente.' 
                         : 'O agente paga o valor com este desconto aplicado.'}
                    </p>
                 </div>
              </div>
           </Card>

           <Card>
              <h3 className="font-semibold mb-4">Dados Bancários</h3>
              <div className="space-y-4">
                 <Input label="IBAN" placeholder="PT50..." />
                 <Input label="Banco" placeholder="Ex: Millenium BCP" />
                 <Input label="Titular da Conta" defaultValue={formData.company_name} />
              </div>
           </Card>
        </div>
      )}
    </div>
  );
};
