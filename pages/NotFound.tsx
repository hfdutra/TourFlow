
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Map, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
           <Map size={40} />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
        
        <p className="text-gray-500 mb-8">
          Parece que se perdeu no caminho. A página que procura não existe ou foi movida.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate(-1)} variant="outline" className="justify-center">
             <ArrowLeft size={18} className="mr-2" /> Voltar atrás
          </Button>
          <Button onClick={() => navigate('/dashboard')} className="justify-center">
             Ir para o Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
