# 🚀 Quick Deploy to Vercel - Your Code is on GitHub!

Your code is now at: **https://github.com/skumar54uncc/3MT-Leaderboard**

## Deploy to Vercel (2 minutes)

### Step 1: Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (use GitHub to sign in - it's the easiest!)

### Step 2: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find **"3MT-Leaderboard"** and click **"Import"**

### Step 3: Configure (Auto-detected)
Vercel will auto-detect:
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`

**Just click "Deploy"** - no changes needed!

### Step 4: Add Environment Variable (IMPORTANT!)
**Before or after first deploy:**

1. Go to your project on Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Click **"Add New"**
4. Add:
   - **Key**: `VITE_GOOGLE_SHEETS_API_KEY`
   - **Value**: Your Google Sheets API key
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
5. Click **"Save"**

### Step 5: Redeploy (if you added env var after first deploy)
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"**

---

## ✅ That's It!

Your app will be live at: `3mt-leaderboard.vercel.app` (or similar)

### Test Your Deployment:
1. Open your Vercel URL
2. Check if it loads
3. Verify Google Sheets connection works
4. Test fullscreen button (bottom right)

---

## 🔄 Future Updates

Every time you push to GitHub:
- Vercel automatically creates a preview deployment
- Merging to `main` auto-deploys to production

Or manually deploy:
```bash
vercel --prod
```

---

## 📝 What Was Deployed

✅ All source code
✅ React + TypeScript + Vite setup
✅ TailwindCSS configuration
✅ All components (Header, Leaderboard, Podium, etc.)
✅ Google Sheets integration
✅ Animations and confetti
✅ Logos (3MT and CGLL)
✅ Fullscreen button
✅ All documentation

**Note**: `.env` file is NOT included (protected by `.gitignore`)

---

## 🎉 You're Ready!

Go to [vercel.com](https://vercel.com) and import your repository now!

