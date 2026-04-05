import React from 'react';
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Smartphone, 
  Globe, 
  Info,
  ChevronRight,
  Database,
  Lock,
  Eye,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';

export default function Settings() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Preferencias de App',
      items: [
        { icon: <Bell size={20} />, label: 'Notificaciones', desc: 'Alertas de ruta, mensajes y recordatorios', color: 'text-blue-500', bg: 'bg-blue-50' },
        { icon: <Globe size={20} />, label: 'Idioma', desc: 'Español (Latinoamérica)', color: 'text-green-500', bg: 'bg-green-50' },
        { icon: <Smartphone size={20} />, label: 'Modo Offline', desc: 'Gestionar mapas y datos locales', color: 'text-[#7466f0]', bg: 'bg-[#7466f0]/10' },
      ]
    },
    {
      title: 'Seguridad y Datos',
      items: [
        { icon: <Shield size={20} />, label: 'Privacidad', desc: 'Control de ubicación y telemetría', color: 'text-amber-500', bg: 'bg-amber-50' },
        { icon: <Lock size={20} />, label: 'Seguridad', desc: 'Cambiar PIN o contraseña', color: 'text-red-500', bg: 'bg-red-50' },
        { icon: <Database size={20} />, label: 'Almacenamiento', desc: 'Limpiar caché y archivos temporales', color: 'text-slate-500', bg: 'bg-slate-50' },
      ]
    },
    {
      title: 'Información de Flotapp',
      items: [
        { icon: <Info size={20} />, label: 'Acerca de la versión', desc: 'v2.4.0 (Build 20240405)', color: 'text-slate-400', bg: 'bg-slate-50' },
        { icon: <Eye size={20} />, label: 'Términos y Condiciones', desc: 'Políticas de uso de la plataforma', color: 'text-slate-400', bg: 'bg-slate-50' },
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#f6f6f8] min-h-full">
      {/* Header - Only visible on mobile if needed, but Layout handles it on tablet */}
      <div className="lg:hidden flex items-center bg-white p-4 border-b border-slate-200 justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-start cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Configuración
        </h2>
        <div className="size-10"></div>
      </div>

      <div className="p-4 lg:p-8 space-y-8 max-w-4xl mx-auto w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900">Configuración</h1>
          <p className="text-slate-500 font-medium">Personaliza tu experiencia y gestiona tus datos operativos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">{section.title}</h3>
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                {section.items.map((item, itemIdx) => (
                  <button 
                    key={itemIdx}
                    className={cn(
                      "w-full flex items-center gap-4 p-5 hover:bg-slate-50 transition-all text-left group",
                      itemIdx !== section.items.length - 1 && "border-b border-slate-50"
                    )}
                  >
                    <div className={cn("size-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", item.bg, item.color)}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-bold text-sm">{item.label}</p>
                      <p className="text-slate-500 text-xs font-medium">{item.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-[#7466f0] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 pb-12">
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-500 font-black rounded-[2rem] hover:bg-red-100 transition-all shadow-sm shadow-red-100"
          >
            <LogOut size={20} />
            Cerrar Sesión de Conductor
          </button>
          <p className="text-center text-[10px] text-slate-400 font-bold mt-6 uppercase tracking-widest">
            Flotapp Enterprise • 2024
          </p>
        </div>
      </div>
    </div>
  );
}
