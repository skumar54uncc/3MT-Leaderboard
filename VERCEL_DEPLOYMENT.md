# Deploy to Vercel - Step by Step Guide

## Option 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Prepare Your Code
1. Make sure all your code is committed to Git
2. Push to GitHub, GitLab, or Bitbucket

### Step 2: Sign Up / Login to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in (you can use GitHub account)

### Step 3: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Import your Git repository
3. Vercel will auto-detect it's a Vite project

### Step 4: Configure Build Settings
Vercel should auto-detect these, but verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 5: Add Environment Variable
1. In the project settings, go to **"Environment Variables"**
2. Click **"Add New"**
3. Add:
   - **Name**: `VITE_GOOGLE_SHEETS_API_KEY`
   - **Value**: Your Google Sheets API key
   - **Environments**: Select all (Production, Preview, Development)

### Step 6: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (~1-2 minutes)
3. Your app will be live at `your-project-name.vercel.app`

---

## Option 2: Deploy via Vercel CLI (Advanced)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Navigate to Project
```bash
cd "C:\Users\shail\Downloads\3MT leaderboard"
```

### Step 4: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No** (first time)
- Project name? (Press Enter for default or type custom name)
- Directory? (Press Enter for `./`)
- Override settings? **No**

### Step 5: Add Environment Variable
```bash
vercel env add VITE_GOOGLE_SHEETS_API_KEY
```
- Select environments: **Production, Preview, Development**
- Enter your API key value

### Step 6: Redeploy
```bash
vercel --prod
```

---

## Important Notes

### Environment Variables
- **Never commit your `.env` file** to Git
- Add `VITE_GOOGLE_SHEETS_API_KEY` in Vercel dashboard
- After adding env vars, you need to **redeploy** for them to take effect

### Google Sheets API Key
1. Get your API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Make sure it's restricted to "Google Sheets API" only
3. Make your Google Sheet **public** (Share → Anyone with link)

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Troubleshooting

**Build Fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors: `npm run build` locally first

**API Not Working?**
- Verify environment variable is set correctly
- Check that variable name is exactly: `VITE_GOOGLE_SHEETS_API_KEY`
- Redeploy after adding environment variables

**Sheet Not Loading?**
- Verify Google Sheet is public
- Check API key has correct permissions
- Check browser console on deployed site

### Quick Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls
```

---

## Post-Deployment Checklist

- [ ] App loads correctly at Vercel URL
- [ ] Environment variable is set
- [ ] Google Sheets API is working
- [ ] Fullscreen button works
- [ ] All animations work
- [ ] Logos display correctly
- [ ] Test on mobile/tablet if needed

---

## Free Tier Limits

Vercel's free tier includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Preview deployments for every push

Perfect for your 3MT leaderboard! 🎉

