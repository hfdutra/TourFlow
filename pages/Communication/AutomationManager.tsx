
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_AUTOMATIONS } from '../../services/mockData';
import { AutomationRule } from '../../types';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, Zap, Play, Pause, Trash, Plus } from 'lucide-react';

export const AutomationManager: React.FC = () => {
  const navigate = useNavigate();
  const [rules, setRules] = useState<AutomationRule[]>(MOCK_AUTOMATIONS);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const getTriggerLabel = (type: string, val?: number) => {
    switch (type) {
      case 'booking_created': return 'Quando uma reserva é criada';
      case 'before_departure': return `${val}h antes da partida`;
      case 'after_tour': return `${val}h após o tour`;
      case 'payment_received': return 'Quando o pagamento é recebido';
      default: return type;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-2">
         <button onClick={() => navigate('/dashboard/communication')} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
             <ArrowLeft size={20} />
         </button>
         <div>
            <h1 className="text-2xl font-bold text-gray-900">Automações</h1>
            <p className="text-gray-500">Regras de envio automático de mensagens.</p>
         </div>
         <Button className="ml-auto">
            <Plus size={18} className="mr-2" /> Nova Regra
         </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {rules.map(rule => (
            <div key={rule.id} className={`bg-white border rounded-lg p-5 flex items-center justify-between transition-all ${rule.active ? 'border-gray-200 shadow-sm' : 'border-gray-100 opacity-60'}`}>
               <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${rule.active ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}>
                     <Zap size={24} fill={rule.active ? "currentColor" : "none"} />
                  </div>
                  <div>
                     <h3 className="font-bold text-lg text-gray-900">{rule.name}</h3>
                     <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{rule.channel.toUpperCase()}</Badge>
                        <span className="text-sm text-gray-500">Gatilho: <strong>{getTriggerLabel(rule.trigger_type, rule.trigger_value)}</strong></span>
                     </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-3">
                  <button 
                     onClick={() => toggleRule(rule.id)}
                     className={`p-2 rounded-full border flex items-center gap-2 px-4 transition-colors ${rule.active ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                  >
                     {rule.active ? <Pause size={16} /> : <Play size={16} />}
                     <span className="text-sm font-medium">{rule.active ? 'Ativo' : 'Pausado'}</span>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50">
                     <Trash size={18} />
                  </button>
               </div>
            </div>
         ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
         <h3 className="text-blue-900 font-bold mb-2">Precisa de automações mais complexas?</h3>
         <p className="text-blue-700 text-sm mb-4">O plano Enterprise permite criar fluxos condicionais e integrar com Zapier.</p>
         <Button variant="outline" className="bg-white text-blue-700 border-blue-200">Ver Planos</Button>
      </div>
    </div>
  );
};
