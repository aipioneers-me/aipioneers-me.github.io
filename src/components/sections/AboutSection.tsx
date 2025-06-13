
import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-20">
      <div className="section-container">
        <div className="md:flex md:items-center md:space-x-12">
          {/* Placeholder for personal photo - will add proper styling for when user uploads photo later */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="bg-light-gray h-[400px] w-full rounded-lg flex items-center justify-center">
              <p className="text-charcoal/50 text-lg">Your photo will appear here</p>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="section-title">About Me</h2>
            <div className="space-y-4 text-lg text-charcoal/80">
              <p>
                With a Ph.D. in Physics and over two decades of experience building machine learning 
                applications, I've guided organizations across multiple industries in harnessing 
                the power of AI responsibly and effectively.
              </p>
              <p>
                As a former Data Science Team Leader, I understand both the technical complexities 
                and the business challenges of AI implementation. My experience spans Retail, Finance, 
                Insurance, Healthcare, Life Sciences, Education, Manufacturing, and R&D sectors.
              </p>
              <p>
                My approach combines rigorous technical knowledge with practical business acumen, 
                ensuring AI solutions that deliver measurable results while adhering to the highest 
                standards of safety, ethics, and transparency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
