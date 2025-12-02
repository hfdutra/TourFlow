
import React from 'react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MOCK_KPIS, MOCK_BOOKINGS, MOCK_REVENUE_DATA } from '../services/mockData';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Euro, 
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const KPICard: React.FC<{
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: React.ElementType;
  color: string;
}> = ({ title, value, change, positive, icon: Icon, color }) => (
  <div className="bg-surface p-5 rounded-lg border border-border shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
    <div className="flex justify-between items-start z-10">
      <div>
        <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-text-primary">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={20} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-4 z-10">
      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {change}
      </span>
      <span className="text-xs text-text-muted">vs. mês anterior</span>
    </div>
    {/* Decorative background circle */}
    <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full ${color} opacity-5 group-hover:scale-110 transition-transform duration-500`}></div>
  </div>
);

export const DashboardHome: React.FC = () => {
  // Take last 5 for preview
  const recentBookings = MOCK_BOOKINGS.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Visão Geral</h1>
          <p className="text-text-secondary">Bem-vindo de volta, João. Aqui está o resumo de hoje.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Ver Relatórios</Button>
          <Button>+ Nova Reserva</Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Receita Mensal" 
          value={`€${MOCK_KPIS.revenue_month.toLocaleString('pt-PT')}`} 
          change="+15.4%" 
          positive={true} 
          icon={Euro}
          color="bg-primary"
        />
        <KPICard 
          title="Reservas" 
          value={MOCK_KPIS.bookings_month.toString()} 
          change="+8.2%" 
          positive={true} 
          icon={TrendingUp}
          color="bg-secondary"
        />
        <KPICard 
          title="Ocupação Média" 
          value={`${MOCK_KPIS.occupancy_rate}%`} 
          change="-2.1%" 
          positive={false} 
          icon={Users}
          color="bg-warning"
        />
        <KPICard 
          title="Próximas Partidas" 
          value={MOCK_KPIS.next_departures_count.toString()} 
          change="Próx. 7 dias" 
          positive={true} 
          icon={Calendar}
          color="bg-purple-500"
        />
      </div>

      {/* Charts & Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader 
              title="Evolução de Receita" 
              action={
                <select className="text-xs border border-border rounded-md px-2 py-1 bg-background text-text-secondary outline-none">
                  <option>Últimos 6 meses</option>
                  <option>Este ano</option>
                </select>
              }
            />
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#6B7280', fontSize: 12}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#6B7280', fontSize: 12}} 
                    tickFormatter={(value) => `€${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6366F1" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Bookings */}
        <div className="lg:col-span-1">
          <Card className="h-full" noPadding>
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h3 className="font-semibold text-text-primary">Reservas Recentes</h3>
              <Button variant="ghost" size="sm">Ver tudo</Button>
            </div>
            <div className="divide-y divide-border">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-text-secondary font-medium text-xs">
                      {booking.customer_name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{booking.customer_name}</p>
                      <p className="text-xs text-text-secondary">{booking.tour_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text-primary">€{booking.amount}</p>
                    <StatusBadge status={booking.status} />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4">
              <Button variant="outline" className="w-full text-xs">
                Ver todas as reservas <ArrowRight size={14} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
