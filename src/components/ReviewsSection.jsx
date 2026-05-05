import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { name: 'Emily Rodriguez', rating: 5, text: 'Absolutely transformed my smile. The veneers look completely natural — I get compliments every single day.', date: 'March 2025', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', treatment: 'Veneers' },
  { name: 'Alex Thompson', rating: 5, text: 'The Invisalign process was seamless. Clear communication, zero pain, and results that exceeded every expectation.', date: 'Feb 2025', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', treatment: 'Invisalign' },
  { name: 'Priya Sharma', rating: 5, text: 'I was terrified of dentists — until BrightSmile. They made my root canal feel like a spa visit. Genuine magic.', date: 'Jan 2025', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&q=80', treatment: 'Root Canal' },
  { name: 'Michael Chang', rating: 5, text: 'The teeth whitening results are jaw-dropping. 8 shades whiter in one session. The team is world-class.', date: 'Dec 2024', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', treatment: 'Whitening' },
  { name: 'Sophia Laurent', rating: 5, text: 'I flew in specifically for the smile makeover. Worth every mile, every penny. This clinic is extraordinary.', date: 'Nov 2024', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80', treatment: 'Smile Makeover' },
  { name: 'James Okafor', rating: 5, text: 'The new patient experience here is unlike any dental clinic I have ever visited. The attention to detail is remarkable.', date: 'Oct 2024', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&q=80', treatment: 'General Care' },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="reviews" className="py-24 md:py-36 gradient-sky overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-emerald" />
            <span className="text-emerald font-inter text-sm font-medium tracking-widest uppercase">Patient Reviews</span>
            <div className="h-px w-8 bg-emerald" />
          </div>
          <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-obsidian leading-tight mb-4">
            Real Stories,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-cyan-500">Real Smiles</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
            </div>
            <span className="font-jakarta font-bold text-obsidian">4.98</span>
            <span className="text-slate-500 font-inter text-sm">· 5,000+ reviews</span>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-white/80 card-hover ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-jakarta font-semibold text-obsidian text-sm">{review.name}</div>
                    <div className="text-xs text-emerald font-inter font-medium">{review.treatment}</div>
                  </div>
                </div>
                <Quote size={20} className="text-slate-200 flex-shrink-0" />
              </div>
              <StarRating rating={review.rating} />
              <p className="text-slate-600 font-inter text-sm leading-relaxed mt-3 mb-4">"{review.text}"</p>
              <div className="text-slate-400 text-xs font-inter">{review.date}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}