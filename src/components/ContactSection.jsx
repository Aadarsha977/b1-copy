import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MessageCircle, User, Phone, Stethoscope, ChevronRight, Check } from 'lucide-react';

const WHATSAPP = '1234567890'; // placeholder

const services = [
  'General Dentistry', 'Teeth Cleaning', 'Dental Fillings',
  'Teeth Whitening', 'Dental Veneers', 'Smile Makeover',
  'Invisalign', 'Braces', 'Root Canal', 'Tooth Extraction',
];

const steps = [
  { id: 'name', label: 'Your Name', icon: User, placeholder: 'e.g. Sarah Mitchell', type: 'text' },
  { id: 'phone', label: 'Phone / Email', icon: Phone, placeholder: 'e.g. +1 234 567 8900', type: 'text' },
  { id: 'service', label: 'Service of Interest', icon: Stethoscope, placeholder: null, type: 'select' },
];

export default function ContactSection() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', phone: '', service: '' });
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;
  const canProceed = data[currentStep?.id]?.trim();

  const handleNext = () => {
    if (!canProceed) return;
    if (isLastStep) {
      sendToWhatsApp();
    } else {
      setStep(s => s + 1);
    }
  };

  const sendToWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi BrightSmile! I'm ${data.name}. I'm interested in ${data.service}. Please contact me at ${data.phone}.`
    );
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-8 bg-emerald" />
              <span className="text-emerald font-inter text-sm font-medium tracking-widest uppercase">Book Now</span>
            </div>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-obsidian leading-tight mb-6">
              Start Your Smile
              <span className="text-emerald"> Journey</span>
            </h2>
            <p className="text-slate-500 font-inter text-base leading-relaxed mb-10">
              Take three steps to connect with our team instantly via WhatsApp. No forms, no wait — just a direct line to your new smile.
            </p>

            <div className="space-y-5">
              {[
                { num: '01', text: 'Tell us your name' },
                { num: '02', text: 'Share your contact info' },
                { num: '03', text: 'Choose your treatment' },
                { num: '→', text: 'Get connected instantly on WhatsApp', highlight: true },
              ].map(item => (
                <div key={item.num} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-jakarta font-bold flex-shrink-0 ${item.highlight ? 'bg-emerald text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {item.num}
                  </div>
                  <span className={`font-inter text-base ${item.highlight ? 'text-obsidian font-semibold' : 'text-slate-500'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-2xl bg-liquid-sky">
              <div className="font-jakarta font-bold text-obsidian mb-1">📍 Visit Us</div>
              <div className="text-slate-500 font-inter text-sm">123 Dental Avenue, Suite 400<br />New York, NY 10001</div>
              <div className="mt-3 font-jakarta font-semibold text-obsidian text-sm">Mon–Sat: 8am – 7pm</div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="bg-obsidian rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-emerald/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald flex items-center justify-center mb-6 pulse-ring">
                      <Check size={36} className="text-white" />
                    </div>
                    <h3 className="font-jakarta font-bold text-2xl text-white mb-3">Redirecting to WhatsApp!</h3>
                    <p className="text-white/60 font-inter text-sm">
                      Your message is pre-filled and ready to send. Opening WhatsApp now...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    {/* Progress */}
                    <div className="flex gap-2 mb-8">
                      {steps.map((s, i) => (
                        <div
                          key={s.id}
                          className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-emerald' : 'bg-white/15'}`}
                        />
                      ))}
                    </div>

                    <div className="text-white/40 text-xs font-inter tracking-widest uppercase mb-3">
                      Step {step + 1} of {steps.length}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-emerald/15 flex items-center justify-center">
                            <currentStep.icon size={18} className="text-emerald" />
                          </div>
                          <h3 className="font-jakarta font-bold text-white text-xl">{currentStep.label}</h3>
                        </div>

                        {currentStep.type === 'select' ? (
                          <div className="grid grid-cols-2 gap-2 mb-8">
                            {services.map(svc => (
                              <button
                                key={svc}
                                onClick={() => setData(d => ({ ...d, service: svc }))}
                                className={`px-3 py-2.5 rounded-xl text-xs font-inter font-medium text-left transition-all duration-200 ${
                                  data.service === svc
                                    ? 'bg-emerald text-white'
                                    : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white'
                                }`}
                              >
                                {svc}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <input
                            type={currentStep.type}
                            value={data[currentStep.id]}
                            onChange={e => setData(d => ({ ...d, [currentStep.id]: e.target.value }))}
                            onKeyDown={handleKeyDown}
                            placeholder={currentStep.placeholder}
                            autoFocus
                            className="w-full bg-white/8 border border-white/15 rounded-2xl px-5 py-4 text-white font-inter text-base placeholder-white/30 focus:outline-none focus:border-emerald focus:bg-white/12 transition-all duration-300 mb-8"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex gap-3">
                      {step > 0 && (
                        <button
                          onClick={() => setStep(s => s - 1)}
                          className="px-5 py-4 rounded-2xl bg-white/8 text-white/60 font-inter font-medium hover:bg-white/15 transition-all"
                        >
                          Back
                        </button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleNext}
                        disabled={!canProceed}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-jakarta font-bold text-white transition-all duration-300 ${
                          canProceed
                            ? 'bg-emerald hover:bg-emerald/90 emerald-glow'
                            : 'bg-white/10 text-white/30 cursor-not-allowed'
                        }`}
                      >
                        {isLastStep ? (
                          <>
                            <MessageCircle size={18} />
                            Send via WhatsApp
                          </>
                        ) : (
                          <>
                            Continue
                            <ChevronRight size={18} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}