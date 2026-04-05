import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Truck, 
  ClipboardCheck, 
  User, 
  Map as MapIcon,
  FileText,
  MessageSquare,
  BarChart3,
  Trophy,
  CreditCard,
  FolderOpen,
  Activity,
  Settings,
  LogOut,
  X,
  AlertCircle,
  UserCircle,
  AlertTriangle,
  Mic,
  Thermometer,
  Bell,
  Menu as MenuIcon
} from 'lucide-react';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { USER_PROFILE_IMAGE, USER_NAME, USER_ID } from './constants';
import ScrollToTop from './components/ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export default function Layout({ children, showNav = true }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Hide nav on specific routes if needed
  const hideNavRoutes = ['/login', '/route-in-progress'];
  const shouldShowNav = showNav && !hideNavRoutes.includes(location.pathname);

  const sidebarItems = [
    { icon: <FileText size={20} />, label: 'Formularios', path: '/forms' },
    { icon: <AlertTriangle size={20} />, label: 'Alertas de Ruta', path: '/route-alerts' },
    { icon: <AlertCircle size={20} />, label: 'Reportar Novedad', path: '/report-incident' },
    { icon: <Thermometer size={20} />, label: 'Cadena de Frío', path: '/cold-chain' },
    { icon: <MessageSquare size={20} />, label: 'Soporte IA', path: '/support-chat' },
    { icon: <BarChart3 size={20} />, label: 'Mis Estadísticas', path: '/stats' },
    { icon: <Trophy size={20} />, label: 'Ranking y Logros', path: '/ranking' },
    { icon: <CreditCard size={20} />, label: 'Gastos y Viáticos', path: '/expenses' },
    { icon: <FolderOpen size={20} />, label: 'Mis Documentos', path: '/documents' },
    { icon: <Activity size={20} />, label: 'Salud de la Unidad', path: '/unit-health' },
    { icon: <Settings size={20} />, label: 'Configuración', path: '/settings' },
  ];

  useEffect(() => {
    const handleTriggerSOS = () => setIsSOSOpen(true);
    window.addEventListener('trigger-sos', handleTriggerSOS);
    return () => window.removeEventListener('trigger-sos', handleTriggerSOS);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        console.log("Grabación SOS finalizada:", audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer for visual feedback
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 10) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 10;
          }
          return prev + 1;
        });
      }, 1000);

      // Stop after 10 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, 10000);
    } catch (err) {
      console.error("Error al acceder al micrófono:", err);
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (isSOSOpen) {
      startRecording();
    } else {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);
      setRecordingTime(0);
    }
  }, [isSOSOpen]);

  const handleConfirmSOS = () => {
    // Get location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`SOS Enviado - Ubicación: ${latitude}, ${longitude}`);
        setIsSOSOpen(false);
        alert(`¡ALERTA SOS ENVIADA!\nUbicación: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}\nAudio de 10s transmitido al administrador.`);
      },
      (error) => {
        console.error("Error al obtener ubicación:", error);
        setIsSOSOpen(false);
        alert("¡ALERTA SOS ENVIADA!\nUbicación no disponible, audio transmitido al administrador.");
      }
    );
  };

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nueva Ruta Asignada', desc: 'Ruta Bogotá - Medellín disponible para mañana.', time: 'Hace 5 min', read: false, type: 'route' },
    { id: 2, title: 'Alerta de Temperatura', desc: 'Desviación detectada en el tramo B-4.', time: 'Hace 15 min', read: false, type: 'alert' },
    { id: 3, title: 'Documento por Vencer', desc: 'Tu licencia de conducción vence en 3 días.', time: 'Hace 1 hora', read: true, type: 'doc' },
    { id: 4, title: 'Mensaje de Soporte', desc: 'El administrador ha respondido a tu consulta.', time: 'Hace 3 horas', read: true, type: 'chat' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden bg-[#f6f6f8] font-sans text-slate-900 overflow-x-hidden">
      <ScrollToTop />
      {/* Desktop Sidebar */}
      {shouldShowNav && (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-0 h-screen z-50">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-8">
              <img 
                src="https://i.postimg.cc/pdB24PbV/logo-flotapp-normal.png" 
                alt="Flotapp Logo" 
                className="h-8 w-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <Link 
              to="/profile"
              className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl hover:bg-[#7466f0]/5 transition-colors group cursor-pointer"
            >
              <div className="size-10 rounded-full overflow-hidden border-2 border-[#7466f0]/20 shadow-sm group-hover:border-[#7466f0]/40 transition-colors">
                <img 
                  src={USER_PROFILE_IMAGE} 
                  alt={USER_NAME}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-slate-900 text-sm truncate group-hover:text-[#7466f0] transition-colors">{USER_NAME}</p>
                <p className="text-[10px] text-slate-500">ID: {USER_ID}</p>
              </div>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Menú Principal</p>
            <NavLink 
              to="/" 
              className={({ isActive }) => cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                isActive ? "bg-[#7466f0]/10 text-[#7466f0]" : "text-slate-600 hover:bg-slate-50 hover:text-[#7466f0]"
              )}
            >
              <Home size={20} fill={location.pathname === '/' ? 'currentColor' : 'none'} />
              Inicio
            </NavLink>
            <NavLink 
              to="/routes" 
              className={({ isActive }) => cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                isActive ? "bg-[#7466f0]/10 text-[#7466f0]" : "text-slate-600 hover:bg-slate-50 hover:text-[#7466f0]"
              )}
            >
              <MapIcon size={20} />
              Rutas
            </NavLink>
            <NavLink 
              to="/trips" 
              className={({ isActive }) => cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                isActive ? "bg-[#7466f0]/10 text-[#7466f0]" : "text-slate-600 hover:bg-slate-50 hover:text-[#7466f0]"
              )}
            >
              <Truck size={20} />
              Viajes
            </NavLink>
            <NavLink 
              to="/inspection" 
              className={({ isActive }) => cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                isActive ? "bg-[#7466f0]/10 text-[#7466f0]" : "text-slate-600 hover:bg-slate-50 hover:text-[#7466f0]"
              )}
            >
              <ClipboardCheck size={20} />
              Inspección
            </NavLink>

            <div className="pt-4 pb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Operación</p>
            </div>

            {sidebarItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) => cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                  isActive ? "bg-[#7466f0]/10 text-[#7466f0]" : "text-slate-600 hover:bg-slate-50 hover:text-[#7466f0]"
                )}
              >
                <span className={cn(
                  location.pathname === item.path ? "text-[#7466f0]" : "text-slate-400"
                )}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="p-6 border-t border-slate-100">
            <button 
              onClick={() => navigate('/login')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-bold"
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col lg:h-screen relative overflow-hidden">
        {/* Notifications Modal */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <div className="fixed inset-0 z-[2000] flex items-start justify-center p-4 pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotificationsOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-slate-900 font-black text-lg">Notificaciones</h3>
                  {unreadCount > 0 && (
                    <span className="bg-[#7466f0] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      {unreadCount} NUEVAS
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={markAllAsRead}
                    className="text-[#7466f0] text-xs font-bold hover:underline"
                  >
                    Marcar todo como leído
                  </button>
                  <button 
                    onClick={() => setIsNotificationsOpen(false)}
                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "p-4 rounded-2xl flex gap-4 transition-colors relative",
                        notification.read ? "bg-white" : "bg-slate-50"
                      )}
                    >
                      {!notification.read && (
                        <div className="absolute top-4 right-4 size-2 bg-[#7466f0] rounded-full" />
                      )}
                      <div className={cn(
                        "size-10 rounded-xl flex items-center justify-center shrink-0",
                        notification.type === 'alert' ? "bg-red-50 text-red-500" : 
                        notification.type === 'route' ? "bg-green-50 text-green-500" :
                        notification.type === 'doc' ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"
                      )}>
                        {notification.type === 'alert' ? <AlertTriangle size={20} /> : 
                         notification.type === 'route' ? <Truck size={20} /> :
                         notification.type === 'doc' ? <FileText size={20} /> : <MessageSquare size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <h4 className="text-slate-900 font-bold text-sm leading-tight">{notification.title}</h4>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed mb-1">{notification.desc}</p>
                        <span className="text-[10px] text-slate-400 font-medium">{notification.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <Bell className="mx-auto text-slate-200 mb-3" size={48} />
                    <p className="text-slate-400 font-medium">No tienes notificaciones</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-slate-100">
                <button 
                  onClick={() => setIsNotificationsOpen(false)}
                  className="w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl text-sm"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SOS Emergency Modal */}
      <AnimatePresence>
        {isSOSOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSOSOpen(false)}
              className="absolute inset-0 bg-[#4a151f]/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-[320px] rounded-[40px] p-8 flex flex-col items-center text-center shadow-2xl"
            >
              <div className="bg-[#fff1f3] size-20 rounded-full flex items-center justify-center mb-6 relative">
                <AlertTriangle className="text-[#ff003d]" size={40} />
                {isRecording && (
                  <motion.div 
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.2 }}
                    transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                    className="absolute -top-1 -right-1 bg-[#ff003d] p-1.5 rounded-full border-2 border-white"
                  >
                    <Mic className="text-white" size={12} />
                  </motion.div>
                )}
              </div>
              
              <h2 className="text-[#1a2b48] text-3xl font-black mb-3 tracking-tight">¿EMERGENCIA?</h2>
              
              <div className="mb-8 space-y-2">
                <p className="text-[#6b7c93] text-base font-medium leading-tight px-2">
                  Se enviará tu ubicación y se grabará audio por 10 segundos.
                </p>
                {isRecording && (
                  <div className="flex items-center justify-center gap-2 text-[#ff003d] font-bold text-sm">
                    <span className="size-2 bg-[#ff003d] rounded-full animate-pulse"></span>
                    GRABANDO: {recordingTime}s / 10s
                  </div>
                )}
              </div>
              
              <div className="w-full space-y-4">
                <button 
                  onClick={handleConfirmSOS}
                  className="w-full bg-[#ff003d] text-white font-black py-5 rounded-3xl shadow-xl shadow-[#ff003d]/30 active:scale-95 transition-transform text-lg tracking-wide uppercase"
                >
                  Confirmar SOS
                </button>
                
                <button 
                  onClick={() => setIsSOSOpen(false)}
                  className="w-full bg-[#f0f4f8] text-[#4a5568] font-black py-5 rounded-3xl active:scale-95 transition-transform text-lg tracking-wide uppercase"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sidebar Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <div className="fixed inset-0 z-[1001]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://i.postimg.cc/pdB24PbV/logo-flotapp-normal.png" 
                      alt="Flotapp Logo" 
                      className="h-8 w-auto"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <Link 
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
                >
                  <div className="size-12 rounded-full overflow-hidden border-2 border-[#7466f0]/20 shadow-sm">
                    <img 
                      src={USER_PROFILE_IMAGE} 
                      alt={USER_NAME}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{USER_NAME}</p>
                    <p className="text-xs text-slate-500">ID: {USER_ID}</p>
                  </div>
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-1">
                  {sidebarItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate(item.path);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                        location.pathname === item.path 
                          ? "bg-[#7466f0]/10 text-[#7466f0]" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#7466f0]"
                      )}
                    >
                      <span className={cn(
                        location.pathname === item.path ? "text-[#7466f0]" : "text-slate-400"
                      )}>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-slate-100">
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-bold"
                >
                  <LogOut size={20} />
                  Cerrar Sesión
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Header (Hamburger + Logo + SOS) */}
      {shouldShowNav && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 w-full">
          <div className="flex items-center justify-between px-4 py-3 lg:px-8 max-w-7xl mx-auto">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors lg:hidden"
            >
              <MenuIcon className="text-slate-700" size={24} />
            </button>
            <div className="flex items-center gap-2 lg:hidden">
              <img 
                src="https://i.postimg.cc/pdB24PbV/logo-flotapp-normal.png" 
                alt="Flotapp Logo" 
                className="h-8 w-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden lg:block">
              <h2 className="text-lg font-bold text-slate-900">
                {location.pathname === '/' ? 'Panel de Control' : 
                 sidebarItems.find(i => i.path === location.pathname)?.label || 'Flotapp'}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Notifications Button */}
              <button 
                onClick={() => setIsNotificationsOpen(true)}
                className="size-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center active:scale-95 transition-all relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-4 bg-[#7466f0] text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* SOS Button moved to the side */}
              <button 
                onClick={() => setIsSOSOpen(true)}
                className="size-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 active:scale-95 transition-all relative overflow-hidden"
              >
                <AlertCircle size={20} />
                <span className="absolute bottom-0.5 text-[8px] font-black uppercase leading-none">SOS</span>
              </button>
            </div>
          </div>
        </header>
      )}

      <main className={cn("flex-1 w-full relative max-w-7xl mx-auto lg:px-8 lg:overflow-y-auto", shouldShowNav && "pb-24 lg:pb-8")}>
        {children}
      </main>

      {shouldShowNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-50 lg:hidden">
          <div className="flex justify-around items-center px-2 py-2 max-w-md mx-auto">
            <NavLink 
              to="/" 
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                isActive ? "text-[#7466f0]" : "text-slate-400"
              )}
            >
              <Home size={22} fill={location.pathname === '/' ? 'currentColor' : 'none'} />
              <span className="text-[10px] font-bold">Inicio</span>
            </NavLink>

            <NavLink 
              to="/routes" 
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                isActive ? "text-[#7466f0]" : "text-slate-400"
              )}
            >
              <MapIcon size={22} />
              <span className="text-[10px] font-medium">Rutas</span>
            </NavLink>
            
            <NavLink 
              to="/trips" 
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                isActive ? "text-[#7466f0]" : "text-slate-400"
              )}
            >
              <Truck size={22} />
              <span className="text-[10px] font-medium">Viajes</span>
            </NavLink>
            
            <NavLink 
              to="/inspection" 
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                isActive ? "text-[#7466f0]" : "text-slate-400"
              )}
            >
              <ClipboardCheck size={22} />
              <span className="text-[10px] font-medium">Inspección</span>
            </NavLink>

            <NavLink 
              to="/profile" 
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                isActive ? "text-[#7466f0]" : "text-slate-400"
              )}
            >
              <User size={22} />
              <span className="text-[10px] font-medium">Perfil</span>
            </NavLink>
          </div>
        </nav>
      )}
      
      <style>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 0.75rem);
        }
      `}</style>
    </div>
    </div>
  );
}

