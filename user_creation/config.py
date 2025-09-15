# Auth0 Configuration for user management scripts
# Update these values with your actual Auth0 M2M application credentials

# Auth0 Domain
AUTH0_DOMAIN = "dev-m4m8ov68ulxhp1xj.us.auth0.com"

# M2M Application Credentials (for API access)
AUTH0_CLIENT_ID = "d5HOao3NEQJ8bDcdtSKFv6Aug1Hyyorg"
AUTH0_CLIENT_SECRET = "B0iLQyD4h7Dczg7rxT-IswkJSmdz6Sjo7CW381MD_7OZOE6Fac6rgGxSXW3IaX-H"
AUTH0_AUDIENCE = f"https://{AUTH0_DOMAIN}/api/v2/"

# Script Configuration
N_LOGINS_THRESHOLD = 3  # Users with less than this many logins will be included
USERS_PER_PAGE = 100  # Auth0 API pagination limit

# Email Configuration (for create_auth0_users.py)
GMAIL_APP_PASSWORD = "slic casc umbg xpgm"  # Gmail app password
FROM_EMAIL = "aipioneers.me@gmail.com"  # Gmail address
