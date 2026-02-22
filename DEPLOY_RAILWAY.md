# Deploying GPS Dashboard to Railway

## Quick Start

```bash
# Make sure you're in the project directory
cd /Users/kennydwillker/gps-dashboard

# Run the deployment script
./deploy-railway.sh
```

That's it! The script handles everything:
- ✅ Checks Railway CLI installation
- ✅ Authenticates with Railway (if needed)
- ✅ Initializes the project
- ✅ Sets environment variables from `.env`
- ✅ Deploys the app

---

## Prerequisites

### 1. **Railway Account**
   - Sign up at https://railway.app
   - Free tier available

### 2. **Environment Variables**
   Ensure your `.env` file has:
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-key
   JWT_SECRET=your-jwt-secret
   ```

### 3. **Git Repository**
   The code must be pushed to GitHub (already done ✅)

---

## Step-by-Step Guide

### Option A: Using the Automated Script (Recommended)

```bash
./deploy-railway.sh
```

The script will:
1. Verify Railway CLI is installed
2. Authenticate you with Railway
3. Create a new project (or use existing)
4. Set all required environment variables
5. Deploy the app

### Option B: Manual Steps

```bash
# 1. Login to Railway
railway login

# 2. Initialize project
railway init

# 3. Set environment variables
railway variable set NODE_ENV production
railway variable set SUPABASE_URL <your-supabase-url>
railway variable set SUPABASE_ANON_KEY <your-supabase-key>
railway variable set JWT_SECRET <your-jwt-secret>

# 4. Deploy
railway up
```

---

## After Deployment

### View Logs
```bash
railway logs
```

### Check Status
```bash
railway status
```

### Open App in Browser
```bash
railway open
```

### List Variables
```bash
railway variable ls
```

### View Domain
Your app will be available at:
```
https://<project-name>.railway.app
```

---

## Troubleshooting

### Port Issues
- Railway auto-assigns a PORT via environment variable
- Our `backend/server.js` reads `process.env.PORT`
- ✅ Already configured

### Build Fails
- Check `railway logs` for error details
- Ensure `railway.toml` exists in root directory
- Verify `package.json` has correct build script

### CORS Issues
- The monorepo setup serves frontend and backend from the same origin
- ✅ Already configured in `backend/server.js`

### Database Connection
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Check Supabase project is active
- Review logs: `railway logs`

---

## Configuration Files

### `railway.toml`
```toml
[build]
builder = "nixpacks"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "node backend/server.js"
restartPolicyType = "always"
healthcheckPath = "/api/health"
healthcheckTimeout = 30
```

### `package.json` Scripts
```json
"build": "npm run build:frontend",
"start": "node backend/server.js"
```

---

## Architecture Overview

The deployment uses a **monorepo approach**:

```
Single Railway Service
├── Frontend (React)
│   └── Built to dist/
├── Backend (Express)
│   └── Serves dist/ as static files
└── API Routes
    └── /api/* endpoints
```

**Benefits:**
- ✅ No CORS issues (same origin)
- ✅ Simplified deployment
- ✅ Better performance (no separate services)
- ✅ Automatic database backups via Railway

---

## Monitoring & Maintenance

### Enable Notifications
https://railway.app → Project Settings → Notifications

### Set Up Metrics
- Memory usage
- CPU usage
- Build time
- Deployment status

### Auto-Restart
- Configured in `railway.toml`
- Service auto-restarts on failure
- Check status: `railway status`

---

## Scaling & Performance

### Environment Variables for Production
```
NODE_ENV=production    # ✅ Optimizes Node.js
PORT=<auto>           # ✅ Railway assigns
SUPABASE_URL=...      # ✅ Production DB
```

### Database Performance
- Use Supabase indices (already configured)
- Enable connection pooling in Supabase
- Monitor query performance

### Frontend Optimization
- Vite build creates optimized dist/
- Minification enabled
- Source maps disabled in production

---

## Rollback & Updates

### Deploy Latest Changes
```bash
git push origin main  # Push to GitHub
railway up            # Redeploy from latest
```

### View Deployment History
```bash
railway logs --limit 50
```

### Manual Rollback
- Use Railway Dashboard to select previous build
- Or redeploy from a previous commit

---

## Cost Considerations

Railway's free tier includes:
- ✅ 5GB disk storage
- ✅ 512 MB RAM
- ✅ 100 GB bandwidth/month
- ✅ Sufficient for development

For production, consider upgrading to paid plan.

---

## Support & Resources

- **Railway Docs**: https://docs.railway.app
- **GitHub Issues**: https://github.com/ikennyd/gps-dashboard/issues
- **Railway Support**: https://railway.app/support

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `./deploy-railway.sh` | Full automated deployment |
| `railway logs` | View deployment logs |
| `railway status` | Check service status |
| `railway open` | Open app in browser |
| `railway variable ls` | List env variables |
| `railway redeploy` | Redeploy current version |
| `railway down` | Stop the service |

---

*Last Updated: 2026-02-22*
