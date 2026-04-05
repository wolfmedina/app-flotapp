import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Camera, 
  QrCode, 
  RefreshCw, 
  CheckCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignaturePad from './components/SignaturePad';

export default function POD() {
  const navigate = useNavigate();
  const [signature, setSignature] = useState<string | null>(null);

  return (
    <div className="max-w-md mx-auto bg-[#f6f6f8] min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center bg-white p-4 border-b border-slate-200 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2">Prueba de Entrega (POD)</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Shipment Info Card */}
        <section className="p-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 bg-[#7466f0]/10 text-[#7466f0] text-xs font-bold rounded uppercase">En Tránsito</span>
                <span className="text-slate-500 text-sm">ID: #FL-88291</span>
              </div>
              <h2 className="text-lg font-bold mb-1">Pedido #12345</h2>
              
              <div className="flex items-start gap-3 mt-4">
                <User className="text-[#7466f0] mt-1" size={18} />
                <div>
                  <p className="text-sm font-semibold">Destinatario</p>
                  <p className="text-sm text-slate-600">Juan Pérez</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mt-4">
                <MapPin className="text-[#7466f0] mt-1" size={18} />
                <div>
                  <p className="text-sm font-semibold">Dirección de Entrega</p>
                  <p className="text-sm text-slate-600">Calle Falsa 123, Ciudad de México, CP 01000</p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/trip-details/TRP-042')}
                className="mt-4 w-full py-2 text-xs font-bold text-[#7466f0] border border-[#7466f0]/20 rounded-lg hover:bg-[#7466f0]/5 transition-colors"
              >
                Ver Detalles Completos
              </button>
            </div>
            <div 
              className="h-32 w-full bg-slate-200 bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6Ho7bhCd88t96Sj4N9niON3ZRQHobxT8O4_xOy3PNXmPwfH2BvxGmL8qM6lLIFxnnreZeJRROo0GR4HJyvsboS_wCdnoUXQ9n2lo7Sbdg6xYsXtUjVsyCYZb8T5zBEyz9r7VGL5fjL8L8TnR56xVyl6AcNDT2e4mE_bvbsYD3HkGfNYlLQ8bGjfXyw-UbmuEpYISSzTNKOdu3gPgJ_yCK04DVa5UbnJXnDry7ZFpUvfMwlRn3iKdlYk1A21Wo5MWNnjPxQcBmzHLk')" }}
            ></div>
          </div>
        </section>

        {/* Evidence Actions */}
        <section className="px-4 py-2 flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 px-1">Evidencia de Entrega</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-300 rounded-xl hover:border-[#7466f0] transition-colors gap-2">
              <Camera className="text-[#7466f0]" size={32} />
              <span className="text-sm font-semibold">Tomar Foto</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-300 rounded-xl hover:border-[#7466f0] transition-colors gap-2">
              <QrCode className="text-[#7466f0]" size={32} />
              <span className="text-sm font-semibold">Escanear QR</span>
            </button>
          </div>
        </section>

        {/* Digital Signature */}
        <section className="px-4 py-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Firma Digital</h3>
            </div>
            <div className="relative h-48 w-full bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
              <SignaturePad 
                onSave={(dataUrl) => setSignature(dataUrl)}
                onClear={() => setSignature(null)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Nombre de quién recibe</label>
              <input 
                className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#7466f0] focus:border-[#7466f0] p-2.5" 
                placeholder="Ej. Carlos Slim" 
                type="text"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-200 shadow-lg z-20">
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-[#7466f0] hover:bg-[#7466f0]/90 text-white font-bold py-4 rounded-xl shadow-md shadow-[#7466f0]/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <CheckCircle size={20} />
          Confirmar Entrega
        </button>
      </footer>
    </div>
  );
}
