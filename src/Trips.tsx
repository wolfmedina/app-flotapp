import React from 'react';
import { Truck, MapPin, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const trips = [
  {
    id: 'TRP-042',
    origin: 'Almacén Central',
    destination: 'Sucursal Norte',
    status: 'En curso',
    time: '08:00 AM',
    distance: '12.5 km'
  },
  {
    id: 'TRP-043',
    origin: 'Sucursal Norte',
    destination: 'Puerto Seco',
    status: 'Pendiente',
    time: '11:30 AM',
    distance: '45.0 km'
  },
  {
    id: 'TRP-044',
    origin: 'Puerto Seco',
    destination: 'Almacén Central',
    status: 'Pendiente',
    time: '03:00 PM',
    distance: '38.2 km'
  }
];

export default function Trips() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold text-slate-900">Mis Viajes</h2>
        <p className="text-slate-500 text-sm">Rutas asignadas para hoy</p>
      </div>

      <div className="space-y-4">
        {trips.map((trip) => (
          <div 
            key={trip.id}
            onClick={() => trip.status === 'En curso' && navigate('/route-in-progress')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-4 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-widest text-[#7466f0] uppercase bg-[#7466f0]/10 px-2 py-1 rounded-md">
                {trip.id}
              </span>
              <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md ${
                trip.status === 'En curso' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {trip.status}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 mt-1">
                <div className="size-2 rounded-full bg-[#7466f0]"></div>
                <div className="w-[1px] h-8 bg-slate-200"></div>
                <div className="size-2 rounded-full border-2 border-[#7466f0]"></div>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Origen</span>
                  <p className="text-sm font-bold text-slate-900">{trip.origin}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Destino</span>
                  <p className="text-sm font-bold text-slate-900">{trip.destination}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center h-full">
                <ChevronRight className="text-slate-300" size={20} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50 gap-2">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock size={14} />
                <span className="text-xs font-medium">{trip.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={14} />
                <span className="text-xs font-medium">{trip.distance}</span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/trip-details/${trip.id}`);
                }}
                className="ml-auto text-[10px] font-bold text-[#7466f0] uppercase tracking-wider hover:underline"
              >
                Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
