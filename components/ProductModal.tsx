
import React from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full text-slate-800 hover:bg-rose-400 hover:text-white transition-all shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Gallery */}
        <div className="md:w-1/2 bg-slate-50">
          <div className="aspect-square relative group">
            <img 
              src={product.img} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              alt={product.name} 
            />
            {product.badge && (
              <span className="absolute top-6 left-6 bg-rose-400 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="flex-grow">
            <span className="text-rose-400 uppercase tracking-widest text-xs font-bold mb-2 block">{product.category}</span>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">{product.name}</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-slate-400 font-medium">{product.reviews} avaliações</span>
            </div>

            <p className="text-3xl font-bold text-slate-800 mb-8">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>

            <div className="prose prose-slate prose-sm mb-10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Sobre esta peça</h4>
              <p className="text-slate-500 leading-relaxed italic">
                {product.description || "Uma peça atemporal desenhada para mulheres que valorizam o brilho discreto e a autenticidade da Prata 925. Acabamento polido à mão para garantir o brilho eterno."}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                Prata Legítima
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                Anti-alérgico
              </div>
            </div>
          </div>

          <button 
            onClick={onAddToCart}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-rose-500 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            Adicionar ao Carrinho
          </button>
          <p className="text-center text-[10px] text-slate-300 uppercase tracking-widest mt-4">
            Envio imediato após confirmação
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
