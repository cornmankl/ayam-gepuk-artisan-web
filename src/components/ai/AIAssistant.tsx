import React, { useEffect, useState, useRef } from 'react';
import { XIcon, SendIcon, BotIcon, UserIcon, SparklesIcon } from 'lucide-react';
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Ayam Gepuk Artisan assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let response =
        "I'm sorry, I didn't understand that. Can you please try again?";
      // Simple pattern matching for demo purposes
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('menu') || lowerMessage.includes('food')) {
        response =
          'Our signature dishes include Ayam Krispy and Ayam Klasik. Would you like to see our full menu with authentic Indonesian flavors?';
      } else if (
        lowerMessage.includes('price') ||
        lowerMessage.includes('cost')
      ) {
        response =
          'Our menu prices range from RM2.00 for drinks and sides to RM12.99 for our premium combo meals. Each dish is prepared with authentic Indonesian spices and ingredients.';
      } else if (
        lowerMessage.includes('location') ||
        lowerMessage.includes('address')
      ) {
        response =
          "We're conveniently located in Seremban 2, Negeri Sembilan, Malaysia. Our restaurant offers both dine-in and takeaway options in a cozy atmosphere.";
      } else if (
        lowerMessage.includes('order') ||
        lowerMessage.includes('delivery')
      ) {
        response =
          'You can place your order through our website and choose pickup or delivery options during checkout. We deliver within a 10km radius of our location.';
      } else if (
        lowerMessage.includes('hi') ||
        lowerMessage.includes('hello')
      ) {
        response =
          "Hello! I'm your personal Ayam Gepuk Artisan assistant. How can I help with your order today? Would you like to see our popular menu items?";
      } else if (
        lowerMessage.includes('spicy') ||
        lowerMessage.includes('sambal')
      ) {
        response =
          'Our sambal is made fresh daily using traditional Indonesian recipes. You can request your preferred spice level from mild to extra hot when ordering.';
      } else if (
        lowerMessage.includes('recommend') ||
        lowerMessage.includes('popular')
      ) {
        response =
          "I'd recommend trying our signature Ayam Krispy Set A or Ayam Klasik Set A. Both come with rice, our famous sambal, and fresh vegetables. They're our most popular dishes!";
      }
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  return (
    <>
      {/* Chat button */}
      <button
        className={`fixed bottom-6 right-6 ${isOpen ? 'bg-red-700' : 'bg-gradient-to-r from-red-600 to-red-700'} text-white rounded-full shadow-lg z-50 transition-all duration-300 hover:shadow-xl ${isOpen ? 'w-12 h-12' : 'w-auto px-4 py-3'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with AI Assistant"
      >
        {isOpen ? (
          <XIcon size={24} className="mx-auto" />
        ) : (
          <div className="flex items-center">
            <SparklesIcon size={20} className="mr-2" />
            <span className="font-medium">AI Assistant</span>
          </div>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 w-[90%] sm:w-[400px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[600px] animate-slideUp"
          style={{
            boxShadow:
              '0 10px 25px -5px rgba(220, 38, 38, 0.2), 0 10px 10px -5px rgba(220, 38, 38, 0.1)',
          }}
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-5 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3 shadow-md">
                <BotIcon size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  Ayam Gepuk Assistant
                </h3>
                <p className="text-white/80 text-sm">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close chat"
            >
              <XIcon size={20} />
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto bg-gray-50 min-h-[350px] max-h-[400px]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-4 ${msg.sender === 'user' ? 'text-right' : ''}`}
              >
                <div className="flex items-end gap-2 mb-1 justify-start">
                  {msg.sender === 'bot' && (
                    <div className="bg-red-100 rounded-full p-1 flex-shrink-0">
                      <BotIcon size={16} className="text-red-600" />
                    </div>
                  )}
                  <div
                    className={`inline-block p-4 rounded-2xl max-w-[80%] shadow-sm ${msg.sender === 'user' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-tr-none ml-auto' : 'bg-white text-gray-800 rounded-tl-none'}`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="bg-yellow-100 rounded-full p-1 flex-shrink-0">
                      <UserIcon size={16} className="text-yellow-600" />
                    </div>
                  )}
                </div>
                <div
                  className={`text-xs text-gray-500 ${msg.sender === 'user' ? 'text-right mr-7' : 'ml-7'}`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4">
                <div className="flex items-end gap-2 mb-1">
                  <div className="bg-red-100 rounded-full p-1">
                    <BotIcon size={16} className="text-red-600" />
                  </div>
                  <div className="inline-block p-4 rounded-2xl rounded-tl-none bg-white text-gray-800 max-w-[80%] shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                        style={{
                          animationDelay: '0.2s',
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                        style={{
                          animationDelay: '0.4s',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-100 flex"
          >
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-200 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 rounded-r-xl flex items-center justify-center transition-colors"
              disabled={!message.trim() || isTyping}
            >
              <SendIcon size={20} className={isTyping ? 'opacity-50' : ''} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default AIAssistant;
