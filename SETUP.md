# 3MT® Leaderboard Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Google Sheets API**
   
   You have two options:

   ### Option A: Public Sheet (Easiest for Development)
   
   If your Google Sheet is set to "Anyone with the link can view":
   
   1. Go to [Google Cloud Console](https://console.cloud.google.com/)
   2. Create a new project or select existing
   3. Enable "Google Sheets API"
   4. Go to "Credentials" → "Create Credentials" → "API Key"
   5. Restrict the API key to "Google Sheets API" only
   6. Create a `.env` file in the project root:
      ```
      VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
      ```

   ### Option B: Backend Proxy (Recommended for Production)
   
   For production, create a backend endpoint to securely access the Google Sheet:
   
   - Create a Node.js/Express server
   - Use service account credentials (not API key)
   - Expose endpoint: `GET /api/sheets/scores`
   - Update `src/services/sheetsService.ts` to call your backend

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Google Sheet Configuration

Ensure your sheet has the following structure:

**Tab Name**: `Finalists Score`

**Columns**:
- Column B: Round (e.g., "Final")
- Column C: Judge Name
- Column D: Student Name
- Column H: Research Score (0-7)
- Column I: Presentation Score (0-7)
- Column J: Total Score (0-14, auto-calculated)

**Important**: The app reads from row 2 onwards (row 1 is assumed to be headers).

## Adding CGLL Logo

1. Place your CGLL logo image in the `public` folder
2. Update `src/components/Header.tsx`:
   ```tsx
   <img src="/cgll-logo.png" alt="CGLL Logo" className="w-16 h-16" />
   ```

## Customization

### Update Refresh Interval

Edit `src/services/sheetsService.ts`:
```typescript
private refreshInterval: number = 8000; // milliseconds
```

### Change Colors

Edit `tailwind.config.js` to modify the 3MT brand colors.

## Troubleshooting

**Data not loading?**
- Check browser console for errors
- Verify API key is correct
- Ensure sheet is accessible (public or service account has access)
- Check that tab name is exactly "Finalists Score"

**Scores not updating?**
- Verify the sheet range in `sheetsService.ts`
- Check that scores are being entered in columns H, I, J
- Ensure judges are entering data in the correct format

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
# Add VITE_GOOGLE_SHEETS_API_KEY in Vercel dashboard
```

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variable in Netlify dashboard

### Firebase
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

