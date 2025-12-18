
import React from 'react';
import { STORE_CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-rose-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center text-white font-bold text-xl">J</div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Janmily</h3>
              </div>
              <p className="text-slate-500 mb-6 max-w-xs">
                Sua joalheria de confiança especializada em Prata 925 legítima. Elegância e durabilidade em cada detalhe.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/janmily_acessorios/" target="_blank" className="w-10 h-10 border border-rose-100 rounded-full flex items-center justify-center text-rose-400 hover:bg-rose-400 hover:text-white transition-all">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`} target="_blank" className="w-10 h-10 border border-rose-100 rounded-full flex items-center justify-center text-rose-400 hover:bg-rose-400 hover:text-white transition-all">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-slate-800">Categorias</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-rose-400 transition-colors">Brincos</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Colares</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Pulseiras</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Anéis</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-slate-800">Institucional</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-rose-400 transition-colors">Nossa Garantia</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Cuidados com a Prata</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-slate-800">Atendimento</h4>
            <ul className="space-y-4 text-slate-500">
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {STORE_CONFIG.location}
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (38) 99923-5946
              </li>
              <li>Seg - Sex: 08:00 às 18:00</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-rose-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>© 2025 Janmily Acessórios. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/000000/pix.png" className="h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help" alt="Pix" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
