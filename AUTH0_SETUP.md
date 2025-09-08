# Auth0 Setup Guide

This guide will help you set up Auth0 for the AI Pioneers Alumni Network authentication.

## Prerequisites

1. An Auth0 account (sign up at https://auth0.com)
2. Your application running locally

## Step 1: Create an Auth0 Application

1. Log in to your Auth0 dashboard
2. Go to "Applications" → "Applications"
3. Click "Create Application"
4. Choose "Single Page Application" (SPA)
5. Give it a name like "AI Pioneers Alumni Network"
6. Click "Create"

## Step 2: Configure Auth0 Application Settings

1. In your Auth0 application settings, configure:

### Allowed Callback URLs:
```
http://localhost:5173,http://localhost:5173/alumni
```

### Allowed Logout URLs:
```
http://localhost:5173,http://localhost:5173/alumni
```

### Allowed Web Origins:
```
http://localhost:5173
```

## Step 3: Update Application Configuration

1. Copy your Auth0 Domain and Client ID from the Auth0 dashboard
2. Open `src/lib/auth0-config.ts`
3. Replace the placeholder values:

```typescript
export const auth0Config = {
  domain: "your-domain.auth0.com", // Replace with your actual Auth0 domain
  clientId: "your-client-id", // Replace with your actual Auth0 client ID
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: "YOUR_API_AUDIENCE", // Optional: if you have an API
  },
  cacheLocation: "localstorage" as const,
};
```

## Step 4: User Management

Since registration is handled via Google Forms, you'll need to manually create users in Auth0:

1. Go to "User Management" → "Users" in your Auth0 dashboard
2. Click "Create User"
3. Enter the email address of approved participants
4. Set a temporary password
5. Send login credentials to the user via email

## Step 5: Email Notifications (Optional)

To automate the process of sending login credentials to approved users:

1. Set up Auth0 Actions or Rules to send welcome emails
2. Configure email templates in Auth0
3. Set up webhooks to trigger when users are approved

## Testing

1. Start your development server: `npm run dev`
2. Navigate to `/alumni`
3. Click "Login"
4. You should be redirected to Auth0's login page
5. After successful login, you'll be redirected back to the alumni page

## Production Deployment

When deploying to production:

1. Update the Auth0 application settings with your production URLs
2. Update the `auth0-config.ts` file with production URLs
3. Ensure your domain is properly configured in Auth0

## Security Notes

- Never commit your Auth0 credentials to version control
- Use environment variables for production deployments
- Regularly rotate your Auth0 client secrets
- Monitor Auth0 logs for suspicious activity

## Troubleshooting

### Common Issues:

1. **Redirect URI mismatch**: Ensure your callback URLs in Auth0 match your application URLs exactly
2. **CORS errors**: Make sure your web origins are properly configured
3. **Login not working**: Check that your Auth0 domain and client ID are correct

### Getting Help:

- Check Auth0 documentation: https://auth0.com/docs
- Review Auth0 logs in your dashboard
- Check browser console for error messages 