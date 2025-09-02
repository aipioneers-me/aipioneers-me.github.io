export const auth0Config = {
  domain: "dev-m4m8ov68ulxhp1xj.us.auth0.com",
  clientId: "fcmwZ9jixnd07RpFvnaC44AiQPWbljaM", // SPA application for user login
  authorizationParams: {
    redirect_uri: window.location.origin,
    response_type: "token id_token",
  },
  cacheLocation: "localstorage" as const,
}; 