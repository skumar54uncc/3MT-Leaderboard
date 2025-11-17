# 3MT® 2025 Leaderboard

A real-time, animated leaderboard web application for the Three Minute Thesis (3MT®) competition. This app displays live rankings of finalists as judges enter scores in a Google Sheet.

## 🎯 Features

- **Real-time Updates**: Automatically refreshes scores every 8 seconds from Google Sheets
- **Animated Rankings**: Smooth transitions when positions change
- **Podium Display**: Special celebration animation for top 3 finalists when scoring is complete
- **3MT® Branding**: Official colors and styling guidelines
- **CGLL Integration**: Center for Graduate Life & Learning logo support
- **Responsive Design**: Optimized for projection and large screens

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Google Sheets API key (or backend proxy for secure access)
- Access to the Google Sheet: `1U-HaOFUK5DSgbknHRM_CiDcH30qWHCSLF9fWsJ015d0`

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google Sheets API

#### Option A: Public Sheet Access (Development)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Restrict the API key to Google Sheets API only
6. Create a `.env` file in the root directory:

```env
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
```

#### Option B: Backend Proxy (Recommended for Production)

For production, you should use a backend proxy to keep your API key secure. The current implementation supports direct API access, but you should modify `src/services/sheetsService.ts` to call your backend endpoint instead.

Example backend endpoint structure:
```
GET /api/sheets/scores
```

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 📊 Google Sheet Structure

The app expects the following sheet structure:

| Column | Description |
|--------|-------------|
| B | Round (e.g., "Final") |
| C | Judge Name |
| D | Student Name |
| H | Research Score (0-7) |
| I | Presentation Score (0-7) |
| J | Total Score (0-14, auto-calculated) |

**Sheet Tab**: `Finalists Score`

**Scoring Rules**:
- Each judge scores research (H) and presentation (I) out of 7
- Total score per judge (J) must not exceed 14
- The app automatically caps scores at 14 per judge

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to modify colors:
- Primary: `#51247A` (3MT Purple)
- Secondary: `#962A8B` (3MT Pink)
- Gold/Silver/Bronze for podium

### Update Interval

Modify the refresh interval in `src/services/sheetsService.ts`:
```typescript
private refreshInterval: number = 8000; // milliseconds
```

### CGLL Logo

1. Place your CGLL logo image in the `public/` folder (e.g., `public/cgll-logo.png`)
2. Update `src/components/Header.tsx` to replace the placeholder:

```tsx
<img src="/cgll-logo.png" alt="CGLL Logo" className="w-16 h-16" />
```

The logo will be automatically included in the build.

## 🏗️ Project Structure

```
3MT-leaderboard/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Top header with logos
│   │   ├── Leaderboard.tsx     # Main leaderboard display
│   │   ├── Podium.tsx          # Top 3 celebration view
│   │   └── StatusIndicator.tsx # Live status indicator
│   ├── hooks/
│   │   └── useLeaderboard.ts   # Data fetching hook
│   ├── services/
│   │   └── sheetsService.ts    # Google Sheets API integration
│   ├── types.ts                # TypeScript type definitions
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets (add logos here)
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 🔒 Security Notes

1. **API Keys**: Never commit API keys to version control. Use environment variables.
2. **Backend Proxy**: For production, implement a backend service to handle Google Sheets API calls.
3. **CORS**: If using direct API access, ensure CORS is properly configured.

## 🚢 Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variable: `VITE_GOOGLE_SHEETS_API_KEY`

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variable in Netlify dashboard

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## 🐛 Troubleshooting

### Data Not Loading

1. Check that the Google Sheet is accessible
2. Verify API key is correct in `.env`
3. Check browser console for errors
4. Ensure the sheet tab name matches: `Finalists Score`

### Scores Not Updating

1. Verify the sheet range in `sheetsService.ts` matches your data
2. Check that column indices (H, I, J) are correct
3. Ensure judges are entering scores in the correct columns

### Animation Issues

1. Clear browser cache
2. Check that Framer Motion is installed: `npm install framer-motion`

## 📝 License

This project is created for the 3MT® 2025 competition.

## 🤝 Support

For issues or questions, please contact the Center for Graduate Life & Learning.

---

**Note**: This application is designed specifically for the 3MT® competition and follows official 3MT® brand guidelines.

