import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Search, MapPin, Calendar, ArrowRight, Star, ShieldCheck, Bus, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-gray-900 flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1548662891-628d68961724?auto=format&fit=crop&q=80"
            alt="Douro Valley"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Descubra a Magia de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-hover to-secondary">Portugal</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            Viagens inesquecíveis, guias experientes e autocarros de luxo.
            A sua aventura começa aqui.
          </p>

          {/* Search Box */}
          <div className="bg-white p-4 rounded-xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full md:border-r border-gray-100 pr-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 px-3 text-left">Destino</label>
              <div className="flex items-center px-3">
                <MapPin size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Para onde quer ir?"
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex-1 w-full md:border-r border-gray-100 px-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 px-3 text-left">Data</label>
              <div className="flex items-center px-3">
                <Calendar size={20} className="text-gray-400 mr-2" />
                <input
                  type="date"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto px-8 h-14 rounded-lg text-lg font-semibold shadow-lg shadow-primary/30">
              <Search size={20} className="mr-2" />
              Pesquisar
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tours em Destaque</h2>
            <p className="text-gray-500">As experiências mais populares entre os nossos viajantes</p>
          </div>
          <Link href="/tours">
             <Button variant="ghost" className="hidden sm:inline-flex">
               Ver todos <ArrowRight size={16} className="ml-2" />
             </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mock Tour Cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1571406604297-b86129994c50' : i === 2 ? '1555881400-74d7acaacd81' : '1533284133458-7c8bb17c4617'}?auto=format&fit=crop&q=80`}
                  alt="Tour Image"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {i === 1 ? 'Enoturismo' : i === 2 ? 'Cultural' : 'Natureza'}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white font-medium flex items-center gap-1">
                     <Calendar size={14} /> Próxima partida: Amanhã
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                    {i === 1 ? 'Douro Vinhateiro Premium' : i === 2 ? 'Porto City Tour' : 'Gerês Nature & Falls'}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                   <div className="flex text-yellow-400">
                     {[...Array(5)].map((_, k) => <Star key={k} size={14} fill="currentColor" />)}
                   </div>
                   <span className="text-sm text-gray-500">(128 avaliações)</span>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                  {i === 1 ? 'Um dia inesquecível pelo coração do Douro com prova de vinhos e almoço típico.' :
                   i === 2 ? 'Conheça a cidade invicta, as suas pontes e a história do Vinho do Porto.' :
                   'Explore as cascatas secretas e a natureza selvagem do Parque Nacional do Gerês.'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">A partir de</span>
                    <span className="text-lg font-bold text-primary">€{i === 1 ? '120' : i === 2 ? '45' : '85'}</span>
                  </div>
                  <Link href={`/tours/tour-${i}`}>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" className="w-full">
            Ver todos os tours <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* USPs Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Porquê viajar connosco?</h2>
            <p className="text-gray-500">Mais do que uma viagem, oferecemos experiências que ficam na memória.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <Bus size={32} />
              </div>
              <h3 className="font-bold text-lg mb-3">Conforto Premium</h3>
              <p className="text-gray-500 leading-relaxed">
                Frota moderna de autocarros equipados com Wi-Fi, ar condicionado e todo o conforto.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="font-bold text-lg mb-3">Guias Especializados</h3>
              <p className="text-gray-500 leading-relaxed">
                Profissionais apaixonados que conhecem cada recanto e história de Portugal.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-lg mb-3">Segurança Total</h3>
              <p className="text-gray-500 leading-relaxed">
                Reserva segura, pagamentos protegidos e seguro de viagem incluído em todos os tours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
         <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="text-white max-w-lg">
                  <h2 className="text-3xl font-bold mb-4">Receba as melhores ofertas</h2>
                  <p className="text-primary-100 opacity-90">
                     Subscreva a nossa newsletter e receba descontos exclusivos, novidades e inspiração para a sua próxima viagem.
                  </p>
               </div>
               <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="O seu email"
                    className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 bg-white/10 text-white placeholder-white/70 backdrop-blur-sm"
                  />
                  <Button className="bg-white text-primary hover:bg-gray-100 font-bold whitespace-nowrap">
                     Subscrever
                  </Button>
               </div>
            </div>
            {/* Decoration Circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
         </div>
      </section>
    </div>
  );
}
