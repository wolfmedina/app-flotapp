import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Lightbulb, 
  CircleDot, 
  Droplets, 
  AlertTriangle,
  Home,
  Truck,
  ClipboardCheck,
  User
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from './lib/utils';
import SignaturePad from './components/SignaturePad';

export default function Inspection() {
  const navigate = useNavigate();
  const [signature, setSignature] = useState<string | null>(null);
  
  const [checklist, setChecklist] = useState([
    {
      id: 'lighting',
      title: 'Iluminación',
      icon: <Lightbulb size={20} />,
      items: [
        { id: 'lights-1', label: 'Faros delanteros y traseros', checked: null },
        { id: 'lights-2', label: 'Luces de freno e intermitentes', checked: null },
      ]
    },
    {
      id: 'tires',
      title: 'Neumáticos y Ruedas',
      icon: <CircleDot size={20} />,
      items: [
        { id: 'tires-1', label: 'Estado general de rines', checked: null },
        { id: 'tires-2', label: 'Estado de la banda de rodadura', checked: null },
      ]
    },
    {
      id: 'engine',
      title: 'Motor y Fluidos',
      icon: <Droplets size={20} />,
      items: [
        { id: 'engine-1', label: 'Nivel de aceite de motor', checked: null },
        { id: 'engine-2', label: 'Nivel de líquido refrigerante', checked: null },
        { id: 'engine-3', label: 'Sin fugas de fluidos visibles', checked: null },
        { id: 'engine-4', label: 'Nivel de líquido de frenos', checked: null },
        { id: 'engine-5', label: 'Líquido limpiaparabrisas', checked: null },
      ]
    }
  ]);

  const handleCheck = (categoryId: string, itemId: string, value: boolean) => {
    setChecklist(prev => prev.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === itemId) {
              return { ...item, checked: value };
            }
            return item;
          })
        };
      }
      return category;
    }));
  };

  const totalItems = checklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = checklist.reduce((acc, cat) => acc + cat.items.filter(i => i.checked !== null).length, 0);
  const progress = Math.round((checkedItems / totalItems) * 100);

  return (
    <div className="relative flex h-auto min-h-full w-full flex-col bg-[#f6f6f8] overflow-x-hidden">
      {/* Header - Mobile only */}
      <div className="lg:hidden sticky top-0 z-10 flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-200">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-center cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Inspección de Unidad</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-slate-900">
            <MoreVertical size={24} />
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="flex flex-col gap-3 p-4 lg:p-8 bg-white lg:rounded-b-[3rem] lg:shadow-sm">
        <div className="flex gap-6 justify-between items-end max-w-5xl mx-auto w-full">
          <div>
            <p className="text-slate-500 text-[10px] lg:text-xs font-black uppercase tracking-widest">Vehículo: ABC-1234</p>
            <h1 className="text-slate-900 text-xl lg:text-3xl font-black leading-tight">Inspección de Unidad</h1>
          </div>
          <p className="text-[#7466f0] text-sm lg:text-lg font-black leading-normal">{progress}% completado</p>
        </div>
        <div className="h-3 w-full max-w-5xl mx-auto rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-[#7466f0] transition-all duration-500 shadow-sm" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="px-4 py-6 lg:px-8 lg:py-10 max-w-5xl mx-auto w-full">
        <h3 className="text-slate-900 tracking-tight text-2xl lg:text-4xl font-black leading-tight">Checklist Pre-viaje</h3>
        <p className="text-slate-500 text-sm lg:text-base font-medium mt-1">Verifique el estado de los componentes antes de iniciar la ruta.</p>
      </div>

      {/* Checklist Content */}
      <div className="flex flex-col gap-12 px-4 pb-32 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-16">
          {checklist.map((category) => (
            <div key={category.id} className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="bg-[#7466f0] p-3 rounded-2xl text-white shadow-lg shadow-[#7466f0]/20">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-slate-900 text-xl lg:text-2xl font-black">{category.title}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">Sección de verificación</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center justify-between gap-8 transition-all group hover:border-[#7466f0]/30 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-slate-900 font-black text-base lg:text-lg leading-tight px-2">
                        {item.label}
                      </span>
                      <div className="h-1 w-8 bg-slate-100 rounded-full group-hover:bg-[#7466f0]/20 transition-colors"></div>
                    </div>
                    
                    <div className="flex gap-3 w-full">
                      <button 
                        onClick={() => handleCheck(category.id, item.id, true)}
                        className={cn(
                          "flex-1 py-4 rounded-2xl text-sm font-black shadow-sm transition-all active:scale-95",
                          item.checked === true 
                            ? "bg-[#7466f0] text-white shadow-[#7466f0]/30" 
                            : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                        )}
                      >
                        SÍ
                      </button>
                      <button 
                        onClick={() => handleCheck(category.id, item.id, false)}
                        className={cn(
                          "flex-1 py-4 rounded-2xl text-sm font-black transition-all active:scale-95",
                          item.checked === false 
                            ? "bg-red-500 text-white shadow-red-500/30" 
                            : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                        )}
                      >
                        NO
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Action: Report Incidencia */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-1">
              <AlertTriangle size={16} className="text-red-500" />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Novedades y Alertas</h3>
            </div>
            <Link 
              to="/report-incident"
              className="flex flex-col items-center justify-center gap-4 w-full py-10 rounded-[2.5rem] border-2 border-dashed border-red-200 bg-red-50/30 text-red-600 font-black hover:bg-red-50 hover:border-red-300 transition-all active:scale-[0.98] group"
            >
              <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                <AlertTriangle size={32} />
              </div>
              <div className="text-center">
                <span className="text-xl block">Reportar Incidencia</span>
                <span className="text-xs font-medium text-red-400">Notificar fallas o daños encontrados</span>
              </div>
            </Link>
          </div>

          {/* Digital Signature */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-1">
              <User size={16} className="text-[#7466f0]" />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Firma del Conductor</h3>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm flex flex-col gap-6">
              <div className="relative h-48 w-full bg-slate-50 rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-inner">
                <SignaturePad 
                  onSave={(dataUrl) => setSignature(dataUrl)}
                  onClear={() => setSignature(null)}
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <div className="h-px w-8 bg-slate-200"></div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Firma Digital Requerida</p>
                <div className="h-px w-8 bg-slate-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Finalize Button */}
        <div className="pt-12 pb-20 flex justify-center">
          <button 
            onClick={() => navigate('/')}
            className="w-full max-w-md bg-[#7466f0] text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-[#7466f0]/40 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
          >
            <div className="bg-white/20 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <ClipboardCheck size={28} />
            </div>
            Finalizar Inspección
          </button>
        </div>
      </div>
    </div>
  );
}
