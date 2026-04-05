import React from 'react';
import { 
  ArrowLeft, 
  Bell, 
  TrafficCone, 
  Navigation, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Zap,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';

interface RouteAlert {
  id: string;
  type: 'traffic' | 'route_change' | 'geofence' | 'checkpoint' | 'stop' | 'deviation' | 'speeding';
  title: string;
  time: string;
  location: string;
  status: 'active' | 'resolved' | 'pending';
  suggestedAction: string;
  description: string;
}

const ALERTS: RouteAlert[] = [
  {
    id: '1',
    type: 'traffic',
    title: 'Tráfico Denso Detectado',
    time: '10:45 AM',
    location: 'Autopista A-2, Km 45',
    status: 'active',
    suggestedAction: 'Mantener carril derecho, reducción de velocidad.',
    description: 'Congestión vehicular por mantenimiento en la vía. Retraso estimado de 12 minutos.'
  },
  {
    id: '2',
    type: 'route_change',
    title: 'Cambio de Ruta Sugerido',
    time: '10:30 AM',
    location: 'Intersección Vía 4-B',
    status: 'pending',
    suggestedAction: 'Tomar desvío por Vía Alterna 12.',
    description: 'Copiloto IA sugiere nueva ruta para evitar accidente reportado 2km adelante.'
  },
  {
    id: '3',
    type: 'geofence',
    title: 'Llegada a Geocerca',
    time: '10:15 AM',
    location: 'Centro Logístico Norte',
    status: 'resolved',
    suggestedAction: 'Preparar documentos de entrega.',
    description: 'Ingreso detectado al perímetro del cliente. Notificación enviada automáticamente.'
  },
  {
    id: '4',
    type: 'checkpoint',
    title: 'Punto de Control Próximo',
    time: 'A 500m',
    location: 'Peaje Guadarrama',
    status: 'active',
    suggestedAction: 'Tener TAG listo para lectura.',
    description: 'Control de báscula y peaje obligatorio en la ruta actual.'
  },
  {
    id: '5',
    type: 'stop',
    title: 'Parada Prolongada',
    time: 'Hace 20 min',
    location: 'Área de Descanso Km 120',
    status: 'active',
    suggestedAction: 'Reportar novedad si es parada no planificada.',
    description: 'Vehículo detenido por más de 15 minutos fuera de puntos autorizados.'
  },
  {
    id: '6',
    type: 'deviation',
    title: 'Desvío de Ruta',
    time: 'Hace 2 min',
    location: 'Calle Secundaria 45',
    status: 'active',
    suggestedAction: 'Retornar a la ruta principal en el próximo giro.',
    description: 'Salida no autorizada del trazado planificado detectada por GPS.'
  },
  {
    id: '7',
    type: 'speeding',
    title: 'Exceso de Velocidad',
    time: 'Hace 1 min',
    location: 'Zona Urbana Km 2',
    status: 'resolved',
    suggestedAction: 'Reducir a 40 km/h inmediatamente.',
    description: 'Velocidad registrada: 58 km/h en zona de 40 km/h.'
  }
];

export default function RouteAlerts() {
  const navigate = useNavigate();

  const getIcon = (type: RouteAlert['type']) => {
    switch (type) {
      case 'traffic': return <TrafficCone className="text-amber-500" size={20} />;
      case 'route_change': return <Zap className="text-[#7466f0]" size={20} />;
      case 'geofence': return <MapPin className="text-green-500" size={20} />;
      case 'checkpoint': return <Info className="text-blue-500" size={20} />;
      case 'stop': return <Clock className="text-slate-500" size={20} />;
      case 'deviation': return <Navigation className="text-red-500" size={20} />;
      case 'speeding': return <AlertTriangle className="text-red-600" size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const getStatusColor = (status: RouteAlert['status']) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-700 border-red-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f8]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 w-full px-4 py-4 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-900" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 flex-1">Alertas de Ruta</h1>
        <div className="relative">
          <Bell size={24} className="text-slate-400" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full border-2 border-white">3</span>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Activas</p>
            <p className="text-xl font-black text-red-500">5</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pendientes</p>
            <p className="text-xl font-black text-amber-500">1</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Resueltas</p>
            <p className="text-xl font-black text-green-500">2</p>
          </div>
        </div>

        {/* Alerts List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ALERTS.map((alert) => (
            <div 
              key={alert.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden active:scale-[0.99] transition-transform flex flex-col"
            >
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-50 p-2.5 rounded-xl">
                      {getIcon(alert.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-tight">{alert.title}</h3>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide mt-0.5">{alert.time} • {alert.location}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[8px] font-black px-2 py-1 rounded-full border uppercase tracking-widest",
                    getStatusColor(alert.status)
                  )}>
                    {alert.status === 'active' ? 'Activa' : alert.status === 'resolved' ? 'Resuelta' : 'Pendiente'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {alert.description}
                </p>

                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 size={12} className="text-[#7466f0]" />
                    <span className="text-[10px] font-bold text-[#7466f0] uppercase tracking-wider">Acción Sugerida</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700">{alert.suggestedAction}</p>
                </div>
              </div>
              
              <div className="bg-slate-50/50 px-4 py-3 border-t border-slate-100 flex items-center justify-between">
                <button 
                  onClick={() => navigate('/report-incident')}
                  className="text-[10px] font-black text-[#7466f0] uppercase tracking-widest flex items-center gap-1"
                >
                  Reportar Novedad
                  <ChevronRight size={12} />
                </button>
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Ignorar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
