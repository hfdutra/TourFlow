
import React from 'react';
import { PickupPoint } from '../../types';
import { MapPin } from 'lucide-react';

interface RouteMapProps {
  points: PickupPoint[];
  className?: string;
}

export const RouteMap: React.FC<RouteMapProps> = ({ points, className = '' }) => {
  // Since we don't have a real map provider, we'll create a stylized conceptual map
  // using absolute positioning to simulate markers on a canvas.
  // In a real app, this would wrap MapboxGL.

  return (
    <div className={`relative bg-blue-50 border border-blue-100 rounded-lg overflow-hidden ${className}`}>
      {/* Background Grid Pattern to simulate map */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Placeholder for Map Text */}
      <div className="absolute top-2 left-2 z-10 bg-white/80 px-2 py-1 text-xs font-mono rounded backdrop-blur-sm text-gray-500">
        Mapbox Simulation
      </div>

      <div className="relative h-full w-full flex items-center justify-center p-8">
        {/* Draw a connecting line */}
        <div className="absolute top-1/2 left-10 right-10 h-1 bg-gray-300 rounded z-0"></div>

        {/* Draw Points */}
        <div className="flex justify-between w-full items-center z-10 relative">
          {points.length === 0 && (
             <div className="text-gray-400 text-sm mx-auto">Nenhum ponto de recolha definido no mapa.</div>
          )}
          
          {points.map((point, index) => (
            <div key={point.id} className="flex flex-col items-center group cursor-pointer relative">
               {/* Tooltip */}
               <div className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                 {point.name} ({point.time_offset_minutes}m)
               </div>
               
               {/* Marker */}
               <div className="w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary font-bold shadow-md transform group-hover:scale-110 transition-transform">
                  {index + 1}
               </div>
               
               {/* Label */}
               <div className="mt-2 text-xs font-medium text-gray-700 max-w-[80px] text-center truncate bg-white/50 px-1 rounded">
                 {point.name}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
