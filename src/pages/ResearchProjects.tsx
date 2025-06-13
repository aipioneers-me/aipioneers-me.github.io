import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ResearchProjects = () => (
  <>
    <Navbar />
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-accent-blue">Research Projects</h1>
      <p className="text-lg text-charcoal/80">Research projects last 3 months and are open to students and mentors worldwide.</p>
      <p className="text-lg text-charcoal/80">Mentors propose research projects</p>
      <p className="text-lg text-charcoal/80">Students vote for their favorite projects</p>
      <p className="text-lg text-charcoal/80">We find the optimal match.</p>
    
      <p className="text-lg text-charcoal/80">We come together for project presentation day</p>


      <p className="text-lg text-charcoal/80">Research projects will be listed here September 1, 2025</p>
    </div>
    <Footer />
  </>
);

export default ResearchProjects; 