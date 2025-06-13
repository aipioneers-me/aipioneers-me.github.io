import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Mentors = () => (
  <>
    <Navbar />
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <div className="w-[260px] md:w-[300px] flex-shrink-0">
          <img src="/images/students_and_mentors.png" alt="Students and Mentors" className="rounded-lg max-w-full h-auto md:my-8" />
        </div>
        <div className="flex-grow min-w-0">
          <h1 className="text-3xl font-bold mb-8 text-accent-blue">Mentors</h1>
          <p className="text-xl italic text-charcoal/80 mb-8">
            "Advance your research by mentoring the next generation of AI pioneers."
            We find the best students actually interested in your research idea. 
          </p>
          <a href="/mentors" className="inline-block">
            <button className="bg-dark-red hover:bg-dark-red/90 text-white text-lg px-8 py-4 rounded-md font-semibold transition-colors mb-8">Apply as Mentor</button>
          </a>
          {/* Add more mentor-specific content here as needed */}
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-accent-blue">Frequently Asked Questions</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div>
          <h3 className="font-semibold text-charcoal mb-2">Who can be a mentor?</h3>
          <p className="text-charcoal/80">Experienced researchers, academics, industry professionals, and independent experts in AI or related fields.</p>
        </div>
        <div>
          <h3 className="font-semibold text-charcoal mb-2">Is there a fee or honorarium?</h3>
          <p className="text-charcoal/80">There is no fee to participate, and mentors volunteer their time to support the next generation of AI researchers.</p>
        </div>
        <div>
          <h3 className="font-semibold text-charcoal mb-2">What is expected from mentors?</h3>
          <p className="text-charcoal/80">Mentors guide students through research projects, provide feedback, and help foster a collaborative, open-science environment.</p>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Mentors; 