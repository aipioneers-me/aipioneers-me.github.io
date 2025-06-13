import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Students = () => (
  <>
    <Navbar />
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <div className="w-[260px] md:w-[300px] flex-shrink-0">
          <img src="/images/students_and_mentors.png" alt="Students and Mentors" className="rounded-lg max-w-full h-auto md:my-8" />
        </div>
        <div className="flex-grow min-w-0">
          <h1 className="text-3xl font-bold mb-4 text-accent-blue">Students</h1>
          <p className="text-xl italic text-charcoal/80 mb-8">Become an AI pioneer - and turn your curiosity into evidence.</p>
          <ul className="space-y-6 text-lg text-charcoal/80 mb-12">
            <li><strong>Learn from top researchers in AI.</strong></li>
            <li><strong>Starting stone for a career in AI.</strong></li>
            <li><strong>Boost your resume:</strong> It demonstrates initiative, dedication, and a genuine interest in AI.</li>
            <li><strong>Competitive Edge:</strong> Research experience significantly increases your chances of getting into top graduate programs.</li>
            <li><strong>Exploration:</strong> A 3-month project is a great way to "test drive" a specific area within AI.</li>
            <li><strong>Potential for Publication:</strong> Depending on the project's scope and your contributions, there might be an opportunity to co-author a paper or present your work at a conference.</li>
            <li><strong>Skill Building:</strong> Learn about recent AI Techniques, Research Methodology, Coding Skills.</li>
            <li><strong>Networking</strong></li>
            <li><strong>It's free!</strong></li>
          </ul>
          <a href="/students" className="inline-block">
            <button className="bg-accent-blue hover:bg-accent-blue/90 text-white text-lg px-8 py-4 rounded-md font-semibold transition-colors mb-8">Apply as Student</button>
          </a>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-accent-blue mt-12">Success Stories</h2>
      <div className="bg-light-gray p-6 rounded-lg shadow-sm mb-12">
        <p className="italic text-charcoal/70">Success stories from students will appear here. Share your journey and inspire others!</p>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-accent-blue">Frequently Asked Questions</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div>
          <h3 className="font-semibold text-charcoal mb-2">Who can apply as a student?</h3>
          <p className="text-charcoal/80">Anyone with a strong motivation to learn and contribute to AI research, regardless of background or affiliation.</p>
        </div>
        <div>
          <h3 className="font-semibold text-charcoal mb-2">Is there a fee to participate?</h3>
          <p className="text-charcoal/80">No, participation is free for all selected students.</p>
        </div>
        <div>
          <h3 className="font-semibold text-charcoal mb-2">Do I need prior research experience?</h3>
          <p className="text-charcoal/80">No prior research experience is required, but curiosity and dedication are essential!</p>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Students; 