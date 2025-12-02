import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CUSTOMERS, MOCK_BOOKINGS } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Input, TextArea } from '../../components/ui/Input';
import { 
  ArrowLeft, Mail, Phone, Calendar, MapPin, Tag, Edit, 
  MessageSquare, History, CreditCard, Shield, Clock 
} from 'lucide-react';

export const CustomerDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const customer = MOCK_CUSTOMERS.find(c => c.id === id);
  // Mock bookings for this customer
  const bookings = MOCK_BOOKINGS.filter(b => b.customer_id === id);

  if (!customer) return <div>Cliente não encontrado</div>;

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
       
       {/* Header */}
       <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/dashboard/customers')} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
             <ArrowLeft size={20} />
          </button>
          <div>
             <h1 className="text-2xl font-bold text-gray-900">Perfil de Cliente</h1>
             <p className="text-sm text-gray-500">#{customer.id.toUpperCase()}</p>
          </div>
       </div>

       {/* Top Profile Card */}
       <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
             <div className="flex items-center gap-6">
                <img 
                  src={customer.avatar_url} 
                  alt={customer.full_name} 
                  className="w-24 h-24 rounded-full border-4 border-gray-50 shadow-sm"
                />
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-gray-900">{customer.full_name}</h2>
                      {customer.tags.map(tag => (
                        <Badge key={tag} variant={tag === 'VIP' ? 'warning' : 'info'}>{tag}</Badge>
                      ))}
                   </div>
                   <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-gray-500 text-sm">
                      <div className="flex items-center gap-1.5">
                         <Mail size={16} /> {customer.email}
                      </div>
                      <div className="flex items-center gap-1.5">
                         <Phone size={16} /> {customer.phone}
                      </div>
                      <div className="flex items-center gap-1.5">
                         <MapPin size={16} /> {customer.city}, {customer.country}
                      </div>
                   </div>
                </div>
             </div>
             <div className="flex gap-3">
                <Button variant="outline">
                   <MessageSquare size={16} className="mr-2" /> Enviar Mensagem
                </Button>
                <Button>
                   <Edit size={16} className="mr-2" /> Editar Perfil
                </Button>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
             <Tabs 
               activeTab={activeTab} 
               onChange={setActiveTab}
               tabs={[
                 { id: 'overview', label: 'Visão Geral' },
                 { id: 'bookings', label: 'Histórico de Reservas' },
                 { id: 'notes', label: 'Notas Internas' },
               ]}
             />

             {activeTab === 'overview' && (
                <div className="space-y-6">
                   {/* Stats Grid */}
                   <div className="grid grid-cols-3 gap-4">
                      <Card className="bg-blue-50 border-blue-100">
                         <h4 className="text-xs text-blue-600 font-bold uppercase">Total Gasto</h4>
                         <p className="text-2xl font-bold text-blue-900">€{customer.total_spent}</p>
                      </Card>
                      <Card className="bg-purple-50 border-purple-100">
                         <h4 className="text-xs text-purple-600 font-bold uppercase">Reservas</h4>
                         <p className="text-2xl font-bold text-purple-900">{customer.total_bookings}</p>
                      </Card>
                      <Card className="bg-green-50 border-green-100">
                         <h4 className="text-xs text-green-600 font-bold uppercase">Valor Médio</h4>
                         <p className="text-2xl font-bold text-green-900">€{(customer.total_spent / customer.total_bookings).toFixed(2)}</p>
                      </Card>
                   </div>

                   <Card>
                      <h3 className="font-bold mb-4">Preferências de Viagem</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                         <div>
                            <span className="text-gray-500 block mb-1">Lugar Preferido</span>
                            <span className="font-medium">{customer.preferences?.seat || '-'}</span>
                         </div>
                         <div>
                            <span className="text-gray-500 block mb-1">Idioma</span>
                            <span className="font-medium">{customer.preferences?.language || '-'}</span>
                         </div>
                         <div>
                            <span className="text-gray-500 block mb-1">Restrições Alimentares</span>
                            <span className="font-medium">{customer.preferences?.dietary || 'Nenhuma'}</span>
                         </div>
                      </div>
                   </Card>
                </div>
             )}

             {activeTab === 'bookings' && (
               <div className="space-y-4">
                  {bookings.length > 0 ? bookings.map(booking => (
                     <div key={booking.id} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center hover:shadow-sm transition-shadow">
                        <div className="flex gap-4 items-center">
                           <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-bold text-xs">
                              MAY<br/>10
                           </div>
                           <div>
                              <p className="font-bold text-gray-900">{booking.tour_name}</p>
                              <p className="text-xs text-gray-500">{booking.booking_reference} • {new Date(booking.created_at).toLocaleDateString()}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-gray-900">€{booking.amount}</p>
                           <StatusBadge status={booking.status} />
                        </div>
                     </div>
                  )) : (
                     <div className="text-center py-10 text-gray-500">Sem reservas recentes.</div>
                  )}
               </div>
             )}
             
             {activeTab === 'notes' && (
               <Card>
                  <TextArea placeholder="Adicionar nota interna..." className="mb-4" />
                  <Button variant="outline" size="sm" className="mb-6">Adicionar Nota</Button>
                  
                  <div className="space-y-4">
                     <div className="border-l-2 border-primary pl-4 py-1">
                        <p className="text-sm text-gray-800">Cliente prefere ser contactado por WhatsApp. Tem interesse em tours de vinhos.</p>
                        <p className="text-xs text-gray-400 mt-1">João Silva • 10 Mai 2025</p>
                     </div>
                  </div>
               </Card>
             )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             <Card>
                <h3 className="font-bold mb-4 text-sm text-gray-500 uppercase">Dados Pessoais</h3>
                <ul className="space-y-3 text-sm">
                   <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Cliente desde</span>
                      <span className="font-medium">{new Date(customer.created_at).toLocaleDateString()}</span>
                   </li>
                   <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">NIF</span>
                      <span className="font-medium">{customer.nif || 'Não inf.'}</span>
                   </li>
                   <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Origem</span>
                      <span className="font-medium capitalize">{customer.source}</span>
                   </li>
                </ul>
             </Card>

             <Card>
                <h3 className="font-bold mb-4 text-sm text-gray-500 uppercase">Tags</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                   {customer.tags.map(tag => (
                      <Badge key={tag}>{tag}</Badge>
                   ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full text-xs">
                   <Tag size={14} className="mr-2" /> Gerir Tags
                </Button>
             </Card>
          </div>
       </div>
    </div>
  );
};