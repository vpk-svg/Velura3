'use client';

import { motion } from 'motion/react';
import { FileSearch, ClipboardCheck, Package } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'Consultatie & Analyse',
      desc: 'Beantwoord enkele vragen over je wensen en medische achtergrond.',
      icon: <FileSearch className="w-10 h-10" strokeWidth={1.5} />,
    },
    {
      num: '2',
      title: 'Specialistisch Advies',
      desc: 'Onze arts beoordeelt je profiel en stelt een persoonlijk behandelplan op.',
      icon: <ClipboardCheck className="w-10 h-10" strokeWidth={1.5} />,
    },
    {
      num: '3',
      title: 'Behandeling & Nazorg',
      desc: 'Plan je afspraak en geniet van professionele zorg in onze kliniek.',
      icon: <Package className="w-10 h-10" strokeWidth={1.5} />,
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
    <section className="py-32 bg-background-light overflow-hidden" aria-labelledby="how-it-works-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label text-primary text-xs tracking-[0.4em] uppercase mb-6 block font-bold"
          >
            Your Journey
          </motion.span>
          <h2 id="how-it-works-title" className="font-display text-5xl md:text-7xl lg:text-8xl text-secondary tracking-tight mb-8">
            Hoe <span className="italic font-light text-primary">FAB Clinic</span> Werkt
          </h2>
          <p className="font-sans text-secondary/70 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Wij begeleiden je stap voor stap naar je beste zelf – veilig, professioneel en volledig afgestemd op jouw natuurlijke schoonheid.
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
          <div className="hidden md:block absolute top-[16px] left-[16.666%] right-[16.666%] h-[2px] border-t-2 border-dashed border-primary/20 z-0" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative z-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col relative group">

                {/* Step Badge */}
                <div className="mx-auto flex justify-center mb-10 relative z-20">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-xl ring-8 ring-background-light">
                    <span className="font-label text-white text-sm font-bold">
                      {step.num}
                    </span>
                  </div>
                  <span className="absolute -top-8 font-label text-primary text-[10px] tracking-widest uppercase font-bold">
                    Stap {step.num}
                  </span>
                </div>

                {/* Card */}
                <div className="bg-white rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-3 border border-primary/5 hover:border-primary/20 flex-grow flex flex-col overflow-hidden">

                  {/* Icon Container */}
                  <div className="relative w-full aspect-video bg-secondary/5 flex items-center justify-center overflow-hidden border-b border-primary/5">
                    <div className="w-24 h-24 rounded-3xl bg-white border border-primary/10 shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 text-primary">
                      {step.icon}
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="p-10 flex flex-col flex-grow text-center">
                    <h3 className="font-display text-3xl text-secondary mb-4 italic">
                      {step.title}
                    </h3>
                    <p className="font-sans font-light text-secondary/70 text-lg leading-relaxed">
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
