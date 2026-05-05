import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';

const WHATSAPP = '1234567890'; // placeholder

const categories = [
  {
    id: 'general',
    label: 'General Dentistry',
    icon: '🦷',
    bg: 'from-blue-50 to-cyan-50',
    services: [
      { name: 'Dental Cleaning', desc: 'Professional scaling and polishing for optimal oral hygiene.', price: '$80', features: ['Deep cleaning', 'Plaque removal', 'Fluoride treatment'] },
      { name: 'Tooth Fillings', desc: 'Composite resin fillings that blend seamlessly with your natural teeth.', price: '$120', features: ['Tooth-colored', 'Same-day procedure', '10-year warranty'] },
      { name: 'Tooth Extractions', desc: 'Gentle, minimally invasive extractions with sedation options.', price: '$150', features: ['Local anesthesia', 'Minimal discomfort', 'Quick healing'] },
      { name: 'Root Canal', desc: 'Advanced endodontic therapy to save infected teeth.', price: '$600', features: ['Single visit option', 'Pain-free', 'High success rate'] },
    ],
  },
  {
    id: 'cosmetic',
    label: 'Cosmetic Dentistry',
    icon: '✨',
    bg: 'from-emerald-50 to-teal-50',
    services: [
      { name: 'Teeth Whitening', desc: 'Professional in-office laser whitening for 8+ shades brighter.', price: '$299', features: ['1-hour session', '8 shades lighter', 'Long-lasting results'] },
      { name: 'Dental Veneers', desc: 'Ultra-thin porcelain shells for a flawless Hollywood smile.', price: '$800', features: ['Custom-crafted', 'Natural look', '15-year lifespan'] },
      { name: 'Smile Makeover', desc: 'Comprehensive aesthetic treatment plan tailored to your face.', price: '$2,500', features: ['Full consultation', 'Multiple treatments', 'Personalized design'] },
      { name: 'Dental Bonding', desc: 'Quick cosmetic repair for chips, cracks, and gaps.', price: '$200', features: ['Same-day fix', 'Painless', 'Natural finish'] },
    ],
  },
  {
    id: 'ortho',
    label: 'Orthodontics',
    icon: '📐',
    bg: 'from-violet-50 to-indigo-50',
    services: [
      { name: 'Traditional Braces', desc: 'Precision metal or ceramic braces for all ages and complexities.', price: '$3,000', features: ['All severities', 'Regular adjustments', '18-24 months'] },
      { name: 'Invisalign', desc: 'Clear aligner therapy — invisible, removable, and comfortable.', price: '$4,500', features: ['Virtually invisible', 'Removable trays', 'Digital preview'] },
      { name: 'Retainers', desc: 'Custom post-treatment retainers to maintain your perfect smile.', price: '$350', features: ['Fixed or removable', 'Custom fit', 'Lifetime support'] },
      { name: 'Alignment Check', desc: 'Comprehensive orthodontic assessment with digital bite analysis.', price: '$99', features: ['3D scan', 'Full report', 'Free consultation'] },
    ],
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState('general');
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const current = categories.find(c => c.id === active);

  const handleWhatsApp = (service) => {
    const msg = encodeURIComponent(`Hi BrightSmile! I'm interested in ${service.name}. Please contact me.`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  };

  return (
    <section id="services" className="py-24 md:py-36 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-emerald" />
            <span className="text-emerald font-inter text-sm font-medium tracking-widest uppercase">What We Offer</span>
            <div className="h-px w-8 bg-emerald" />
          </div>
          <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-obsidian leading-tight mb-4">
            Comprehensive Dental<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-cyan-500">Services</span>
          </h2>
          <p className="text-slate-500 font-inter max-w-xl mx-auto text-base">
            From routine care to complete transformations, every treatment is delivered with precision and artistry.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-6 py-3 rounded-full font-jakarta font-semibold text-sm transition-all duration-300 ${
                active === cat.id
                  ? 'bg-obsidian text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>{cat.label}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className={`p-8 rounded-3xl bg-gradient-to-br ${current.bg}`}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {current.services.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onHoverStart={() => setHovered(svc.name)}
                  onHoverEnd={() => setHovered(null)}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-white/80 cursor-pointer"
                  style={{
                    transform: hovered === svc.name ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: hovered === svc.name ? '0 20px 40px rgba(6,22,44,0.12)' : '0 2px 8px rgba(0,0,0,0.05)',
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  <div className="font-jakarta font-bold text-obsidian mb-2">{svc.name}</div>
                  <p className="text-slate-500 text-xs font-inter leading-relaxed mb-4">{svc.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {svc.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-600 font-inter">
                        <Check size={12} className="text-emerald flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <AnimatePresence>
                    {hovered === svc.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="text-emerald font-jakarta font-bold text-sm mb-3">
                          Starting at {svc.price}
                        </div>
                        <button
                          onClick={() => handleWhatsApp(svc)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald text-white text-xs font-jakarta font-semibold rounded-xl hover:bg-emerald/90 transition-colors"
                        >
                          <MessageCircle size={14} />
                          Inquire on WhatsApp
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}