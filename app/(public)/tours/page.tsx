import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Filter, ChevronDown } from 'lucide-react';

export default function ToursPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nossos Tours</h1>
          <p className="text-gray-500">Explore as nossas viagens e experiências exclusivas</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none justify-between">
            <span className="flex items-center gap-2"><Filter size={16} /> Filtros</span>
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none justify-between">
             Ordenar por: Relevância <ChevronDown size={16} className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden md:block col-span-1 space-y-8">
           <div>
              <h3 className="font-bold text-gray-900 mb-4">Categorias</h3>
              <div className="space-y-2">
                 {['Natureza', 'Cultural', 'Gastronomia', 'Religioso', 'Aventura', 'Premium'].map(cat => (
                   <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-gray-600 group-hover:text-primary transition-colors">{cat}</span>
                   </label>
                 ))}
              </div>
           </div>

           <div>
              <h3 className="font-bold text-gray-900 mb-4">Duração</h3>
              <div className="space-y-2">
                 {['Meio dia', '1 Dia', '2-3 Dias', '+3 Dias'].map(dur => (
                   <label key={dur} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-gray-600 group-hover:text-primary transition-colors">{dur}</span>
                   </label>
                 ))}
              </div>
           </div>

           <div>
              <h3 className="font-bold text-gray-900 mb-4">Preço</h3>
              <div className="px-1">
                 <input type="range" className="w-full accent-primary" />
                 <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>€0</span>
                    <span>€500+</span>
                 </div>
              </div>
           </div>
        </aside>

        {/* Tours Grid */}
        <div className="col-span-1 md:col-span-3">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Link key={i} href={`/tours/tour-${i}`} className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                   <div className="relative aspect-[4/3] bg-gray-100">
                      <Image
                        src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?auto=format&fit=crop&q=80`}
                        alt="Tour"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                         <button className="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white hover:text-red-500 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                         </button>
                      </div>
                   </div>
                   <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">1 Dia</span>
                         <span className="text-xs text-gray-500">Cultural</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Tour Exemplo {i}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                         Uma descrição curta e envolvente sobre este tour incrível que você não pode perder.
                      </p>
                      <div className="flex items-end justify-between">
                         <div>
                            <span className="text-xs text-gray-400 block">Desde</span>
                            <span className="font-bold text-lg text-gray-900">€45</span>
                         </div>
                         <span className="text-sm font-medium text-primary group-hover:underline">Ver detalhes</span>
                      </div>
                   </div>
                </Link>
              ))}
           </div>

           <div className="mt-12 flex justify-center">
              <Button variant="outline">Carregar mais tours</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
