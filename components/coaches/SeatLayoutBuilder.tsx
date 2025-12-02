import React, { useState, useEffect } from 'react';
import { CoachLayout, Seat, SeatType } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SeatMap } from './SeatMap';
import { RefreshCw, RotateCcw } from 'lucide-react';

interface SeatLayoutBuilderProps {
  initialLayout?: CoachLayout;
  onSave: (layout: CoachLayout) => void;
}

export const SeatLayoutBuilder: React.FC<SeatLayoutBuilderProps> = ({ initialLayout, onSave }) => {
  const [config, setConfig] = useState({
    rows: initialLayout?.rows || 12,
    columns: initialLayout?.columns || 4,
    aisleAfter: initialLayout?.aisleAfter || 2,
    totalCapacity: 0
  });

  const [currentLayout, setCurrentLayout] = useState<CoachLayout | null>(initialLayout || null);
  const [mode, setMode] = useState<SeatType>('premium'); // What to apply on click

  // Generate layout based on dimensions
  const generateTemplate = () => {
    const seats: Seat[] = [];
    const colLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    let count = 0;

    for (let r = 1; r <= config.rows; r++) {
      for (let c = 0; c < config.columns; c++) {
        // Simple logic: If it's the last row, fill all cols. 
        // If not, skip the hypothetical aisle position? 
        // Actually, let's keep it simple: Aisle is just visual gap. 
        // AisleAfter = 2 means Col indices 0, 1 ... gap ... 2, 3
        
        // However, usually letters skip the aisle too? Or not? 
        // Let's assume standard 2+2: A,B | C,D. Aisle is between B(1) and C(2).
        
        seats.push({
          id: `${r}${colLetters[c]}`,
          row: r,
          col: colLetters[c],
          type: 'regular',
          priceModifier: 0,
        });
        count++;
      }
    }

    const newLayout = {
      rows: config.rows,
      columns: config.columns,
      aisleAfter: config.aisleAfter,
      seats
    };
    
    setCurrentLayout(newLayout);
    setConfig(prev => ({ ...prev, totalCapacity: count }));
    onSave(newLayout);
  };

  useEffect(() => {
    if (!currentLayout) generateTemplate();
  }, []);

  const handleSeatClick = (clickedSeat: Seat) => {
    if (!currentLayout) return;

    // Toggle logic or apply selected mode?
    // Let's cycle types if no specific tool selected, or apply tool.
    // Let's implementing cycling for simplicity: Regular -> Premium -> Staff -> Blocked -> Regular
    
    const nextType = (current: SeatType): SeatType => {
      if (current === 'regular') return 'premium';
      if (current === 'premium') return 'staff';
      if (current === 'staff') return 'blocked';
      if (current === 'blocked') return 'guide';
      return 'regular';
    };

    const updatedSeats = currentLayout.seats.map(s => {
      if (s.id === clickedSeat.id) {
        const newType = nextType(s.type);
        return { 
          ...s, 
          type: newType,
          priceModifier: newType === 'premium' ? 5 : 0 
        };
      }
      return s;
    });

    const updatedLayout = { ...currentLayout, seats: updatedSeats };
    
    // Update capacity (exclude blocked/staff?)
    const capacity = updatedSeats.filter(s => s.type !== 'blocked' && s.type !== 'staff' && s.type !== 'guide').length;
    
    setCurrentLayout(updatedLayout);
    setConfig(prev => ({ ...prev, totalCapacity: capacity }));
    onSave(updatedLayout);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold mb-4 text-sm uppercase text-gray-500">Dimensões</h3>
          <div className="grid grid-cols-2 gap-4">
             <Input 
               label="Filas" 
               type="number" 
               value={config.rows} 
               onChange={(e) => setConfig({ ...config, rows: parseInt(e.target.value) })} 
             />
             <Input 
               label="Colunas" 
               type="number" 
               max={5}
               value={config.columns} 
               onChange={(e) => setConfig({ ...config, columns: parseInt(e.target.value) })} 
             />
             <div className="col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Corredor após coluna</label>
               <select 
                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"
                 value={config.aisleAfter}
                 onChange={(e) => setConfig({ ...config, aisleAfter: parseInt(e.target.value) })}
               >
                 <option value={1}>1 (A | B C)</option>
                 <option value={2}>2 (A B | C D)</option>
                 <option value={3}>3 (A B C | D)</option>
               </select>
             </div>
          </div>
          <Button onClick={generateTemplate} variant="outline" className="w-full mt-4 text-xs">
            <RefreshCw size={14} className="mr-2" /> Gerar Grelha Base
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
           <h3 className="font-semibold mb-2 text-blue-900">Instruções</h3>
           <p className="text-sm text-blue-700">Clique nos lugares para alterar o tipo:</p>
           <ul className="text-xs mt-2 space-y-1 text-blue-800">
             <li>⚪ Regular (Normal)</li>
             <li>🟡 Premium (+€)</li>
             <li>🟣 Staff (Não vendável)</li>
             <li>🔴 Bloqueado (Manutenção)</li>
             <li>🔵 Guia</li>
           </ul>
           <div className="mt-4 pt-4 border-t border-blue-200 font-bold text-center text-blue-900">
             Capacidade Comercial: {config.totalCapacity} pax
           </div>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:col-span-2 flex justify-center bg-gray-100 rounded-lg p-8 overflow-x-auto min-h-[500px]">
        {currentLayout && (
          <SeatMap 
            layout={currentLayout} 
            onSeatClick={handleSeatClick}
          />
        )}
      </div>
    </div>
  );
};