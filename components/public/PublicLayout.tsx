
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Operator } from '../../types';
import { ShoppingBag, User } from 'lucide-react';

interface PublicLayoutProps {
  operator: Operator;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ operator }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Public Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             {operator.logo_url ? (
               <img src={operator.logo_url} alt={operator.name} className="h-8 w-8 rounded-full bg-gray-200" />
             ) : (
               <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold">
                 {operator.name.substring(0, 2)}
               </div>
             )}
             <span className="font-bold text-lg tracking-tight">{operator.name}</span>
          </div>

          <div className="flex items-center gap-4">
             <button className="text-sm font-medium text-gray-600 hover:text-primary">
                Meus Bilhetes
             </button>
             <button className="p-2 text-gray-400 hover:text-gray-900">
                <User size={20} />
             </button>
             <button className="p-2 text-gray-400 hover:text-primary relative">
                <ShoppingBag size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-4">{operator.name}</h4>
                <p className="text-sm text-gray-500">
                  Experiências turísticas inesquecíveis em Portugal.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Links Úteis</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                   <li><a href="#" className="hover:text-primary">Termos e Condições</a></li>
                   <li><a href="#" className="hover:text-primary">Política de Cancelamento</a></li>
                   <li><a href="#" className="hover:text-primary">Contactos</a></li>
                </ul>
              </div>
              <div className="text-sm text-gray-500">
                 <p>&copy; {new Date().getFullYear()} {operator.name}.</p>
                 <p className="mt-2 text-xs">Powered by TourFlow</p>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};
