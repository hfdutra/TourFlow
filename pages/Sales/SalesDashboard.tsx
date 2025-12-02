import React from 'react';
import { Card, CardHeader } from '../../components/ui/Card';
import { MOCK_REVENUE_DATA, MOCK_INVOICES } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Plus, Receipt, TrendingUp, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SalesDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendas & Financeiro</h1>
          <p className="text-gray-500">Visão geral de faturação e transações.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard/reports')}>
            <Download size={18} className="mr-2" /> Relatórios
          </Button>
          <Button onClick={() => navigate('/dashboard/bookings')}>
            <Plus size={18} className="mr-2" /> Nova Venda (POS)
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-white border-l-4 border-l-primary">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Receita (Maio)</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">€12,450.00</h3>
               </div>
               <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <TrendingUp size={24} />
               </div>
            </div>
         </Card>
         <Card className="bg-white border-l-4 border-l-green-500">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Faturado</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">€10,230.50</h3>
               </div>
               <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <Receipt size={24} />
               </div>
            </div>
         </Card>
         <Card className="bg-white border-l-4 border-l-blue-500">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Ticket Médio</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">€145.00</h3>
               </div>
               <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <CreditCard size={24} />
               </div>
            </div>
         </Card>
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
            <Card>
               <CardHeader title="Fluxo de Receita" />
               <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                           <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} tickFormatter={(value) => `€${value/1000}k`} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue2)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </Card>
         </div>

         <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
               <CardHeader title="Últimas Faturas" />
               <div className="flex-1 space-y-4 overflow-y-auto max-h-[250px] pr-2">
                  {MOCK_INVOICES.map(inv => (
                     <div key={inv.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                           <p className="font-medium text-sm text-gray-900">{inv.invoice_number}</p>
                           <p className="text-xs text-gray-500">{inv.customer_name}</p>
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-sm text-gray-900">€{inv.amount.toFixed(2)}</p>
                           <StatusBadge status={inv.status} className="text-[10px]" />
                        </div>
                     </div>
                  ))}
               </div>
               <div className="pt-4 mt-auto border-t border-gray-100">
                  <Button variant="outline" className="w-full text-xs" onClick={() => navigate('/dashboard/sales/invoices')}>
                     Ver Todas as Faturas
                  </Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};