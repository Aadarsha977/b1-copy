import { motion } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const WHATSAPP = '1234567890';

const socialIcons = [
  { Icon: Instagram, href: '#' },
  { Icon: Facebook, href: '#' },
  { Icon: Twitter, href: '#' },
];

export default function FooterSection() {
  return (
    <footer className="obsidian-bg py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-jakarta font-bold text-2xl text-white mb-4">
              Bright<span className="text-emerald">Smile</span>
            </div>
            <p className="text-white/45 font-inter text-sm leading-relaxed mb-6 max-w-xs">
              Precision dentistry where art meets science. Transforming smiles, transforming lives.
            </p>
            <motion.a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald text-white font-jakarta font-semibold rounded-full text-sm hover:bg-emerald/90 transition-colors"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </motion.a>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-jakarta font-semibold text-white text-sm mb-4">Navigation</div>
            <ul className="space-y-2.5">
              {['Home', 'About', 'Services', 'Team', 'Reviews', 'Testimonials', 'Contact'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/45 font-inter text-sm hover:text-emerald transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="font-jakarta font-semibold text-white text-sm mb-4">Contact</div>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-white/45 text-sm font-inter">
                <MapPin size={14} className="text-emerald mt-0.5 flex-shrink-0" />
                <span>123 Dental Ave, Suite 400<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2 text-white/45 text-sm font-inter">
                <Phone size={14} className="text-emerald flex-shrink-0" />
                +1 (234) 567-8900
              </div>
              <div className="flex gap-3 mt-4">
                {socialIcons.map(({ Icon, href }, i) => (
                  <a key={i} href={href} className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/45 hover:text-white hover:bg-white/15 transition-all">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/25 font-inter text-xs">
            © 2025 BrightSmile Dental Clinic. All rights reserved.
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance'].map(link => (
              <a key={link} href="#" className="text-white/25 font-inter text-xs hover:text-white/50 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}