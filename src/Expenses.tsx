import React, { useState } from 'react';
import { 
  CreditCard, 
  ChevronLeft, 
  Plus, 
  Camera, 
  DollarSign, 
  Fuel, 
  Utensils, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  X,
  ScanLine
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

const initialExpenses = [
  { id: 1, type: 'Combustible', amount: 120.50, date: 'Hoy, 14:20', status: 'Aprobado', icon: <Fuel size={18} />, color: 'bg-blue-100 text-blue-600' },
  { id: 2, type: 'Peaje', amount: 15.00, date: 'Hoy, 10:15', status: 'Pendiente', icon: <MapPin size={18} />, color: 'bg-amber-100 text-amber-600' },
  { id: 3, type: 'Comida', amount: 25.40, date: 'Ayer, 19:30', status: 'Aprobado', icon: <Utensils size={18} />, color: 'bg-green-100 text-green-600' },
];

export default function Expenses() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: idle, 1: scanning, 2: result

  const handleScan = () => {
    setIsScanning(true);
    setScanStep(1);
    
    // Simulate OCR process
    setTimeout(() => {
      setScanStep(2);
    }, 2000);
  };

  const confirmScan = () => {
    const newExpense = {
      id: Date.now(),
      type: 'Combustible',
      amount: 85.00,
      date: 'Ahora mismo',
      status: 'Pendiente',
      icon: <Fuel size={18} />,
      color: 'bg-blue-100 text-blue-600'
    };
    setExpenses([newExpense, ...expenses]);
    setIsScanning(false);
    setScanStep(0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f8] pb-10">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Gastos y Viáticos</h1>
        </div>
        <button 
          onClick={handleScan}
          className="bg-[#7466f0] text-white p-2 rounded-xl shadow-lg shadow-[#7466f0]/20"
        >
          <Plus size={24} />
        </button>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Wallet Balance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CreditCard size={120} />
          </div>
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-1">Saldo Disponible</p>
              <p className="text-3xl font-black">$1,240.50</p>
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-lg text-[10px] font-bold">VISA BUSINESS</div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">Titular</p>
              <p className="text-sm font-bold">JUAN CONDUCTOR</p>
            </div>
            <p className="text-sm font-mono tracking-widest">**** 4832</p>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-base font-bold text-slate-900">Actividad Reciente</h3>
            <button className="text-xs font-bold text-[#7466f0]">Ver todos</button>
          </div>
          <div className="space-y-3">
            {expenses.map((expense) => (
              <motion.div 
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
              >
                <div className={cn("size-12 rounded-xl flex items-center justify-center", expense.color)}>
                  {expense.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{expense.type}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{expense.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">-${expense.amount.toFixed(2)}</p>
                  <span className={cn(
                    "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                    expense.status === 'Aprobado' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                  )}>
                    {expense.status.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* OCR Scanner Overlay */}
      <AnimatePresence>
        {isScanning && (
          <div className="fixed inset-0 z-[2000] bg-black flex flex-col">
            <div className="p-6 flex justify-between items-center text-white">
              <button onClick={() => setIsScanning(false)} className="p-2 bg-white/10 rounded-full">
                <X size={24} />
              </button>
              <p className="text-sm font-bold uppercase tracking-widest">Escáner IA</p>
              <div className="size-10"></div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-10">
              <div className="w-full aspect-[3/4] border-2 border-dashed border-white/40 rounded-3xl relative overflow-hidden flex items-center justify-center">
                {scanStep === 1 ? (
                  <>
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 right-0 h-1 bg-[#7466f0] shadow-[0_0_15px_#7466f0] z-10"
                    />
                    <div className="text-white text-center space-y-4">
                      <ScanLine size={64} className="mx-auto opacity-40 animate-pulse" />
                      <p className="text-lg font-bold">Analizando Ticket...</p>
                      <p className="text-xs opacity-60">Extrayendo monto y categoría</p>
                    </div>
                  </>
                ) : scanStep === 2 ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white w-full m-6 p-6 rounded-2xl text-slate-900 space-y-6"
                  >
                    <div className="flex items-center justify-center text-green-500 mb-2">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Monto Detectado</p>
                      <p className="text-4xl font-black text-slate-900">$85.00</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-400">Categoría</span>
                        <span className="text-xs font-bold text-slate-900">Combustible</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-400">Establecimiento</span>
                        <span className="text-xs font-bold text-slate-900">Repsol Madrid</span>
                      </div>
                    </div>
                    <button 
                      onClick={confirmScan}
                      className="w-full bg-[#7466f0] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#7466f0]/20"
                    >
                      Confirmar Gasto
                    </button>
                    <button 
                      onClick={() => setScanStep(1)}
                      className="w-full text-slate-400 font-bold text-sm"
                    >
                      Reintentar
                    </button>
                  </motion.div>
                ) : (
                  <div className="text-white/40 text-center space-y-4">
                    <Camera size={64} className="mx-auto" />
                    <p className="text-sm font-bold">Encuadra el ticket aquí</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-10 flex justify-center">
              {scanStep === 0 && (
                <button 
                  onClick={() => setScanStep(1)}
                  className="size-20 bg-white rounded-full flex items-center justify-center border-8 border-white/20 active:scale-90 transition-transform"
                >
                  <div className="size-14 bg-white border-2 border-slate-900 rounded-full"></div>
                </button>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
