import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowLeft, 
  BatteryCharging, 
  Search, 
  Plus, 
  Minus, 
  Navigation, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock, 
  MapPin,
  CornerUpRight,
  Layers,
  Zap,
  ShieldCheck,
  MessageSquare,
  Package
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

// Fix Leaflet default icon issue
import 'leaflet/dist/leaflet.css';

// Custom vehicle icon
const vehicleIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #7466f0; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(116, 102, 240, 0.5); display: flex; align-items: center; justify-content: center;">
          <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div>
        </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Destination icon
const destIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Component to handle map centering
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function RouteInProgress() {
  const navigate = useNavigate();
  const [currentPos, setCurrentPos] = useState<[number, number]>([19.4326, -99.1332]); // Mexico City center
  const [destination] = useState<[number, number]>([19.4426, -99.1432]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [otherVehicles, setOtherVehicles] = useState<Record<string, [number, number]>>({});
  const [isSimulating, setIsSimulating] = useState(true);
  const [copilotMessage, setCopilotMessage] = useState<{ text: string, type: 'eco' | 'safety' | 'info' } | null>(null);
  const [eta, setEta] = useState(12);
  const [remainingDistance, setRemainingDistance] = useState(4.8);
  const [trafficFactor, setTrafficFactor] = useState(1.2); // 1.0 = no traffic, 2.0 = heavy traffic
  const [showTraffic, setShowTraffic] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Predefined route points for simulation
  const routePoints: [number, number][] = [
    [19.4326, -99.1332],
    [19.4346, -99.1352],
    [19.4366, -99.1372],
    [19.4386, -99.1392],
    [19.4406, -99.1412],
    [19.4426, -99.1432]
  ];

  // Simulated traffic segments around the area
  const trafficSegments = [
    { positions: [[19.4320, -99.1320], [19.4350, -99.1350]], density: 'heavy' },
    { positions: [[19.4360, -99.1360], [19.4390, -99.1390]], density: 'moderate' },
    { positions: [[19.4400, -99.1400], [19.4430, -99.1430]], density: 'light' },
    { positions: [[19.4310, -99.1350], [19.4310, -99.1400]], density: 'heavy' },
    { positions: [[19.4380, -99.1320], [19.4420, -99.1320]], density: 'light' },
  ];

  const getTrafficColor = (density: string) => {
    switch (density) {
      case 'heavy': return '#ef4444'; // Red
      case 'moderate': return '#f59e0b'; // Amber
      case 'light': return '#10b981'; // Green
      default: return '#10b981';
    }
  };

  // Helper to calculate distance between two points in KM
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('location_updated', (data: { id: string, lat: number, lng: number }) => {
      setOtherVehicles(prev => ({
        ...prev,
        [data.id]: [data.lat, data.lng]
      }));
    });

    newSocket.on('client_disconnected', (id: string) => {
      setOtherVehicles(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Simulation logic
  useEffect(() => {
    if (!isSimulating) return;

    let index = 0;
    const interval = setInterval(() => {
      const nextPos = routePoints[index];
      setCurrentPos(nextPos);
      
      // Calculate remaining distance to destination
      const dist = calculateDistance(nextPos[0], nextPos[1], destination[0], destination[1]);
      setRemainingDistance(parseFloat(dist.toFixed(1)));

      // Simulate traffic variation
      const newTrafficFactor = 1 + Math.random() * 0.5;
      setTrafficFactor(newTrafficFactor);

      // Calculate ETA (assuming 40km/h average speed)
      const avgSpeed = 40; // km/h
      const timeHours = dist / avgSpeed;
      const timeMinutes = Math.round(timeHours * 60 * newTrafficFactor);
      setEta(timeMinutes > 0 ? timeMinutes : 1);

      if (socket) {
        socket.emit('update_location', { lat: nextPos[0], lng: nextPos[1] });
      }

      // Random Copilot messages during simulation
      if (index === 2) {
        setCopilotMessage({ text: "Eco-Driving: Reduce aceleración para ahorrar 5% combustible", type: 'eco' });
        setTimeout(() => setCopilotMessage(null), 5000);
      } else if (index === 4) {
        setCopilotMessage({ text: "Seguridad: Mantén distancia, tráfico denso adelante", type: 'safety' });
        setTimeout(() => setCopilotMessage(null), 5000);
      }

      index = (index + 1) % routePoints.length;
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating, socket, destination]);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-200">
      {/* Header */}
      <header className="flex items-center bg-white/90 backdrop-blur-md p-4 justify-between border-b border-[#7466f0]/10 z-[1000]">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#7466f0] flex size-10 shrink-0 items-center justify-center rounded-full bg-[#7466f0]/10"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Ruta 042 - Norte</h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7466f0] px-2 py-0.5 bg-[#7466f0]/10 rounded-full">En curso</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-full flex items-center gap-1">
              <Clock size={10} />
              ETA: {eta} min
            </span>
          </div>
        </div>
        <div className="flex w-10 items-center justify-end">
          <button 
            onClick={() => {
              // This is a bit tricky because SOS state is in Layout.
              // I'll use a custom event or just trigger an alert for now, 
              // but ideally I should lift the state or use a context.
              // For now, I'll simulate the SOS trigger here as well.
              window.dispatchEvent(new CustomEvent('trigger-sos'));
            }}
            className="flex items-center justify-center rounded-xl size-10 bg-red-500 text-white shadow-lg shadow-red-500/20 active:scale-95 transition-all relative overflow-hidden"
          >
            <AlertTriangle size={20} />
            <span className="absolute bottom-0.5 text-[8px] font-black uppercase leading-none">SOS</span>
          </button>
        </div>
      </header>

      {/* Map Area */}
      <main className="relative flex-1 z-0">
        <MapContainer 
          center={currentPos} 
          zoom={15} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <MapController center={currentPos} />

          {/* Current Vehicle */}
          <Marker position={currentPos} icon={vehicleIcon}>
            <Popup>Tu vehículo</Popup>
          </Marker>

          {/* Destination */}
          <Marker position={destination} icon={destIcon}>
            <Popup>Almacén Central Norte</Popup>
          </Marker>

          {/* Other Vehicles */}
          {Object.entries(otherVehicles).map(([id, pos]) => (
            <Marker key={id} position={pos} icon={vehicleIcon} opacity={0.6}>
              <Popup>Vehículo {id.slice(0, 4)}</Popup>
            </Marker>
          ))}
          
          {/* Traffic Layer */}
          {showTraffic && trafficSegments.map((seg, idx) => (
            <Polyline 
              key={`traffic-${idx}`} 
              positions={seg.positions as [number, number][]} 
              color={getTrafficColor(seg.density)} 
              weight={6} 
              opacity={0.6} 
            />
          ))}

          {/* Route Line */}
          <Polyline 
            positions={[currentPos, destination]} 
            color={trafficFactor > 1.4 ? '#ef4444' : trafficFactor > 1.1 ? '#f59e0b' : '#7466f0'} 
            weight={5} 
            opacity={0.7}
            dashArray="10, 10"
          />
        </MapContainer>

        {/* AI Copilot Overlay */}
        <AnimatePresence>
          {copilotMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              className="absolute top-20 left-1/2 z-[1001] w-[90%] max-w-md"
            >
              <div className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md ${
                copilotMessage.type === 'eco' ? 'bg-emerald-500/90 border-emerald-400 text-white' :
                copilotMessage.type === 'safety' ? 'bg-amber-500/90 border-amber-400 text-white' :
                'bg-[#7466f0]/90 border-[#7466f0]/40 text-white'
              }`}>
                <div className="bg-white/20 p-2 rounded-xl">
                  {copilotMessage.type === 'eco' ? <Zap size={20} /> :
                   copilotMessage.type === 'safety' ? <ShieldCheck size={20} /> :
                   <MessageSquare size={20} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">AI Copilot</span>
                  <p className="text-sm font-bold leading-tight">{copilotMessage.text}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <div className="absolute top-4 left-4 right-4 z-[1000] lg:max-w-md lg:left-1/2 lg:-translate-x-1/2">
          <div className="flex w-full h-12 shadow-xl rounded-xl bg-white overflow-hidden border border-[#7466f0]/20">
            <div className="text-[#7466f0] flex items-center justify-center pl-4">
              <Search size={20} />
            </div>
            <input 
              className="flex w-full border-none bg-transparent focus:ring-0 text-slate-900 placeholder:text-slate-400 text-base font-medium px-3" 
              placeholder="Buscar siguiente parada..."
            />
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 top-20 flex flex-col gap-2 z-[1000]">
          <div className="flex flex-col rounded-xl overflow-hidden shadow-lg border border-[#7466f0]/10">
            <button className="flex size-12 items-center justify-center bg-white text-slate-700 hover:bg-slate-50 border-b border-slate-100">
              <Plus size={20} />
            </button>
            <button className="flex size-12 items-center justify-center bg-white text-slate-700 hover:bg-slate-50">
              <Minus size={20} />
            </button>
          </div>
          <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex size-12 items-center justify-center rounded-xl shadow-lg transition-colors ${isSimulating ? 'bg-[#7466f0] text-white' : 'bg-white text-slate-700'}`}
          >
            <Navigation size={20} />
          </button>
          <button 
            onClick={() => setShowTraffic(!showTraffic)}
            className={`flex size-12 items-center justify-center rounded-xl shadow-lg transition-colors ${showTraffic ? 'bg-amber-500 text-white' : 'bg-white text-slate-700'}`}
          >
            <Layers size={20} />
          </button>
        </div>

        {/* Floating Instruction Card */}
        <div className="absolute bottom-4 left-4 right-4 z-[1000] lg:max-w-md lg:left-4 lg:right-auto">
          <div className="flex flex-col gap-3">
            {/* Traffic Alert */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-lg backdrop-blur-sm animate-pulse">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-2 rounded-lg text-white">
                  <AlertTriangle size={16} />
                </div>
                <div className="flex flex-col">
                  <p className="text-amber-900 text-sm font-bold leading-tight">Congestión en Av. Principal</p>
                  <p className="text-amber-800/80 text-xs">Retraso de 6 min. ¿Cambiar ruta?</p>
                </div>
              </div>
              <button className="flex items-center justify-center rounded-lg h-8 px-3 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider">
                Desviar
              </button>
            </div>

            {/* Main Instruction Card */}
            <div className="flex flex-col gap-0 rounded-2xl bg-white shadow-2xl overflow-hidden border border-[#7466f0]/10">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#7466f0] uppercase">Siguiente Punto</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">1.2 KM</span>
                  </div>
                  <p className="text-slate-900 text-xl font-extrabold leading-tight">Almacén Central Norte</p>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <MapPin size={14} />
                    Calle Industrial 45, Sector B
                  </p>
                </div>
                <div className="bg-[#7466f0]/10 p-3 rounded-2xl text-[#7466f0]">
                  <CornerUpRight size={32} />
                </div>
              </div>
              <div className="flex border-t border-slate-100">
                <button 
                  onClick={() => setShowDetails(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-4 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  <Info size={18} />
                  DETALLES
                </button>
                <div className="w-[1px] bg-slate-100"></div>
                <button 
                  onClick={() => navigate('/pod')}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#7466f0] text-white font-bold text-sm hover:bg-[#7466f0]/90 transition-colors"
                >
                  <CheckCircle size={18} />
                  LLEGADA
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Modal */}
        <AnimatePresence>
          {showDetails && (
            <div className="absolute inset-0 z-[2000] flex items-end justify-center bg-black/40 backdrop-blur-sm p-4">
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="w-full max-w-md bg-white rounded-t-[32px] p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Detalles del Envío</h3>
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
                  >
                    <Plus size={24} className="rotate-45" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#7466f0]/10 p-2 rounded-lg text-[#7466f0]">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pedido</p>
                      <p className="text-sm font-bold text-slate-900">#12345 - Electrónica de Consumo</p>
                      <p className="text-xs text-slate-500">Peso: 12.5 Ton • Volumen: 45 m³</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#7466f0]/10 p-2 rounded-lg text-[#7466f0]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Destino</p>
                      <p className="text-sm font-bold text-slate-900">Almacén Central Norte</p>
                      <p className="text-xs text-slate-500">Calle Industrial 45, Sector B, CDMX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#7466f0]/10 p-2 rounded-lg text-[#7466f0]">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ventana de Entrega</p>
                      <p className="text-sm font-bold text-slate-900">10:00 AM - 12:00 PM</p>
                      <p className="text-xs text-green-600 font-bold">A tiempo</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#7466f0]/10 p-2 rounded-lg text-[#7466f0]">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notas del Cliente</p>
                      <p className="text-sm font-medium text-slate-600 italic">"Entrada por el muelle 4. Solicitar pase en caseta de seguridad."</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform"
                  >
                    Cerrar
                  </button>
                  <button 
                    onClick={() => navigate('/trip-details/TRP-042')}
                    className="flex-1 bg-[#7466f0] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#7466f0]/20 active:scale-[0.98] transition-transform"
                  >
                    Ver más
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Status Bar */}
      <footer className="bg-white border-t border-[#7466f0]/10 px-6 py-4 z-[1000]">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-xl bg-[#7466f0]/10 text-[#7466f0] size-12">
              <Clock size={24} />
            </div>
            <div className="flex flex-col">
              <p className="text-slate-900 text-lg font-bold leading-none">{eta} min</p>
              <p className="text-slate-500 text-xs font-medium">Tiempo estimado</p>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-xl bg-[#7466f0]/10 text-[#7466f0] size-12">
              <Navigation size={24} />
            </div>
            <div className="flex flex-col">
              <p className="text-slate-900 text-lg font-bold leading-none">{remainingDistance} km</p>
              <p className="text-slate-500 text-xs font-medium">Restante</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
