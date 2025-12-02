
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TEMPLATES } from '../../services/mockData';
import { MessageTemplate } from '../../types';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input, TextArea, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, Save, Mail, MessageSquare, Plus, Edit2, Trash, Variable } from 'lucide-react';

export const TemplateManager: React.FC = () => {
  const navigate = useNavigate();
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [templates, setTemplates] = useState(MOCK_TEMPLATES);

  const handleEdit = (template: MessageTemplate) => {
    setEditingTemplate(template);
  };

  const handleCreate = () => {
    setEditingTemplate({
       id: `tpl-${Date.now()}`,
       operator_id: 'op-123',
       name: 'Novo Template',
       channel: 'email',
       category: 'marketing',
       content: '',
       variables: []
    });
  };

  const handleSave = () => {
    if (!editingTemplate) return;
    const exists = templates.find(t => t.id === editingTemplate.id);
    if (exists) {
       setTemplates(templates.map(t => t.id === editingTemplate.id ? editingTemplate : t));
    } else {
       setTemplates([...templates, editingTemplate]);
    }
    setEditingTemplate(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-2">
         <button onClick={() => editingTemplate ? setEditingTemplate(null) : navigate('/dashboard/communication')} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
             <ArrowLeft size={20} />
         </button>
         <div>
            <h1 className="text-2xl font-bold text-gray-900">{editingTemplate ? (editingTemplate.id.startsWith('tpl-') ? 'Editar Template' : 'Novo Template') : 'Gestão de Templates'}</h1>
            <p className="text-gray-500">Padronize as suas comunicações.</p>
         </div>
         {!editingTemplate && (
            <Button className="ml-auto" onClick={handleCreate}>
               <Plus size={18} className="mr-2" /> Novo Template
            </Button>
         )}
      </div>

      {!editingTemplate ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(tpl => (
               <div key={tpl.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow relative group">
                  <div className="flex justify-between items-start mb-3">
                     <Badge variant={tpl.channel === 'email' ? 'info' : 'success'}>
                        {tpl.channel === 'email' ? <Mail size={12} className="mr-1" /> : <MessageSquare size={12} className="mr-1" />}
                        {tpl.channel.toUpperCase()}
                     </Badge>
                     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(tpl)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
                           <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded">
                           <Trash size={16} />
                        </button>
                     </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{tpl.name}</h3>
                  <p className="text-xs text-gray-500 mb-4 capitalize">{tpl.category}</p>
                  
                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 line-clamp-3 font-mono border border-gray-100">
                     {tpl.content}
                  </div>
               </div>
            ))}
         </div>
      ) : (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card>
                  <div className="space-y-4">
                     <Input 
                        label="Nome do Template" 
                        value={editingTemplate.name} 
                        onChange={e => setEditingTemplate({...editingTemplate, name: e.target.value})} 
                     />
                     <div className="grid grid-cols-2 gap-4">
                        <Select 
                           label="Canal"
                           options={[
                              { value: 'email', label: 'Email' },
                              { value: 'sms', label: 'SMS' },
                              { value: 'whatsapp', label: 'WhatsApp' }
                           ]}
                           value={editingTemplate.channel}
                           onChange={e => setEditingTemplate({...editingTemplate, channel: e.target.value as any})}
                        />
                        <Select 
                           label="Categoria"
                           options={[
                              { value: 'confirmation', label: 'Confirmação' },
                              { value: 'reminder', label: 'Lembrete' },
                              { value: 'marketing', label: 'Marketing' },
                              { value: 'post_trip', label: 'Pós-Viagem' },
                           ]}
                           value={editingTemplate.category}
                           onChange={e => setEditingTemplate({...editingTemplate, category: e.target.value as any})}
                        />
                     </div>
                     {editingTemplate.channel === 'email' && (
                        <Input 
                           label="Assunto do Email" 
                           value={editingTemplate.subject || ''} 
                           onChange={e => setEditingTemplate({...editingTemplate, subject: e.target.value})} 
                        />
                     )}
                     <TextArea 
                        label="Conteúdo da Mensagem" 
                        rows={10}
                        value={editingTemplate.content}
                        onChange={e => setEditingTemplate({...editingTemplate, content: e.target.value})}
                        className="font-mono text-sm"
                     />
                  </div>
               </Card>
               <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setEditingTemplate(null)}>Cancelar</Button>
                  <Button onClick={handleSave}> <Save size={18} className="mr-2" /> Guardar Template</Button>
               </div>
            </div>

            <div className="lg:col-span-1">
               <Card>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                     <Variable size={18} /> Variáveis Disponíveis
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Copie e cole estas variáveis no conteúdo da mensagem.</p>
                  
                  <div className="space-y-2">
                     {[
                        { code: '{{customer_name}}', label: 'Nome do Cliente' },
                        { code: '{{tour_name}}', label: 'Nome do Tour' },
                        { code: '{{departure_date}}', label: 'Data Partida' },
                        { code: '{{departure_time}}', label: 'Hora Partida' },
                        { code: '{{booking_reference}}', label: 'Ref. Reserva' },
                        { code: '{{pickup_point}}', label: 'Local Recolha' },
                        { code: '{{company_name}}', label: 'Nome da Empresa' },
                     ].map(v => (
                        <div key={v.code} className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200" onClick={() => {
                           // Simple copy simulation
                           setEditingTemplate({...editingTemplate, content: editingTemplate.content + ' ' + v.code})
                        }}>
                           <code className="text-xs text-blue-600 font-bold">{v.code}</code>
                           <span className="text-xs text-gray-500">{v.label}</span>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
         </div>
      )}
    </div>
  );
};
