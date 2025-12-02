import React from 'react';
import Link from 'next/link';
import { Menu, Search, User, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  VT
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">Vertical Tur</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/tours" className="text-gray-600 hover:text-primary font-medium transition-colors">
                Tours
              </Link>
              <Link href="/sobre" className="text-gray-600 hover:text-primary font-medium transition-colors">
                Sobre
              </Link>
              <Link href="/contacto" className="text-gray-600 hover:text-primary font-medium transition-colors">
                Contacto
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={20} />
              </button>

              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <User size={18} className="mr-2" />
                  Entrar
                </Button>
              </Link>

              <div className="md:hidden">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  VT
                </div>
                <span className="font-bold text-xl text-gray-900">Vertical Tur</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Experiências inesquecíveis em Portugal. Descubra o melhor do nosso país com conforto e segurança.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <Facebook size={16} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Explorar</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link href="/tours" className="hover:text-primary">Todos os Tours</Link></li>
                <li><Link href="/tours?category=vinho" className="hover:text-primary">Enoturismo</Link></li>
                <li><Link href="/tours?category=religioso" className="hover:text-primary">Religioso</Link></li>
                <li><Link href="/tours?category=natureza" className="hover:text-primary">Natureza</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Empresa</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link href="/sobre" className="hover:text-primary">Sobre Nós</Link></li>
                <li><Link href="/contacto" className="hover:text-primary">Contactos</Link></li>
                <li><Link href="/termos" className="hover:text-primary">Termos e Condições</Link></li>
                <li><Link href="/privacidade" className="hover:text-primary">Política de Privacidade</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Contactos</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <span>Rua de Santa Catarina, 123<br/>4000-123 Porto, Portugal</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>+351 222 333 444</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span>reservas@verticaltur.pt</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Vertical Tur. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
               {/* Payment Icons Placeholder */}
               <div className="h-6 w-10 bg-gray-200 rounded"></div>
               <div className="h-6 w-10 bg-gray-200 rounded"></div>
               <div className="h-6 w-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
