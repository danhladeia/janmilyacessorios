
import React from 'react';
import { CartItem } from '../types';
import { STORE_CONFIG } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppLink = () => {
    let message = "Olá Janmily! Gostaria de finalizar o pedido desses itens:\n\n";
    items.forEach(item => {
      message += `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n*Total: R$ ${total.toFixed(2)}*`;
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`;
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-rose-50 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Seu Carrinho</h2>
            <button onClick={onClose} className="p-2 hover:bg-rose-50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-lg">O carrinho está vazio</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-rose-400 font-semibold hover:underline"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl relative group">
                  <img src={item.img} className="w-20 h-20 rounded-lg object-cover shadow-sm" alt={item.name} />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-rose-400 font-bold mb-3">R$ {item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-rose-200 rounded-full overflow-hidden bg-white shadow-sm">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-3 py-1 hover:bg-rose-50 text-rose-400"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-3 py-1 hover:bg-rose-50 text-rose-400"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-8 border-t border-rose-50 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total do pedido</span>
                <span className="text-3xl font-bold text-slate-800">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-rose-400 text-white rounded-2xl font-bold text-lg shadow-xl shadow-rose-100 hover:bg-rose-500 transition-all hover:scale-[1.02] active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Finalizar via WhatsApp
              </a>
              <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
                Enviamos para todo o Brasil com Seguro
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Cart;
