
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RefreshCw, Loader2 } from 'lucide-react';
import { generateQuiz } from '../services/geminiService';
import { QuizQuestion, QuizState } from '../types';

interface QuizProps {
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onBack }) => {
  const [topic, setTopic] = useState('Plants and Animals in Ghana');
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = async (selectedTopic: string) => {
    setLoading(true);
    const questions = await generateQuiz(selectedTopic);
    setQuizState({
      questions,
      currentIndex: 0,
      score: 0,
      isFinished: false,
    });
    setLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!quizState) return;

    const isCorrect = selectedAnswer === quizState.questions[quizState.currentIndex].correctIndex;
    const isLast = quizState.currentIndex === quizState.questions.length - 1;

    setQuizState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        score: isCorrect ? prev.score + 1 : prev.score,
        isFinished: isLast,
      };
    });
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <Loader2 className="w-16 h-16 animate-spin text-green-500 mb-4" />
        <h2 className="text-2xl font-black text-gray-800">Setting up your Science Lab...</h2>
        <p className="text-gray-500">Generating the most awesome questions for you! ⚡️</p>
      </div>
    );
  }

  if (!quizState) {
    return (
      <div className="min-h-screen bg-[#FDFCF0] p-6">
        <button onClick={onBack} className="mb-8 p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft className="w-6 h-6 text-green-600" />
        </button>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-black text-green-800 mb-2">Quiz Time! 📝</h1>
          <p className="text-gray-600 mb-8 font-bold">Pick a topic to start your revision challenge!</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Nature in Ghana', emoji: '🌳' },
              { name: 'The Human Body', emoji: '🦴' },
              { name: 'Water & Lake Volta', emoji: '💧' },
              { name: 'Electricity & Light', emoji: '💡' },
              { name: 'Agriculture & Crops', emoji: '🍫' },
              { name: 'Floating & Sinking', emoji: '🛶' },
            ].map((t) => (
              <button
                key={t.name}
                onClick={() => startQuiz(t.name)}
                className="bg-white p-6 rounded-3xl shadow-sm border-2 border-transparent hover:border-green-400 hover:scale-105 transition-all text-left flex items-center gap-4"
              >
                <span className="text-3xl">{t.emoji}</span>
                <span className="font-black text-gray-700">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (quizState.isFinished) {
    const percentage = (quizState.score / quizState.questions.length) * 100;
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-50 to-white">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md w-full border-4 border-green-400">
          <Trophy className={`w-24 h-24 mx-auto mb-6 ${percentage >= 80 ? 'text-yellow-500' : 'text-gray-400'}`} />
          <h2 className="text-4xl font-black text-gray-800 mb-2">Awesome!</h2>
          <p className="text-xl text-gray-600 font-bold mb-6">You got {quizState.score} out of {quizState.questions.length} correct!</p>
          
          <div className="w-full bg-gray-100 rounded-full h-4 mb-8 overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-1000" 
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setQuizState(null)}
              className="bg-green-500 text-white py-4 rounded-2xl font-black text-xl shadow-lg hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-6 h-6" /> Try Another!
            </button>
            <button 
              onClick={onBack}
              className="text-gray-500 font-bold hover:text-gray-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizState.questions[quizState.currentIndex];

  return (
    <div className="min-h-screen bg-[#FDFCF0] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setQuizState(null)} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-6 h-6 text-green-600" />
          </button>
          <div className="flex-1 mx-4">
            <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
              <div 
                className="bg-green-400 h-full transition-all duration-300"
                style={{ width: `${((quizState.currentIndex + 1) / quizState.questions.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="font-black text-green-700 whitespace-nowrap">
            {quizState.currentIndex + 1} / {quizState.questions.length}
          </span>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border-t-8 border-green-400">
          <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-8 leading-tight">
            {currentQ.question}
          </h3>

          <div className="space-y-4">
            {currentQ.options.map((option, idx) => {
              const isCorrect = idx === currentQ.correctIndex;
              const isSelected = idx === selectedAnswer;
              
              let buttonClass = "w-full p-5 rounded-2xl text-left font-bold text-lg transition-all flex items-center justify-between ";
              if (selectedAnswer === null) {
                buttonClass += "bg-gray-50 text-gray-700 hover:bg-green-50 hover:scale-[1.02] border-2 border-transparent hover:border-green-200";
              } else if (isCorrect) {
                buttonClass += "bg-green-500 text-white border-2 border-green-500 shadow-lg";
              } else if (isSelected) {
                buttonClass += "bg-red-500 text-white border-2 border-red-500 shadow-lg";
              } else {
                buttonClass += "bg-gray-50 text-gray-400 opacity-50";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  <span>{option}</span>
                  {selectedAnswer !== null && isCorrect && <CheckCircle className="w-6 h-6" />}
                  {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="w-6 h-6" />}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border-2 border-yellow-100 animate-in slide-in-from-bottom">
              <h4 className="font-black text-yellow-800 mb-2 flex items-center gap-2">
                💡 Kofi's Explainer
              </h4>
              <p className="text-gray-700 font-medium italic">
                {currentQ.explanation}
              </p>
              <button 
                onClick={nextQuestion}
                className="mt-6 w-full bg-gray-800 text-white py-4 rounded-xl font-black text-lg hover:bg-black transition-colors"
              >
                Next Question ➔
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
