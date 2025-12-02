
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_MESSAGES } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Mail, MessageSquare, Send, Zap, FileText, CheckCheck, Clock } from 'lucide-react';

export const MessageCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comunicação</h1>
          <p className="text-gray-500">Gestão de mensagens, templates e automações.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard/communication/templates')}>
            <FileText size={18} className="mr-2" /> Templates
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard/communication/automations')}>
            <Zap size={18} className="mr-2" /> Automações
          </Button>
          <Button>
            <Send size={18} className="mr-2" /> Nova Mensagem
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Stats */}
         <div className="lg:col-span-1 space-y-4">
            <Card>
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm text-gray-500 uppercase">Mensagens (Mês)</h3>
                  <Mail size={16} className="text-gray-400"/>
               </div>
               <div className="text-2xl font-bold mb-1">{MOCK_MESSAGES.length + 142}</div>
               <div className="text-xs text-green-600 font-medium">+12% vs mês anterior</div>
            </Card>
            <Card>
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm text-gray-500 uppercase">Custo Estimado</h3>
                  <MessageSquare size={16} className="text-gray-400"/>
               </div>
               <div className="text-2xl font-bold mb-1">€12.50</div>
               <div className="text-xs text-gray-500">€0.05 / SMS</div>
            </Card>
            <Card className="bg-blue-50 border-blue-100">
               <div className="mb-2 text-blue-800 font-medium text-sm">Próximas Automações</div>
               <div className="space-y-2">
                  <div className="flex justify-between text-xs text-blue-700">
                     <span>Lembrete: Maria Silva</span>
                     <span>14:00</span>
                  </div>
                  <div className="flex justify-between text-xs text-blue-700">
                     <span>Review: Tour Douro</span>
                     <span>18:30</span>
                  </div>
               </div>
            </Card>
         </div>

         {/* Main Content */}
         <div className="lg:col-span-3">
            <Card className="min-h-[500px]">
               <Tabs 
                 activeTab={activeTab} 
                 onChange={setActiveTab}
                 tabs={[
                   { id: 'history', label: 'Histórico de Envios' },
                   { id: 'scheduled', label: 'Agendadas' },
                 ]}
               />
               
               <div className="mt-4">
                  {activeTab === 'history' && (
                     <div className="space-y-0 divide-y divide-gray-100">
                        {MOCK_MESSAGES.map(msg => (
                           <div key={msg.id} className="py-4 flex items-center justify-between hover:bg-gray-50 px-2 rounded cursor-pointer transition-colors">
                              <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.channel === 'email' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                    {msg.channel === 'email' ? <Mail size={18} /> : <MessageSquare size={18} />}
                                 </div>
                                 <div>
                                    <div className="font-medium text-gray-900">{msg.customer_name}</div>
                                    <div className="text-xs text-gray-500">{msg.template_name}</div>
                                    <div className="text-xs text-gray-400 mt-1 truncate w-64">{msg.content_preview}</div>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-xs text-gray-500 mb-1">{new Date(msg.sent_at).toLocaleString()}</div>
                                 <StatusBadge status={msg.status} />
                              </div>
                           </div>
                        ))}
                        {/* More mock rows to fill space */}
                        {[1,2,3].map(i => (
                           <div key={i} className="py-4 flex items-center justify-between hover:bg-gray-50 px-2 rounded cursor-pointer transition-colors opacity-75">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                                    <Mail size={18} />
                                 </div>
                                 <div>
                                    <div className="font-medium text-gray-900">João Teste {i}</div>
                                    <div className="text-xs text-gray-500">Marketing: Promo Verão</div>
                                    <div className="text-xs text-gray-400 mt-1">Aproveite os descontos de...</div>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-xs text-gray-500 mb-1">Ontem, 10:30</div>
                                 <StatusBadge status="sent" />
                              </div>
                           </div>
                        ))}
                     </div>
                  )}

                  {activeTab === 'scheduled' && (
                     <div className="text-center py-10 text-gray-500">
                        <Clock size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Nenhuma mensagem agendada manualmente.</p>
                        <Button variant="outline" className="mt-4">Agendar Mensagem</Button>
                     </div>
                  )}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};
