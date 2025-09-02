import requests

# === CONFIGURATION ===
AUTH0_DOMAIN = "dev-m4m8ov68ulxhp1xj.us.auth0.com"
AUTH0_CLIENT_ID = "d5HOao3NEQJ8bDcdtSKFv6Aug1Hyyorg"
AUTH0_CLIENT_SECRET = "B0iLQyD4h7Dczg7rxT-IswkJSmdz6Sjo7CW381MD_7OZOE6Fac6rgGxSXW3IaX-H"
AUTH0_AUDIENCE = "https://dev-m4m8ov68ulxhp1xj.us.auth0.com/api/v2/"

def get_auth0_token():
    url = f"https://{AUTH0_DOMAIN}/oauth/token"
    payload = {
        "client_id": AUTH0_CLIENT_ID,
        "client_secret": AUTH0_CLIENT_SECRET,
        "audience": AUTH0_AUDIENCE,
        "grant_type": "client_credentials"
    }
    response = requests.post(url, json=payload)
    response.raise_for_status()
    return response.json()["access_token"]

def delete_user(email, token):
    # First find the user by email
    url = f"https://{AUTH0_DOMAIN}/api/v2/users-by-email"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"email": email}
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    users = response.json()
    
    if len(users) == 0:
        print(f"❌ No user found with email: {email}")
        return False
    
    user_id = users[0]["user_id"]
    print(f"🔍 Found user: {user_id}")
    
    # Delete the user
    delete_url = f"https://{AUTH0_DOMAIN}/api/v2/users/{user_id}"
    delete_response = requests.delete(delete_url, headers=headers)
    delete_response.raise_for_status()
    
    print(f"✅ Successfully deleted user: {user_id}")
    return True

if __name__ == "__main__":
    print("🗑️ Deleting user from Auth0...")
    token = get_auth0_token()
    delete_user("claus.horn@gmail.com", token)
