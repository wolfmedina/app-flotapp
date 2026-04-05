import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { USER_PROFILE_IMAGE, USER_NAME, USER_ID } from './constants';

export default function Profile() {
  const navigate = useNavigate();

  const sections = [
    { icon: <Shield size={20} />, label: 'Seguridad y Privacidad', path: '/settings' },
    { icon: <Bell size={20} />, label: 'Notificaciones', path: '/settings' },
    { icon: <MapPin size={20} />, label: 'Ubicación y Rutas', path: '/routes' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold text-slate-900">Mi Perfil</h2>
        <p className="text-slate-500 text-sm">Gestiona tu información personal</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center gap-4">
        <div className="size-24 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-slate-100">
          <img 
            src={USER_PROFILE_IMAGE} 
            alt={USER_NAME}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-extrabold text-slate-900">{USER_NAME}</h3>
          <p className="text-slate-500 font-medium">Conductor Senior • ID {USER_ID}</p>
        </div>
        <div className="flex gap-2 w-full pt-4">
          <button className="flex-1 bg-[#7466f0] text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#7466f0]/20 active:scale-95 transition-transform">
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Info List */}
      <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 divide-y divide-slate-50">
        <div className="flex items-center gap-4 p-4">
          <div className="bg-slate-50 p-2 rounded-xl text-slate-400">
            <Mail size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
            <p className="text-sm font-bold text-slate-900">juan.conductor@flotapp.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="bg-slate-50 p-2 rounded-xl text-slate-400">
            <Phone size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Teléfono</span>
            <p className="text-sm font-bold text-slate-900">+52 (55) 1234-5678</p>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 divide-y divide-slate-50">
        {sections.map((section, idx) => (
          <button 
            key={idx}
            onClick={() => navigate(section.path)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="bg-slate-50 p-2 rounded-xl text-slate-400">
                {section.icon}
              </div>
              <span className="text-sm font-bold text-slate-900">{section.label}</span>
            </div>
            <ChevronRight className="text-slate-300" size={20} />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button 
        onClick={() => navigate('/login')}
        className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-500 rounded-3xl font-extrabold text-sm active:scale-95 transition-transform"
      >
        <LogOut size={20} />
        CERRAR SESIÓN
      </button>
    </div>
  );
}
