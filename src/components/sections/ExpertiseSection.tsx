import React from "react";
import { 
  Briefcase, 
  Shield, 
  FileText, 
  Users 
} from "lucide-react";

const ExpertiseSection = () => {
  const expertiseAreas = [
    {
      icon: <Briefcase className="h-8 w-8 text-accent-blue" />,
      title: "AI Strategy & Roadmapping",
      description: "Develop comprehensive AI strategies aligned with your business goals and market positioning."
    },
    {
      icon: <Shield className="h-8 w-8 text-accent-blue" />,
      title: "Responsible AI Deployment",
      description: "Implement AI systems with robust safety mechanisms, ethical considerations, and fail-safes."
    },
    {
      icon: <FileText className="h-8 w-8 text-accent-blue" />,
      title: "AI Governance and Assurance Audits",
      description: "Evaluate existing AI systems for risks, compliance issues, and improvement opportunities."
    },
    {
      icon: <Users className="h-8 w-8 text-accent-blue" />,
      title: "Cross-Industry Applications",
      description: "Specialized experience across Finance, Healthcare, Technology, and other key sectors."
    }
  ];

  return (
    <section id="program-timeline" className="bg-light-gray py-20">
      <div className="section-container">
        <h2 className="section-title text-center mb-16">Program Timeline</h2>
        <div className="text-center text-lg text-charcoal/80">
        <p>Selection of research projects: <strong> September 1st 2025</strong></p>
        <p>Students submit their interests: <strong> until September 8 2025</strong></p>
        <p>Mentors select students: <strong>September 15 2025</strong></p>
        <p>Final project presentations: <strong>November 22, 2025</strong></p>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
