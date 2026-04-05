import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  ChevronLeft, 
  Send, 
  User, 
  Bot, 
  Paperclip, 
  Image as ImageIcon,
  MoreVertical,
  Zap,
  HelpCircle,
  Wrench,
  FileSignature
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: '1', text: '¡Hola Juan! Soy tu asistente operativo IA. ¿En qué puedo ayudarte hoy?', sender: 'bot', timestamp: '09:00' },
];

const suggestedQuestions = [
  { label: 'Torque de tuercas', icon: <Wrench size={14} /> },
  { label: 'Problema con firma POD', icon: <FileSignature size={14} /> },
  { label: 'Duda técnica unidad', icon: <HelpCircle size={14} /> },
];

export default function SupportChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      let botResponse = "";
      if (text.toLowerCase().includes('torque')) {
        botResponse = "El torque recomendado para las tuercas de las ruedas de tu Volvo FH16 es de 600 Nm. Asegúrate de apretarlas en patrón de estrella.";
      } else if (text.toLowerCase().includes('firma') || text.toLowerCase().includes('pod')) {
        botResponse = "Si el cliente se niega a firmar el POD digital, toma una fotografía de la mercancía entregada en su almacén y añade una nota en la sección de 'Incidencias' explicando la situación. El administrador recibirá la alerta de inmediato.";
      } else {
        botResponse = "Entiendo tu consulta. Estoy procesando la información técnica de tu unidad para darte la mejor respuesta. ¿Podrías darme más detalles?";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)] bg-[#f6f6f8] rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200">
      {/* Header */}
      <header className="bg-white px-4 py-3 lg:py-2 flex items-center justify-between sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors lg:hidden"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-[#7466f0] size-8 lg:size-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#7466f0]/20">
              <Bot size={20} />
            </div>
            <div>
              <h1 className="text-sm lg:text-base font-bold text-slate-900">Asistente Operativo</h1>
              <div className="flex items-center gap-1">
                <div className="size-1.5 rounded-full bg-green-500"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">En línea</span>
              </div>
            </div>
          </div>
        </div>
        <button className="p-2 text-slate-400">
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex items-end gap-2 max-w-[85%]",
              msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "size-8 rounded-lg flex items-center justify-center flex-shrink-0",
              msg.sender === 'user' ? "bg-slate-200 text-slate-600" : "bg-[#7466f0] text-white"
            )}>
              {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className="flex flex-col gap-1">
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.sender === 'user' 
                  ? "bg-white text-slate-800 rounded-br-none border border-slate-100" 
                  : "bg-[#7466f0] text-white rounded-bl-none"
              )}>
                {msg.text}
              </div>
              <span className={cn(
                "text-[9px] font-bold text-slate-400 uppercase px-1",
                msg.sender === 'user' ? "text-right" : "text-left"
              )}>
                {msg.timestamp}
              </span>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400">
            <div className="bg-[#7466f0] size-8 rounded-lg flex items-center justify-center text-white">
              <Bot size={16} />
            </div>
            <div className="flex gap-1">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="size-1.5 bg-slate-300 rounded-full" />
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="size-1.5 bg-slate-300 rounded-full" />
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="size-1.5 bg-slate-300 rounded-full" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-100 p-4 lg:p-6 space-y-4">
        {/* Suggested Questions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {suggestedQuestions.map((q, idx) => (
            <button 
              key={idx}
              onClick={() => handleSend(q.label)}
              className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl whitespace-nowrap text-[10px] lg:text-xs font-bold text-slate-600 hover:bg-[#7466f0]/10 hover:text-[#7466f0] transition-colors"
            >
              {q.icon}
              {q.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu duda técnica..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#7466f0] transition-colors"
            />
          </div>
          <button 
            onClick={() => handleSend()}
            className={cn(
              "p-3 rounded-2xl transition-all shadow-lg",
              input.trim() ? "bg-[#7466f0] text-white shadow-[#7466f0]/20" : "bg-slate-100 text-slate-400 shadow-none"
            )}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
