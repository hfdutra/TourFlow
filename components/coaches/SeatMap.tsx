import React from 'react';
import { CoachLayout, Seat, SeatType } from '../../types';

interface SeatMapProps {
  layout: CoachLayout;
  onSeatClick?: (seat: Seat) => void;
  selectedSeats?: string[]; // array of seat IDs
  readOnly?: boolean;
}

export const SeatMap: React.FC<SeatMapProps> = ({ 
  layout, 
  onSeatClick, 
  selectedSeats = [], 
  readOnly = false 
}) => {
  const { rows, columns, aisleAfter, seats } = layout;

  // Helper to find seat by grid position
  const getSeatAt = (row: number, colIndex: number): Seat | undefined => {
    const colLetters = ['A', 'B', 'C', 'D', 'E'];
    // Logic needs to match how we generate/store. 
    // Assuming simple mapping for now: colIndex maps directly to stored letters
    const letter = colLetters[colIndex];
    return seats.find(s => s.row === row && s.col === letter);
  };

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.includes(seat.id)) return 'bg-primary text-white border-primary';
    if (seat.isBooked) return 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300';
    
    switch (seat.type) {
      case 'premium': return 'bg-yellow-50 border-yellow-400 text-yellow-700 hover:bg-yellow-100';
      case 'blocked': return 'bg-red-50 border-red-200 text-red-300 cursor-not-allowed';
      case 'staff': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'driver': return 'bg-gray-800 text-white';
      case 'guide': return 'bg-blue-50 border-blue-400 text-blue-700';
      default: return 'bg-white border-gray-300 text-gray-700 hover:border-primary hover:text-primary';
    }
  };

  // Generate grid rows
  const renderGrid = () => {
    const gridRows = [];
    
    // Driver Area
    gridRows.push(
      <div key="driver-row" className="flex justify-between items-center mb-8 px-4">
         <div className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center text-xs bg-gray-100 text-gray-400">
            Porta
         </div>
         <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-lg border-2 border-gray-800 bg-gray-700 text-white flex items-center justify-center mb-1">
               <span className="text-[10px]">Driver</span>
            </div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
         </div>
      </div>
    );

    for (let r = 1; r <= rows; r++) {
      const rowSeats = [];
      for (let c = 0; c < columns; c++) {
        // Aisle logic
        if (c === aisleAfter) {
          rowSeats.push(<div key={`aisle-${r}`} className="w-8 flex justify-center text-xs text-gray-300 py-2">{r}</div>);
        }

        const seat = getSeatAt(r, c);
        
        if (seat) {
          rowSeats.push(
            <button
              key={seat.id}
              onClick={() => !readOnly && !seat.isBooked && seat.type !== 'blocked' && onSeatClick?.(seat)}
              disabled={readOnly || seat.isBooked || seat.type === 'blocked'}
              className={`
                w-10 h-10 rounded-t-lg rounded-b-md border-2 m-1 flex flex-col items-center justify-center transition-all relative
                ${getSeatColor(seat)}
                ${seat.type === 'blocked' ? 'opacity-50' : 'shadow-sm'}
              `}
              title={`${seat.type.toUpperCase()} - ${seat.priceModifier > 0 ? `+€${seat.priceModifier}` : ''}`}
            >
              <span className="text-sm font-bold">{seat.id}</span>
              {seat.priceModifier > 0 && (
                <span className="text-[8px] absolute -top-2 -right-2 bg-green-100 text-green-700 px-1 rounded-full border border-green-200">€</span>
              )}
            </button>
          );
        } else {
           // Empty space if needed
           rowSeats.push(<div key={`empty-${r}-${c}`} className="w-10 h-10 m-1"></div>);
        }
      }
      
      gridRows.push(
        <div key={`row-${r}`} className="flex justify-center items-center">
          {rowSeats}
        </div>
      );
    }
    return gridRows;
  };

  return (
    <div className="inline-block bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-inner">
      <div className="flex flex-col">
        {renderGrid()}
      </div>
      
      {/* Legend */}
      {!readOnly && (
        <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs">
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-gray-300 rounded bg-white"></div> Regular
           </div>
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-yellow-400 rounded bg-yellow-50"></div> Premium
           </div>
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-primary rounded bg-primary"></div> Selecionado
           </div>
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-gray-300 rounded bg-gray-300"></div> Ocupado
           </div>
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-red-200 rounded bg-red-50"></div> Bloqueado
           </div>
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-blue-400 rounded bg-blue-50"></div> Guia
           </div>
        </div>
      )}
    </div>
  );
};