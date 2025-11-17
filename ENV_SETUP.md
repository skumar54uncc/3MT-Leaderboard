# Environment Variable Setup Guide

## Current Issue

Your `.env` file contains OAuth2 credentials, but the app expects a **simple API key** for Google Sheets API.

## Two Options:

### Option 1: Simple API Key (Recommended for Development)

1. **Get a Google Sheets API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project (or create new)
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - **Restrict the key** to "Google Sheets API" only
   - Copy the API key (it will look like: `AIzaSyB...`)

2. **Update your `.env` file:**
   ```env
   VITE_GOOGLE_SHEETS_API_KEY=AIzaSyB_your_actual_api_key_here
   ```
   
   **Important:** Just the API key string, not JSON!

3. **Make sure your Google Sheet is public:**
   - Open your Google Sheet
   - Click "Share" → "Change to anyone with the link"
   - Set permission to "Viewer"

### Option 2: Use Backend Proxy (Recommended for Production)

If you want to use OAuth2 credentials (more secure), you need to:

1. **Set up a backend server** (see `backend-proxy-example.js`)
2. **Store OAuth2 credentials on the backend** (not in frontend `.env`)
3. **Update `src/services/sheetsService.ts`** to call your backend:
   ```typescript
   const response = await fetch('http://your-backend/api/sheets/scores');
   ```

## Current `.env` Format (WRONG):
```env
VITE_GOOGLE_SHEETS_API_KEY={"web":{"client_id":"...","client_secret":"..."}}
```

## Correct `.env` Format (Option 1):
```env
VITE_GOOGLE_SHEETS_API_KEY=AIzaSyB_your_simple_api_key_here
```

## Security Notes

- ✅ **API Key**: Safe to use in frontend for public sheets (restricted to Sheets API)
- ❌ **OAuth2 Client Secret**: Should NEVER be in frontend code
- ✅ **Backend Proxy**: Best practice for production (keeps secrets server-side)

## Quick Fix

1. Delete the current content in `.env`
2. Add just: `VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here`
3. Replace `your_api_key_here` with your actual Google Sheets API key

