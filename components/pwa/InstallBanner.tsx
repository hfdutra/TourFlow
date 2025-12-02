
import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const InstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-gray-900 text-white p-4 rounded-lg shadow-2xl z-50 animate-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-start mb-3">
         <div className="flex gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-white">
               TF
            </div>
            <div>
               <h4 className="font-bold">Instalar TourFlow</h4>
               <p className="text-xs text-gray-300">Aceda offline e mais rápido.</p>
            </div>
         </div>
         <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
            <X size={18} />
         </button>
      </div>
      <Button onClick={handleInstall} className="w-full bg-white text-gray-900 hover:bg-gray-100">
         <Download size={16} className="mr-2" /> Instalar App
      </Button>
    </div>
  );
};
