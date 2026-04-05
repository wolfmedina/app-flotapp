import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  History, 
  FileBarChart, 
  ShieldCheck,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';

const tempHistory = [
  { time: '08:00', temp: 4.2, humidity: 85 },
  { time: '09:00', temp: 4.5, humidity: 84 },
  { time: '10:00', temp: 4.1, humidity: 86 },
  { time: '11:00', temp: 3.8, humidity: 88 },
  { time: '12:00', temp: 4.0, humidity: 87 },
  { time: '13:00', temp: 5.2, humidity: 82 }, // Slight deviation
  { time: '14:00', temp: 4.4, humidity: 85 },
  { time: '15:00', temp: 4.2, humidity: 86 },
];

const alerts = [
  { 
    id: 1, 
    type: 'warning', 
    title: 'Desviación de Temperatura', 
    desc: 'Temperatura subió a 5.2°C en Tramo B-4', 
    time: '13:05 PM',
    status: 'Corregido'
  },
  { 
    id: 2, 
    type: 'info', 
    title: 'Apertura de Puerta', 
    desc: 'Puerta trasera abierta por 45s durante descarga parcial', 
    time: '11:30 AM',
    status: 'Registrado'
  }
];

export default function ColdChain() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'monitor' | 'history'>('monitor');

  return (
    <div className="relative flex min-h-full w-full flex-col bg-[#f6f6f8] overflow-x-hidden">
      {/* Header - Mobile only */}
      <div className="lg:hidden flex items-center bg-white p-4 border-b border-slate-200 justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-start cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Cadena de Frío
        </h2>
        <button className="p-2 text-[#7466f0]">
          <Info size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-4 lg:p-8 bg-white border-b border-slate-100 gap-2">
        <div className="flex gap-4 max-w-5xl mx-auto w-full">
          <button 
            onClick={() => setActiveTab('monitor')}
            className={cn(
              "flex-1 py-4 rounded-2xl font-black text-sm lg:text-base transition-all flex items-center justify-center gap-2",
              activeTab === 'monitor' 
                ? "bg-[#7466f0] text-white shadow-lg shadow-[#7466f0]/20" 
                : "bg-slate-50 text-slate-500"
            )}
          >
            <Thermometer size={20} />
            Monitoreo
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex-1 py-4 rounded-2xl font-black text-sm lg:text-base transition-all flex items-center justify-center gap-2",
              activeTab === 'history' 
                ? "bg-[#7466f0] text-white shadow-lg shadow-[#7466f0]/20" 
                : "bg-slate-50 text-slate-500"
            )}
          >
            <History size={20} />
            Histórico
          </button>
        </div>
      </div>

      <div className="flex-1 pb-24 max-w-5xl mx-auto w-full">
        {activeTab === 'monitor' ? (
          <div className="p-4 lg:p-8 space-y-8">
            {/* Real-time Status Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
              <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-50 p-4 rounded-2xl mb-4">
                  <Thermometer className="text-blue-500" size={32} />
                </div>
                <p className="text-slate-500 text-[10px] lg:text-xs font-black uppercase tracking-widest mb-2">Temperatura</p>
                <h3 className="text-4xl lg:text-6xl font-black text-slate-900">4.2°C</h3>
                <div className="mt-4 flex items-center gap-2 text-green-500 text-xs font-black uppercase tracking-widest">
                  <CheckCircle2 size={16} />
                  <span>RANGO ÓPTIMO</span>
                </div>
              </div>

              <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="bg-cyan-50 p-4 rounded-2xl mb-4">
                  <Droplets className="text-cyan-500" size={32} />
                </div>
                <p className="text-slate-500 text-[10px] lg:text-xs font-black uppercase tracking-widest mb-2">Humedad</p>
                <h3 className="text-4xl lg:text-6xl font-black text-slate-900">86%</h3>
                <div className="mt-4 flex items-center gap-2 text-green-500 text-xs font-black uppercase tracking-widest">
                  <CheckCircle2 size={16} />
                  <span>ESTABLE</span>
                </div>
              </div>
            </div>

            {/* Compliance Banner */}
            <div className="bg-green-50 border border-green-100 p-6 rounded-[2rem] flex items-center gap-6">
              <div className="bg-green-500 p-4 rounded-2xl shadow-lg shadow-green-500/20">
                <ShieldCheck className="text-white" size={32} />
              </div>
              <div>
                <h4 className="text-green-900 font-black text-lg">Cumplimiento Sanitario</h4>
                <p className="text-green-700 text-sm font-medium">Carga bajo normativa INVIMA / FDA.</p>
              </div>
              <div className="ml-auto">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">100% OK</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Live Chart Preview */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-slate-900 font-black text-lg">Trazabilidad en Vivo</h4>
                  <div className="flex items-center gap-2">
                    <span className="size-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time</span>
                  </div>
                </div>
                <div className="flex-1 min-h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={tempHistory}>
                      <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7466f0" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#7466f0" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={[0, 10]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ fontWeight: '900' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="#7466f0" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorTemp)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>08:00 AM</span>
                  <span>AHORA</span>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Alertas de Desviación</h4>
                  <button className="text-[#7466f0] text-xs font-black uppercase tracking-widest">Ver todas</button>
                </div>
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <div key={alert.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex gap-5 hover:border-[#7466f0]/20 transition-all">
                      <div className={cn(
                        "size-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                        alert.type === 'warning' ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"
                      )}>
                        {alert.type === 'warning' ? <AlertTriangle size={28} /> : <Info size={28} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-slate-900 font-black text-base">{alert.title}</h5>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{alert.time}</span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-3">{alert.desc}</p>
                        <span className={cn(
                          "text-[10px] font-black uppercase px-3 py-1 rounded-lg tracking-widest",
                          alert.status === 'Corregido' ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                        )}>
                          {alert.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* History List */}
              <div className="lg:col-span-5 bg-white p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-fit">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-slate-900 font-black text-lg">Reportes de Cumplimiento</h4>
                  <button className="text-[#7466f0] text-xs font-black uppercase tracking-widest">Filtrar</button>
                </div>
                <div className="space-y-4">
                  {[
                    { id: 'V-2024-001', date: 'Hoy, 04 Abr', status: 'Exitoso', temp: '4.1°C avg' },
                    { id: 'V-2024-002', date: 'Ayer, 03 Abr', status: 'Exitoso', temp: '3.9°C avg' },
                    { id: 'V-2024-003', date: '02 Abr', status: 'Alerta', temp: '5.5°C peak' },
                  ].map((report, i) => (
                    <button key={i} className="w-full flex items-center gap-4 p-4 rounded-[1.5rem] hover:bg-slate-50 transition-all text-left border border-transparent hover:border-slate-100 group">
                      <div className="bg-slate-100 p-3 rounded-xl text-slate-500 group-hover:bg-[#7466f0]/10 group-hover:text-[#7466f0] transition-colors shrink-0">
                        <FileBarChart size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-900 font-black text-sm truncate">Viaje {report.id}</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">{report.date} • {report.temp}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={cn(
                          "text-[9px] font-black uppercase px-2 py-0.5 rounded-lg tracking-widest",
                          report.status === 'Exitoso' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {report.status}
                        </span>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-[#7466f0] transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed History Graph */}
              <div className="lg:col-span-7 bg-white p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col min-h-[400px]">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-slate-900 font-black text-lg">Trazabilidad por Tramo</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 bg-[#7466f0] rounded-full"></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Temp</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 bg-[#06b6d4] rounded-full"></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hum</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tempHistory}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '900' }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '900' }}
                        unit="°"
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ fontWeight: '900' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="#7466f0" 
                        strokeWidth={4} 
                        dot={{ r: 5, fill: '#7466f0', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 7, strokeWidth: 0 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="humidity" 
                        stroke="#06b6d4" 
                        strokeWidth={3} 
                        strokeDasharray="8 8"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Evolución temporal del viaje actual</p>
              </div>
            </div>

            {/* Regulatory Info */}
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <ShieldCheck size={160} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#7466f0] p-3 rounded-2xl">
                    <ShieldCheck className="text-white" size={32} />
                  </div>
                  <h4 className="font-black text-2xl">Control Regulatorio</h4>
                </div>
                <p className="text-slate-400 text-base font-medium leading-relaxed mb-8 max-w-2xl">
                  Este vehículo cumple con los estándares internacionales de transporte de alimentos perecederos y medicamentos, garantizando la integridad de la carga en todo momento.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Última Calibración</p>
                    <p className="text-lg font-black">15 Mar 2024</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Próxima Revisión</p>
                    <p className="text-lg font-black">15 Jun 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Action Bar at the end of content */}
        <div className="p-4 lg:p-8 pt-0 pb-12">
          <button className="w-full lg:max-w-2xl lg:mx-auto bg-white border border-slate-200 p-6 rounded-[2rem] shadow-xl flex items-center justify-between group active:scale-[0.98] transition-all hover:border-[#7466f0]/30">
            <div className="flex items-center gap-5">
              <div className="bg-[#7466f0]/10 p-4 rounded-2xl text-[#7466f0] group-hover:scale-110 transition-transform">
                <FileBarChart size={28} />
              </div>
              <div className="text-left">
                <p className="text-slate-900 font-black text-lg">Generar Reporte de Viaje</p>
                <p className="text-slate-500 text-xs font-medium">PDF con trazabilidad completa y certificados</p>
              </div>
            </div>
            <ChevronRight size={24} className="text-slate-300 group-hover:text-[#7466f0] transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
