'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, MapPin, Check, Star, Users, Globe } from 'lucide-react';
import { getTourBySlug } from '@/lib/supabase';
import type { Tour } from '@/types';

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTourBySlug(params.slug).then((data) => {
      setTour(data as unknown as Tour);
      setLoading(false);
    });
  }, [params.slug]);

  if (loading) return <div className="p-20 text-center">A carregar...</div>;
  if (!tour) return <div className="p-20 text-center">Tour não encontrado.</div>;

  return (
    <div className="pb-20">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={tour.featured_image || 'https://images.unsplash.com/photo-1571406604297-b86129994c50'}
          alt={tour.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 text-white">
           <div className="max-w-7xl mx-auto">
              <div className="flex gap-2 mb-4">
                 {tour.categories?.map(cat => (
                   <span key={cat} className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                     {cat}
                   </span>
                 ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.name}</h1>
              <div className="flex flex-wrap gap-6 text-sm md:text-base opacity-90">
                 <div className="flex items-center gap-2"><Clock size={18} /> {tour.duration_days} Dias / {tour.duration_hours} Horas</div>
                 <div className="flex items-center gap-2"><Users size={18} /> Mín. {tour.min_passengers} Pessoas</div>
                 <div className="flex items-center gap-2 text-yellow-400"><Star size={18} fill="currentColor" /> 4.9 (120 reviews)</div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-12">

            {/* Description */}
            <section>
               <h2 className="text-2xl font-bold mb-4 text-gray-900">Sobre esta experiência</h2>
               <p className="text-gray-600 leading-relaxed text-lg">
                  {tour.description || 'Uma descrição detalhada estaria aqui.'}
               </p>
            </section>

            {/* Highlights */}
            <section>
               <h2 className="text-2xl font-bold mb-6 text-gray-900">Destaques</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Prova de Vinhos no Douro', 'Almoço Típico Regional', 'Cruzeiro de 1 Hora', 'Visita a 2 Quintas'].map((h, i) => (
                     <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <Check className="text-secondary shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700 font-medium">{h}</span>
                     </div>
                  ))}
               </div>
            </section>

            {/* Itinerary (Placeholder) */}
            <section>
               <h2 className="text-2xl font-bold mb-6 text-gray-900">Itinerário</h2>
               <div className="space-y-8 pl-4 border-l-2 border-gray-200 ml-3">
                  <div className="relative">
                     <div className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                     <h3 className="font-bold text-lg mb-2 text-gray-900">09:00 - Partida do Porto</h3>
                     <p className="text-gray-600">Encontro no ponto de recolha e viagem confortável em autocarro de turismo.</p>
                  </div>
                  <div className="relative">
                     <div className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                     <h3 className="font-bold text-lg mb-2 text-gray-900">11:00 - Quinta do Seixo</h3>
                     <p className="text-gray-600">Visita guiada às vinhas e prova de Vinho do Porto Sandeman.</p>
                  </div>
                  <div className="relative">
                     <div className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                     <h3 className="font-bold text-lg mb-2 text-gray-900">13:00 - Almoço no Pinhão</h3>
                     <p className="text-gray-600">Almoço tradicional com bebidas incluídas num restaurante local.</p>
                  </div>
               </div>
            </section>
         </div>

         {/* Sticky Booking Card */}
         <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
               <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-sm text-gray-500">desde</span>
                  <span className="text-3xl font-bold text-gray-900">€{tour.base_price}</span>
                  <span className="text-sm text-gray-500">/pessoa</span>
               </div>

               <div className="space-y-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                     <div className="flex items-center gap-3">
                        <Calendar className="text-primary" size={20} />
                        <span className="text-sm font-medium">Data</span>
                     </div>
                     <span className="text-sm text-gray-900">Selecionar data</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                     <div className="flex items-center gap-3">
                        <Users className="text-primary" size={20} />
                        <span className="text-sm font-medium">Passageiros</span>
                     </div>
                     <span className="text-sm text-gray-900">2 Adultos</span>
                  </div>
               </div>

               <Link href={`/tours/${params.slug}/reservar`} className="block w-full">
                  <Button size="lg" className="w-full text-lg h-14 font-bold shadow-lg shadow-primary/20">
                     Reservar Agora
                  </Button>
               </Link>

               <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                  <Check size={12} /> Cancelamento gratuito até 48h antes
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
