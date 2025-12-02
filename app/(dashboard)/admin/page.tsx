import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight, ArrowDownRight, Users, Ticket, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bom dia, João! 👋</h1>
          <p className="text-gray-500">Aqui está o resumo da sua operação hoje.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">Ver Agenda</Button>
           <Button>+ Nova Reserva</Button>
        </div>
      </div>

      {/* KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Receita do Mês"
          value="€12.450"
          trend="+15%"
          trendUp={true}
          icon={<TrendingUp className="text-green-600" size={24} />}
          color="bg-green-50"
        />
        <KPICard
          title="Reservas do Mês"
          value="87"
          trend="+5%"
          trendUp={true}
          icon={<Ticket className="text-blue-600" size={24} />}
          color="bg-blue-50"
        />
        <KPICard
          title="Ocupação Média"
          value="78%"
          trend="-2%"
          trendUp={false}
          icon={<Users className="text-purple-600" size={24} />}
          color="bg-purple-50"
        />
        <KPICard
          title="Próximas Partidas"
          value="12"
          subtext="Próximos 7 dias"
          icon={<Calendar className="text-orange-600" size={24} />}
          color="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-6">
           <Card className="h-96">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-gray-900">Receita e Reservas</h3>
                 <select className="text-sm border-gray-300 rounded-md">
                    <option>Últimos 30 dias</option>
                    <option>Este ano</option>
                 </select>
              </div>
              <div className="h-full flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                 <p className="text-gray-400">Gráfico de Receita (Recharts) será renderizado aqui</p>
              </div>
           </Card>

           <Card>
              <h3 className="font-bold text-gray-900 mb-4">Partidas de Hoje</h3>
              <div className="overflow-x-auto">
                 <table className="min-w-full text-sm">
                    <thead>
                       <tr className="bg-gray-50 text-left">
                          <th className="py-3 px-4 font-semibold text-gray-600 rounded-l-lg">Hora</th>
                          <th className="py-3 px-4 font-semibold text-gray-600">Tour</th>
                          <th className="py-3 px-4 font-semibold text-gray-600">Autocarro</th>
                          <th className="py-3 px-4 font-semibold text-gray-600">Ocupação</th>
                          <th className="py-3 px-4 font-semibold text-gray-600 rounded-r-lg">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       <tr>
                          <td className="py-3 px-4 font-mono text-gray-900">09:00</td>
                          <td className="py-3 px-4 text-gray-900 font-medium">Douro Vinhateiro</td>
                          <td className="py-3 px-4 text-gray-500">Mercedes 50L</td>
                          <td className="py-3 px-4">
                             <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                   <div className="h-full bg-green-500 w-[90%]"></div>
                                </div>
                                <span className="text-xs text-gray-500">45/50</span>
                             </div>
                          </td>
                          <td className="py-3 px-4">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Em Curso
                             </span>
                          </td>
                       </tr>
                       <tr>
                          <td className="py-3 px-4 font-mono text-gray-900">14:00</td>
                          <td className="py-3 px-4 text-gray-900 font-medium">Porto City Tour</td>
                          <td className="py-3 px-4 text-gray-500">Minibus A</td>
                          <td className="py-3 px-4">
                             <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                   <div className="h-full bg-yellow-500 w-[60%]"></div>
                                </div>
                                <span className="text-xs text-gray-500">12/19</span>
                             </div>
                          </td>
                          <td className="py-3 px-4">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Agendado
                             </span>
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </Card>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
           {/* Alerts Panel */}
           <Card className="bg-red-50 border-red-100">
              <div className="flex items-center gap-2 mb-3 text-red-800 font-bold">
                 <AlertCircle size={20} />
                 <h3>Atenção Necessária</h3>
              </div>
              <ul className="space-y-3">
                 <li className="flex gap-3 text-sm text-red-700 bg-white p-3 rounded border border-red-100 shadow-sm cursor-pointer hover:bg-red-50 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                    <p>Partida "Fátima" (18 Fev) com apenas 8 passageiros (mín: 15)</p>
                 </li>
                 <li className="flex gap-3 text-sm text-red-700 bg-white p-3 rounded border border-red-100 shadow-sm cursor-pointer hover:bg-red-50 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                    <p>3 reservas com pagamento pendente há &gt;48h</p>
                 </li>
              </ul>
           </Card>

           {/* Recent Bookings Feed */}
           <Card>
              <h3 className="font-bold text-gray-900 mb-4">Reservas Recentes</h3>
              <div className="space-y-4">
                 {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                       <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                          {i === 1 ? 'MS' : i === 2 ? 'JD' : 'AC'}
                       </div>
                       <div>
                          <p className="text-sm font-medium text-gray-900">Maria Silva reservou <span className="text-primary">Douro Tour</span></p>
                          <p className="text-xs text-gray-500">Há 25 minutos • €150.00</p>
                       </div>
                    </div>
                 ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 text-xs">Ver todas as reservas</Button>
           </Card>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, trendUp, icon, color, subtext }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow">
       <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-lg ${color}`}>
             {icon}
          </div>
          {trend && (
             <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {trend}
             </div>
          )}
       </div>
       <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
       <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
       {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
    </Card>
  );
}
