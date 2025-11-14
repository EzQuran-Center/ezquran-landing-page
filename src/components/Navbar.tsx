import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50 border-b border-yellow-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-black">EQ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">EzQuran Centre</h1>
              <p className="text-xs text-yellow-500">THYORA INTERNATIONAL</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-white hover:text-yellow-500 transition-colors">
              Utama
            </button>
            <button onClick={() => scrollToSection('services')} className="text-white hover:text-yellow-500 transition-colors">
              Perkhidmatan
            </button>
            <button onClick={() => scrollToSection('packages')} className="text-white hover:text-yellow-500 transition-colors">
              Pakej
            </button>
            <button onClick={() => scrollToSection('merchandise')} className="text-white hover:text-yellow-500 transition-colors">
              Barangan
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white hover:text-yellow-500 transition-colors">
              Hubungi Kami
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-t border-yellow-600/20">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors">
              Utama
            </button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors">
              Perkhidmatan
            </button>
            <button onClick={() => scrollToSection('packages')} className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors">
              Pakej
            </button>
            <button onClick={() => scrollToSection('merchandise')} className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors">
              Barangan
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors">
              Hubungi Kami
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
