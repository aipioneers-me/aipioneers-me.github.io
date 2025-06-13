import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import { setupAnimations } from "@/utils/animations";

const MissionSection = () => (
  <section className="bg-white py-16">
    <div className="section-container max-w-3xl mx-auto">
      <h2 className="section-title text-2xl md:text-3xl font-bold mb-6 text-accent-blue">Our Mission</h2>
      <p className="text-lg text-charcoal/80 mb-4">
        We are a global, not-for-profit initiative dedicated to advancing AI research through mentorship. Our community brings together experienced researchers and motivated students to collaborate on open-ended, impactful research projects. We believe in open science, inclusive education, and the power of hands-on learning to shape the next generation of AI pioneers.
      </p>
      <p className="text-lg text-charcoal/80 mb-4">
        Our mentors include leading academics, industry researchers, and independent experts across diverse fields of AI. Together, we create an environment where talent is nurtured, ideas are shared, and research grows into publication-ready work.
      </p>
      <p className="text-lg text-charcoal/80">
        <strong>Cost & Access:</strong> Participation is free for both students and mentors. We select participants based on motivation and fit, not background or affiliation. Limited travel grants may be available, subject to funding.
      </p>
    </div>
  </section>
);

const Index = () => {
  useEffect(() => {
    // Update document title and meta description for SEO
    document.title = "AI Pioneers | AI Research Mentorship Program";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Open and free - Connecting top AI researchers and students worldwide.');
    }
    
    // Initialize scroll animations
    setupAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-white text-charcoal font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <ExpertiseSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
