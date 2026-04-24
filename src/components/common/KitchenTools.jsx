'use client';

import React, { useState } from 'react';
import { Calculator, X, ChevronRight } from 'lucide-react';
import useTranslation from '@/lib/i18n/useTranslation';

export default function KitchenTools() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState('converter'); // 'converter' or 'timer'
  
  // Converter State
  const [amount, setAmount] = useState(1);
  const [fromUnit, setFromUnit] = useState('cup');
  const [toUnit, setToUnit] = useState('ml');

  const units = {
    cup: { ml: 240, g: 120 }, // g is average (flour)
    tbsp: { ml: 15, g: 15 },
    tsp: { ml: 5, g: 5 },
    ml: { ml: 1, g: 1 },
    g: { ml: 1, g: 1 },
    oz: { ml: 29.57, g: 28.35 }
  };

  const convert = () => {
    if (fromUnit === toUnit) return amount;
    
    // Convert to ML first as base
    let baseMl = amount * (units[fromUnit]?.ml || 1);
    let result = baseMl / (units[toUnit]?.ml || 1);
    
    return result.toFixed(2);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 height-14 bg-brand-primary text-black rounded-full shadow-2xl flex items-center justify-center z-[100] hover:scale-110 transition-all duration-300 group"
      >
        <Calculator size={24} />
        <span className="absolute right-full mr-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {t('common.try_calculator')}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-[#121212] border border-white/10 rounded-2xl shadow-3xl z-[100] overflow-hidden animate-in zoom-in-95 duration-200">
      <header className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Calculator size={18} className="text-brand-primary" />
          <h3 className="text-sm font-bold text-white tracking-tight">{t('common.try_calculator')}</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </header>

      <div className="p-5">
        <div className="tool-tabs flex gap-2 mb-6 p-1 bg-white/5 rounded-lg">
          <button 
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${activeTool === 'converter' ? 'bg-brand-primary text-black' : 'text-white/60 hover:text-white'}`}
            onClick={() => setActiveTool('converter')}
          >
            Unit Converter
          </button>
          <button 
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${activeTool === 'timer' ? 'bg-brand-primary text-black' : 'text-white/60 hover:text-white'}`}
            onClick={() => setActiveTool('timer')}
          >
            Kitchen Timer
          </button>
        </div>

        {activeTool === 'converter' ? (
          <div className="converter-content space-y-4">
            <div className="input-group">
              <label className="text-[10px] uppercase font-black text-white/40 mb-1.5 block">Amount</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-brand-primary/50"
              />
            </div>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-[10px] uppercase font-black text-white/40 mb-1.5 block">From</label>
                <select 
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none"
                >
                  {Object.keys(units).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
                </select>
              </div>
              <div className="pb-2.5 text-white/20">
                <ChevronRight size={16} />
              </div>
              <div className="flex-1">
                <label className="text-[10px] uppercase font-black text-white/40 mb-1.5 block">To</label>
                <select 
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none"
                >
                  {Object.keys(units).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
                </select>
              </div>
            </div>

            <div className="result-card bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4 mt-6 flex flex-col items-center">
              <span className="text-[10px] uppercase font-black text-brand-primary/60 mb-1">Result</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-brand-primary tracking-tighter">{convert()}</span>
                <span className="text-sm font-bold text-brand-primary/80">{toUnit.toUpperCase()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="timer-content h-48 flex flex-col items-center justify-center text-center">
             <span className="text-white/20 text-xs font-medium">Coming Soon in Phase 19.5</span>
             <p className="text-white/40 text-[10px] mt-2">Smart culinary timers synced<br/>with your recipe steps.</p>
          </div>
        )}
      </div>

      <footer className="p-3 bg-white/5 border-t border-white/5 text-center">
        <span className="text-[10px] text-white/20 font-medium">Global Ingredient Swap Lab v2.1</span>
      </footer>

      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.7);
        }
        select option {
          background: #121212;
        }
      `}</style>
    </div>
  );
}
