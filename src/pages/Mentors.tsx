import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
            Advance your research by mentoring the next generation of AI pioneers.
          </p>
          <a href="https://forms.gle/UxwQwNaWTBzmrb116" target="_blank" rel="noopener noreferrer" className="inline-block">
            <button className="bg-dark-red hover:bg-dark-red/90 text-white text-lg px-8 py-4 rounded-md font-semibold transition-colors mb-8">Apply as Mentor</button>
          </a>
          {/* Add more mentor-specific content here as needed */}
        </div>
      </div>
      {/* How It Works Section for Mentors */}
      <div className="my-6">
        <h2 className="text-2xl font-semibold mb-4 text-accent-blue">How It Works</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg text-charcoal/80">
          <li>As a mentor, you propose and lead your own project</li>
          <li>Submit your project idea through the <strong>Apply as Mentor</strong> form </li>
          <li>Projects that meet our scope and quality standards will be featured on the website for student interest</li>
          <li>After students select their preferred projects, we run a matchmaking process to build the best-fit teams</li>
        </ul>
      </div>
      {/* Why Join as a Mentor Section */}
      <div className="my-12">
        <h2 className="text-2xl font-semibold mb-4 text-accent-blue">Why Join as a Mentor?</h2>
        <ul className="list-disc pl-6 space-y-3 text-lg text-charcoal/80">
          <li><strong>Advance Your Research</strong> — Lead a project with dedicated, motivated students</li>
          <li><strong>Gain Valuable Mentorship Experience</strong> — Guide and inspire future AI researchers</li>
          <li><strong>We Help You Build the Right Team</strong> — Our matching process connects you with motivated students whose interests and experience align with your project</li>
          <li><strong>No Cost to You</strong> — Fully volunteer-based with minimal administrative effort</li>
        </ul>
      </div>
      <h2 className="text-2xl font-semibold mb-0 text-accent-blue">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="bg-white p-6 rounded-lg shadow-sm">
        <AccordionItem value="faq-1">
          <AccordionTrigger>Who can be a mentor?</AccordionTrigger>
          <AccordionContent>
            Experienced researchers, academics, industry professionals, and independent experts in AI or related fields, typically post docs and research scientists.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>Is there a fee or honorarium?</AccordionTrigger>
          <AccordionContent>
            There is no fee to participate, and mentors volunteer their time to support the next generation of AI researchers.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>What is expected from mentors?</AccordionTrigger>
          <AccordionContent>
            Mentors guide students through research projects, provide feedback, and help foster a collaborative, open-science environment.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <Footer />
  </>
);

export default Mentors; 