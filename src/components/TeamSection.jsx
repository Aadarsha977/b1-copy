import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const team = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Lead Dentist & Founder',
    specialty: 'Cosmetic & Restorative',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    exp: '18 yrs',
  },
  {
    name: 'Dr. James Chen',
    role: 'Orthodontic Specialist',
    specialty: 'Invisalign & Braces',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    exp: '12 yrs',
  },
  {
    name: 'Dr. Priya Nair',
    role: 'Endodontist',
    specialty: 'Root Canal & Implants',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    exp: '10 yrs',
  },
  {
    name: 'Dr. Marcus Webb',
    role: 'Oral Surgeon',
    specialty: 'Extractions & Surgery',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    exp: '14 yrs',
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="py-24 md:py-36 obsidian-bg overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-emerald" />
            <span className="text-emerald font-inter text-sm font-medium tracking-widest uppercase">Meet The Experts</span>
            <div className="h-px w-8 bg-emerald" />
          </div>
          <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
            The Team Behind<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-cyan-400">Your Perfect Smile</span>
          </h2>
          <p className="text-white/50 font-inter max-w-lg mx-auto text-base">
            Board-certified specialists with a shared passion for precision, artistry, and patient care.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="group relative overflow-hidden rounded-3xl card-hover"
            >
              <div className="relative overflow-hidden rounded-3xl h-80">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-jakarta font-bold text-white text-lg leading-tight">{member.name}</div>
                  <div className="text-emerald text-xs font-inter font-medium mt-1">{member.role}</div>
                  <div className="text-white/50 text-xs font-inter mt-0.5">{member.specialty}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/20" />
                    <span className="text-white/40 text-xs font-inter">{member.exp} exp</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}