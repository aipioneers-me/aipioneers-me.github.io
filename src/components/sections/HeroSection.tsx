import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: 'url(/images/background_v2.png) center/cover no-repeat' }}>
      {/* Removed old abstract background pattern */}
      <div className="section-container z-10 pt-20">
        <div className="max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
            AI Pioneers - mentoring the next generation of AI researchers
          </h1>
          <p className="text-lg md:text-xl text-charcoal/80 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Connecting AI researchers and students worldwide.
          </p>
          <div className="animate-fade-in flex gap-4" style={{ animationDelay: "0.4s" }}>
            <a href="https://forms.gle/UxwQwNaWTBzmrb116" target="_blank" rel="noopener noreferrer">
              <Button className="bg-dark-red hover:bg-dark-red/90 text-white text-lg px-8 py-6">
                Apply as Mentor
              </Button>
            </a>
            <a href="https://forms.gle/Nj2b1MfykTifRSAQ7" target="_blank" rel="noopener noreferrer">
              <Button className="bg-accent-blue hover:bg-accent-blue/90 text-white text-lg px-8 py-6">
                Apply as Participant
            </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
