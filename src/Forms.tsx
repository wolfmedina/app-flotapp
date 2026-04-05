import React from 'react';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  ClipboardCheck,
  Truck,
  Package,
  RotateCcw,
  Camera,
  FileWarning,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';

interface FormItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in_review' | 'sync_pending';
  icon: React.ReactNode;
}

const FORMS: FormItem[] = [
  {
    id: 'pod',
    title: 'POD / Prueba de Entrega',
    description: 'Documentación final de entrega al cliente',
    status: 'pending',
    icon: <ClipboardCheck className="text-[#7466f0]" size={20} />
  },
  {
    id: 'pre-trip',
    title: 'Checklist Pre-Viaje',
    description: 'Inspección técnica antes de iniciar ruta',
    status: 'completed',
    icon: <Truck className="text-green-500" size={20} />
  },
  {
    id: 'post-trip',
    title: 'Checklist Post-Viaje',
    description: 'Estado de la unidad al finalizar jornada',
    status: 'pending',
    icon: <Truck className="text-slate-400" size={20} />
  },
  {
    id: 'return',
    title: 'Devolución',
    description: 'Reporte de mercancía rechazada o devuelta',
    status: 'sync_pending',
    icon: <RotateCcw className="text-amber-500" size={20} />
  },
  {
    id: 'reception',
    title: 'Recepción de Mercancía',
    description: 'Validación de carga en origen',
    status: 'completed',
    icon: <Package className="text-green-500" size={20} />
  },
  {
    id: 'incident',
    title: 'Acta de Incidencia',
    description: 'Documento formal de eventos en ruta',
    status: 'in_review',
    icon: <FileWarning className="text-red-500" size={20} />
  },
  {
    id: 'photo-evidence',
    title: 'Evidencia Fotográfica',
    description: 'Registro visual de carga o eventos',
    status: 'pending',
    icon: <Camera className="text-[#7466f0]" size={20} />
  }
];

export default function Forms() {
  const navigate = useNavigate();

  const getStatusBadge = (status: FormItem['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-slate-200">
            <Clock size={10} />
            PENDIENTE
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-green-200">
            <CheckCircle2 size={10} />
            COMPLETADO
          </span>
        );
      case 'in_review':
        return (
          <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-200">
            <RefreshCw size={10} className="animate-spin-slow" />
            EN REVISIÓN
          </span>
        );
      case 'sync_pending':
        return (
          <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-200">
            <AlertCircle size={10} />
            SINCRONIZANDO
          </span>
        );
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
        <h1 className="text-xl font-bold text-slate-900 flex-1">Formularios</h1>
        <div className="bg-[#7466f0]/10 p-2 rounded-xl">
          <FileText className="text-[#7466f0]" size={20} />
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4">
        {/* Summary Stats */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-around">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pendientes</p>
            <p className="text-xl font-black text-slate-900">3</p>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Completados</p>
            <p className="text-xl font-black text-green-500">2</p>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">En Revisión</p>
            <p className="text-xl font-black text-blue-500">1</p>
          </div>
        </div>

        {/* Forms List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Disponibles</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FORMS.map((form) => (
              <div 
                key={form.id}
                onClick={() => navigate(`/form-detail/${form.id}`)}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer h-full"
              >
                <div className="bg-slate-50 p-3 rounded-xl">
                  {form.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900 text-sm">{form.title}</h4>
                    {getStatusBadge(form.status)}
                  </div>
                  <p className="text-xs text-slate-500 leading-tight">{form.description}</p>
                </div>
                <ChevronRight className="text-slate-300" size={20} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
