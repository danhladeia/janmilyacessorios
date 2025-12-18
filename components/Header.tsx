
import React, { useState, useEffect } from 'react';
import { Category } from '../types';

interface HeaderProps {
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  cartCount: number;
  openCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeCategory, setActiveCategory, cartCount, openCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories: { label: string; value: Category }[] = [
    { label: 'Início', value: 'home' },
    { label: 'Brincos', value: 'brincos' },
    { label: 'Colares', value: 'colares' },
    { label: 'Pulseiras', value: 'pulseiras' },
    { label: 'Anéis', value: 'aneis' },
    { label: 'Conjuntos', value: 'conjuntos' },
    { label: 'Correntes', value: 'correntes' },
    { label: 'Masculino', value: 'pulseiras-masculinas' },
    { label: 'Relógios', value: 'relogios' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-white/90 backdrop-blur-xl shadow-sm border-b border-rose-50' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <button 
            onClick={() => { setActiveCategory('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            className="flex items-center gap-4 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-serif italic text-2xl transition-transform group-hover:scale-110 duration-500">
                J
              </div>
              <div className="absolute -inset-1 border border-rose-200 rounded-full group-hover:scale-125 transition-transform duration-700 opacity-50"></div>
            </div>
            <div className="hidden sm:block text-left">
              <h1 className="text-xl font-bold tracking-[0.1em] uppercase text-slate-800 font-serif">Janmily</h1>
              <p className="text-[9px] uppercase tracking-[0.3em] text-rose-400 font-semibold -mt-1">Joalheria Premium</p>
            </div>
          </button>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`relative px-4 py-2 text-sm tracking-wide font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.value 
                    ? 'text-slate-900' 
                    : 'text-slate-500 hover:text-rose-400'
                }`}
              >
                {cat.label}
                {activeCategory === cat.value && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-400 rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={openCart}
              className="relative group p-2.5 text-slate-700 bg-white/50 hover:bg-rose-50 rounded-full transition-all duration-300 border border-transparent hover:border-rose-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-slate-900 text-white text-[9px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:bg-rose-50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-500 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-[60] shadow-2xl transition-transform duration-500 lg:hidden transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center border-b border-rose-50 pb-6 mb-8">
            <h2 className="text-xl font-serif font-bold tracking-widest text-slate-800">MENU</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-4 overflow-y-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => { setActiveCategory(cat.value); setIsMenuOpen(false); }}
                className={`text-left py-3 px-4 rounded-xl text-lg font-medium transition-all ${
                  activeCategory === cat.value ? 'bg-rose-50 text-rose-500' : 'text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
