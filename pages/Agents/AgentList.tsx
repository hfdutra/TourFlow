
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_AGENTS } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Search, Plus, Filter, Briefcase, TrendingUp, DollarSign } from 'lucide-react';

export const AgentList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = MOCK_AGENTS.filter(a => 
    a.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.contact_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agentes B2B</h1>
          <p className="text-gray-500">Gerencie parceiros, revendedores e comissões.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/agents/new')}>
          <Plus size={18} className="mr-2" />
          Novo Agente
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4 bg-blue-50 border-blue-100">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium uppercase">Total Parceiros</p>
            <p className="text-2xl font-bold text-blue-900">{MOCK_AGENTS.length}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 bg-green-50 border-green-100">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-green-600 font-medium uppercase">Vendas B2B (Mês)</p>
            <p className="text-2xl font-bold text-green-900">€{MOCK_AGENTS.reduce((acc, curr) => acc + curr.total_sales, 0).toFixed(2)}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 bg-purple-50 border-purple-100">
          <div className="p-3 bg-purple-100 rounded-full text-purple-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-purple-600 font-medium uppercase">Comissões Pendentes</p>
            <p className="text-2xl font-bold text-purple-900">€{MOCK_AGENTS.reduce((acc, curr) => acc + curr.pending_commission, 0).toFixed(2)}</p>
          </div>
        </Card>
      </div>

      {/* Search & List */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Pesquisar por empresa ou contacto..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <Button variant="outline" className="text-gray-600">
           <Filter size={18} className="mr-2" /> Filtros
         </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comissão</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendas Totais</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">A Pagar</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAgents.map(agent => (
              <tr 
                key={agent.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/dashboard/agents/${agent.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="text-sm font-medium text-gray-900">{agent.company_name}</div>
                   <div className="text-xs text-gray-500 font-mono">NIF: {agent.nif}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="text-sm text-gray-900">{agent.contact_name}</div>
                   <div className="text-xs text-gray-500">{agent.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {agent.commission_rate}% ({agent.commission_model})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                   €{agent.total_sales.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-purple-600">
                   €{agent.pending_commission.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <StatusBadge status={agent.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
