export const auth0Config = {
  domain: "dev-m4m8ov68ulxhp1xj.us.auth0.com", // Replace with your Auth0 domain
  clientId: "fcmwZ9jixnd07RpFvnaC44AiQPWbljaM", // Replace with your Auth0 client ID
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: "YOUR_API_AUDIENCE", // Optional: if you have an API
  },
  cacheLocation: "localstorage" as const,
}; 