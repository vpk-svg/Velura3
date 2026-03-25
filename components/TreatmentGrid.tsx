'use client';

import { motion } from 'motion/react';
import { Sparkles, Zap, Heart, Camera } from 'lucide-react';

const treatments = [
    {
        id: 'fillers',
        title: 'Fillers',
        desc: 'Restore volume and enhance contours with our premium range of dermal fillers. Subtle, natural, and lasting results.',
        icon: <Sparkles size={32} />,
        href: '#fillers'
    },
    {
        id: 'botox',
        title: 'Botox',
        desc: 'Bespoke wrinkle-relaxing treatments to smooth fine lines and maintain your youthful expression with medical precision.',
        icon: <Zap size={32} />,
        href: '#botox'
    },
    {
        id: 'lifestyle',
        title: 'Lifestyle',
        desc: 'Holistic wellness and anti-aging advice from our specialists. We help you maintain your radiance from the inside out.',
        icon: <Heart size={32} />,
        href: '#lifestyle'
    }
];

export default function TreatmentGrid() {
    return (
        <section id="treatments" className="py-32 bg-background-light">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-label text-primary text-xs tracking-[0.4em] uppercase mb-4 block font-bold"
                    >
                        Specialized Care
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-5xl md:text-7xl text-secondary tracking-tight"
                    >
                        Our Core <span className="italic font-light text-primary">Treatments</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {treatments.map((item, idx) => (
                        <motion.a
                            key={item.id}
                            href={item.href}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="group relative bg-white border border-primary/10 p-12 rounded-2xl hover:border-primary transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
                        >
                            {/* Icon Container */}
                            <div className="mb-8 w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                                {item.icon}
                            </div>

                            <h3 className="font-display text-3xl text-secondary mb-4 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>

                            <p className="font-sans font-light text-secondary/70 text-lg leading-relaxed mb-6 group-hover:text-secondary transition-colors">
                                {item.desc}
                            </p>

                            <div className="flex items-center text-primary font-label text-xs tracking-widest uppercase font-bold group-hover:translate-x-2 transition-transform">
                                Read More <span className="ml-2">→</span>
                            </div>

                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
