#!/bin/bash

###############################################################################
# Railway Deployment Script for GPS Dashboard
# Automates setup and deployment to Railway
###############################################################################

set -e

echo "🚀 GPS Dashboard - Railway Deployment Script"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create .env with your Supabase credentials"
    exit 1
fi

# Source .env to get variables
set -a
source .env
set +a

echo -e "${BLUE}1️⃣ Checking Railway CLI...${NC}"
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi
echo -e "${GREEN}✅ Railway CLI ready${NC}"
echo ""

echo -e "${BLUE}2️⃣ Initializing Railway project...${NC}"
if railway token > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Already logged in to Railway${NC}"
else
    echo -e "${YELLOW}⚠️  Please login to Railway${NC}"
    railway login
fi
echo ""

# Check if .railway exists (project already initialized)
if [ -d ".railway" ] || [ -f ".railway.json" ]; then
    echo -e "${GREEN}✅ Railway project already initialized${NC}"
else
    echo "Initializing new Railway project..."
    railway init --name gps-dashboard
fi
echo ""

echo -e "${BLUE}3️⃣ Setting environment variables...${NC}"

# Set required environment variables
if [ -z "$SUPABASE_URL" ]; then
    echo -e "${RED}❌ SUPABASE_URL not set in .env${NC}"
    exit 1
fi

if [ -z "$SUPABASE_ANON_KEY" ]; then
    echo -e "${RED}❌ SUPABASE_ANON_KEY not set in .env${NC}"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo -e "${RED}❌ JWT_SECRET not set in .env${NC}"
    exit 1
fi

echo "Setting NODE_ENV=production"
railway variable set NODE_ENV production

echo "Setting SUPABASE_URL"
railway variable set SUPABASE_URL "$SUPABASE_URL"

echo "Setting SUPABASE_ANON_KEY"
railway variable set SUPABASE_ANON_KEY "$SUPABASE_ANON_KEY"

echo "Setting JWT_SECRET"
railway variable set JWT_SECRET "$JWT_SECRET"

echo -e "${GREEN}✅ Environment variables configured${NC}"
echo ""

echo -e "${BLUE}4️⃣ Deploying to Railway...${NC}"
railway up

echo ""
echo -e "${GREEN}✅ Deployment initiated!${NC}"
echo ""
echo "📋 Next steps:"
echo "  1. Monitor deployment: railway logs"
echo "  2. Check status: railway status"
echo "  3. Get app URL: railway open"
echo ""
echo "🔗 Useful commands:"
echo "  railway logs        - View logs"
echo "  railway status      - Check deployment status"
echo "  railway open        - Open app in browser"
echo "  railway variable ls - List environment variables"
echo ""
