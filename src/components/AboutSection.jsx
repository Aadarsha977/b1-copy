import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, Heart, Zap } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Precision First', desc: 'Every treatment planned with surgical accuracy and medical-grade precision tools.' },
  { icon: Award, title: 'Award-Winning', desc: 'Recognized by leading dental associations for clinical excellence and innovation.' },
  { icon: Heart, title: 'Patient-Centered', desc: 'We prioritize your comfort, transparency, and long-term oral health outcomes.' },
  { icon: Zap, title: 'Latest Tech', desc: 'Digital X-rays, 3D scanning, and laser dentistry for faster, painless treatments.' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 md:py-36 gradient-sky overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-obsidian/10">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800"
                alt="Modern dental clinic"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="absolute -bottom-8 -right-6 glass-light rounded-2xl p-5 shadow-xl shadow-black/8 max-w-[200px]"
            >
              <div className="text-3xl font-jakarta font-bold text-obsidian">15+</div>
              <div className="text-sm text-slate-500 font-inter mt-1">Years of clinical excellence</div>
              <div className="mt-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-1 w-full rounded-full bg-emerald" style={{ opacity: 0.4 + i * 0.15 }} />
                ))}
              </div>
            </motion.div>

            {/* Decorative line */}
            <div className="absolute -left-4 top-12 h-32 w-px bg-gradient-to-b from-transparent via-emerald to-transparent opacity-60" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-8 bg-emerald" />
              <span className="text-emerald font-inter text-sm font-medium tracking-widest uppercase">Who We Are</span>
            </div>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-obsidian leading-tight mb-6">
              Where Art Meets
              <span className="text-emerald"> Dental Science</span>
            </h2>
            <p className="text-slate-500 font-inter text-base leading-relaxed mb-8">
              BrightSmile Dental Clinic is a state-of-the-art practice built on a singular philosophy: that every patient deserves a smile as unique as their fingerprint. Our team of specialists combines decades of clinical expertise with the latest advancements in digital dentistry.
            </p>
            <p className="text-slate-500 font-inter text-base leading-relaxed mb-10">
              We have created an environment where anxiety melts away — replaced by clarity, comfort, and absolute confidence in your care.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-white/80 border border-white shadow-sm card-hover"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald/10 flex items-center justify-center mb-3">
                    <v.icon size={18} className="text-emerald" />
                  </div>
                  <div className="font-jakarta font-semibold text-obsidian text-sm mb-1">{v.title}</div>
                  <div className="text-slate-500 text-xs font-inter leading-relaxed">{v.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}