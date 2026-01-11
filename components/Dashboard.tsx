
import React from 'react';
import { MessageCircle, BrainCircuit, Star, BookOpen, User } from 'lucide-react';
import { AppView } from '../types';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FDFCF0]">
      {/* Top Header */}
      <header className="bg-yellow-400 p-6 rounded-b-[3rem] shadow-lg flex justify-between items-center text-yellow-900">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-3xl shadow-inner">👨‍🔬</div>
          <div>
            <h1 className="text-2xl font-black font-fredoka leading-none">Hi Scientist!</h1>
            <span className="text-sm font-bold opacity-75">Ghana JHS Science Hero</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-full font-black">
          <Star className="w-5 h-5 fill-yellow-600 text-yellow-600" />
          <span>Level 4</span>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Welcome Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-2 border-yellow-100 flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center text-6xl">🌍</div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-gray-800 mb-2">What shall we learn today?</h2>
            <p className="text-gray-500 font-medium mb-4">The world is full of mysteries waiting for you to solve them!</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black">Physics ⚡️</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black">Biology 🌿</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-black">Chemistry 🧪</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => onNavigate('chat')}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-b-8 border-yellow-400 group text-left"
          >
            <div className="bg-yellow-100 w-16 h-16 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-800 mb-2">Chat with Kofi</h3>
            <p className="text-gray-500 font-bold">Ask anything! Kofi knows all the science secrets.</p>
          </button>

          <button 
            onClick={() => onNavigate('quiz')}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-b-8 border-green-400 group text-left"
          >
            <div className="bg-green-100 w-16 h-16 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-800 mb-2">Power Quiz</h3>
            <p className="text-gray-500 font-bold">Test your knowledge and earn super-scientist points!</p>
          </button>
        </div>

        {/* Quick Tips */}
        <div className="bg-blue-500 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Quick Fact!
            </h3>
            <p className="font-medium text-lg leading-relaxed">
              Did you know? The Akosombo Dam produces electricity using the power of falling water from the Volta River. This is called Hydroelectric Power! ⚡️💧
            </p>
          </div>
          <div className="absolute top-[-20px] right-[-20px] text-9xl opacity-10">💡</div>
        </div>
      </main>

      {/* Bottom Nav Mockup */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around items-center border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] md:hidden">
        <button className="text-yellow-500 flex flex-col items-center">
          <Star className="w-6 h-6 fill-current" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
