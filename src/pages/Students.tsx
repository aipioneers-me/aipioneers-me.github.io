import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const Students = () => (
  <>
    <Navbar />
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <div className="w-[260px] md:w-[300px] flex-shrink-0">
          <img src="/images/students_and_mentors.png" alt="Students and Mentors" className="rounded-lg max-w-full h-auto md:my-8" />
        </div>
        <div className="flex-grow min-w-0">
          <h1 className="text-3xl font-bold mb-4 text-accent-blue">Participants</h1>
          <p className="text-xl italic text-charcoal/80 mb-8">Become an AI pioneer - and turn your curiosity into experience.</p>
          <a href="https://forms.gle/Nj2b1MfykTifRSAQ7" target="_blank" rel="noopener noreferrer" className="inline-block">
            <button className="bg-accent-blue hover:bg-accent-blue/90 text-white text-lg px-8 py-4 rounded-md font-semibold transition-colors mb-8">Apply as Participant</button>
          </a>
        </div>
      </div>
      {/* How it Works Section for Students */}
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4 text-accent-blue">How it Works</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg text-charcoal/80">
          <li>Fill out the general application form to join the program.</li>
          <li>Once accepted, you can browse available research projects and indicate your preferences.</li>
          <li>We use your preferences and background to create teams of like-minded participants.</li>
          <li>You meet several times a week to work with your team throughout the 12-week project.</li>
          <li>At the end of the program, you’ll present your work at our demo day and may contribute to a research paper.</li>
        </ul>
      </div>
      {/* Why Join Section */}
      <div className="my-12">
        <h2 className="text-2xl font-semibold mb-4 text-accent-blue">Why Join?</h2>
        <ul className="list-disc pl-6 space-y-3 text-lg text-charcoal/80">
          <li><strong>Learn from Top AI Researchers</strong> — Gain cutting-edge knowledge and insights</li>
          <li><strong>Build Real-World Skills</strong> — Work hands-on on impactful research projects</li>
          <li><strong>Strengthen Your Academic and Career Profile</strong> — Stand out with proven research experience</li>
          <li><strong>Kickstart Your AI or Data Science Career</strong> — Grow your skills, network, and confidence</li>
          <li><strong>A stepping stone into the World of AI Research</strong> — Tackle real challenges and explore new ideas</li>
          <li><strong>Create Tangible Results</strong> — Contribute to research papers and project demos</li>
        </ul>
      </div>
      {/* <h2 className="text-2xl font-semibold mb-4 text-accent-blue mt-12">Success Stories</h2>
      <div className="bg-light-gray p-6 rounded-lg shadow-sm mb-12">
        <p className="italic text-charcoal/70">Success stories from students will appear here. Share your journey and inspire others!</p>
      </div> */}
      <h2 className="text-2xl font-semibold mb-0 text-accent-blue">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="bg-white p-6 rounded-lg shadow-sm">
        <AccordionItem value="faq-1">
          <AccordionTrigger>Who can I apply?</AccordionTrigger>
          <AccordionContent>
              Anyone with a strong motivation to learn and contribute to AI research, regardless of background or affiliation. Our program is primarily for university students and early-career professionals. High school students may be admitted if they can show exceptional ability
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>How selective is the program?</AccordionTrigger>
          <AccordionContent>
            We have limited spots and aim to form highly motivated teams with aligned interests. Selection is competitive — but if you're eager to learn, ready to contribute, and excited about research, we strongly encourage you to apply!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>Is there a fee to participate?</AccordionTrigger>
          <AccordionContent>
            No, participation is free for all selected students.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-4">
          <AccordionTrigger>Do I need prior research experience?</AccordionTrigger>
          <AccordionContent>
            No prior research experience is required, but curiosity and dedication are essential!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-5">
          <AccordionTrigger>How Much Time Does It Take?</AccordionTrigger>
          <AccordionContent>
            Most participants join on a part-time basis, though some choose to work full-time on their projects. We recommend planning for at least 6 hours per week.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <Footer />
  </>
);

export default Students; 