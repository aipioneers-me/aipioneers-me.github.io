import React from "react";
import { Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg font-medium text-charcoal">
              AI Pioneers
            </h3>
            <p className="text-sm text-charcoal/70 max-w-md">
              Helping organizations unlock the power of AI safely and strategically 
              through expert advisory and implementation services.
            </p>
          </div>
          
          <div className="mt-8 md:mt-0">
            <h4 className="text-sm font-semibold text-charcoal mb-3">Connect</h4>
            <div className="flex space-x-3">
              <a 
                href="mailto:contact@aipioneers.me" 
                className="text-charcoal/70 hover:text-charcoal transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-charcoal/70 hover:text-charcoal transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Join the Team message */}
        <div className="mt-8 flex justify-center">
          <span className="inline-block bg-accent-blue/10 text-accent-blue font-semibold px-4 py-2 rounded-md shadow-sm text-center">
            Join the Team: We are looking for Mentor and Student Coordinators.
          </span>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 md:flex md:items-center md:justify-between">
          <p className="text-sm text-charcoal/60">
            &copy; {currentYear} AI Pioneers. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-charcoal/60 hover:text-charcoal/80 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
