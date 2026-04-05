import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  PlayCircle, 
  Truck, 
  Package, 
  FileText, 
  ChevronRight,
  Shield,
  Zap,
  AlertTriangle,
  TrendingUp,
  Award,
  Navigation,
  TrafficCone,
  ClipboardCheck,
  Camera
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { USER_NAME } from './constants';

// Fix for default marker icon in Leaflet + React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper component to update map view
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function Home() {
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([40.4168, -3.7038]); // Madrid coordinates

  // Simulate real-time movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition(prev => [
        prev[0] + 0.0002, // Moving slightly north-east
        prev[1] + 0.0003
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f8]">
      {/* Welcome Message */}
      <section className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Hola, {USER_NAME.split(' ')[0]}</p>
            <h2 className="text-2xl font-bold text-slate-900">Panel de Control</h2>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold">
              <Shield size={12} />
              ECO-SCORE: 94
            </div>
          </div>
        </div>
      </section>

      {/* Top Grid: Copilot + Alerts */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-2 lg:px-4">
        {/* Copilot Real-time Alerts */}
        <section className="px-4 py-4 lg:px-0">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#7466f0] text-white p-4 rounded-2xl shadow-lg shadow-[#7466f0]/20 flex items-center gap-4 relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Zap size={80} />
            </div>
            <div className="bg-white/20 p-2 rounded-xl">
              <Zap className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Copiloto IA</p>
              <p className="text-sm font-medium">"Ruta alternativa sugerida por tráfico para evitar retraso de 15 min."</p>
            </div>
            <button className="bg-white text-[#7466f0] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
              Ver Ruta
            </button>
          </motion.div>
        </section>

        {/* Route Alerts Block */}
        <section className="px-4 py-2 lg:px-0 lg:py-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-red-50 p-2 rounded-xl">
                  <AlertTriangle className="text-red-500" size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Alertas de Ruta</h3>
              </div>
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-sm">
                5 ACTIVAS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <TrafficCone className="text-amber-500" size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tráfico</p>
                  <p className="text-xs font-bold text-slate-700">Denso (12m)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Navigation className="text-blue-500" size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Punto Control</p>
                  <p className="text-xs font-bold text-slate-700">A 500m</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="text-red-500" size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Desvío</p>
                  <p className="text-xs font-bold text-slate-700">Detectado</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 bg-slate-50 rounded-lg flex items-center justify-center">
                  <Clock className="text-slate-500" size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parada</p>
                  <p className="text-xs font-bold text-slate-700">Prolongada</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/route-alerts')}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-slate-100 active:scale-[0.98]"
            >
              Ver todas las alertas
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      {/* Middle Grid: Stats + Trip */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-2 lg:px-4">
        {/* Quick Stats Bento */}
        <section className="px-4 py-2 lg:px-0 lg:py-4 lg:col-span-1 flex flex-col gap-4">
          <div 
            onClick={() => navigate('/stats')}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform flex-1"
          >
            <div className="flex items-center justify-between">
              <div className="bg-blue-50 p-2 rounded-lg">
                <TrendingUp className="text-blue-500" size={18} />
              </div>
              <span className="text-[10px] font-bold text-green-500">+5%</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Eficiencia</p>
              <p className="text-lg font-bold text-slate-900">92%</p>
            </div>
          </div>
          <div 
            onClick={() => navigate('/ranking')}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform flex-1"
          >
            <div className="flex items-center justify-between">
              <div className="bg-amber-50 p-2 rounded-lg">
                <Award className="text-amber-500" size={18} />
              </div>
              <span className="text-[10px] font-bold text-amber-500">#4</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Ranking</p>
              <p className="text-lg font-bold text-slate-900">Top 5</p>
            </div>
          </div>
        </section>

        {/* Current Trip Card */}
        <section className="px-4 py-4 lg:px-0 lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col">
            <div className="relative h-48 lg:h-64 bg-slate-100 z-0">
              <MapContainer center={currentPosition} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <ChangeView center={currentPosition} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={currentPosition}>
                  <Popup>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-xs">Unidad en Ruta</p>
                      <div className="flex items-center gap-1 text-[10px] text-[#7466f0]">
                        <Navigation size={10} className="animate-pulse" />
                        <span>Movimiento detectado</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
              <div className="absolute bottom-4 left-4 z-[1000]">
                <span className="bg-[#7466f0]/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">Viaje Activo</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Madrid → Barcelona</h3>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={14} />
                    <span className="text-sm">Llegada: 22:45</span>
                  </div>
                </div>
                <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-[10px] font-bold border border-amber-100">
                  EN CURSO
                </div>
              </div>
              
              <Link 
                to="/route-in-progress"
                className="w-full bg-[#7466f0] hover:bg-[#7466f0]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#7466f0]/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <PlayCircle size={20} />
                Continuar Viaje
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Grid: Forms + Fleet */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-2 lg:px-4">
        {/* Trip Forms Block */}
        <section className="px-4 py-2 lg:px-0 lg:py-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#7466f0]/10 p-2 rounded-xl">
                  <FileText className="text-[#7466f0]" size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Formularios del Viaje</h3>
              </div>
              <button 
                onClick={() => navigate('/forms')}
                className="text-xs font-semibold text-[#7466f0]"
              >
                Ver todos
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pendientes</p>
                <p className="text-xl font-black text-slate-900">3</p>
              </div>
              <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100 flex flex-col gap-1">
                <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Completados</p>
                <p className="text-xl font-black text-green-600">2</p>
              </div>
            </div>

            <div className="space-y-2">
              <div 
                onClick={() => navigate('/form-detail/pod')}
                className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="bg-slate-50 p-2 rounded-lg">
                  <ClipboardCheck className="text-[#7466f0]" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-800">POD / Prueba de Entrega</p>
                  <p className="text-[10px] text-slate-400">Pendiente de firma</p>
                </div>
                <ChevronRight className="text-slate-300" size={16} />
              </div>
              <div 
                onClick={() => navigate('/form-detail/photo-evidence')}
                className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="bg-slate-50 p-2 rounded-lg">
                  <Camera className="text-[#7466f0]" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-800">Evidencia Fotográfica</p>
                  <p className="text-[10px] text-slate-400">Pendiente de fotos</p>
                </div>
                <ChevronRight className="text-slate-300" size={16} />
              </div>
            </div>
          </div>
        </section>

        {/* Fleet Details */}
        <section className="px-4 py-4 lg:px-0 lg:py-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
            <h3 className="text-base font-bold text-slate-900 mb-4 px-1">Detalles de la Unidad</h3>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => navigate('/unit-health')}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-100 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-10 h-10 bg-[#7466f0]/10 rounded-lg flex items-center justify-center mb-3">
                  <Truck className="text-[#7466f0]" size={20} />
                </div>
                <p className="text-xs text-slate-500 font-medium">Vehículo</p>
                <p className="text-sm font-bold text-slate-900">Kenworth T680</p>
                <p className="text-[10px] text-slate-400 mt-1">Matrícula: 45-RB-22</p>
              </div>
              <div 
                onClick={() => navigate('/trip-details/TRP-042')}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-100 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-10 h-10 bg-[#7466f0]/10 rounded-lg flex items-center justify-center mb-3">
                  <Package className="text-[#7466f0]" size={20} />
                </div>
                <p className="text-xs text-slate-500 font-medium">Carga</p>
                <p className="text-sm font-bold text-slate-900">Electrónica</p>
                <p className="text-[10px] text-slate-400 mt-1">Peso: 12.5 Ton</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <div className="bg-amber-500 p-2 rounded-lg text-white">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-900">Mantenimiento Predictivo</p>
                  <p className="text-xs text-amber-800/80">"Sensores detectan desgaste en frenos, favor de reportar vibraciones."</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Recent Documents */}
      <section className="px-4 py-2 pb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-base font-bold text-slate-900">Documentos Recientes</h3>
          <button 
            onClick={() => navigate('/documents')}
            className="text-xs font-semibold text-[#7466f0]"
          >
            Ver todos
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
            <FileText className="text-slate-400" size={20} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">Hoja de Ruta #992</p>
              <p className="text-[10px] text-slate-500">Actualizado hace 2 horas</p>
            </div>
            <ChevronRight className="text-slate-300" size={20} />
          </div>
        </div>
      </section>
    </div>
  );
}
