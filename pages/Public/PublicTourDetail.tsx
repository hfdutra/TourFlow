
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_TOURS } from '../../services/mockData';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Clock, Users, MapPin, Check, Info, Calendar as CalendarIcon, ArrowLeft, Star, Share2 } from 'lucide-react';

export const PublicTourDetail: React.FC = () => {
  const { tourSlug } = useParams();
  const navigate = useNavigate();
  
  const tour = MOCK_TOURS.find(t => t.slug === tourSlug);

  if (!tour) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Tour não encontrado</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Breadcrumb / Back */}
      <div className="mb-6">
         <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
            <ArrowLeft size={16} /> Voltar à lista
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Gallery Header */}
           <div className="space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-200 shadow-sm relative group">
                 <img src={tour.featured_image} alt={tour.name} className="w-full h-full object-cover" />
                 <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors">
                    <Share2 size={20} className="text-gray-700" />
                 </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-24 h-24 flex-shrink-0 rounded-lg bg-gray-200 overflow-hidden cursor-pointer hover:opacity-90">
                       <img src={`https://picsum.photos/400/400?random=${i}`} className="w-full h-full object-cover" />
                    </div>
                 ))}
              </div>
           </div>

           {/* Title & Stats */}
           <div>
              <div className="flex items-center gap-2 mb-2">
                 <Badge variant="info">{tour.tour_type === 'day_trip' ? 'Day Trip' : 'Multi-day'}</Badge>
                 <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                    <Star size={14} fill="currentColor" />
                    <span>4.9</span>
                    <span className="text-gray-400 font-normal">(128 avaliações)</span>
                 </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{tour.name}</h1>
              
              <div className="flex flex-wrap gap-6 text-gray-600 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                 <div className="flex items-center gap-2">
                    <Clock size={20} className="text-primary" />
                    <span className="font-medium">{tour.duration_days > 1 ? `${tour.duration_days} Dias` : `${tour.duration_hours} Horas`}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Users size={20} className="text-primary" />
                    <span className="font-medium">Grupo min. {tour.min_passengers}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    <span className="font-medium">Porto & Norte</span>
                 </div>
              </div>
           </div>

           {/* Description */}
           <div className="prose prose-blue max-w-none">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sobre esta experiência</h3>
              <p className="text-gray-600 leading-relaxed">
                 {tour.description || 'Uma experiência incrível à sua espera. Descubra as paisagens deslumbrantes e a cultura rica desta região.'}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
           </div>

           {/* Inclusions */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-green-50/50 border-green-100">
                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Check size={18} className="text-green-600" /> Incluído
                 </h4>
                 <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                       <Check size={16} className="text-green-500 mt-0.5" /> Transporte em autocarro moderno
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                       <Check size={16} className="text-green-500 mt-0.5" /> Guia profissional (PT/EN)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                       <Check size={16} className="text-green-500 mt-0.5" /> Seguros de viagem
                    </li>
                 </ul>
              </Card>
              <Card className="bg-red-50/50 border-red-100">
                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Info size={18} className="text-red-500" /> Não Incluído
                 </h4>
                 <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700 opacity-75">
                       <span className="w-4 h-4 border border-red-300 rounded-full flex items-center justify-center text-[10px] text-red-500 mt-0.5">✕</span>
                       Almoço (opcional)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700 opacity-75">
                       <span className="w-4 h-4 border border-red-300 rounded-full flex items-center justify-center text-[10px] text-red-500 mt-0.5">✕</span>
                       Gratificações
                    </li>
                 </ul>
              </Card>
           </div>
        </div>

        {/* Sidebar Booking Widget */}
        <div className="lg:col-span-1">
           <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                 <div className="p-6 bg-primary text-white">
                    <p className="text-primary-100 text-sm font-medium mb-1">Preço por pessoa</p>
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-bold">€{tour.base_price}</span>
                       <span className="text-sm opacity-80">/ adulto</span>
                    </div>
                 </div>
                 
                 <div className="p-6 space-y-6">
                    <div className="space-y-4">
                       <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                          <CalendarIcon className="text-primary" size={20} />
                          <div>
                             <p className="text-xs text-gray-500 uppercase font-bold">Próxima Partida</p>
                             <p className="font-medium text-gray-900">Amanhã, 09:00</p>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Adulto (13+)</span>
                          <span className="font-medium">€{tour.base_price}</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Criança (4-12)</span>
                          <span className="font-medium">€{(tour.base_price * 0.7).toFixed(2)}</span>
                       </div>
                    </div>

                    <Button size="lg" className="w-full font-bold shadow-lg shadow-primary/20" onClick={() => navigate('book')}>
                       Verificar Disponibilidade
                    </Button>
                    
                    <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                       <Info size={12} /> Cancelamento gratuito até 48h antes
                    </p>
                 </div>
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                 <h4 className="font-bold text-gray-900 mb-2 text-sm">Precisa de ajuda?</h4>
                 <p className="text-sm text-gray-600 mb-3">Contacte o nosso suporte para reservas de grupo ou dúvidas.</p>
                 <Button variant="outline" size="sm" className="w-full bg-white">Contactar Operador</Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
