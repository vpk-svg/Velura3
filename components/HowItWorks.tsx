'use client';

import { motion } from 'motion/react';
import { FileSearch, ClipboardCheck, Package } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'Beantwoord een aantal gezondheidsvragen',
      desc: 'Vertel ons kort iets over je gezondheid en klachten.',
      icon: <FileSearch className="w-10 h-10 text-brand-teal-deep opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out" strokeWidth={1.5} />,
    },
    {
      num: '2',
      title: 'Onze arts beoordeelt je aanvraag',
      desc: 'Je ontvangt binnen 1 werkdag een persoonlijk medisch advies.',
      icon: <ClipboardCheck className="w-10 h-10 text-brand-teal-deep opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out" strokeWidth={1.5} />,
    },
    {
      num: '3',
      title: 'Je behandeling wordt bezorgd',
      desc: 'Snel en discreet geleverd, gewoon bij je thuis.',
      icon: <Package className="w-10 h-10 text-brand-teal-deep opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out" strokeWidth={1.5} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="py-24 bg-brand-surface transition-colors duration-500 overflow-hidden" aria-labelledby="how-it-works-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 id="how-it-works-title" className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-teal-deep italic font-light tracking-tight mb-6">
            Zo werkt Velura
          </h2>
          <p className="font-sans text-brand-teal-deep text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Ons team van erkende professionals staat voor je klaar om je te begeleiden – snel geregeld, duidelijk en volledig afgestemd op jou.
          </p>
        </div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[16px] left-[16.666%] right-[16.666%] h-[2px] border-t-2 border-dashed border-brand-teal-deep/20 z-0" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col relative group">

                {/* Step Badge */}
                <div className="mx-auto flex justify-center mb-8 relative z-20">
                  <div className="w-8 h-8 rounded-full bg-brand-teal-deep flex items-center justify-center shadow-md ring-4 ring-brand-surface group-hover:ring-brand-gold/20 transition-all duration-500">
                    <span className="font-sans text-brand-ivory text-sm font-semibold">
                      {step.num}
                    </span>
                  </div>
                  {/* Subtle 'Stap N' text above or to the side could go here if needed, but numbering works beautifully */}
                  <span className="absolute -top-6 font-label text-brand-teal-deep text-[10px] tracking-widest uppercase">
                    Stap {step.num}
                  </span>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-transparent hover:border-brand-teal-mid/30 flex-grow flex flex-col overflow-hidden">

                  {/* Icon Container */}
                  <div className="relative w-full aspect-video bg-brand-ivory flex items-center justify-center overflow-hidden border-b border-brand-teal-deep/5 transition-colors duration-500">
                    <div className="w-24 h-24 rounded-full bg-brand-surface border border-brand-teal-light/20 shadow-sm flex items-center justify-center group-hover:bg-brand-gold/10 transition-all duration-500">
                      {step.icon}
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="p-8 flex flex-col flex-grow text-center">
                    <h3 className="font-display text-2xl text-brand-teal-deep font-semibold mb-3">
                      {step.title}
                    </h3>
                    <p className="font-sans font-light text-brand-charcoal/70 text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
