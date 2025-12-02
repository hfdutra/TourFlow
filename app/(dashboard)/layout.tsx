import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Map,
  Calendar,
  Ticket,
  Users,
  Bus,
  MapPin,
  Briefcase,
  CreditCard,
  BarChart,
  MessageSquare,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronLeft
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0 transition-all duration-300">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              VT
            </div>
            <span className="font-bold text-gray-900 tracking-tight">TourFlow</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
          <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Visão Geral" active />

          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Operações
          </div>
          <NavItem href="/admin/tours" icon={<Map size={20} />} label="Tours" />
          <NavItem href="/admin/partidas" icon={<Calendar size={20} />} label="Partidas" />
          <NavItem href="/admin/reservas" icon={<Ticket size={20} />} label="Reservas" />
          <NavItem href="/admin/autocarros" icon={<Bus size={20} />} label="Autocarros" />
          <NavItem href="/admin/rotas" icon={<MapPin size={20} />} label="Rotas" />

          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Comercial
          </div>
          <NavItem href="/admin/clientes" icon={<Users size={20} />} label="Clientes" />
          <NavItem href="/admin/agentes" icon={<Briefcase size={20} />} label="Agentes B2B" />
          <NavItem href="/admin/vendas" icon={<CreditCard size={20} />} label="Vendas & POS" />

          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Gestão
          </div>
          <NavItem href="/admin/relatorios" icon={<BarChart size={20} />} label="Relatórios" />
          <NavItem href="/admin/comunicacao" icon={<MessageSquare size={20} />} label="Comunicação" />
          <NavItem href="/admin/configuracoes" icon={<Settings size={20} />} label="Configurações" />
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
           <button className="flex items-center gap-3 w-full p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
              <LogOut size={18} /> Sair
           </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
           {/* Breadcrumbs / Title */}
           <div className="flex items-center text-sm font-medium text-gray-500">
              <span className="text-gray-900">Dashboard</span>
              <span className="mx-2">/</span>
              <span>Visão Geral</span>
           </div>

           {/* Right Actions */}
           <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              <div className="h-8 w-px bg-gray-200"></div>

              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">João Silva</p>
                    <p className="text-xs text-gray-500">Administrador</p>
                 </div>
                 <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-200">
                    {/* Avatar placeholder */}
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold">JS</div>
                 </div>
              </div>
           </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
           <div className="max-w-7xl mx-auto">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${active
          ? 'bg-primary/10 text-primary'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
      `}
    >
      <span className={active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}>
        {icon}
      </span>
      {label}
    </Link>
  );
}
