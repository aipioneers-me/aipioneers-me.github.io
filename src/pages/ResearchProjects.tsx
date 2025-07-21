import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, FileText, AlertCircle } from "lucide-react";

interface Project {
  id: string;
  mentor: {
    name: string;
    organization: string;
    bio: string;
    email: string;
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

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
            <p className="text-lg text-charcoal/80 mb-4">Research projects will be listed here September 1</p>
            <p className="text-charcoal/60">Check back soon to browse available research opportunities!</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
    }
  };

  const handleSubmitApplication = () => {
    if (uploadedFile && selectedProject) {
      // Here you would typically upload the file to your server
      console.log("Submitting application for project:", selectedProject.project.title);
      console.log("Uploaded file:", uploadedFile.name);
      // Reset form
      setUploadedFile(null);
      setSelectedProject(null);
    }
  };

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
                <p className="text-accent-blue font-medium">{project.mentor.name} • {project.mentor.organization}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Project Description</h3>
                  <p className="text-charcoal/80 mb-4 whitespace-pre-wrap">{project.project.description}</p>
                  
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Research Area</h3>
                  <p className="text-charcoal/80 mb-4">{project.project.researchArea}</p>
                  
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Prerequisites</h3>
                  <p className="text-charcoal/80 mb-4 whitespace-pre-wrap">{project.project.prerequisites}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Mentor Bio</h3>
                  <p className="text-charcoal/80 mb-4">{project.mentor.bio}</p>
                  
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Time Commitment</h3>
                  <p className="text-charcoal/80 mb-4">{project.project.hoursPerWeek} hours per week</p>
                  
                  {project.questions.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold text-charcoal mb-3">Application Questions</h3>
                      <ol className="list-decimal list-inside space-y-2 text-charcoal/80">
                        {project.questions.map((question, index) => (
                          <li key={index}>{question}</li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              </div>
              
              {isAuthenticated && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => setSelectedProject(project)}
                        className="bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold py-3 px-6"
                      >
                        Apply to this Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-charcoal">
                          Apply to: {project.project.title}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {project.project.pdfUrl && (
                          <div className="bg-light-gray p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <FileText className="w-5 h-5 text-accent-blue mr-2" />
                              <h3 className="font-semibold text-charcoal">Project Description PDF</h3>
                            </div>
                            <a 
                              href={project.project.pdfUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-accent-blue hover:underline"
                            >
                              View PDF Description
                            </a>
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-lg font-semibold text-charcoal mb-3">
                            In order to apply to this project submit a PDF with your answers to these questions:
                          </h3>
                          <ol className="list-decimal list-inside space-y-2 text-charcoal/80 mb-4">
                            {project.questions.map((question, index) => (
                              <li key={index} className="mb-2">{question}</li>
                            ))}
                          </ol>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="pdf-upload" className="block text-sm font-medium text-charcoal mb-2">
                              Upload your PDF application
                            </label>
                            <div className="flex items-center space-x-4">
                              <input
                                type="file"
                                id="pdf-upload"
                                accept=".pdf"
                                onChange={handleFileUpload}
                                className="block w-full text-sm text-charcoal/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent-blue file:text-white hover:file:bg-accent-blue/90"
                              />
                            </div>
                            {uploadedFile && (
                              <p className="text-sm text-green-600 mt-2 flex items-center">
                                <Upload className="w-4 h-4 mr-1" />
                                {uploadedFile.name} selected
                              </p>
                            )}
                          </div>
                          
                          <Button 
                            onClick={handleSubmitApplication}
                            disabled={!uploadedFile}
                            className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold py-3"
                          >
                            Submit Application
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResearchProjects; 