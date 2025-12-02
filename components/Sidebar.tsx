
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Calendar, 
  Users, 
  Bus, 
  Settings, 
  LogOut,
  Ticket,
  Briefcase,
  PieChart,
  MapPin,
  BadgeEuro,
  MessageSquare,
  QrCode
} from 'lucide-react';
import { Operator } from '../types';

interface SidebarProps {
  operator: Operator;
  onLogout: () => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ operator, onLogout, isOpen }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/dashboard' },
    { icon: QrCode, label: 'Operações (App)', path: '/dashboard/operations/checkin' },
    { icon: Map, label: 'Tours', path: '/dashboard/tours' },
    { icon: Calendar, label: 'Partidas', path: '/dashboard/departures' },
    { icon: Ticket, label: 'Reservas', path: '/dashboard/bookings' },
    { icon: BadgeEuro, label: 'Vendas', path: '/dashboard/sales' },
    { icon: Users, label: 'Clientes', path: '/dashboard/customers' },
    { icon: Bus, label: 'Autocarros', path: '/dashboard/coaches' },
    { icon: MapPin, label: 'Rotas', path: '/dashboard/routes' },
    { icon: MessageSquare, label: 'Comunicação', path: '/dashboard/communication' },
    { icon: Briefcase, label: 'Agentes', path: '/dashboard/agents' },
    { icon: PieChart, label: 'Relatórios', path: '/dashboard/reports' },
    { icon: Settings, label: 'Configurações', path: '/dashboard/settings' },
  ];

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 bg-surface border-r border-border transition-all duration-300 flex flex-col
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      {/* Header / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded bg-primary flex-shrink-0 flex items-center justify-center text-white font-bold">
            TF
          </div>
          {isOpen && (
            <span className="font-bold text-lg text-text-primary whitespace-nowrap">
              TourFlow
            </span>
          )}
        </div>
      </div>

      {/* Operator Info */}
      <div className="p-4 border-b border-border">
        <div className={`flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
          <img 
            src={operator.logo_url} 
            alt={operator.name} 
            className="w-8 h-8 rounded-full bg-gray-200 object-cover"
          />
          {isOpen && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-text-primary truncate">{operator.name}</span>
              <span className="text-xs text-text-secondary uppercase tracking-wider">{operator.subscription_tier}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'} // Only exact match for root
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium
              ${isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'}
              ${!isOpen && 'justify-center'}
            `}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-border">
        <button 
          onClick={onLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-md text-text-secondary hover:bg-red-50 hover:text-danger transition-colors text-sm font-medium
            ${!isOpen && 'justify-center'}
          `}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {isOpen && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};
