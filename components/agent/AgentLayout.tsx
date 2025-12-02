
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Operator, Agent } from '../../types';
import { LayoutDashboard, Ticket, LogOut, PlusCircle, Briefcase } from 'lucide-react';

interface AgentLayoutProps {
  operator: Operator;
  agent: Agent;
  onLogout: () => void;
}

export const AgentLayout: React.FC<AgentLayoutProps> = ({ operator, agent, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">
                  TF
                </div>
                <span className="font-bold text-gray-900 hidden md:block">Portal Parceiros</span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex space-x-4">
                <NavLink 
                  to="/agent" 
                  end
                  className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  <LayoutDashboard size={18} /> Dashboard
                </NavLink>
                <NavLink 
                  to="/agent/bookings" 
                  className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  <Ticket size={18} /> Minhas Reservas
                </NavLink>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => navigate(`/p/${operator.slug}`)}
                 className="hidden md:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
               >
                 <PlusCircle size={18} /> Nova Reserva
               </button>

               <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

               <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                     <div className="text-sm font-medium text-gray-900">{agent.company_name}</div>
                     <div className="text-xs text-gray-500">{agent.contact_name}</div>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                     <Briefcase size={18} />
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Sair"
                  >
                    <LogOut size={20} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
