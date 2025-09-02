import { useAuth0 } from "@auth0/auth0-react";

export const useAuth = () => {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    error,
  } = useAuth0();

  const login = () => {
    console.log("🔐 Attempting to login...");
    console.log("🔍 Current URL:", window.location.href);
    console.log("🔍 Origin:", window.location.origin);
    console.log("🔍 Pathname:", window.location.pathname);
    
    try {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  const logoutUser = () => {
    console.log("🚪 Logging out...");
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  // Debug logging
  console.log("🔍 Auth state:", { isAuthenticated, isLoading, user, error });
  
  // Check URL parameters for Auth0 errors
  const urlParams = new URLSearchParams(window.location.search);
  const auth0Error = urlParams.get('error');
  const auth0ErrorDescription = urlParams.get('error_description');
  
  if (auth0Error) {
    console.error("❌ Auth0 URL Error:", auth0Error);
    console.error("❌ Auth0 Error Description:", auth0ErrorDescription);
  }
  
  // Additional debugging for token exchange
  if (error) {
    console.error("❌ Auth0 Error:", error);
    console.error("❌ Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout: logoutUser,
    getAccessTokenSilently,
    error,
  };
}; 