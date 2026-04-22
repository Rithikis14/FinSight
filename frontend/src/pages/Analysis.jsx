import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

const Analysis = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I've analyzed your portfolio. Would you like to know about your sector concentration or risk profile?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput("");
    // Backend call to Ollama will be added here later
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      <header className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-full">
          <Bot className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="font-bold">WealthAI Analyst</h3>
          <p className="text-xs text-green-500 font-medium">● Local Ollama Active</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              m.role === 'user' 
              ? 'bg-primary text-white rounded-tr-none' 
              : 'bg-slate-100 dark:bg-slate-900 rounded-tl-none'
            }`}>
              <p className="text-sm">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your investments..."
            className="w-full pl-6 pr-14 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 ring-primary outline-none transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-3 top-3 p-2 bg-primary text-white rounded-xl hover:opacity-90"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;