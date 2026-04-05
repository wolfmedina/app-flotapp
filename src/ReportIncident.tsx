import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  LayoutGrid, 
  Clock, 
  Wrench, 
  TrafficCone, 
  MoreHorizontal, 
  Camera, 
  Image as ImageIcon, 
  Trash2, 
  FileText, 
  MapPin, 
  RefreshCw, 
  Send,
  AlertCircle,
  Package,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';
import SignaturePad from './components/SignaturePad';

export default function ReportIncident() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('Retraso');
  const [signature, setSignature] = useState<string | null>(null);

  const types = [
    { id: 'Retraso', icon: <Clock size={20} />, label: 'Retraso' },
    { id: 'Accidente', icon: <AlertCircle size={20} />, label: 'Accidente' },
    { id: 'Mecánico', icon: <Wrench size={20} />, label: 'Prob. Mecánico' },
    { id: 'Carga', icon: <Package size={20} />, label: 'Prob. Carga' },
    { id: 'Parada', icon: <ShieldCheck size={20} />, label: 'Parada Justificada' },
    { id: 'Tráfico', icon: <TrafficCone size={20} />, label: 'Tráfico Severo' },
    { id: 'Otro', icon: <AlertTriangle size={20} />, label: 'Otro Incidente' },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f6f8] overflow-x-hidden">
      {/* Top App Bar */}
      <div className="flex items-center bg-white p-4 pb-4 shadow-sm sticky top-0 z-10 border-b border-slate-100">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight flex-1 ml-2">Reportar Novedad</h2>
        <button className="text-[#7466f0] flex size-10 shrink-0 items-center justify-center hover:bg-[#7466f0]/10 rounded-full transition-colors">
          <Bell size={24} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Tipo de Incidencia Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="text-[#7466f0]" size={20} />
            <h3 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Tipo de Incidencia</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {types.map((type) => (
              <button 
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "flex h-14 items-center justify-center gap-x-2 rounded-2xl transition-all shadow-sm",
                  selectedType === type.id 
                    ? "bg-[#7466f0] text-white shadow-lg shadow-[#7466f0]/30" 
                    : "bg-white border border-slate-100 text-slate-500 hover:border-[#7466f0]/30"
                )}
              >
                {type.icon}
                <p className="text-sm font-bold">{type.label}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Foto / Multimedia Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Camera className="text-[#7466f0]" size={20} />
            <h3 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Evidencia Visual</h3>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-white flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#7466f0] hover:text-[#7466f0] transition-all cursor-pointer group">
              <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-[#7466f0]/10 transition-colors">
                <ImageIcon size={32} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Adjuntar Foto</span>
            </div>
            <div className="flex-1 aspect-square rounded-2xl overflow-hidden relative group shadow-md">
              <img 
                className="w-full h-full object-cover" 
                alt="Camión de reparto en carretera con tráfico" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_TnZYcsCX_ldkamTNQ0qMIcHk8RNj9wHOZnvlwMIyPHkTITD7ZlZVVJPedkdUrnDtDXC2VDDNoBY7YEXF-hx9jsdpcPmrh7gqzjA42nkZbot2-r8sfdeRwpE0XmzFeshn3ctNCTZSoK5VsR8a6ELLNvN1mIOVnw8gtWnZK_U4un_RBtNgTExn3yOGyJCcuyHHgEdlc49JGuM6JbHFPFTFODQ06ZzyX2NXa4YkSibv-jbQQ9-ZU8GeAZQybWM2b4tyI4NMVyP334V"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="text-white" size={24} />
              </div>
            </div>
          </div>
        </section>

        {/* Detalles Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-[#7466f0]" size={20} />
            <h3 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Detalles de la Novedad</h3>
          </div>
          
          {/* Quick Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {['Pinchazo', 'Accidente', 'Cierre vía', 'Falla motor', 'Clima'].map(tag => (
              <button 
                key={tag}
                onClick={() => {
                  const textarea = document.querySelector('textarea');
                  if (textarea) {
                    textarea.value = (textarea.value ? textarea.value + ', ' : '') + tag;
                  }
                }}
                className="text-[10px] font-bold px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-500 hover:border-[#7466f0] hover:text-[#7466f0] transition-colors"
              >
                + {tag}
              </button>
            ))}
          </div>

          <div className="flex flex-col">
            <textarea 
              className="block w-full rounded-2xl border-slate-100 bg-white text-slate-900 focus:border-[#7466f0] focus:ring-[#7466f0] min-h-[160px] placeholder:text-slate-400 p-4 text-base font-medium leading-relaxed shadow-sm outline-none transition-all" 
              placeholder="Describe detalladamente lo ocurrido aquí para agilizar la gestión..."
            ></textarea>
          </div>
        </section>

        {/* Ubicación Section */}
        <section className="bg-[#7466f0]/5 rounded-2xl p-5 flex items-center gap-4 border border-[#7466f0]/10 shadow-sm">
          <div className="bg-[#7466f0]/10 p-3 rounded-xl">
            <MapPin className="text-[#7466f0]" size={24} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-widest mb-0.5">Ubicación Actual</p>
            <p className="text-sm font-bold text-slate-800 leading-tight">Autopista Norte, Km 22, Bogotá</p>
          </div>
          <button className="p-2 hover:bg-[#7466f0]/10 rounded-full transition-colors">
            <RefreshCw className="text-slate-400" size={20} />
          </button>
        </section>

        {/* Digital Signature */}
        <section className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-slate-900 text-lg font-bold mb-4">Firma de Conformidad</h3>
          <div className="relative h-40 w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
            <SignaturePad 
              onSave={(dataUrl) => setSignature(dataUrl)}
              onClear={() => setSignature(null)}
            />
          </div>
        </section>
      </div>

      {/* Footer Button */}
      <div className="mt-8 p-6 bg-white border-t border-slate-50 flex flex-col gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-[#7466f0] hover:bg-[#7466f0]/90 text-white font-bold py-5 rounded-2xl shadow-xl shadow-[#7466f0]/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <Send size={20} />
          Enviar Reporte
        </button>
        <div className="h-4"></div>
      </div>
    </div>
  );
}
