import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircleIcon,
  XIcon,
  SendIcon,
  BotIcon,
  UserIcon,
  LoaderIcon,
  RefreshCwIcon,
  HelpCircleIcon,
  ShoppingBagIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: () => void;
  color: string;
}

const AIAssistantWidget: React.FC = () => {
  const { totalPrice, totalItems } = useCart();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: 'menu',
      label: 'View Menu',
      icon: ShoppingBagIcon,
      action: () => {
        addMessage('user', 'Show me the menu');
        handleAIResponse('menu');
      },
      color: 'bg-brand-red',
    },
    {
      id: 'contact',
      label: 'Contact Info',
      icon: PhoneIcon,
      action: () => {
        addMessage('user', 'What are your contact details?');
        handleAIResponse('contact');
      },
      color: 'bg-green-500',
    },
    {
      id: 'location',
      label: 'Find Us',
      icon: MapPinIcon,
      action: () => {
        addMessage('user', 'Where are you located?');
        handleAIResponse('location');
      },
      color: 'bg-blue-500',
    },
    {
      id: 'hours',
      label: 'Opening Hours',
      icon: ClockIcon,
      action: () => {
        addMessage('user', 'What are your opening hours?');
        handleAIResponse('hours');
      },
      color: 'bg-purple-500',
    },
  ];

  const addMessage = (
    type: 'user' | 'ai',
    content: string,
    isTyping = false
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isTyping,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleAIResponse = async (query: string) => {
    setIsTyping(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    let response = '';

    if (query === 'menu') {
      response = `🍗 **Our Menu Highlights:**
      
• **Ayam Gepuk Krispy** - RM 15.90
  Crispy smashed fried chicken with spicy sambal

• **Ayam Gepuk Klasik** - RM 14.90  
  Traditional smashed fried chicken with mild spices

• **Nasi Lemak Special** - RM 12.00
  Fragrant coconut rice with traditional sides

• **Chicken Wings** - RM 15.00
  Spicy marinated chicken wings

Would you like to see our full menu or place an order?`;
    } else if (query === 'contact') {
      response = `📞 **Contact Information:**
      
**Phone:** +60-18-244-2017
**Email:** info@ayamgepukartisan.com
**WhatsApp:** [Click here to chat](https://wa.me/60182442017)

We're available for orders, inquiries, and reservations!`;
    } else if (query === 'location') {
      response = `📍 **Our Locations:**
      
**Seremban Main Branch:**
123 Jalan Seremban, Seremban, Negeri Sembilan 70000

**KL Branch:**
456 Jalan Ampang, Kuala Lumpur 50450

Both locations offer dine-in, takeaway, and delivery services!`;
    } else if (query === 'hours') {
      response = `🕒 **Opening Hours:**
      
**Monday - Sunday:** 10:00 AM - 10:00 PM

We're open every day! Perfect for lunch, dinner, or late-night cravings.`;
    } else if (query.includes('order') || query.includes('buy')) {
      response = `🛒 **Order Information:**
      
You currently have **${totalItems} items** in your cart totaling **RM ${totalPrice.toFixed(2)}**.

**Order Options:**
• **Dine-in** - Visit our restaurant
• **Takeaway** - Pick up your order
• **Delivery** - We'll bring it to you

Would you like to proceed to checkout or add more items?`;
    } else if (query.includes('price') || query.includes('cost')) {
      response = `💰 **Pricing Information:**
      
Our prices range from RM 12.00 to RM 25.00 per item.

**Popular Items:**
• Ayam Gepuk Krispy - RM 15.90
• Ayam Gepuk Klasik - RM 14.90
• Nasi Lemak Special - RM 12.00

All prices include tax. We also offer combo deals and family packages!`;
    } else if (query.includes('halal') || query.includes('halal')) {
      response = `✅ **Halal Certification:**
      
Yes! All our food is 100% halal certified. We use only halal ingredients and follow strict halal preparation methods.

Our certification is verified and we're proud to serve the Muslim community with authentic, halal Indonesian cuisine.`;
    } else {
      response = `Hello! I'm your AI assistant for Ayam Gepuk Artisan. I can help you with:

• **Menu information** and recommendations
• **Ordering** and cart management  
• **Location** and contact details
• **Opening hours** and availability
• **Special offers** and promotions
• **General questions** about our restaurant

How can I assist you today? 😊`;
    }

    setIsTyping(false);
    addMessage('ai', response);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    addMessage('user', inputValue);
    const query = inputValue.toLowerCase();
    setInputValue('');

    await handleAIResponse(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    action.action();
  };

  const clearChat = () => {
    setMessages([]);
  };

  if (isMinimized) {
    return (
      <motion.button
        className="fixed bottom-6 right-6 bg-brand-red hover:bg-red-700 text-white p-4 rounded-full shadow-brand-lg hover:shadow-brand-xl transition-all duration-300 z-50"
        onClick={() => setIsMinimized(false)}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <MessageCircleIcon size={24} />
      </motion.button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-brand-xl w-80 h-96 flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-red to-red-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <BotIcon size={20} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm">
                AI Assistant
              </h3>
              <p className="text-xs opacity-90">Online now</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-300"
              title="Clear chat"
            >
              <RefreshCwIcon size={16} />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-300"
              title="Minimize"
            >
              <XIcon size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircleIcon size={32} className="text-brand-red" />
              </div>
              <h4 className="font-heading font-semibold text-brand-black dark:text-white mb-2">
                How can I help you?
              </h4>
              <p className="text-sm text-brand-black/70 dark:text-gray-300 font-body">
                Ask me about our menu, location, or place an order!
              </p>
            </div>
          )}

          {messages.map(message => (
            <motion.div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                  <BotIcon size={16} className="text-white" />
                </div>
              )}

              <div
                className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-brand-red text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-brand-black dark:text-white'
                  }`}
                >
                  {message.isTyping ? (
                    <div className="flex items-center gap-2">
                      <LoaderIcon size={16} className="animate-spin" />
                      <span className="text-sm">AI is typing...</span>
                    </div>
                  ) : (
                    <div className="text-sm font-body whitespace-pre-line">
                      {message.content}
                    </div>
                  )}
                </div>
                <div
                  className={`text-xs text-brand-black/50 dark:text-gray-400 mt-1 ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon size={16} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className="flex gap-3 justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                <BotIcon size={16} className="text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <LoaderIcon
                    size={16}
                    className="animate-spin text-brand-red"
                  />
                  <span className="text-sm text-brand-black dark:text-white">
                    AI is typing...
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length === 0 && (
          <div className="px-4 pb-2">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map(action => (
                <motion.button
                  key={action.id}
                  onClick={() => handleQuickAction(action)}
                  className={`${action.color} text-white px-3 py-2 rounded-xl text-xs font-heading font-semibold flex items-center gap-2 transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <action.icon size={14} />
                  {action.label}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white text-sm"
            />
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-brand-red hover:bg-red-700 disabled:bg-gray-400 text-white p-2 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SendIcon size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIAssistantWidget;
