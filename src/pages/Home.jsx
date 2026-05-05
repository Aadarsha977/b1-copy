import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import TeamSection from '../components/TeamSection';
import ReviewsSection from '../components/ReviewsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import FooterSection from '../components/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <ReviewsSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}