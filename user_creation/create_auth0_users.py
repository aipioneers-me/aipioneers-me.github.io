import csv
import requests
import time
import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# === CONFIGURATION ===
# IMPORTANT: You need to create a Machine-to-Machine application in Auth0
# and grant it access to the Management API with these scopes:
# - read:users
# - create:users
# - update:users

AUTH0_DOMAIN = "dev-m4m8ov68ulxhp1xj.us.auth0.com"
#AUTH0_CLIENT_ID = "fcmwZ9jixnd07RpFvnaC44AiQPWbljaM"
#AUTH0_CLIENT_SECRET = "Sgo7WlEDVVgQNi1z2rwX41mr7I1j-LNdIyqhbZN1T5pbuJGJsw6jxnCGKl-Y98YO"
AUTH0_CLIENT_ID = "d5HOao3NEQJ8bDcdtSKFv6Aug1Hyyorg"
AUTH0_CLIENT_SECRET = "B0iLQyD4h7Dczg7rxT-IswkJSmdz6Sjo7CW381MD_7OZOE6Fac6rgGxSXW3IaX-H"

# For Management API, use the Management API identifier
AUTH0_AUDIENCE = "https://dev-m4m8ov68ulxhp1xj.us.auth0.com/api/v2/"
AUTH0_CONNECTION = "Username-Password-Authentication"

##CSV_FILE_PATH = "Participant Application (Responses) - Form Responses.csv"
EMAIL_FIELD_NAME = "Email"
APPROVED_FIELD_NAME = "Accepted"

GOOGLE_SHEET_ID = "1HrPrUh_kGdxR9VRDmxy-Y19mnoC7lvb0J3QFK6YnzfY"
GOOGLE_SHEET_TAB = "Form Responses 1"
GOOGLE_SERVICE_ACCOUNT_JSON = "participant-sheet-0e7fad4ab655.json"

# === AUTH0 HELPER FUNCTIONS ===

def get_auth0_token():
    url = f"https://{AUTH0_DOMAIN}/oauth/token"
    payload = {
        "client_id": AUTH0_CLIENT_ID,
        "client_secret": AUTH0_CLIENT_SECRET,
        "audience": AUTH0_AUDIENCE,
        "grant_type": "client_credentials"
    }
    
    print(f"🔐 Attempting to get Auth0 token...")
    print(f"   Domain: {AUTH0_DOMAIN}")
    print(f"   Client ID: {AUTH0_CLIENT_ID}")
    print(f"   Audience: {AUTH0_AUDIENCE}")
    
    try:
        response = requests.post(url, json=payload)
        
        if response.status_code == 403:
            print("❌ 403 Forbidden Error - This usually means:")
            print("   1. Your client doesn't have access to the Management API")
            print("   2. You need to create a Machine-to-Machine application")
            print("   3. The client needs these scopes: read:users, create:users, update:users")
            print("   4. Check your Auth0 dashboard → Applications → [Your App] → APIs tab")
            print(f"\n   Response: {response.text}")
            return None
        elif response.status_code != 200:
            print(f"❌ Error {response.status_code}: {response.text}")
            return None
            
        response.raise_for_status()
        token_data = response.json()
        print("✅ Successfully obtained Auth0 token")
        return token_data["access_token"]
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Network error: {e}")
        return None
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return None

def user_exists(email, token):
    url = f"https://{AUTH0_DOMAIN}/api/v2/users-by-email"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"email": email}
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    users = response.json()
    return len(users) > 0

def create_user(email, token):
    url = f"https://{AUTH0_DOMAIN}/api/v2/users"
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "email": email,
        "password": "TempPassword123!",  # Temporary password that user will change
        "connection": AUTH0_CONNECTION,
        "email_verified": False
    }
    
    print(f"  📝 Creating user with payload: {payload}")
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        
        if response.status_code == 400:
            print(f"  ❌ 400 Bad Request - Response: {response.text}")
            return None
        elif response.status_code != 201:
            print(f"  ❌ Error {response.status_code}: {response.text}")
            return None
            
        response.raise_for_status()
        return response.json()
        
    except Exception as e:
        print(f"  ❌ Exception creating user: {str(e)}")
        return None

def send_password_setup_invite(email, token):
    url = f"https://{AUTH0_DOMAIN}/api/v2/tickets/password-change"
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "email": email
    }
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    ticket_url = response.json().get("ticket")
    print(f"  ✉️  Invitation link (password setup): {ticket_url}")
    return ticket_url

import smtplib
from email.message import EmailMessage

def send_custom_email_gmail(recipient_email, invite_link):
    sender_email = "aipioneers.me@gmail.com"
    sender_password = "slic casc umbg xpgm"  # generated from Gmail App Passwords

    msg = EmailMessage()
    msg["Subject"] = "Your application at AI Pioneers"
    msg["From"] = sender_email
    msg["To"] = recipient_email
    msg.set_content(f"""
Welcome to AI Pioneers!

You can now express your interest in specific research projects after logging in on our website. 🎉

Your account has been created with these login credentials:
Email: {recipient_email}
Temporary Password: TempPassword123!

To get started:
1. Go to: {invite_link}
2. Scroll down to the "Access Your Account" section
3. Click "Login"
4. Enter your email and temporary password
5. You'll be prompted to change your password on first login

This temporary password will expire after your first login.

See you soon!  
– The AI Pioneers Team
""")

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        print(f"  📬 Custom invitation email sent to {recipient_email}")
# === MAIN SCRIPT ===

def _load_rows_from_google_sheet():
    """Returns a list of dicts using the header row from the sheet."""
    if not GOOGLE_SHEET_ID:
        raise RuntimeError("GOOGLE_SHEET_ID is not set.")
    if not os.path.exists(GOOGLE_SERVICE_ACCOUNT_JSON):
        raise RuntimeError(f"Service account JSON not found: {GOOGLE_SERVICE_ACCOUNT_JSON}")

    scope = [
        "https://www.googleapis.com/auth/spreadsheets.readonly",
        "https://www.googleapis.com/auth/drive.readonly",
    ]
    creds = ServiceAccountCredentials.from_json_keyfile_name(GOOGLE_SERVICE_ACCOUNT_JSON, scope)
    client = gspread.authorize(creds)

    # Open by key for robustness
    sh = client.open_by_key(GOOGLE_SHEET_ID)
    ws = sh.worksheet(GOOGLE_SHEET_TAB) if GOOGLE_SHEET_TAB else sh.get_worksheet(0)

    # get_all_records uses the first row as header; empty strings for blanks
    rows = ws.get_all_records(default_blank="")
    return rows

def _load_rows_from_csv():
    """Fallback if you want to keep CSV support."""
    if not os.path.exists(CSV_FILE_PATH):
        raise FileNotFoundError(f"CSV file not found: {CSV_FILE_PATH}")
    with open(CSV_FILE_PATH, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        return list(reader)

def process_sheet():
    print("🚀 Starting Google Sheet processing...")

    # Authenticate with Auth0 up front
    token = get_auth0_token()
    if not token:
        print("❌ Failed to get Auth0 token. Please fix the configuration issues above.")
        return
    print("✅ Authenticated with Auth0.")

    # Prefer Google Sheet; if GOOGLE_SHEET_ID is not set, fallback to CSV
    try:
        if GOOGLE_SHEET_ID:
            rows = _load_rows_from_google_sheet()
            print(f"✅ Loaded {len(rows)} rows from Google Sheet.")
        else:
            print("ℹ️ GOOGLE_SHEET_ID not set; falling back to CSV.")
            rows = _load_rows_from_csv()
            print(f"✅ Loaded {len(rows)} rows from CSV.")
    except Exception as e:
        print(f"❌ Failed to load input rows: {e}")
        return

    # Process approved users
    processed = created = skipped = errors = 0
    for row in rows:
        email = row.get(EMAIL_FIELD_NAME, "").strip()
        approved = row.get(APPROVED_FIELD_NAME, "").strip().lower()

        if approved != "yes" or not email:
            continue

        print(f"🔍 Processing approved user: {email}")

        try:
            if user_exists(email, token):
                print(f"  🔄 User already exists in Auth0.")
            else:
                user = create_user(email, token)
                if user:
                    print(f"  ✅ Created user: {user['user_id']}")
                    # Send custom email with login instructions instead of password change ticket
                    send_custom_email_gmail(email, "https://aipioneers.me")
                else:
                    print(f"  ❌ Failed to create user for {email}")
        except Exception as e:
            print(f"  ❌ Error processing {email}: {str(e)}")

        time.sleep(0.5)  # rate limiting

if __name__ == "__main__":
    process_sheet()