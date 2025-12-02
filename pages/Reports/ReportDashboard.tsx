
import React from 'react';
import { Card, CardHeader } from '../../components/ui/Card';
import { MOCK_REVENUE_DATA, MOCK_CHANNEL_DATA } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar as CalendarIcon, Filter } from 'lucide-react';

export const ReportDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios & Analytics</h1>
          <p className="text-gray-500">Análise detalhada do desempenho operacional e financeiro.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 shadow-sm">
             <CalendarIcon size={16} className="text-gray-500" />
             <span>Este Mês (Maio 2025)</span>
          </div>
          <Button variant="outline">
            <Download size={18} className="mr-2" /> Exportar PDF
          </Button>
        </div>
      </div>

      {/* Main Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Revenue Trend */}
         <Card>
            <CardHeader title="Evolução de Receita" action={
               <Button variant="ghost" size="sm"><Filter size={14} className="mr-1" /> Filtros</Button>
            } />
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} tickFormatter={(value) => `€${value/1000}k`} />
                     <Tooltip contentStyle={{borderRadius: '8px'}} />
                     <Area type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         {/* Occupancy */}
         <Card>
            <CardHeader title="Ocupação Média por Mês" />
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_REVENUE_DATA.map(d => ({...d, value: Math.floor(Math.random() * 40) + 50}))} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
                     <Tooltip contentStyle={{borderRadius: '8px'}} cursor={{fill: '#F3F4F6'}} />
                     <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Sales by Channel */}
         <Card className="lg:col-span-1">
            <CardHeader title="Vendas por Canal" />
            <div className="h-64 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={MOCK_CHANNEL_DATA}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {MOCK_CHANNEL_DATA.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-gray-900">86</span>
                  <span className="text-xs text-gray-500 uppercase">Reservas</span>
               </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
               {MOCK_CHANNEL_DATA.map(ch => (
                  <div key={ch.name} className="flex items-center gap-1.5 text-sm text-gray-600">
                     <div className="w-2 h-2 rounded-full" style={{backgroundColor: ch.color}}></div>
                     {ch.name} ({ch.value}%)
                  </div>
               ))}
            </div>
         </Card>

         {/* Top Tours Table */}
         <Card className="lg:col-span-2">
            <CardHeader title="Top 5 Tours (Receita)" />
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                     <tr>
                        <th className="px-4 py-3">Tour</th>
                        <th className="px-4 py-3">Pax</th>
                        <th className="px-4 py-3">Ocupação</th>
                        <th className="px-4 py-3 text-right">Receita</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Douro Vinhateiro Premium</td>
                        <td className="px-4 py-3">142</td>
                        <td className="px-4 py-3">
                           <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 max-w-[100px]">
                              <div className="bg-green-500 h-1.5 rounded-full" style={{width: '92%'}}></div>
                           </div>
                           <span className="text-xs text-gray-500 mt-1">92%</span>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900">€8,450</td>
                     </tr>
                     <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Porto City Tour</td>
                        <td className="px-4 py-3">210</td>
                        <td className="px-4 py-3">
                           <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 max-w-[100px]">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '78%'}}></div>
                           </div>
                           <span className="text-xs text-gray-500 mt-1">78%</span>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900">€3,200</td>
                     </tr>
                     <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Gerês Nature</td>
                        <td className="px-4 py-3">56</td>
                        <td className="px-4 py-3">
                           <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 max-w-[100px]">
                              <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
                           </div>
                           <span className="text-xs text-gray-500 mt-1">65%</span>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900">€1,800</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </Card>
      </div>
    </div>
  );
};
