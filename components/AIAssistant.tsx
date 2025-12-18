
import React, { useState, useRef, useEffect } from 'react';
import { getStyleAdvice } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    
    const userQuery = query.trim();
    setQuery('');
    setHistory(prev => [...prev, { role: 'user', text: userQuery }]);
    
    setIsLoading(true);
    try {
      const result = await getStyleAdvice(userQuery);
      setHistory(prev => [...prev, { role: 'ai', text: result || "Desculpe, não consegui processar sua dica de estilo agora." }]);
    } catch (error) {
      setHistory(prev => [...prev, { role: 'ai', text: "Ocorreu um erro técnico. Tente novamente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[80]">
      {isOpen ? (
        <div className="bg-white w-[360px] max-w-[calc(100vw-4rem)] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-rose-50 flex flex-col overflow-hidden animate-fade-in origin-bottom-left flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-slate-900 p-6 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center shadow-lg shadow-rose-900/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <div>
                <span className="block font-bold text-sm tracking-widest uppercase">Concierge AI</span>
                <span className="block text-[10px] text-rose-300 font-medium">Style Specialist</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          {/* Chat Body */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            {history.length === 0 && (
              <div className="text-center py-10">
                <p className="text-slate-400 text-sm font-light italic px-4">"Como posso ajudar a elevar seu estilo hoje? Pergunte sobre combinações, ocasiões ou tendências."</p>
              </div>
            )}
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] px-4 py-3 text-sm rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-rose-50 rounded-tl-none leading-relaxed'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-rose-50 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-rose-200 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-rose-50 flex gap-2 shrink-0">
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite sua dúvida de estilo..."
              disabled={isLoading}
              className="flex-grow text-xs font-medium border border-slate-100 bg-slate-50 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white transition-all disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={isLoading || !query.trim()}
              className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-rose-500 transition-all shadow-lg disabled:opacity-50 disabled:bg-slate-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 bg-slate-900 text-white pl-4 pr-6 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:scale-105 transition-all duration-500"
        >
          <div className="w-10 h-10 bg-rose-400 text-white rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-[0.3em] opacity-60 font-bold">Janmily</span>
            <span className="block font-bold text-xs tracking-widest uppercase">Style AI</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
