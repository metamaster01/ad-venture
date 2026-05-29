import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BrandBand from '@/components/BrandBand';
import AboutSection from '@/components/AboutSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Testimonials from '@/components/Testimonials';
import SelectedWork from '@/components/SelectedWork';
import Capabilities from '@/components/Capabilities';
import FounderSection from '@/components/FounderSection';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BrandBand />
      <AboutSection />
      <SelectedWork />
      <Capabilities />
      <FounderSection />
      <Testimonials />
      <CTASection />
      <FAQSection />
      <ContactSection />
      {/*
       * Add new sections here as you build them:
       * <AboutSection />
       * <WorkSection />
       * <ServicesSection />
       * <StudioSection />
       * <ContactSection />
       * <Footer />
       */}
    </main>
  );
}