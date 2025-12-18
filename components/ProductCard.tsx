
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onView: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onView }) => {
  return (
    <div className="group animate-fade-in bg-white border border-slate-100 rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-rose-100/50 flex flex-col h-full">
      {/* Image Wrapper */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 cursor-pointer" onClick={onView}>
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
              {product.badge}
            </span>
          </div>
        )}
        
        {/* Wishlist Button Placeholder */}
        <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/0 hover:bg-white/90 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <img 
          src={product.img} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className="w-full py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl hover:bg-rose-500 transition-colors"
          >
            Adicionar Rápido
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">{product.category}</span>
          <h3 className="text-lg font-serif font-medium text-slate-800 group-hover:text-rose-400 transition-colors line-clamp-1 mt-1">
            {product.name}
          </h3>
        </div>
        
        <div className="mt-auto flex items-end justify-between">
          <p className="text-xl font-medium text-slate-900">
            <span className="text-xs font-normal text-slate-400 mr-1 italic">R$</span>
            {product.price.toFixed(2).replace('.', ',')}
          </p>
          
          <div className="flex items-center gap-1">
             <span className="text-[10px] text-slate-400 font-semibold">{product.rating}</span>
             <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
