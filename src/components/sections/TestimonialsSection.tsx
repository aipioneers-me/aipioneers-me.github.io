
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  return (
    <section className="bg-light-gray py-20">
      <div className="section-container">
        <h2 className="section-title text-center">Testimonials</h2>
        <p className="text-center text-charcoal/70 mb-12 max-w-2xl mx-auto">
          Success stories from clients who have transformed their businesses with strategic AI implementation.
        </p>
        
        {/* Placeholder for future testimonials */}
        <Card className="border-none bg-white/50 backdrop-blur-sm shadow-sm max-w-3xl mx-auto animate-on-scroll hover:shadow-md transition-shadow">
          <CardContent className="p-8 text-center">
            <p className="text-lg italic text-charcoal/70 mb-6">
              "Client testimonials will appear here. Share the impact of your AI consulting services on real businesses."
            </p>
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-accent-blue/20"></div>
              <div className="ml-4 text-left">
                <p className="font-medium text-charcoal">Client Name</p>
                <p className="text-sm text-charcoal/60">Company & Position</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TestimonialsSection;
