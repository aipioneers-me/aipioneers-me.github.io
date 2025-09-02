import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Project {
  id: string;
  mentor: {
    name: string;
    organization: string;
    bio: string;
    email: string;
    photo?: string;
  };
  project: {
    title: string;
    description: string;
    researchArea: string;
    prerequisites: string;
    hoursPerWeek: string;
    pdfUrl?: string;
  };
  questions: string[];
}

const ResearchProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const isUrl = (text: string): boolean => /^(https?:\/\/)/i.test(text.trim());

  const generateGoogleFormUrl = (project: Project): string => {
    const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdn6M5t97GpcKonJbMCzp5BXUH8seAEQIlVsws_NoWy_MyLkA/viewform?usp=pp_url";
    const params = new URLSearchParams();
    
    // Pre-fill project title (entry.1059710130)
    params.append("entry.1059710130", project.project.title);
    
    // You can add more fields here as needed
    // For example, if you have other entry IDs for mentor name, research area, etc.
    // params.append("entry.XXXXXXX", project.mentor.name);
    // params.append("entry.XXXXXXX", project.project.researchArea);
    
    return `${baseUrl}&${params.toString()}`;
  };

  const renderTextWithLinks = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = urlRegex.exec(text)) !== null) {
      const [url] = match;
      const index = match.index;
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index));
      }
      parts.push(
        <a key={`${url}-${index}`} href={url} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline break-words">
          {url}
        </a>
      );
      lastIndex = index + url.length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.log('No projects data available yet');
        }
      } catch (error) {
        console.log('Projects will be available end of August');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading || authLoading) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold mb-8 text-accent-blue">Research Projects</h1>
          <div className="text-center py-8">
            <p className="text-lg text-charcoal/80">Loading research projects...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (projects.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold mb-8 text-accent-blue">Research Projects</h1>
          {!isAuthenticated && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <p className="text-yellow-800 font-medium">
                    You have to fill out the general application first before you can apply to individual projects.
                  </p>
                </div>
                <a 
                  href="https://forms.gle/Nj2b1MfykTifRSAQ7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-4"
                >
                  <Button className="bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold py-2 px-4">
                    Apply as Participant
                  </Button>
                </a>
              </div>
            </div>
          )}
          <div className="bg-light-gray p-8 rounded-lg text-center">
            <p className="text-lg text-charcoal/80 mb-4">Research projects will be listed here.</p>
            <p className="text-charcoal/60">Check back soon to browse available research opportunities!</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }



  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-accent-blue">Research Projects</h1>
        
        {!isAuthenticated && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-yellow-800 font-medium">
                  You have to fill out the general registration first before you can apply to individual projects.
                </p>
              </div>
              <a 
                href="https://forms.gle/Nj2b1MfykTifRSAQ7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-4"
              >
                <Button className="bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold py-2 px-4">
                  Apply as Participant
                </Button>
              </a>
            </div>
          </div>
        )}
        
        <div className="grid gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-charcoal mb-2">{project.project.title}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  {isUrl(project.project.description) ? (
                    <a
                      href={project.project.description.replace('/open?id=', '/uc?export=download&id=')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-blue hover:underline break-words text-lg font-semibold mb-3 block"
                    >
                      Download Project Description PDF
                    </a>
                  ) : (
                    <p className="text-charcoal/80 mb-4 whitespace-pre-wrap">{project.project.description}</p>
                  )}
                  
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Research Area</h3>
                  <p className="text-charcoal/80 mb-4">{project.project.researchArea}</p>
                  
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Prerequisites</h3>
                  <p className="text-charcoal/80 mb-4 whitespace-pre-wrap">{project.project.prerequisites}</p>
                  
                  {project.questions.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold text-charcoal mb-3">Application Questions</h3>
                      <ol className="list-decimal list-inside space-y-2 text-charcoal/80 mb-4">
                        {project.questions.map((question, index) => (
                          <li key={index} className="break-words">{renderTextWithLinks(question)}</li>
                        ))}
                      </ol>
                    </>
                  )}
                  
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Time Commitment</h3>
                  <p className="text-charcoal/80 mb-4">{project.project.hoursPerWeek} hours per week</p>
                </div>
                
                                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Your Mentor</h3>
                  
                  {project.mentor.photo && (
                    <div className="mb-4 flex justify-center">
                      <img 
                        src={(() => {
                          const url = project.mentor.photo;
                          // Extract file ID from various Google Drive URL formats
                          const fileIdMatch = url.match(/[-\w]{25,}/);
                          if (fileIdMatch) {
                            const fileId = fileIdMatch[0];
                            // Use the thumbnail API which is more reliable
                            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
                          }
                          return url;
                        })()} 
                        alt={`Photo of ${project.mentor.name}`}
                        className="h-40 w-auto object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          console.error('Failed to load mentor photo:', project.mentor.photo);
                          console.error('Generated thumbnail URL:', e.currentTarget.src);
                          // Hide the image if it fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => console.log('Mentor photo loaded successfully:', project.mentor.photo)}
                      />
                    </div>
                  )}
                  
                  <p className="text-accent-blue font-medium mb-4">{project.mentor.name} • {project.mentor.organization}</p>
                  <p className="text-charcoal/80 mb-4">{project.mentor.bio}</p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    {isAuthenticated ? (
                      <a 
                        href={generateGoogleFormUrl(project)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold py-3">
                          Apply to this Project
                        </Button>
                      </a>
                    ) : (
                      <Button 
                        disabled
                        className="w-full bg-gray-300 text-gray-500 cursor-not-allowed font-semibold py-3"
                      >
                        Login to Apply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              

            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResearchProjects; 