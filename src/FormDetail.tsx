import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Camera, 
  MapPin, 
  Clock, 
  Calendar, 
  Trash2, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import SignaturePad from './components/SignaturePad';
import { cn } from './lib/utils';

export default function FormDetail() {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [signature, setSignature] = useState<string | null>(null);
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [location, setLocation] = useState('Obteniendo ubicación...');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }));
    setCurrentTime(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));

    // Simulate location fetching
    setTimeout(() => {
      setLocation('Autopista Norte, Km 22, Bogotá (4.8123, -74.0543)');
    }, 1500);
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Formulario enviado con éxito.');
      navigate(-1);
    }, 2000);
  };

  const getFormTitle = () => {
    switch (formId) {
      case 'pod': return 'POD / Prueba de Entrega';
      case 'pre-trip': return 'Checklist Pre-Viaje';
      case 'post-trip': return 'Checklist Post-Viaje';
      case 'return': return 'Devolución';
      case 'reception': return 'Recepción de Mercancía';
      case 'incident': return 'Acta de Incidencia';
      case 'photo-evidence': return 'Evidencia Fotográfica';
      default: return 'Detalle de Formulario';
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
        <h1 className="text-xl font-bold text-slate-900 flex-1 truncate">{getFormTitle()}</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Automatic Metadata Section */}
        <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Calendar className="text-blue-500" size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha</p>
              <p className="text-xs font-bold text-slate-700">{currentDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 p-2 rounded-lg">
              <Clock className="text-amber-500" size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hora</p>
              <p className="text-xs font-bold text-slate-700">{currentTime}</p>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 flex items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-50 lg:pl-4">
            <div className="bg-green-50 p-2 rounded-lg">
              <MapPin className="text-green-500" size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ubicación Automática</p>
              <p className="text-xs font-bold text-slate-700 truncate max-w-[200px]">{location}</p>
            </div>
          </div>
        </section>

        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          <div className="space-y-6">
            {/* Evidence Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-base font-bold text-slate-900">Evidencia Fotográfica</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Opcional</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-white flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#7466f0] hover:text-[#7466f0] transition-all cursor-pointer group">
                  <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-[#7466f0]/10 transition-colors">
                    <Camera size={32} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Tomar Foto</span>
                </div>
                <div className="flex-1 aspect-square rounded-2xl overflow-hidden relative group shadow-md">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Evidencia de carga" 
                    src="https://picsum.photos/seed/cargo/400/400"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="text-white" size={24} />
                  </div>
                </div>
              </div>
            </section>

            {/* Observations Section */}
            <section className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 px-1">Observaciones</h3>
              <textarea 
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="block w-full rounded-2xl border-slate-100 bg-white text-slate-900 focus:border-[#7466f0] focus:ring-[#7466f0] min-h-[120px] placeholder:text-slate-400 p-4 text-sm font-medium leading-relaxed shadow-sm outline-none transition-all" 
                placeholder="Escribe aquí cualquier detalle relevante..."
              ></textarea>
            </section>
          </div>

          <div className="space-y-6 mt-6 lg:mt-0">
            {/* Signature Section */}
            <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4 h-full flex flex-col">
              <h3 className="text-base font-bold text-slate-900">Firma de Conformidad</h3>
              <div className="relative flex-1 min-h-[200px] w-full bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <SignaturePad 
                  onSave={(dataUrl) => setSignature(dataUrl)}
                  onClear={() => setSignature(null)}
                />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                <AlertCircle size={12} />
                <span>La firma es obligatoria para el envío del formulario.</span>
              </div>
            </section>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 pb-8">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || !signature}
            className={cn(
              "w-full font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] lg:max-w-md lg:mx-auto",
              signature && !isSubmitting 
                ? "bg-[#7466f0] text-white shadow-[#7466f0]/20" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            )}
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={20} />
                Enviar Formulario
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

// Simple spin animation helper
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
`;
document.head.appendChild(style);
