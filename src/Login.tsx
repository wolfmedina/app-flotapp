import React from 'react';
import { 
  ArrowLeft, 
  Truck, 
  Mail, 
  Lock, 
  Eye, 
  LogIn, 
  ShieldCheck 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8]">
      {/* Top Navigation */}
      <div className="flex items-center bg-transparent p-4 pb-2 justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-12 shrink-0 items-center cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 pr-12 flex justify-center">
          <div className="flex items-center gap-2">
            <img 
              src="https://i.postimg.cc/pdB24PbV/logo-flotapp-normal.png" 
              alt="Flotapp Logo" 
              className="h-10 w-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 px-8 pt-12 pb-10 max-w-md mx-auto w-full">
        {/* Welcome Text & Visual */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-[#7466f0]/10 rounded-3xl mb-6 shadow-sm border border-[#7466f0]/5">
            <ShieldCheck className="text-[#7466f0]" size={48} />
          </div>
          <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight mb-3">¡Hola de nuevo!</h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed px-4">Ingresa tus credenciales para acceder a tu panel de control</p>
        </div>

        {/* Login Form */}
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
          <div className="space-y-6">
            {/* Email Field Group */}
            <div className="group">
              <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within:text-[#7466f0]">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#7466f0] transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 font-medium focus:border-[#7466f0] focus:ring-4 focus:ring-[#7466f0]/10 outline-none transition-all placeholder:text-slate-300 shadow-sm" 
                  placeholder="ejemplo@empresa.com" 
                  type="email"
                />
              </div>
            </div>

            {/* Password Field Group */}
            <div className="group">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-slate-500 text-xs font-bold uppercase tracking-widest transition-colors group-focus-within:text-[#7466f0]">
                  Contraseña
                </label>
                <button type="button" className="text-[#7466f0] text-xs font-bold hover:underline tracking-tight">¿Olvidaste tu clave?</button>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#7466f0] transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 font-medium focus:border-[#7466f0] focus:ring-4 focus:ring-[#7466f0]/10 outline-none transition-all placeholder:text-slate-300 shadow-sm" 
                  placeholder="••••••••" 
                  type="password"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#7466f0] transition-colors cursor-pointer">
                  <Eye size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-1">
            <div className="relative flex items-center">
              <input 
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-slate-300 checked:bg-[#7466f0] checked:border-[#7466f0] transition-all focus:ring-2 focus:ring-[#7466f0]/20 outline-none" 
                id="remember" 
                type="checkbox"
              />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
            <label className="text-slate-600 text-sm font-semibold cursor-pointer select-none" htmlFor="remember">
              Mantener sesión iniciada
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#7466f0] hover:bg-[#7466f0]/90 text-white font-black py-5 rounded-2xl shadow-xl shadow-[#7466f0]/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-lg uppercase tracking-wider"
          >
            <span>Entrar al Sistema</span>
            <LogIn size={22} />
          </button>
        </form>

        {/* Social Logins */}
        <div className="mt-12 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">O accede con</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]">
              <img 
                alt="Google Logo" 
                className="w-5 h-5" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjBlNqLzP8iGivrYcmzN9KnqaWOGbshr4SofJV5_3HEDSx1NkxXk6Rjb2wdMIxkV0virjakERo5WzLMQqbkxmCgnKQ5j41iBAtmDFCJ6bY-R2VVbUMRog0OnI9Aa18PTpH9Yii-WKUYwfpyl6yER4CsceTzibppdVTAZ5SR1EUqC7szLaUcmwsKnRWfz6iaHi3z10V1QdtN3wqCvktDUaGcABRQnvOkP1GZB44DaHhd1sKTDXY2l9G_7LxR2k3P4hma9wDYIgr8KMG"
              />
              <span className="text-slate-700 font-bold text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]">
              <span className="text-slate-700 font-black text-sm uppercase tracking-wider">Apple</span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-auto pt-12 text-slate-500 text-sm font-medium">
          ¿No tienes una cuenta? 
          <button className="text-[#7466f0] font-black hover:underline ml-2 uppercase tracking-tight">Regístrate gratis</button>
        </p>
      </div>
    </div>
  );
}
