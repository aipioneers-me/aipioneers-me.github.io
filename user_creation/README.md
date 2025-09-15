# Auth0 User Management Scripts

This directory contains scripts for managing Auth0 users for the AI Pioneers platform.

## Setup

1. **Configure Auth0 M2M Application:**
   - Create a Machine-to-Machine application in your Auth0 dashboard
   - Grant it access to the Management API with these scopes:
     - `read:users`
     - `create:users`
     - `update:users`
     - `create:user_tickets`
     - `delete:users` (optional, for testing)

2. **Update Configuration:**
   - Edit `config.py` and replace the placeholder values:
     - `AUTH0_CLIENT_ID`: Your M2M application client ID
     - `AUTH0_CLIENT_SECRET`: Your M2M application client secret
     - `GMAIL_APP_PASSWORD`: Your Gmail app password (for email sending)
     - `FROM_EMAIL`: Your Gmail address
     - `N_LOGINS_THRESHOLD`: Number of logins threshold for filtering

## Scripts

### 1. `create_auth0_users.py`
Creates Auth0 users from a CSV file and sends them welcome emails.

**Usage:**
```bash
python create_auth0_users.py
```

**Features:**
- Reads user data from CSV file
- Creates Auth0 users with temporary passwords
- Sends custom welcome emails via Gmail
- Handles existing users gracefully
- Provides detailed progress logging

### 2. `extract_low_activity_users.py`
Extracts users with low login activity and outputs their emails for easy copy-paste to Gmail.

**Usage:**
```bash
python extract_low_activity_users.py
```

**Features:**
- Fetches all users from Auth0
- Checks login count for each user
- Filters users with less than N logins
- Outputs comma-separated email list
- Provides detailed statistics

**Example Output:**
```
📧 Emails for Gmail (comma-separated):
user1@example.com, user2@example.com, user3@example.com
```

## Configuration Options

In `config.py`, you can adjust:

- `N_LOGINS_THRESHOLD`: Users with fewer than this many logins will be included in the extraction
- `USERS_PER_PAGE`: Number of users to fetch per API call (default: 100)
- `AUTH0_DOMAIN`: Your Auth0 domain
- Email settings for sending notifications

## Requirements

```bash
pip install requests
```

## Notes

- Both scripts use the same Auth0 M2M application credentials
- The extraction script may take a while for large user bases as it checks each user's login count
- Make sure your Auth0 M2M application has the necessary scopes before running the scripts
