'use client';

import { motion } from 'motion/react';
import { MessageSquare, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
    return (
        <>
            {/* Floating Chatbot Button (Bottom Left) */}
            <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 left-6 z-floating w-14 h-14 bg-secondary text-primary rounded-full flex items-center justify-center shadow-soft-lg border border-primary/20"
                aria-label="Open Chat"
            >
                <MessageSquare size={24} />
            </motion.button>

            {/* Floating WhatsApp Button (Bottom Right) */}
            <motion.a
                href="https://wa.me/something"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 z-floating w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-soft-lg"
                aria-label="Contact on WhatsApp"
            >
                <MessageCircle size={30} fill="currentColor" className="text-white" />
            </motion.a>
        </>
    );
}
