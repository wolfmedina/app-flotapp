import React from 'react';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Truck, 
  ShieldCheck, 
  Info,
  Calendar,
  Weight,
  Box
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TripDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for the trip
  const tripInfo = {
    id: id || 'TRP-042',
    orderNumber: '#ORD-99281',
    status: 'En curso',
    origin: 'Almacén Central - Madrid',
    destination: 'Sucursal Norte - Barcelona',
    sender: 'Logística Global S.A.',
    recipient: 'Tiendas Express S.L.',
    contact: '+34 600 000 000',
    deliveryWindow: '10:00 AM - 12:00 PM',
    cargoType: 'Electrónica de Consumo',
    weight: '12.5 Ton',
    volume: '45 m³',
    vehicle: 'Kenworth T680 (45-RB-22)',
    notes: 'Entrada por el muelle 4. Solicitar pase en caseta de seguridad. El cliente requiere descarga asistida.',
    items: [
      { name: 'Smartphones Gen 12', qty: 500, unit: 'cajas' },
      { name: 'Tablets Pro 11', qty: 200, unit: 'cajas' },
      { name: 'Laptops Ultra', qty: 150, unit: 'cajas' }
    ]
  };

  return (
    <div className="w-full bg-[#f6f6f8] min-h-screen flex flex-col pb-10">
      {/* Header */}
      <header className="flex items-center bg-white p-4 border-b border-slate-200 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 p-2 hover:bg-slate-100 rounded-full transition-colors lg:hidden"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2">Detalles del Viaje</h1>
      </header>

      <main className="p-4 space-y-4 max-w-7xl mx-auto w-full">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold tracking-widest text-[#7466f0] uppercase bg-[#7466f0]/10 px-2 py-1 rounded-md">
              {tripInfo.id}
            </span>
            <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md">
              {tripInfo.status}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{tripInfo.origin} → {tripInfo.destination}</h2>
          <p className="text-sm text-slate-500 mt-1">Pedido: {tripInfo.orderNumber}</p>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Logistics Section */}
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={14} /> Información Logística
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Remitente</p>
                  <p className="text-sm font-bold text-slate-900">{tripInfo.sender}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-50 p-2 rounded-lg text-green-600">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Destinatario</p>
                  <p className="text-sm font-bold text-slate-900">{tripInfo.recipient}</p>
                  <p className="text-xs text-slate-500">{tripInfo.destination}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Ventana de Entrega</p>
                  <p className="text-sm font-bold text-slate-900">{tripInfo.deliveryWindow}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Contacto</p>
                  <p className="text-sm font-bold text-slate-900">{tripInfo.contact}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-4">
            {/* Cargo Section */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Package size={14} /> Detalles de la Carga
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-slate-50 p-2 rounded-lg text-slate-600">
                    <Box size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Tipo</p>
                    <p className="text-sm font-bold text-slate-900">{tripInfo.cargoType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-slate-50 p-2 rounded-lg text-slate-600">
                    <Weight size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Peso</p>
                    <p className="text-sm font-bold text-slate-900">{tripInfo.weight}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-50 pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Inventario</p>
                <div className="space-y-2">
                  {tripInfo.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">{item.name}</span>
                      <span className="font-bold text-slate-900">{item.qty} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Vehicle Section */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Truck size={14} /> Unidad Asignada
              </h3>
              <div className="flex items-center gap-4">
                <div className="size-12 bg-slate-50 rounded-xl flex items-center justify-center">
                  <Truck className="text-[#7466f0]" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{tripInfo.vehicle}</p>
                  <p className="text-xs text-slate-500">Estado: Óptimo</p>
                </div>
              </div>
            </section>

            {/* Notes Section */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FileText size={14} /> Notas del Cliente
              </h3>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                <p className="text-sm text-amber-900 leading-relaxed italic">
                  "{tripInfo.notes}"
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 lg:flex lg:justify-center">
          <button 
            onClick={() => navigate('/route-in-progress')}
            className="w-full lg:max-w-md bg-[#7466f0] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#7466f0]/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <ShieldCheck size={20} />
            Continuar con la Ruta
          </button>
        </div>
      </main>
    </div>
  );
}

import { FileText } from 'lucide-react';
