import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Isabella Fontaine',
    role: 'Fashion Designer, Paris',
    quote: "BrightSmile didn't just fix my teeth — they gave me a completely new level of confidence. I smile in every photo now. The craftsmanship is extraordinary.",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    treatment: 'Full Smile Makeover',
    before: 'Chipped & discolored teeth',
    after: 'Flawless porcelain veneers',
  },
  {
    name: 'David Nakamura',
    role: 'CEO, Tech Startup',
    quote: "As someone who presents to investors weekly, my smile is part of my brand. BrightSmile understood that completely and delivered results that speak louder than any pitch deck.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    treatment: 'Invisalign + Whitening',
    before: 'Crowding & yellowing',
    after: 'Straight, luminous smile',
  },
  {
    name: 'Amara Williams',
    role: 'TV Presenter',
    quote: "I've been on camera for 10 years and always hated my smile. After my treatment here, I finally love seeing myself on screen. The team is exceptional in every way.",
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80',
    treatment: 'Veneers & Contouring',
    before: 'Uneven teeth edges',
    after: 'Perfectly proportioned smile',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 md:py-36 obsidian-bg overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-emerald" />
            <span className="text-emerald font-inter text-sm font-medium tracking-widest uppercase">Patient Stories</span>
            <div className="h-px w-8 bg-emerald" />
          </div>
          <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-white leading-tight">
            Life-Changing<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-cyan-400">Transformations</span>
          </h2>
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction * -60, filter: 'blur(10px)' }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Image */}
              <div className="relative flex-shrink-0">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 glass-light rounded-2xl px-4 py-2.5 shadow-lg">
                  <div className="text-xs text-slate-500 font-inter">Treatment</div>
                  <div className="font-jakarta font-bold text-obsidian text-sm">{t.treatment}</div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="text-5xl text-emerald font-jakarta mb-4 leading-none">"</div>
                <p className="text-white/85 font-inter text-lg md:text-xl leading-relaxed mb-8">
                  {t.quote}
                </p>
                <div className="font-jakarta font-bold text-white text-lg">{t.name}</div>
                <div className="text-emerald text-sm font-inter">{t.role}</div>

                {/* Before/After */}
                <div className="flex gap-6 mt-6">
                  <div>
                    <div className="text-white/30 text-xs font-inter mb-1">BEFORE</div>
                    <div className="text-white/60 text-sm font-inter">{t.before}</div>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <div className="text-emerald text-xs font-inter mb-1">AFTER</div>
                    <div className="text-white text-sm font-inter">{t.after}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2.5 bg-emerald' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goTo((current + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center text-white hover:bg-emerald/80 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}