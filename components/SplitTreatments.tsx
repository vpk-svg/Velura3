'use client';

import { motion } from 'motion/react';
import { Sparkles, Zap } from 'lucide-react';

export default function SplitTreatments() {
    return (
        <section className="relative w-full overflow-hidden bg-background-light">
            <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row min-h-[600px]">

                {/* Botox - Left Side */}
                <div id="botox" className="flex-1 relative flex flex-col justify-center p-12 md:p-24 border-b md:border-b-0 md:border-r border-primary/10 group cursor-none">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="mb-10 w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <Zap size={40} />
                        </div>
                        <h3 className="font-display text-5xl md:text-7xl text-secondary mb-8">
                            Bespoke <br />
                            <span className="text-primary italic">Botox</span>
                        </h3>
                        <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl leading-relaxed max-w-lg mb-12">
                            Our clinicians specialize in "Baby Botox" and natural brow lifts, ensuring you look refreshed and youthful while maintaining full natural expression.
                        </p>
                        <a href="#booking" className="inline-flex items-center text-primary font-label text-sm tracking-widest uppercase font-bold group-hover:gap-6 transition-all">
                            Secure Appointment <span className="ml-4">→</span>
                        </a>
                    </motion.div>
                    {/* Subtle background number/deco */}
                    <div className="absolute top-10 right-10 text-[10rem] font-display text-primary/5 select-none transition-opacity group-hover:opacity-20">01</div>
                </div>

                {/* Fillers - Right Side */}
                <div id="fillers" className="flex-1 relative flex flex-col justify-center p-12 md:p-24 group cursor-none">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="mb-10 w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <Sparkles size={40} />
                        </div>
                        <h3 className="font-display text-5xl md:text-7xl text-secondary mb-8">
                            Dermal <br />
                            <span className="text-primary italic">Fillers</span>
                        </h3>
                        <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl leading-relaxed max-w-lg mb-12">
                            From chin augmentation to subtle liplustre, we use ultra-premium hyaluronic fillers to sculpt and restore volume with medical artistry.
                        </p>
                        <a href="#booking" className="inline-flex items-center text-primary font-label text-sm tracking-widest uppercase font-bold group-hover:gap-6 transition-all">
                            Discover Volume <span className="ml-4">→</span>
                        </a>
                    </motion.div>
                    {/* Subtle background number/deco */}
                    <div className="absolute top-10 right-10 text-[10rem] font-display text-primary/5 select-none transition-opacity group-hover:opacity-20">02</div>
                </div>

            </div>
        </section>
    );
}
