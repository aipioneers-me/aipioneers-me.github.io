import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="font-semibold text-xl text-dark-red">
              AI Pioneers
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/mentors" className="font-medium text-charcoal/80 hover:text-charcoal transition-colors">
              Mentors 
            </Link>
            <Link to="/students" className="font-medium text-charcoal/80 hover:text-charcoal transition-colors">
              Participants
            </Link>
            <Link to="/projects" className="font-medium text-charcoal/80 hover:text-charcoal transition-colors">
              Research Projects
            </Link>
            <Link to="/alumni" className="font-medium text-charcoal/80 hover:text-charcoal transition-colors">
              Alumni Network
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-dark-red hover:bg-dark-red/90 text-white"
            >
              Donate
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-charcoal focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/mentors" className="block w-full text-left px-3 py-3 font-medium text-charcoal hover:bg-light-gray rounded-md">
              Mentors Page
            </Link>
            <Link to="/students" className="block w-full text-left px-3 py-3 font-medium text-charcoal hover:bg-light-gray rounded-md">
              Participants
            </Link>
            <Link to="/projects" className="block w-full text-left px-3 py-3 font-medium text-charcoal hover:bg-light-gray rounded-md">
              Research Projects
            </Link>
            <Link to="/alumni" className="block w-full text-left px-3 py-3 font-medium text-charcoal hover:bg-light-gray rounded-md">
              Alumni Network
            </Link>
            <div className="px-3 py-3">
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-dark-red hover:bg-dark-red/90 text-white"
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
