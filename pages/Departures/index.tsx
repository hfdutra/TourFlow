import React, { useState } from 'react';
import { DepartureCalendar } from './DepartureCalendar';
import { DepartureList } from './DepartureList';
import { Button } from '../../components/ui/Button';
import { Calendar, List, Plus, Filter } from 'lucide-react';

export const DeparturesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partidas</h1>
          <p className="text-gray-500">Calendário de saídas e gestão operacional.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-gray-200 rounded-md flex p-1">
             <button 
               onClick={() => setViewMode('calendar')}
               className={`p-1.5 rounded ${viewMode === 'calendar' ? 'bg-gray-100 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
             >
               <Calendar size={18} />
             </button>
             <button 
               onClick={() => setViewMode('list')}
               className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
             >
               <List size={18} />
             </button>
          </div>
          <Button>
            <Plus size={18} className="mr-2" />
            Nova Partida
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
         {viewMode === 'calendar' ? <DepartureCalendar /> : <DepartureList />}
      </div>
    </div>
  );
};