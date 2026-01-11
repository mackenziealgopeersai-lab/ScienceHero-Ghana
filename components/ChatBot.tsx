
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, ArrowLeft } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatBotProps {
  onBack: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Akwaaba! I'm Kofi! 🧪 Ask me anything about science. For example, why is the sun so hot in Accra? or how do fish breathe in the Volta Lake?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await getChatResponse(history, userMessage);
    setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDFCF0]">
      <div className="bg-yellow-400 p-4 shadow-md flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors">
          <ArrowLeft className="w-6 h-6 text-yellow-800" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl shadow-inner">👨‍🔬</div>
          <div>
            <h2 className="font-black text-yellow-900 leading-none">Kofi the Scientist</h2>
            <span className="text-xs text-yellow-800 font-bold opacity-70">Online & ready to help!</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none border border-yellow-100'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-yellow-100 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-yellow-600" />
              <span className="text-sm font-bold text-gray-500 italic">Kofi is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-yellow-100">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 p-3 border-2 border-yellow-200 rounded-full focus:outline-none focus:border-yellow-400 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 p-3 rounded-full text-yellow-900 shadow-md transition-colors"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
