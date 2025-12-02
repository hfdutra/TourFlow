import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input, Select, TextArea } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { MOCK_OPERATOR, MOCK_TEAM } from '../../services/mockData';
import { Save, Building, Users, CreditCard, Bell, Globe, Lock, Plus, Mail } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [operator, setOperator] = useState(MOCK_OPERATOR);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-500">Gerencie a sua empresa, equipa e integrações.</p>
        </div>
        <Button>
           <Save size={18} className="mr-2" /> Guardar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Settings Sidebar */}
         <div className="lg:col-span-1">
            <nav className="space-y-1">
               {[
                  { id: 'company', label: 'Perfil da Empresa', icon: Building },
                  { id: 'branding', label: 'Marca e Aparência', icon: Globe },
                  { id: 'team', label: 'Gestão de Equipa', icon: Users },
                  { id: 'billing', label: 'Pagamentos & Planos', icon: CreditCard },
                  { id: 'notifications', label: 'Notificações', icon: Bell },
                  { id: 'security', label: 'Segurança', icon: Lock },
               ].map(item => (
                  <button
                     key={item.id}
                     onClick={() => setActiveTab(item.id)}
                     className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === item.id 
                           ? 'bg-primary/10 text-primary' 
                           : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                     }`}
                  >
                     <item.icon size={18} />
                     {item.label}
                  </button>
               ))}
            </nav>

            <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-100">
               <h4 className="text-purple-900 font-bold text-sm mb-1">Plano Profissional</h4>
               <p className="text-purple-700 text-xs mb-3">A sua subscrição renova a 01/06/2025.</p>
               <Button variant="outline" size="sm" className="w-full bg-white text-purple-700 border-purple-200">Gerir Subscrição</Button>
            </div>
         </div>

         {/* Settings Content */}
         <div className="lg:col-span-3">
            {activeTab === 'company' && (
               <div className="space-y-6">
                  <Card>
                     <h3 className="font-bold text-lg mb-4 text-gray-900">Identificação</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input 
                           label="Nome Comercial" 
                           defaultValue={operator.name}
                        />
                         <Input 
                           label="Slug (URL Pública)" 
                           defaultValue={operator.slug}
                           disabled
                           className="bg-gray-50 text-gray-500"
                        />
                        <Input 
                           label="Nome Legal (Faturação)" 
                           defaultValue="Vertical Tur Lda"
                        />
                        <Input 
                           label="NIF / NIPC" 
                           defaultValue="500123456"
                        />
                     </div>
                     <div className="mt-4">
                        <TextArea label="Morada da Sede" rows={2} defaultValue="Rua de Santa Catarina 123, 4000-000 Porto" />
                     </div>
                  </Card>
                  
                  <Card>
                     <h3 className="font-bold text-lg mb-4 text-gray-900">Contactos Públicos</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Email de Suporte" defaultValue="reservas@verticaltur.pt" />
                        <Input label="Telefone" defaultValue="+351 222 333 444" />
                        <Input label="Website" defaultValue="https://verticaltur.pt" />
                     </div>
                  </Card>
               </div>
            )}

            {activeTab === 'team' && (
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                     <h3 className="font-bold text-lg text-gray-900">Membros da Equipa</h3>
                     <Button size="sm">
                        <Plus size={16} className="mr-2" /> Convidar Membro
                     </Button>
                  </div>
                  
                  <Card className="overflow-hidden p-0">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                           <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Função</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Último Acesso</th>
                              <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                           </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                           {MOCK_TEAM.map(member => (
                              <tr key={member.id}>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                       <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                          {member.avatar_url ? <img src={member.avatar_url} className="w-full h-full" /> : member.full_name[0]}
                                       </div>
                                       <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900">{member.full_name}</div>
                                          <div className="text-xs text-gray-500">{member.email}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                    {member.role.replace('_', ' ')}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={member.status} />
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {member.last_active ? new Date(member.last_active).toLocaleDateString() : '-'}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-hover">Gerir</button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </Card>
               </div>
            )}

            {activeTab === 'billing' && (
               <div className="space-y-6">
                  <Card>
                     <h3 className="font-bold text-lg mb-4 text-gray-900">Métodos de Pagamento (Recebimento)</h3>
                     <p className="text-sm text-gray-500 mb-6">Configure como deseja receber pagamentos dos seus clientes.</p>
                     
                     <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xl">S</div>
                              <div>
                                 <h4 className="font-bold text-gray-900">Stripe</h4>
                                 <p className="text-sm text-gray-500">Cartões de Crédito, MBWay, Google Pay</p>
                              </div>
                           </div>
                           <Button variant="outline" className="text-green-600 border-green-200 bg-green-50">Conectado</Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-600 font-bold">MB</div>
                              <div>
                                 <h4 className="font-bold text-gray-900">Multibanco (ifthenpay)</h4>
                                 <p className="text-sm text-gray-500">Pagamento por Entidade/Referência</p>
                              </div>
                           </div>
                           <Button variant="outline">Conectar</Button>
                        </div>
                     </div>
                  </Card>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};