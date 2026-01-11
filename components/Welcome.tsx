
import React from 'react';
import { Rocket, Sparkles, BookOpen } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-white text-center">
      <div className="animate-bounce mb-8">
        <div className="bg-white p-6 rounded-full shadow-2xl inline-block">
          <Rocket className="w-16 h-16 text-orange-500" />
        </div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black font-fredoka mb-4 drop-shadow-lg">
        ScienceHero Ghana! 🇬🇭
      </h1>
      
      <p className="text-xl md:text-2xl font-bold mb-8 max-w-xl opacity-90">
        Ready to explore the wonders of the world? Join Kofi the Scientist on an epic journey to become a master of Science!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30">
          <Sparkles className="w-8 h-8 mx-auto mb-2" />
          <h3 className="font-bold">Cool Experiments</h3>
          <p className="text-sm">Learn how things work!</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30">
          <BookOpen className="w-8 h-8 mx-auto mb-2" />
          <h3 className="font-bold">Fun Lessons</h3>
          <p className="text-sm">No boring books here!</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30">
          <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center font-bold text-xl">💡</div>
          <h3 className="font-bold">Quick Quizzes</h3>
          <p className="text-sm">Test your super powers!</p>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="bg-white text-orange-600 px-12 py-4 rounded-full text-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95 flex items-center gap-3"
      >
        Let's Start! 🚀
      </button>
      
      <p className="mt-8 text-sm font-medium opacity-80">
        Made with ❤️ for the future scientists of Ghana
      </p>
    </div>
  );
};

export default Welcome;
