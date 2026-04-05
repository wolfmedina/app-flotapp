import React from 'react';
import { 
  ChevronLeft, 
  Truck, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function UnitHealth() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f8] pb-10">
      {/* Header Navigation */}
      <header className="px-4 py-4 flex items-center justify-between sticky top-0 z-10 bg-[#f6f6f8]/80 backdrop-blur-md">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"
        >
          <ChevronLeft size={24} className="text-slate-900" />
        </button>
      </header>

      <div className="px-5 space-y-6">
        
        {/* Vehicle Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="size-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <Truck className="text-indigo-600" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">Kenworth T680</h2>
              <p className="text-xs font-bold text-slate-400 mt-0.5">
                Placas: 45-RB-22 • Económico: #V-4032
              </p>
              <div className="mt-2 flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-wider border border-green-100">
                <CheckCircle2 size={12} />
                En Operación
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 rounded-3xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kilometraje</p>
              <p className="text-xl font-black text-slate-900">124,500</p>
              <p className="text-xl font-black text-slate-900">km</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-3xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Próximo Servicio</p>
              <p className="text-xl font-black text-amber-500">En 1,200</p>
              <p className="text-xl font-black text-amber-500">km</p>
            </div>
          </div>
        </motion.div>

        {/* Predictive Health Section */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest">Salud Predictiva</h3>
            <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">IA Activa</span>
          </div>

          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
            {/* Motor */}
            <div className="p-5 flex items-center gap-4">
              <div className="size-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="text-green-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-base font-black text-slate-800">Motor</span>
                  <span className="text-sm font-black text-green-500">98%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[98%]" />
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>

            {/* Frenos */}
            <div className="p-5 flex items-center gap-4">
              <div className="size-12 bg-amber-50 rounded-2xl flex items-center justify-center shrink-0">
                <div className="size-5 rounded-full border-4 border-amber-500 flex items-center justify-center">
                  <div className="size-1 bg-amber-500 rounded-full" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-base font-black text-slate-800">Frenos</span>
                  <span className="text-sm font-black text-amber-500">72%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[72%]" />
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>

            {/* Temperatura */}
            <div className="p-5 flex items-center gap-4">
              <div className="size-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="text-green-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-base font-black text-slate-800">Temperatura</span>
                  <span className="text-sm font-black text-green-500">85°C</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[85%]" />
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>

            {/* Sistema Eléctrico */}
            <div className="p-5 flex items-center gap-4">
              <div className="size-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="text-indigo-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="10" rx="2" ry="2" /><line x1="22" y1="11" x2="22" y2="13" /><line x1="7" y1="12" x2="11" y2="12" /><line x1="13" y1="12" x2="17" y2="12" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-base font-black text-slate-800">Sistema Eléctrico</span>
                  <span className="text-sm font-black text-indigo-500">100%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[100%]" />
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
          </div>
        </section>

        {/* Attention Required Alert */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-indigo-50 p-6 rounded-[32px] border border-indigo-100 space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="size-12 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
              <AlertCircle className="text-indigo-600" size={24} />
            </div>
            <div>
              <p className="text-lg font-black text-indigo-900">Estado del Sistema</p>
              <p className="text-sm font-bold text-indigo-800/80 leading-relaxed">
                Todos los sistemas críticos operando dentro de los parámetros normales. Próxima revisión preventiva sugerida en 15 días.
              </p>
            </div>
          </div>
          
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] uppercase tracking-wider text-sm">
            Ver Plan de Mantenimiento
          </button>
        </motion.div>

        {/* Maintenance History */}
        <button className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
              <Settings className="text-slate-400 group-hover:text-indigo-500 transition-colors" size={24} />
            </div>
            <span className="text-lg font-black text-slate-800">Historial de Mantenimiento</span>
          </div>
          <ChevronRight size={24} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
        </button>

      </div>
    </div>
  );
}
