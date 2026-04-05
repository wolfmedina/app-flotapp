import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CloudOff, 
  Cloud,
  RefreshCw, 
  FileText, 
  Camera, 
  MapPin, 
  Clock, 
  Map as MapIcon,
  Wifi,
  WifiOff,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

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

export default function RoutesScreen() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([19.4326, -99.1332]);

  // Simulate real-time movement when online
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOnline) {
      interval = setInterval(() => {
        setCurrentPosition(prev => [
          prev[0] + (Math.random() - 0.5) * 0.0005,
          prev[1] + (Math.random() - 0.5) * 0.0005
        ]);
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOnline]);

  return (
    <div className="relative flex min-h-full w-full flex-col bg-[#f6f6f8] overflow-x-hidden">
      {/* Top Navigation - Mobile only */}
      <div className="lg:hidden flex items-center bg-white p-4 border-b border-slate-200 justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-start cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          {isOnline ? 'Rutas Online' : 'Modo Offline'}
        </h2>
        <div className="size-10"></div>
      </div>

      {/* Mode Toggle Buttons */}
      <div className="flex gap-2 p-4 lg:p-8 bg-white border-b border-slate-100">
        <div className="flex gap-4 max-w-5xl mx-auto w-full">
          <button 
            onClick={() => setIsOnline(true)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm lg:text-base transition-all",
              isOnline 
                ? "bg-[#7466f0] text-white shadow-lg shadow-[#7466f0]/20" 
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            )}
          >
            <Wifi size={20} />
            Ver modo online
          </button>
          <button 
            onClick={() => setIsOnline(false)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm lg:text-base transition-all",
              !isOnline 
                ? "bg-[#7466f0] text-white shadow-lg shadow-[#7466f0]/20" 
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            )}
          >
            <WifiOff size={20} />
            Ver modo offline
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full p-4 lg:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Banner */}
          <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className={cn(
              "p-8 rounded-full mb-6 transition-colors",
              isOnline ? "bg-green-50" : "bg-[#7466f0]/10"
            )}>
              {isOnline ? (
                <Cloud className="text-green-500" size={80} />
              ) : (
                <CloudOff className="text-[#7466f0]" size={80} />
              )}
            </div>
            <h3 className="text-slate-900 text-2xl lg:text-3xl font-black leading-tight text-center pb-2">
              {isOnline ? 'Conexión Estable' : 'Trabajando sin conexión'}
            </h3>
            <p className="text-slate-500 text-sm lg:text-base font-medium text-center max-w-xs">
              {isOnline 
                ? 'Todos tus datos están sincronizados en tiempo real con el servidor central.' 
                : 'No tienes conexión a internet en este momento. Tus datos se guardarán localmente.'}
            </p>
          </div>

          {/* Progress/Sync Section */}
          <div className="flex flex-col justify-center gap-6 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className="flex gap-6 justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-3 rounded-2xl",
                  isOnline ? "bg-green-50 text-green-500" : "bg-[#7466f0]/10 text-[#7466f0]"
                )}>
                  {isOnline ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <RefreshCw size={24} className="animate-spin-slow" />
                  )}
                </div>
                <div>
                  <p className="text-slate-900 text-lg font-black leading-tight">
                    {isOnline ? 'Datos Sincronizados' : 'Sincronización en espera'}
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                    Última: {isOnline ? 'Ahora mismo' : 'Hoy, 09:45 AM'}
                  </p>
                </div>
              </div>
              <p className={cn(
                "text-lg font-black leading-normal",
                isOnline ? "text-green-500" : "text-[#7466f0]"
              )}>
                {isOnline ? 'Al día' : '3 pendientes'}
              </p>
            </div>
            <div className="h-4 w-full rounded-full bg-slate-50 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000 shadow-sm",
                  isOnline ? "bg-green-500" : "bg-[#7466f0]"
                )} 
                style={{ width: isOnline ? '100%' : '65%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Actions List */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
              {isOnline ? 'Actividad Reciente' : 'Acciones pendientes'}
            </h4>
            <div className="space-y-3">
              {[
                { icon: <FileText />, title: 'Reporte de entrega #4592', time: isOnline ? 'Enviado con éxito' : 'Guardado hoy, 10:15 AM' },
                { icon: <Camera />, title: 'Foto de comprobante - Ruta A2', time: isOnline ? 'Enviado con éxito' : 'Guardado hoy, 10:30 AM' },
                { icon: <MapPin />, title: 'Check-in Cliente: Transportes S.A.', time: isOnline ? 'Enviado con éxito' : 'Guardado hoy, 10:42 AM' },
              ].map((action, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-[#7466f0]/20 transition-all">
                  <div className="bg-slate-50 size-12 flex items-center justify-center rounded-xl text-slate-600">
                    {React.cloneElement(action.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-black text-sm">{action.title}</p>
                    <p className="text-slate-500 text-xs font-medium">{action.time}</p>
                  </div>
                  {isOnline ? (
                    <CheckCircle2 className="text-green-500" size={20} />
                  ) : (
                    <Clock className="text-slate-300" size={20} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map Preview */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Vista de Mapa</h4>
            <div className="relative w-full aspect-square lg:aspect-video rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm">
              {isOnline ? (
                <div className="h-full w-full z-0">
                  <MapContainer center={currentPosition} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <ChangeView center={currentPosition} />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={currentPosition}>
                      <Popup>
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-xs">Unidad en Movimiento</p>
                          <div className="flex items-center gap-1 text-[10px] text-green-600">
                            <Navigation size={10} className="animate-pulse" />
                            <span>Transmitiendo en vivo</span>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              ) : (
                <div 
                  className="absolute inset-0 bg-slate-50 flex items-center justify-center"
                  style={{ 
                    backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <div className="bg-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-md border border-slate-100">
                    <MapIcon className="text-[#7466f0]" size={20} />
                    <span className="text-sm font-black text-slate-600">
                      Mapa en caché disponible
                    </span>
                  </div>
                </div>
              )}
            </div>
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-[0.2em] font-black">
              Región: CDMX ({isOnline ? 'Datos en vivo' : 'Caché local'})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
