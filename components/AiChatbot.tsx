'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useLocale } from 'next-intl';
import { EASE_PREMIUM } from '@/lib/motion';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const RESPONSES_NL: Record<string, string> = {
  botox: 'Botox behandelingen starten vanaf €90 per zone. U kunt online zones selecteren en direct een afspraak inplannen op vrijdag of zaterdag.',
  fillers: 'Wij bieden premium hyaluronzuur fillers aan voor lippen, kin, kaaklijn en meer. Bekijk onze fillers pagina voor prijzen per zone.',
  prijs: 'Onze prijzen variëren per behandeling. Botox vanaf €90/zone, fillers op aanvraag, afvaltrajecten vanaf €179/maand.',
  afspraak: 'U kunt een afspraak inplannen via onze website of bel ons op het nummer op de contactpagina.',
  weightloss: 'Ons afvalprogramma werkt met GLP-1 medicatie zoals Ozempic, Mounjaro en Wegovy. Start met onze gratis online intake.',
  shape: 'Shape behandelingen omvatten Butt Contour, ooglidcorrectie en vet onder de kin verwijderen.',
  openingstijden: 'Behandelingen vinden plaats op vrijdag en zaterdag. Consulten zijn ook doordeweeks mogelijk.',
  hallo: 'Hallo! Welkom bij FAB Clinic. Hoe kan ik u helpen? Stel gerust uw vraag over onze behandelingen.',
  default: 'Bedankt voor uw bericht! Voor specifieke vragen kunt u ons bereiken via de contactpagina of WhatsApp. Wij reageren zo snel mogelijk.',
};

const RESPONSES_EN: Record<string, string> = {
  botox: 'Botox treatments start from €90 per zone. You can select zones online and book an appointment on Friday or Saturday.',
  fillers: 'We offer premium hyaluronic acid fillers for lips, chin, jawline and more. See our fillers page for pricing per zone.',
  price: 'Our prices vary by treatment. Botox from €90/zone, fillers on request, weight loss programs from €179/month.',
  appointment: 'You can book an appointment via our website or call us at the number on the contact page.',
  weightloss: 'Our weight loss program uses GLP-1 medication such as Ozempic, Mounjaro and Wegovy. Start with our free online intake.',
  weight: 'Our weight loss program uses GLP-1 medication such as Ozempic, Mounjaro and Wegovy. Start with our free online intake.',
  shape: 'Shape treatments include Butt Contour, eyelid correction and double chin removal.',
  hours: 'Treatments take place on Fridays and Saturdays. Consultations are also available on weekdays.',
  hello: 'Hello! Welcome to FAB Clinic. How can I help you? Feel free to ask about our treatments, pricing or availability.',
  hi: 'Hello! Welcome to FAB Clinic. How can I help you? Feel free to ask about our treatments.',
  default: 'Thank you for your message! For specific questions, please reach us via the contact page or WhatsApp. We will respond as soon as possible.',
};

function getLocalResponse(message: string, locale: string): string {
  const lower = message.toLowerCase();
  const responses = locale === 'en' ? RESPONSES_EN : RESPONSES_NL;
  for (const [keyword, response] of Object.entries(responses)) {
    if (keyword !== 'default' && lower.includes(keyword)) {
      return response;
    }
  }
  return responses.default;
}

export default function AiChatbot() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: locale === 'en'
        ? 'Welcome to FAB Clinic! How can I help you? Ask about our treatments, pricing or availability.'
        : 'Welkom bij FAB Clinic! Hoe kan ik u helpen? Vraag gerust over onze behandelingen, prijzen of beschikbaarheid.',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));

    const response = getLocalResponse(trimmed, locale);
    setMessages((prev) => [...prev, { role: 'assistant', content: response, timestamp: Date.now() }]);
    setIsTyping(false);
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-floating w-14 h-14 bg-secondary text-primary rounded-full flex items-center justify-center shadow-soft-lg border border-primary/20"
            aria-label="Open chat"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE_PREMIUM }}
            className="fixed bottom-6 left-6 z-floating w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-white rounded-xl shadow-panel ring-1 ring-secondary/[0.06] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-secondary text-background-light shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold">{locale === 'en' ? 'Quick Help' : 'Snel Antwoord'}</p>
                  <p className="font-sans text-[10px] text-background-light/50 uppercase tracking-widest">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label={locale === 'en' ? 'Close chat' : 'Sluit chat'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-xl font-sans text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-secondary/[0.04] text-secondary rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary/[0.04] px-4 py-3 rounded-xl rounded-bl-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary/20 animate-subtle-pulse" />
                      <span className="w-2 h-2 rounded-full bg-secondary/20 animate-subtle-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 rounded-full bg-secondary/20 animate-subtle-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 px-4 py-3 border-t border-secondary/[0.06] bg-surface">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={locale === 'en' ? 'Ask a question...' : 'Stel uw vraag...'}
                  className="flex-grow px-4 py-2.5 rounded-pill border border-secondary/[0.08] bg-white font-sans text-sm text-secondary outline-none placeholder:text-secondary/30 focus:border-primary/30 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity hover:bg-primary-dark"
                  aria-label={locale === 'en' ? 'Send message' : 'Verstuur bericht'}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
