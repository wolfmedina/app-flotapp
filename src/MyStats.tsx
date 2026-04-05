import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Clock, 
  Leaf, 
  DollarSign, 
  Activity,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const weeklyData = [
  { name: 'Lun', score: 85 },
  { name: 'Mar', score: 88 },
  { name: 'Mie', score: 92 },
  { name: 'Jue', score: 90 },
  { name: 'Vie', score: 95 },
  { name: 'Sab', score: 94 },
  { name: 'Dom', score: 96 },
];

const hosData = [
  { name: 'Conducción', value: 6, color: '#7466f0' },
  { name: 'Descanso', value: 2, color: '#e2e8f0' },
  { name: 'Disponible', value: 2, color: '#f8fafc' },
];

export default function MyStats() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f8] pb-10">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-10 border-b border-slate-100">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Mis Estadísticas</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Driving Score - Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-2 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-xl text-green-600">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Score de Conducción</h3>
                  <p className="text-[10px] text-slate-500">Self-Coaching Activo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-slate-900">94<span className="text-sm font-bold text-slate-400">/100</span></p>
                <p className="text-[10px] font-bold text-green-500">↑ 5% vs semana pasada</p>
              </div>
            </div>

            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="score" fill="#7466f0" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-3 bg-slate-50 rounded-2xl">
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <span className="font-bold text-[#7466f0]">Tip IA:</span> Has mejorado un 5% en frenado suave. Mantén este ritmo para desbloquear el bono de seguridad.
              </p>
            </div>
          </motion.div>

          {/* Earnings & Bonuses */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between"
          >
            <div className="bg-amber-100 size-10 rounded-xl flex items-center justify-center text-amber-600 mb-4">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1">Bonos Ganados</p>
              <p className="text-2xl font-black text-slate-900">$450.00</p>
              <p className="text-[10px] font-bold text-amber-500 mt-1">Acumulado este mes</p>
            </div>
          </motion.div>

          {/* Unit Health */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between"
          >
            <div className="bg-blue-100 size-10 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1">Salud Unidad</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-black text-slate-900">98%</p>
                <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-1">Próximo serv. 1,200km</p>
            </div>
          </motion.div>

          {/* HOS - Circular Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-2 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6"
          >
            <div className="size-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hosData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {hosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-black text-slate-900">2h</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase">Restantes</p>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 mb-1">Horas de Servicio</h3>
              <p className="text-[11px] text-slate-500 mb-3">Control de fatiga activo</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-[#7466f0]"></div>
                    <span className="text-[10px] font-medium text-slate-600">Conducción</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-900">6h / 8h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-slate-200"></div>
                    <span className="text-[10px] font-medium text-slate-600">Descanso</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-900">2h</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Environmental Impact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-2 bg-[#7466f0] p-6 rounded-3xl shadow-lg shadow-[#7466f0]/20 text-white flex items-center gap-6"
          >
            <div className="bg-white/20 p-4 rounded-2xl">
              <Leaf size={32} />
            </div>
            <div>
              <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Impacto Ambiental</h3>
              <p className="text-2xl font-black">12.5 kg CO₂ <span className="text-sm font-bold opacity-60">evitados</span></p>
              <p className="text-xs font-medium mt-1 opacity-90">"Has salvado el equivalente a 3 árboles este mes."</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
