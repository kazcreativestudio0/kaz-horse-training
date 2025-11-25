import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'こんにちは！カズホーストレーニングのAIコンシェルジュです。体験乗馬の料金や服装、アクセスについて何でも聞いてくださいね。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] max-w-[90vw] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col animate-fade-in-up h-[500px] border border-gray-100">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">AI Concierge</h3>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 no-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-l-lg rounded-tr-lg' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-r-lg rounded-tl-lg shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-r-lg rounded-tl-lg shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ご質問をどうぞ..."
              className="flex-1 text-sm bg-gray-50 border-none rounded-md px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-secondary hover:bg-red-700 disabled:opacity-50 text-white p-2 rounded-md transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 bg-secondary hover:bg-red-700 text-white rounded-full p-4 shadow-xl transition-all hover:scale-105 z-50"
      >
        <span className={`${isOpen ? 'hidden' : 'hidden md:block'} font-bold pr-2 text-sm`}>ASK AI</span>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </div>
  );
};