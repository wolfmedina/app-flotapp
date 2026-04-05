import React from 'react';
import { 
  FolderOpen, 
  ChevronLeft, 
  FileText, 
  Shield, 
  CreditCard, 
  ChevronRight, 
  AlertTriangle, 
  Download, 
  Eye,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

const documents = [
  { id: 1, title: 'Licencia de Conducir', type: 'Personal', expiry: '15 Abr 2026', status: 'warning', icon: <UserCircle size={20} />, color: 'bg-blue-100 text-blue-600' },
  { id: 2, title: 'Seguro de la Unidad', type: 'Vehículo', expiry: '20 Dic 2026', status: 'ok', icon: <Shield size={20} />, color: 'bg-green-100 text-green-600' },
  { id: 3, title: 'Certificado Médico', type: 'Personal', expiry: '10 Jun 2026', status: 'ok', icon: <Activity size={20} />, color: 'bg-amber-100 text-amber-600' },
  { id: 4, title: 'Tarjeta de Circulación', type: 'Vehículo', expiry: '05 Ene 2027', status: 'ok', icon: <CreditCard size={20} />, color: 'bg-purple-100 text-purple-600' },
];

function UserCircle({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
}

function Activity({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  );
}

export default function Documents() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f8] pb-10">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Bóveda Digital</h1>
        </div>
        <button className="bg-[#7466f0] text-white p-2 rounded-xl shadow-lg shadow-[#7466f0]/20">
          <Plus size={24} />
        </button>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Expiry Alert */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 p-4 rounded-3xl flex items-start gap-3"
        >
          <div className="bg-amber-500 p-2 rounded-xl text-white">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-900">Vencimiento Próximo</p>
            <p className="text-xs text-amber-800/80">"Tu licencia vence en 15 días, ¿quieres programar el trámite?"</p>
            <button className="mt-2 text-xs font-bold text-amber-600 underline">Gestionar ahora</button>
          </div>
        </motion.div>

        {/* Documents List */}
        <section>
          <h3 className="text-base font-bold text-slate-900 mb-4 px-1">Mis Documentos</h3>
          <div className="space-y-3">
            {documents.map((doc) => (
              <motion.div 
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
              >
                <div className={cn("size-12 rounded-xl flex items-center justify-center", doc.color)}>
                  {doc.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{doc.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{doc.type}</span>
                    <span className="text-[10px] font-bold text-slate-300">•</span>
                    <span className={cn(
                      "text-[10px] font-bold",
                      doc.status === 'warning' ? "text-amber-500" : "text-slate-400"
                    )}>Vence: {doc.expiry}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-300 hover:text-[#7466f0] transition-colors">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-slate-300 hover:text-[#7466f0] transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Unit Documents */}
        <section>
          <h3 className="text-base font-bold text-slate-900 mb-4 px-1">Documentos de la Unidad</h3>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-3">
                <FileText className="text-slate-400" size={20} />
                <span className="text-sm font-semibold text-slate-700">Manual de Usuario</span>
              </div>
              <ChevronRight className="text-slate-300" size={20} />
            </div>
            <div className="p-4 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-3">
                <FileText className="text-slate-400" size={20} />
                <span className="text-sm font-semibold text-slate-700">Protocolo de Emergencia</span>
              </div>
              <ChevronRight className="text-slate-300" size={20} />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="text-slate-400" size={20} />
                <span className="text-sm font-semibold text-slate-700">Contactos de Asistencia</span>
              </div>
              <ChevronRight className="text-slate-300" size={20} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
