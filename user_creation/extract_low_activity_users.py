#!/usr/bin/env python3
"""
Script to extract users from Auth0 with less than N logins
and output their emails as a comma-separated list for easy copy-paste to Gmail.
"""

import requests
import json
import sys
from datetime import datetime
from config import (
    AUTH0_DOMAIN, 
    AUTH0_CLIENT_ID, 
    AUTH0_CLIENT_SECRET, 
    AUTH0_AUDIENCE,
    N_LOGINS_THRESHOLD as N_LOGINS,
    USERS_PER_PAGE
)

def get_auth0_token():
    """Get Auth0 Management API access token."""
    url = f"https://{AUTH0_DOMAIN}/oauth/token"
    
    payload = {
        "client_id": AUTH0_CLIENT_ID,
        "client_secret": AUTH0_CLIENT_SECRET,
        "audience": AUTH0_AUDIENCE,
        "grant_type": "client_credentials"
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()["access_token"]
    except requests.exceptions.RequestException as e:
        print(f"Error getting Auth0 token: {e}")
        sys.exit(1)

def get_user_logins_count(user):
    """Get the number of logins for a user from the user object."""
    # Auth0 user object contains logins_count field
    return user.get("logins_count", 0)

def get_all_users(access_token):
    """Get all users from Auth0."""
    url = f"https://{AUTH0_DOMAIN}/api/v2/users"
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    all_users = []
    page = 0
    
    while True:
        params = {
            "per_page": USERS_PER_PAGE,
            "page": page,
            "include_totals": "true"
        }
        
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            
            users = data.get("users", [])
            if not users:
                break
                
            all_users.extend(users)
            print(f"Fetched page {page + 1}, total users so far: {len(all_users)}")
            
            # Check if we've reached the end
            if len(users) < USERS_PER_PAGE:
                break
                
            page += 1
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching users page {page}: {e}")
            break
    
    return all_users

def main():
    print(f"🔍 Extracting users with less than {N_LOGINS} logins from Auth0...")
    print(f"📧 Domain: {AUTH0_DOMAIN}")
    print(f"📊 Threshold: < {N_LOGINS} logins")
    print("-" * 50)
    
    # Get access token
    print("🔑 Getting Auth0 access token...")
    access_token = get_auth0_token()
    print("✅ Access token obtained")
    
    # Get all users
    print("👥 Fetching all users...")
    users = get_all_users(access_token)
    print(f"✅ Found {len(users)} total users")
    
    # Filter users with low login activity
    print(f"🔍 Analyzing login activity for each user...")
    low_activity_users = []
    
    for i, user in enumerate(users, 1):
        user_id = user.get("user_id", "")
        email = user.get("email", "")
        name = user.get("name", "")
        
        if not email:
            print(f"⚠️  User {i}/{len(users)}: No email found for user_id: {user_id}")
            continue
        
        login_count = get_user_logins_count(user)
        print(f"📊 User {i}/{len(users)}: {email} ({login_count} logins)")
        
        if login_count < N_LOGINS:
            low_activity_users.append({
                "email": email,
                "name": name,
                "logins": login_count,
                "user_id": user_id
            })
    
    print("-" * 50)
    print(f"📈 Results:")
    print(f"   Total users: {len(users)}")
    print(f"   Users with < {N_LOGINS} logins: {len(low_activity_users)}")
    print(f"   Percentage: {len(low_activity_users)/len(users)*100:.1f}%")
    print()
    
    if low_activity_users:
        print("📧 Emails for Gmail (comma-separated):")
        print("-" * 50)
        
        # Sort by login count (ascending) for better organization
        low_activity_users.sort(key=lambda x: x["logins"])
        
        # Create comma-separated list
        emails = [user["email"] for user in low_activity_users]
        email_list = ", ".join(emails)
        
        print(email_list)
        print()
        print("📋 Detailed list:")
        print("-" * 50)
        
        for user in low_activity_users:
            print(f"   {user['email']} ({user['logins']} logins)")
    else:
        print("✅ No users found with less than the specified number of logins!")
    
    print()
    print("🎉 Script completed successfully!")

if __name__ == "__main__":
    main()
