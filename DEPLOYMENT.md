# Deployment Guide

## Pre-Deployment Checklist

- [ ] Google Sheets API key configured (or backend proxy set up)
- [ ] CGLL logo added to `public/` folder
- [ ] Environment variables configured
- [ ] Tested locally with `npm run dev`
- [ ] Build tested with `npm run build`

## Deployment Options

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variable**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_GOOGLE_SHEETS_API_KEY` = your API key

4. **Redeploy** after adding environment variable

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add: `VITE_GOOGLE_SHEETS_API_KEY` = your API key

3. **Deploy**
   - Connect your Git repository, or
   - Drag and drop the `dist` folder after building locally

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize**
   ```bash
   firebase init hosting
   ```
   - Select existing project or create new
   - Public directory: `dist`
   - Single-page app: Yes
   - Overwrite index.html: No

3. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

4. **Environment Variables**
   - Firebase Hosting doesn't support environment variables directly
   - Use Firebase Functions as a proxy, or
   - Use a `.env.production` file (not recommended for API keys)

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Note**: Environment variables won't work with static hosting
   - Use a backend proxy instead
   - Or use GitHub Secrets with GitHub Actions

## Backend Proxy Setup (Production)

For production, it's recommended to use a backend proxy to keep API keys secure.

1. **Set up backend** (see `backend-proxy-example.js`)

2. **Update frontend** to call backend:
   ```typescript
   // In src/services/sheetsService.ts
   const response = await fetch('https://your-backend.com/api/sheets/scores');
   ```

3. **Deploy backend** separately (Heroku, Railway, Render, etc.)

## Environment Variables

### Development
Create `.env` file:
```
VITE_GOOGLE_SHEETS_API_KEY=your_key_here
```

### Production
Set in your hosting platform's environment variables section.

**Important**: Never commit `.env` files or API keys to version control!

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Verify TypeScript compilation: `npm run build`
- Check for TypeScript errors: `npx tsc --noEmit`

### API Not Working
- Verify API key is set correctly
- Check CORS settings if using direct API access
- Verify Google Sheet is accessible
- Check browser console for errors

### Assets Not Loading
- Ensure `public/` folder files are included
- Check that paths use `/` not `./`
- Verify build output includes all assets

## Performance Optimization

1. **Enable Compression**
   - Vercel/Netlify: Automatic
   - Firebase: Add `firebase.json` compression settings

2. **Caching**
   - Set appropriate cache headers for static assets
   - Consider CDN for faster global access

3. **Bundle Size**
   - Run `npm run build` and check bundle size
   - Consider code splitting if bundle is large

## Monitoring

- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor API quota usage in Google Cloud Console
- Set up uptime monitoring (UptimeRobot, Pingdom, etc.)

