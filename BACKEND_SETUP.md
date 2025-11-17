# Backend Setup Guide

You have OAuth2 credentials (`client_secret_*.json`), but for an automated leaderboard, you have two options:

## Option 1: Use Simple API Key (Easiest)

**Best for:** Development and public sheets

1. Get a simple API key from Google Cloud Console
2. Update `.env` file:
   ```env
   VITE_GOOGLE_SHEETS_API_KEY=AIzaSyB_your_api_key_here
   ```
3. Make your Google Sheet public (Share → Anyone with link)

**Pros:** Simple, no backend needed  
**Cons:** API key is visible in frontend code

## Option 2: Use Service Account (Recommended for Production)

**Best for:** Automated, server-to-server access

1. Go to Google Cloud Console → IAM & Admin → Service Accounts
2. Create a new service account
3. Download the service account JSON key
4. Share your Google Sheet with the service account email
5. Use `backend-proxy-example.js` with the service account key

**Pros:** Secure, automated, no user interaction  
**Cons:** Requires backend server

## Option 3: Use OAuth2 (Current Setup)

**Best for:** User-authorized access

You have OAuth2 credentials, but this requires:
- Initial user authorization (visit `/auth` endpoint)
- Storing refresh tokens
- More complex setup

**Use `backend-proxy-oauth2.js`** if you want to use OAuth2, but note:
- First time: User must visit `/auth` to authorize
- Tokens expire and need refresh
- Not ideal for automated leaderboard

## Quick Recommendation

**For your 3MT leaderboard:**
1. **Development:** Use simple API key (Option 1)
2. **Production:** Use Service Account with backend proxy (Option 2)

The OAuth2 credentials you have are better suited for apps that require user login, not automated data fetching.

## Next Steps

1. **If using API key:** Update `.env` with your API key
2. **If using Service Account:** 
   - Create service account in Google Cloud Console
   - Download JSON key
   - Update `backend-proxy-example.js` to use it
   - Share Google Sheet with service account email
3. **If using OAuth2:** Follow instructions in `backend-proxy-oauth2.js`

## Security Notes

- ✅ **API Key (restricted)**: OK for public sheets in development
- ✅ **Service Account**: Best for production automated access
- ⚠️ **OAuth2**: Requires user interaction, not ideal for leaderboard
- ❌ **Never commit credentials files to git** (already in `.gitignore`)

