import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";

const AlumniNetwork = () => {
  const { isAuthenticated, isLoading, user, login, logout } = useAuth();

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto py-16 px-4">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
              <span className="ml-3 text-charcoal">Loading...</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-accent-blue">Alumni Network</h1>
        
        {!isAuthenticated ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Login Required</h2>
            <p className="text-charcoal/80 mb-6">
              Welcome to the AI Pioneers Alumni Network! <br /> 
              This area is for past participants to connect, share updates, and continue collaborating.
            </p>
            <div className="bg-light-gray p-6 rounded-lg">
              <p className="text-charcoal/80 mb-4">
                Please log in with your approved account to access the alumni network.
              </p>
              <Button 
                onClick={login}
                className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-charcoal">Welcome, {user?.name || user?.email}!</h2>
              <Button 
                onClick={logout}
                variant="outline"
                className="text-charcoal border-charcoal hover:bg-charcoal hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
            
            <div className="bg-light-gray p-6 rounded-lg mb-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 mr-2 text-accent-blue" />
                <h3 className="text-lg font-semibold text-charcoal">Your Profile</h3>
              </div>
              <div className="space-y-2 text-charcoal/80">
                <p><strong>Email:</strong> {user?.email}</p>
                {user?.name && <p><strong>Name:</strong> {user.name}</p>}
                <p><strong>Member since:</strong> {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-accent-blue/10 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-accent-blue mb-2">Alumni Features</h3>
                <ul className="text-charcoal/80 space-y-1">
                  <li>• Connect with other alumni</li>
                  <li>• Share research updates</li>
                  <li>• Access exclusive resources</li>
                  <li>• Participate in alumni events</li>
                </ul>
              </div>
              
              <div className="bg-dark-red/10 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-dark-red mb-2">Coming Soon</h3>
                <p className="text-charcoal/80">
                  More features are being developed to enhance the alumni experience. 
                  Stay tuned for updates!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AlumniNetwork; 