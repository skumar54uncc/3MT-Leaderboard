# Troubleshooting: Google Sheets Not Syncing

## Quick Diagnosis

1. **Open your browser's Developer Console** (F12)
2. **Look for these messages:**
   - ⚠️ "Google Sheets API key not set" → API key issue
   - ❌ "Google Sheets API Error" → API or permissions issue
   - ✅ "Received data from Google Sheets" → Working correctly
   - ⚠️ "Using Mock Data" → Falling back to test data

## Common Issues & Solutions

### Issue 1: API Key Not Set

**Symptoms:**
- Console shows: "⚠️ Google Sheets API key not set. Using mock data."
- Leaderboard shows mock/test data instead of real scores

**Solution:**
1. Check your `.env` file exists in the project root
2. Verify it contains: `VITE_GOOGLE_SHEETS_API_KEY=your_actual_key`
3. **Restart the dev server** after changing `.env`:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```
4. Make sure the API key is a **simple string**, not JSON

### Issue 2: API Key Invalid or Restricted

**Symptoms:**
- Console shows: "❌ Google Sheets API Error: 403" or "400"
- Error message mentions "API key not valid" or "permission denied"

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Check your API key is:
   - **Enabled** (not disabled)
   - **Restricted** to "Google Sheets API" only
   - **Not expired**
3. Create a new API key if needed
4. Update `.env` and restart dev server

### Issue 3: Sheet Not Public

**Symptoms:**
- Console shows: "❌ Google Sheets API Error: 403 Forbidden"
- Error mentions "permission" or "access denied"

**Solution:**
1. Open your Google Sheet
2. Click **Share** button (top right)
3. Click **"Change to anyone with the link"**
4. Set permission to **"Viewer"**
5. Click **Done**

### Issue 4: Wrong Sheet ID or Range

**Symptoms:**
- Console shows: "❌ Google Sheets API Error: 400"
- Error mentions "Unable to parse range" or "Sheet not found"

**Solution:**
1. Verify the Sheet ID in `src/services/sheetsService.ts`:
   ```typescript
   const SPREADSHEET_ID = '1U-HaOFUK5DSgbknHRM_CiDcH30qWHCSLF9fWsJ015d0';
   ```
2. Verify the tab name is exactly: **"Finalists Score"** (case-sensitive)
3. Check the range: `Finalists Score!B2:J100`
4. Make sure columns H, I, J contain the scores

### Issue 5: CORS Error

**Symptoms:**
- Console shows: "CORS policy" or "blocked by CORS"
- Network tab shows CORS error

**Solution:**
- This shouldn't happen with Google Sheets API
- If it does, use a backend proxy (see `backend-proxy-example.js`)

### Issue 6: Empty Data

**Symptoms:**
- Console shows: "⚠️ No data.values found in response"
- Leaderboard is empty

**Solution:**
1. Check that your sheet has data in rows 2-100
2. Verify columns B, C, D, H, I, J have data
3. Check that the tab name matches exactly

### Issue 7: Column Mapping Wrong

**Symptoms:**
- Data loads but scores are wrong or zero
- Console shows rows processed but scores are 0

**Solution:**
1. Verify your sheet structure:
   - Column B = Round
   - Column C = Judge Name
   - Column D = Student Name
   - Column H = Research Score
   - Column I = Presentation Score
   - Column J = Total Score
2. Check that scores are **numbers**, not text

## Debug Steps

1. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for emoji indicators (📊, ✅, ❌, ⚠️)

2. **Check Network Tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Look for requests to `sheets.googleapis.com`
   - Check the response status and body

3. **Verify Environment Variable:**
   ```bash
   # In your terminal, check if env var is loaded
   echo $VITE_GOOGLE_SHEETS_API_KEY  # Linux/Mac
   # Or check .env file directly
   ```

4. **Test API Key Manually:**
   ```
   https://sheets.googleapis.com/v4/spreadsheets/1U-HaOFUK5DSgbknHRM_CiDcH30qWHCSLF9fWsJ015d0/values/Finalists%20Score!B2:J100?key=YOUR_API_KEY
   ```
   Replace `YOUR_API_KEY` with your actual key and open in browser

## Still Not Working?

1. **Check the console logs** - they will tell you exactly what's wrong
2. **Verify your API key** works by testing the URL above
3. **Make sure the sheet is public** (Share → Anyone with link)
4. **Restart the dev server** after any `.env` changes
5. **Check that the tab name is exactly "Finalists Score"** (case-sensitive)

## Using Backend Proxy Instead

If you continue having issues with direct API access, use a backend proxy:

1. Set up `backend-proxy-example.js` with a service account
2. Update `src/services/sheetsService.ts` to call your backend:
   ```typescript
   const response = await fetch('http://localhost:3001/api/sheets/scores');
   ```

This is more secure and avoids CORS/API key issues.

