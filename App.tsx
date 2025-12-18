
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import AIAssistant from './components/AIAssistant';
import { Product, CartItem, Category } from './types';
import { PRODUCTS_DATA } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'home') return PRODUCTS_DATA.slice(0, 8);
    return PRODUCTS_DATA.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcfd]">
      <Header 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow">
        {activeCategory === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1573408302185-9146fe634ad0?auto=format&fit=crop&w=2000&q=80" 
                  alt="Background" 
                  className="w-full h-full object-cover grayscale opacity-20"
                />
              </div>

              <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-2xl animate-fade-in">
                  <span className="inline-block text-xs tracking-[0.4em] uppercase font-bold text-rose-400 mb-6 bg-rose-50 px-4 py-2 rounded-full">
                    Sua Essência em Prata
                  </span>
                  <h1 className="text-6xl lg:text-8xl font-serif font-light leading-[1.1] text-slate-900 mb-8">
                    Momentos que <br/>
                    <span className="italic font-medium">brilham para sempre</span>
                  </h1>
                  <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg font-light">
                    Janmily Acessórios traz a curadoria perfeita em Prata 925. 
                    Design minimalista, acabamento impecável e a sofisticação que você merece.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button 
                      onClick={() => setActiveCategory('aneis')}
                      className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold tracking-widest text-xs uppercase hover:bg-rose-500 transition-all duration-500 shadow-2xl shadow-slate-200"
                    >
                      Explorar Coleção
                    </button>
                    <button 
                      onClick={() => {
                        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group flex items-center gap-3 px-6 py-4 text-slate-900 font-bold tracking-widest text-xs uppercase transition-all"
                    >
                      <span>Ver Destaques</span>
                      <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-10 right-10 hidden lg:block animate-pulse duration-[4000ms]">
                <div className="w-40 h-40 border border-rose-200 rounded-full flex items-center justify-center p-4">
                   <div className="w-full h-full border border-rose-100 rounded-full" />
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-white">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  {[
                    { title: "Prata 925 Legítima", desc: "Todas as nossas peças acompanham certificado de autenticidade.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                    { title: "Envio Prime", desc: "Logística otimizada para que sua joia chegue perfeita e rápida.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
                    { title: "Embalagem Luxo", desc: "Uma experiência de unboxing inesquecível para presentear.", icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" }
                  ].map((item, idx) => (
                    <div key={idx} className="group p-8 rounded-3xl transition-all hover:bg-rose-50/30">
                      <div className="w-16 h-16 bg-rose-50 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 group-hover:bg-rose-100">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={item.icon} /></svg>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-slate-800 mb-4">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Catalog Section */}
        <section id="catalog" className="py-24 container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="max-w-xl">
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-4 capitalize">
                {activeCategory === 'home' ? 'Nossos Selecionados' : activeCategory}
              </h2>
              <div className="h-0.5 w-16 bg-rose-200" />
            </div>
            <p className="text-slate-400 text-sm tracking-widest uppercase font-medium">Coleção 2025 • Verão</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => addToCart(product)}
                onView={() => setSelectedProduct(product)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-32 bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-xl font-serif text-slate-400">Nenhuma peça encontrada nesta categoria</h3>
              <button 
                onClick={() => setActiveCategory('home')}
                className="mt-6 text-rose-400 text-sm font-bold uppercase tracking-widest hover:text-rose-600 transition-colors"
              >
                Voltar ao Início
              </button>
            </div>
          )}
        </section>

        {activeCategory === 'home' && (
          <section className="bg-slate-900 py-32 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-400/5 blur-3xl rounded-full" />
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 border border-rose-500/20 rounded-[40px] scale-95 group-hover:scale-100 transition-transform duration-1000" />
                <img 
                  src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1200&q=80" 
                  alt="Fine Jewelry Detail" 
                  className="rounded-[32px] shadow-2xl relative z-10 w-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 h-[600px]"
                />
              </div>
              <div className="text-white">
                <span className="text-rose-400 text-xs tracking-[0.4em] font-bold uppercase mb-8 block">Diferencial Janmily</span>
                <h2 className="text-5xl lg:text-7xl font-serif font-light mb-10 leading-tight">
                  Tradição aliada à <br/>
                  <span className="italic">modernidade</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 shrink-0">01</div>
                    <div>
                      <h4 className="text-xl font-serif font-bold mb-2">Curadoria Exclusiva</h4>
                      <p className="text-slate-400 leading-relaxed font-light">Cada peça é selecionada pensando na mulher contemporânea que não abre mão da elegância atemporal.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 shrink-0">02</div>
                    <div>
                      <h4 className="text-xl font-serif font-bold mb-2">Garantia Permanente</h4>
                      <p className="text-slate-400 leading-relaxed font-light">Nossa Prata 925 possui garantia vitalícia quanto à autenticidade do metal.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <AIAssistant />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {
            addToCart(selectedProduct);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
