import React, { useState } from 'react';
import { MOCK_DEPARTURES } from '../../services/mockData';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export const DepartureCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 is Sunday
  
  // Adjust for Monday start (PT standard)
  const startDayAdjusted = startDay === 0 ? 6 : startDay - 1;

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDayAdjusted }, (_, i) => i);

  const monthName = currentDate.toLocaleString('pt-PT', { month: 'long', year: 'numeric' });

  const getDeparturesForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return MOCK_DEPARTURES.filter(d => d.departure_date === dateStr);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
         <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold capitalize text-gray-900">{monthName}</h2>
            <div className="flex rounded-md shadow-sm">
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                 onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                 className="p-1 border-l-0 border border-gray-300 rounded-r-md hover:bg-gray-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
         </div>
         <div className="text-sm text-gray-500">
            {MOCK_DEPARTURES.filter(d => new Date(d.departure_date).getMonth() === currentDate.getMonth()).length} partidas
         </div>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
          <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-gray-200 gap-px">
        {blanks.map(i => (
          <div key={`blank-${i}`} className="bg-white min-h-[100px]" />
        ))}
        
        {days.map(day => {
          const departures = getDeparturesForDay(day);
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
          
          return (
            <div key={day} className={`bg-white min-h-[100px] p-2 hover:bg-gray-50 transition-colors relative group ${isToday ? 'bg-blue-50/30' : ''}`}>
              <div className="flex justify-between items-start">
                 <span className={`text-sm font-medium ${isToday ? 'bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-gray-700'}`}>
                   {day}
                 </span>
                 <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-primary">
                   <Plus size={14} />
                 </button>
              </div>
              
              <div className="mt-2 space-y-1">
                {departures.map(dep => (
                  <div key={dep.id} className="text-xs p-1.5 rounded bg-blue-50 border border-blue-100 text-blue-800 cursor-pointer hover:bg-blue-100 truncate">
                    <div className="font-semibold">{dep.departure_time}</div>
                    <div className="truncate">{dep.tour?.name}</div>
                    <div className="flex justify-between mt-0.5 text-[10px] text-blue-600">
                       <span>{dep.booked_seats}/{dep.total_capacity} pax</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};