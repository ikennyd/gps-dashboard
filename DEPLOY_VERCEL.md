# Deploying GPS Dashboard to Vercel

## Architecture

This deployment strategy uses:
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Express API) - *Keep backend on Railway*

This separation provides:
- ✅ Optimal performance for each service
- ✅ Independent scaling
- ✅ CORS properly configured

---

## Quick Start

```bash
./deploy-vercel.sh
```

Choose between:
1. **Production** - Live deployment
2. **Preview** - Testing before production

---

## Prerequisites

### 1. **Vercel Account**
   - Sign up at https://vercel.com
   - Free tier available

### 2. **Git Repository**
   - Code must be on GitHub (already done ✅)
   - Vercel can auto-deploy on git push

### 3. **Backend Running**
   - Keep backend on Railway
   - Frontend will call Railway API

---

## Step-by-Step Manual Deployment

### Option A: Using the Automated Script

```bash
./deploy-vercel.sh
```

### Option B: Manual Steps

```bash
# 1. Login to Vercel
vercel login

# 2. Deploy to preview
vercel deploy

# 3. Or deploy to production
vercel deploy --prod
```

### Option C: Connect GitHub Repository

1. Go to https://vercel.com/new
2. Select your GitHub repository `gps-dashboard`
3. Set build settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build:frontend`
   - **Output Directory**: `dist`
4. Click Deploy

---

## Configuration

### `vercel.json`

The project includes `vercel.json` with:

```json
{
  "buildCommand": "npm run build:frontend",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- ✅ Correct build command
- ✅ React Router works (SPA fallback)
- ✅ Proper output directory

### Environment Variables

Set in Vercel Dashboard:
```
VITE_API_URL=https://your-railway-app.railway.app
```

Or update in code if using default.

---

## Updating After Initial Deploy

### Option 1: Auto-Deploy (Recommended)

Connect your GitHub repository to Vercel. Every push to `main` automatically deploys.

### Option 2: Manual Deploy

```bash
git push origin main  # Push to GitHub
./deploy-vercel.sh    # Redeploy from latest build
```

---

## Post-Deployment

### View Deployments
```bash
vercel list
```

### View Logs
```bash
vercel logs [deployment-url]
```

### Set Environment Variables
```bash
vercel env add VITE_API_URL
vercel deploy --prod
```

### Rollback to Previous Deployment
```bash
vercel rollback
```

---

## Connecting Frontend to Backend

### Update API Endpoint

The frontend needs to know the backend URL. Options:

#### 1. Environment Variable (Recommended)
```bash
# In Vercel Dashboard, set:
VITE_API_URL=https://your-railway-app.railway.app

# In code (src/services/api.js):
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

#### 2. Hardcode in Production
```js
const API_URL = 'https://your-railway-app.railway.app';
```

#### 3. Auto-detect from Request
```js
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-railway-app.railway.app'
  : 'http://localhost:8000';
```

---

## CORS Configuration

### Frontend (Vercel)
- Served from: `https://your-app.vercel.app`

### Backend (Railway)
- Served from: `https://your-api.railway.app`

### Update Backend CORS
In `backend/server.js`:

```js
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://your-app.vercel.app']
  : ['http://localhost:3000', 'http://localhost:5173'];
```

---

## Deployment Checklist

- [ ] Frontend builds successfully: `npm run build:frontend`
- [ ] `dist/` folder contains built files
- [ ] `vercel.json` is configured
- [ ] Environment variables set in Vercel Dashboard
- [ ] Backend URL accessible from frontend
- [ ] CORS configured for both domains
- [ ] GitHub repository is public/accessible
- [ ] Initial deployment successful

---

## Troubleshooting

### Build Fails
```bash
# Check build locally
npm run build:frontend

# View detailed logs
vercel logs [url]
```

### 404 on Routes
- Verify `vercel.json` has SPA rewrite rule
- Check output directory is `dist/`

### API Connection Issues
- Verify `VITE_API_URL` environment variable
- Check CORS headers in backend
- Confirm Railway backend is running

### Slow Performance
- Check file sizes: `vercel list --meta`
- Enable caching in `vercel.json`
- Consider CDN edge caching

### Custom Domain
1. Go to Project Settings
2. Domains → Add custom domain
3. Update DNS records
4. Wait for propagation (5-48 hours)

---

## Monitoring & Analytics

### Vercel Dashboard
- Deployment history
- Performance metrics
- Build logs
- Usage statistics

### Commands
```bash
vercel list            # View all deployments
vercel inspect [url]   # Inspect deployment details
vercel env ls         # List environment variables
```

---

## Cost Considerations

Vercel's free tier includes:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Serverless Functions (if needed)
- ✅ Auto-scaling

Sufficient for development and small production apps.

---

## Advanced Features

### Incremental Static Regeneration (ISR)
For static pages that update periodically:

```js
export const revalidate = 3600; // Revalidate every hour
```

### Serverless Functions
Deploy backend functions on Vercel instead of Railway:

```
api/
  ├── auth.js
  ├── sales.js
  └── health.js
```

### Preview Deployments
Every pull request gets a preview URL automatically (if connected to GitHub).

---

## Rollback & Disaster Recovery

### Quick Rollback
```bash
vercel rollback
```

### Revert to Specific Build
```bash
vercel deploy [commit-hash]
```

### Backup Strategy
- GitHub is your backup (all commits)
- Vercel keeps deployment history
- Deploy from any git commit

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev
- **GitHub Issues**: https://github.com/ikennyd/gps-dashboard/issues

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `./deploy-vercel.sh` | Automated deploy |
| `vercel deploy` | Preview deployment |
| `vercel deploy --prod` | Production deployment |
| `vercel list` | View deployments |
| `vercel logs` | View logs |
| `vercel rollback` | Revert to previous |
| `vercel env` | Manage variables |

---

*Last Updated: 2026-02-22*
