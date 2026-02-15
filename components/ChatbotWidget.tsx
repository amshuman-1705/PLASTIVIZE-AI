
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatBottleIcon, CloseIcon } from './icons/FeatureIcons';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const suggestionPrompts = [
    "How do I recycle PET plastic?",
    "What are some alternatives to plastic bags?",
    "Tell me a fun fact about recycling.",
];

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hi there! Ask me anything about plastic recycling or sustainability.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const aiRef = useRef<GoogleGenAI | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const conversationHistoryRef = useRef<string>('');

  useEffect(() => {
    if (!isOpen) return;

    const initChat = () => {
      try {
        if (aiRef.current) return;
        if (!import.meta.env.VITE_GEMINI_API_KEY) throw new Error("VITE_GEMINI_API_KEY not set");

        aiRef.current = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I am unable to connect right now.'}]);
      }
    };
    initChat();
  }, [isOpen]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    if (messageText === input) setInput('');
    
    setIsLoading(true);

    try {
        if (!aiRef.current) throw new Error("Chat not initialized.");
        
        const systemPrompt = `You are a friendly and helpful assistant for PLASTIVIZE, an app focused on plastic recycling and sustainability. Provide factual, neutral, and encouraging information. Keep your answers concise (2-3 sentences max) and easy to understand.`;

        const conversationContext = conversationHistoryRef.current 
          ? `\n\nPrevious conversation:\n${conversationHistoryRef.current}\n\nUser: ${messageText}`
          : `User: ${messageText}`;

        const fullPrompt = systemPrompt + conversationContext;

        const response = await aiRef.current.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: {
            parts: [{ text: fullPrompt }],
          },
        });

        const botResponseText = response.text || 'I could not generate a response. Please try again.';
        
        conversationHistoryRef.current += `User: ${messageText}\nAssistant: ${botResponseText}\n\n`;
        
        const botMessage: Message = { sender: 'bot', text: botResponseText };
        setMessages(prev => [...prev, botMessage]);
    } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prev => [...prev, { sender: 'bot', text: 'I encountered an error. Please try again.'}]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();
      sendMessage(input);
  };
  
  const ChatBubble: React.FC<{message: Message}> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} chat-bubble`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl ${isUser ? 'bg-brand-green text-white rounded-br-lg' : 'bg-brand-gray text-brand-text rounded-bl-lg'}`}>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
            </div>
        </div>
    );
  };
  
  const TypingIndicator = () => (
    <div className="flex justify-start chat-bubble">
      <div className="px-4 py-2 rounded-xl bg-brand-gray text-brand-text rounded-bl-lg flex items-center space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-4">
        {isOpen && (
            <div className="w-80 sm:w-96 h-[70vh] max-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col animate-chat-window-pop-in">
                <div className="relative flex-shrink-0 p-4 bg-brand-green text-white rounded-t-2xl flex justify-between items-center overflow-hidden">
                    <div className="absolute -bottom-8 -left-4 text-white/10">
                        <ChatBottleIcon className="w-24 h-24 transform rotate-12" />
                    </div>
                    <div className="z-10">
                        <h3 className="font-bold text-lg">Eco Chatbot</h3>
                        <p className="text-xs opacity-90">AI Sustainability Assistant</p>
                    </div>
                </div>

                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>

                <div className="flex-shrink-0 p-3 border-t border-gray-200">
                    {messages.length <= 1 && !isLoading && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {suggestionPrompts.map(prompt => (
                                <button key={prompt} onClick={() => sendMessage(prompt)} className="px-2 py-1 bg-brand-gray text-brand-text-light text-xs rounded-full hover:bg-gray-300 transition-colors">
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}
                    <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                        <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green-light text-sm"
                        disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !input.trim()} className="bg-brand-green text-white w-10 h-10 flex-shrink-0 rounded-full hover:bg-brand-green-dark disabled:bg-gray-400 transition-colors flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        )}

        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-16 h-16 bg-gradient-to-br from-brand-green to-teal-600 text-white rounded-full shadow-lg flex items-center justify-center hover:from-teal-600 hover:to-brand-green-dark transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-brand-green-light animate-widget-slide-in relative" 
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
            <div className={`absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
                <ChatBottleIcon className="w-9 h-9" />
            </div>
            <div className={`absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
                <CloseIcon className="w-8 h-8" />
            </div>
        </button>
    </div>
  );
};

export default ChatbotWidget;
