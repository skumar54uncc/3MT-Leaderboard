# Deploy 3MT Leaderboard to Vercel - Quick Guide

## 🚀 Quick Deployment (5 minutes)

### Method 1: Via Vercel Website (Easiest - Recommended)

#### Step 1: Push Code to GitHub
1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - 3MT Leaderboard"
   ```

2. **Create GitHub Repository**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it: `3mt-leaderboard` (or any name)
   - Don't initialize with README
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/3mt-leaderboard.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

#### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (use GitHub to sign in - easiest)
3. Click **"Add New..."** → **"Project"**
4. **Import** your GitHub repository
5. Vercel will auto-detect Vite settings ✅

#### Step 3: Add Environment Variable
1. In project settings, click **"Environment Variables"**
2. Click **"Add New"**
3. Add:
   - **Key**: `VITE_GOOGLE_SHEETS_API_KEY`
   - **Value**: Your Google Sheets API key
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
4. Click **"Save"**

#### Step 4: Deploy!
1. Click **"Deploy"** button
2. Wait ~1-2 minutes
3. Your app is live! 🎉

---

### Method 2: Via Vercel CLI (Command Line)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```
(Opens browser to authenticate)

#### Step 3: Deploy
```bash
cd "C:\Users\shail\Downloads\3MT leaderboard"
vercel
```

Follow prompts:
- Set up and deploy? → **Yes**
- Which scope? → Select your account
- Link to existing project? → **No** (first time)
- Project name? → Press Enter (or type custom name)
- Directory? → Press Enter (uses `./`)
- Override settings? → **No**

#### Step 4: Add Environment Variable
```bash
vercel env add VITE_GOOGLE_SHEETS_API_KEY
```
- Enter your API key when prompted
- Select: **Production, Preview, Development**

#### Step 5: Deploy to Production
```bash
vercel --prod
```

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] **Test build locally**: `npm run build` (should complete without errors)
- [ ] **Get Google Sheets API key** from [Google Cloud Console](https://console.cloud.google.com/)
- [ ] **Make Google Sheet public**: Share → "Anyone with the link" → Viewer
- [ ] **Logos are in `public/` folder**: `3mt-logo.jpg` and `cgll-logo.png`
- [ ] **`.env` file is NOT committed** (already in `.gitignore` ✅)

---

## 🔧 Configuration Files

I've created `vercel.json` with the correct settings:
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

Vercel should auto-detect these, but the file ensures correct settings.

---

## 🌐 After Deployment

Your app will be live at:
- **Production**: `your-project-name.vercel.app`
- **Preview**: `your-project-name-git-branch-username.vercel.app`

### Test Your Deployment
1. Open your Vercel URL
2. Check browser console for errors
3. Verify Google Sheets connection works
4. Test fullscreen button
5. Test all animations

---

## 🔄 Updating Your Deployment

Every time you push to GitHub:
- Vercel automatically creates a **preview deployment**
- When you merge to `main`, it auto-deploys to **production**

Or manually deploy:
```bash
vercel --prod
```

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Run `npm run build` locally to see errors
- Ensure all dependencies are in `package.json`

### API Not Working
- Verify environment variable is set: `VITE_GOOGLE_SHEETS_API_KEY`
- **Redeploy** after adding environment variables
- Check Google Sheet is public

### 404 Errors
- The `vercel.json` file handles routing
- Make sure `vercel.json` is in your project root

---

## 💡 Pro Tips

1. **Custom Domain**: Add your domain in Vercel project settings
2. **Preview Deployments**: Every Git push creates a preview URL
3. **Analytics**: Enable Vercel Analytics (free tier available)
4. **Environment Variables**: Can be different for Production vs Preview

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: support@vercel.com
- Check build logs in Vercel dashboard for detailed errors

---

**Ready to deploy?** Follow Method 1 (easiest) or Method 2 (CLI) above! 🚀

