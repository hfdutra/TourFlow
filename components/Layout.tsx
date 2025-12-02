import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Operator } from '../types';
import { Menu, Bell, Search } from 'lucide-react';

interface LayoutProps {
  operator: Operator;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ operator, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex text-text-primary font-sans">
      {/* Sidebar */}
      <Sidebar 
        operator={operator} 
        onLogout={onLogout} 
        isOpen={sidebarOpen}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Top Header */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md text-text-secondary"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1.5 w-64 border border-transparent focus-within:border-primary focus-within:bg-white transition-colors">
              <Search size={16} className="text-text-muted mr-2" />
              <input 
                type="text" 
                placeholder="Pesquisar reservas, tours..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-text-muted text-text-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full text-text-secondary">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm">
              JS
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};