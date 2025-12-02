
import React from 'react';
import { Tour } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Badge } from '../ui/Badge';
import { Clock, Users, Edit, Copy, Archive, Eye } from 'lucide-react';
import { Button } from '../ui/Button';

interface TourCardProps {
  tour: Tour;
  onEdit: (id: string) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onEdit }) => {
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'day_trip': return 'Day Trip';
      case 'multi_day': return 'Multi-day';
      case 'express': return 'Express';
      case 'charter': return 'Charter';
      default: return type;
    }
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Image Area */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {tour.featured_image ? (
          <img 
            src={tour.featured_image} 
            alt={tour.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            <span className="text-sm">Sem imagem</span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
           <StatusBadge status={tour.status} className="shadow-sm" />
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge variant="info" className="shadow-sm bg-white/90 backdrop-blur-sm">{getTypeLabel(tour.tour_type)}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{tour.name}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{tour.duration_days > 1 ? `${tour.duration_days} dias` : `${tour.duration_hours}h`}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>Min. {tour.min_passengers}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wide">A partir de</span>
            <div className="font-bold text-lg text-primary">€{tour.base_price}</div>
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(tour.id)}
              className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-primary tooltip"
              title="Editar"
            >
              <Edit size={16} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-primary" title="Duplicar">
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
