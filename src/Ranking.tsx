import React from 'react';
import { 
  Trophy, 
  Award, 
  Medal, 
  ChevronLeft, 
  Star, 
  TrendingUp, 
  TrendingDown,
  UserCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

const leaderboard = [
  { rank: 1, name: 'Carlos Ruiz', score: 98, trend: 'up', avatar: 'CR' },
  { rank: 2, name: 'Elena Gomez', score: 97, trend: 'up', avatar: 'EG' },
  { rank: 3, name: 'Mario Lopez', score: 96, trend: 'down', avatar: 'ML' },
  { rank: 4, name: 'Juan Conductor', score: 94, trend: 'up', avatar: 'JC', isMe: true },
  { rank: 5, name: 'Sofia Perez', score: 92, trend: 'up', avatar: 'SP' },
  { rank: 6, name: 'Luis Torres', score: 90, trend: 'down', avatar: 'LT' },
];

const badges = [
  { icon: <Star size={24} />, label: 'Eco-Driver', color: 'bg-green-100 text-green-600', earned: true },
  { icon: <Award size={24} />, label: 'Puntualidad', color: 'bg-amber-100 text-amber-600', earned: true },
  { icon: <Medal size={24} />, label: 'Seguridad', color: 'bg-blue-100 text-blue-600', earned: true },
  { icon: <Trophy size={24} />, label: 'Maestro Ruta', color: 'bg-purple-100 text-purple-600', earned: false },
];

export default function Ranking() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f8] pb-10">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-10 border-b border-slate-100">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Ranking y Logros</h1>
      </header>

      <div className="p-4 space-y-6">
        
        {/* My Current Rank Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#7466f0] p-6 rounded-3xl shadow-xl shadow-[#7466f0]/30 text-white relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 opacity-10">
            <Trophy size={160} />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="size-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-black">
              JC
            </div>
            <div>
              <h2 className="text-xl font-bold">Juan Conductor</h2>
              <p className="text-sm opacity-80">Top 5 de la empresa</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 p-3 rounded-2xl text-center">
              <p className="text-[10px] font-bold opacity-60 uppercase">Puesto</p>
              <p className="text-2xl font-black">#4</p>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl text-center">
              <p className="text-[10px] font-bold opacity-60 uppercase">Score</p>
              <p className="text-2xl font-black">94</p>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl text-center">
              <p className="text-[10px] font-bold opacity-60 uppercase">Medallas</p>
              <p className="text-2xl font-black">12</p>
            </div>
          </div>
        </motion.div>

        {/* Badges Section */}
        <section>
          <h3 className="text-base font-bold text-slate-900 mb-4 px-1">Mis Insignias</h3>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "size-14 rounded-2xl flex items-center justify-center transition-all",
                  badge.earned ? badge.color : "bg-slate-100 text-slate-300 grayscale"
                )}>
                  {badge.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-500 text-center">{badge.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-base font-bold text-slate-900">Tabla de Líderes</h3>
            <span className="text-xs font-bold text-[#7466f0]">Semanal</span>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            {leaderboard.map((user, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex items-center gap-4 p-4 transition-colors",
                  user.isMe ? "bg-[#7466f0]/5" : "border-b border-slate-50 last:border-0"
                )}
              >
                <div className={cn(
                  "size-8 rounded-full flex items-center justify-center text-xs font-black",
                  user.rank === 1 ? "bg-amber-100 text-amber-600" :
                  user.rank === 2 ? "bg-slate-100 text-slate-500" :
                  user.rank === 3 ? "bg-amber-50 text-amber-700" :
                  "text-slate-400"
                )}>
                  {user.rank}
                </div>
                <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className={cn(
                    "text-sm font-bold",
                    user.isMe ? "text-[#7466f0]" : "text-slate-900"
                  )}>
                    {user.name} {user.isMe && "(Tú)"}
                  </p>
                  <div className="flex items-center gap-1">
                    {user.trend === 'up' ? (
                      <TrendingUp size={10} className="text-green-500" />
                    ) : (
                      <TrendingDown size={10} className="text-red-500" />
                    )}
                    <span className="text-[10px] text-slate-400 font-medium">Score: {user.score}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{user.score}</p>
                  <p className="text-[10px] font-bold text-slate-400">pts</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
