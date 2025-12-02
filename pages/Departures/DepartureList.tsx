
import React from 'react';
import { MOCK_DEPARTURES } from '../../services/mockData';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';

export const DepartureList: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ocupação</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autocarro</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {MOCK_DEPARTURES.map((dep) => {
            const occupancy = Math.round((dep.booked_seats / dep.total_capacity) * 100);
            return (
              <tr key={dep.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{new Date(dep.departure_date).toLocaleDateString('pt-PT')}</div>
                  <div className="text-sm text-gray-500">{dep.departure_time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{dep.tour?.name}</div>
                  <div className="text-xs text-gray-500">{dep.tour?.tour_type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="flex items-center gap-2">
                     <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                       <div className={`h-full ${occupancy > 80 ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${occupancy}%`}}></div>
                     </div>
                     <span className="text-xs text-gray-600">{dep.booked_seats}/{dep.total_capacity}</span>
                   </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={dep.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {dep.coach_id ? 'Autocarro A' : <span className="text-orange-400 text-xs">Não atribuído</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">Gerir</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
