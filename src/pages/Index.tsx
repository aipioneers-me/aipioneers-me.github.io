import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import { setupAnimations } from "@/utils/animations";

const MissionSection = () => (
  <section className="bg-white py-0">
    <div className="section-container max-w-3xl mx-auto">
      <h2 className="section-title text-2xl md:text-3xl font-bold mb-6 text-accent-blue">Our Mission</h2>
      <p className="text-lg text-charcoal/80 mb-2">
        We are a global, not-for-profit initiative dedicated to advancing AI research through mentorship. Our community brings together experienced researchers and motivated students to collaborate on impactful research projects. We believe in open science, inclusive education, and the power of hands-on learning to shape the next generation of AI pioneers.
      </p>
      <p className="text-lg text-charcoal/80 mb-2">
      We are especially committed to advancing AI safety and promoting applications of AI that are safe, ethical, and beneficial to society.      </p>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="bg-white py-0">
    <div className="section-container max-w-3xl mx-auto">
      <h2 className="section-title text-2xl md:text-3xl font-bold mb-6 text-accent-blue">How it Works</h2>
      <ul className="list-disc pl-6 space-y-4 text-lg text-charcoal/80">
        <li>Projects run for 12 weeks</li>
        <li>Teams consist of 3 to 5 participants and are guided by an experienced mentor</li>
        <li>Teams meet several times per week to share progress and work together</li>
        <li>There will be introductory lectures on AI and research topics</li>
        <li>The aim is to produce a paper and submit it to a top conference or workshop</li>
      </ul>
    </div>
  </section>
);

const ProgramTimelineSection = () => (
  <section className="bg-white py-0">
    <div className="section-container max-w-xl mx-auto">
      <h2 className="section-title text-center mb-4">Program Timeline</h2>
      <div className="text-lg text-charcoal/80 space-y-2">
        <div className="flex items-start">
          <span className="w-64 text-right pr-4 font-medium">Research projects:</span>
          <span className="flex-1 text-left"><strong>1st of September - 29th of November 2025</strong></span>
        </div>
        <div className="flex items-start">
          <span className="w-64 text-right pr-4 font-medium">Registration Deadline:</span>
          <span className="flex-1 text-left"><strong>August 25th, 2025</strong></span>
        </div>
        <div className="flex items-start">
          <span className="w-64 text-right pr-4 font-medium">Demo day with project presentations:</span>
          <span className="flex-1 text-left"><strong>November 29, 2025</strong></span>
        </div>
      </div>
    </div>
  </section>
);

const PIsSection = () => (
  <section className="bg-white py-4">
    <div className="section-container max-w-3xl mx-auto">
      <h2 className="section-title text-2xl md:text-3xl font-bold mb-4 text-accent-blue">Advisory Board</h2>
      <p className="text-lg text-charcoal/80 mb-6">
       Our Principal Investigators support the project and provide strategic guidance on research projects and papers.
      </p>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-charcoal mb-1">Prof. Hoon Cho, Yale University</h3>
          <p className="text-charcoal/80 mb-1">PhD in Electrical Engineering and Computer Science, MIT — <a href="https://medicine.yale.edu/profile/hoon-cho/" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">Profile</a></p>
          <p className="text-charcoal/70">Research Focus: Privacy-preserving machine learning, secure analysis of biomedical data, and computational genomics</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-charcoal mb-1">Prof. Lu Lu, Yale University</h3>
          <p className="text-charcoal/80 mb-1">PhD in Applied Mathematics, Brown University — <a href="https://wti.yale.edu/profile/lu-lu" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">Profile</a></p>
          <p className="text-charcoal/70">Research Focus: Scientific machine learning, AI for science, multiscale modeling, and high-performance computing for physical and biological systems</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-charcoal mb-1">Prof. Rex Ying, Yale University</h3>
          <p className="text-charcoal/80 mb-1">PhD in Computer Science, Stanford University — <a href="https://www.cs.yale.edu/homes/ying-rex/" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">Profile</a></p>
          <p className="text-charcoal/70">Research Focus: Graph neural networks, geometric deep learning, relational reasoning with foundation models, and trustworthy AI</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-charcoal mb-1">Prof. María Rodríguez Martínez, Yale University</h3>
          <p className="text-charcoal/80 mb-1">PhD in Gravitation and Cosmology, Institut d’Astrophysique de Paris — <a href="https://medicine.yale.edu/profile/maria-rodriguezmartinez/" target="_blank" rel="noopener noreferrer" className="text-accent-blue underline">Profile</a></p>
          <p className="text-charcoal/70">Research Focus: AI-driven systems biology, interpretable machine learning for immunology, and computational modeling of immune responses in cancer and autoimmune diseases</p>
        </div>
      </div>
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
        <HowItWorksSection />
        <ProgramTimelineSection />
        <PIsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
