#!/bin/bash

###############################################################################
# Vercel Deployment Script for GPS Dashboard Frontend
# Deploys React frontend to Vercel
###############################################################################

set -e

echo "🚀 GPS Dashboard - Vercel Deployment Script"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}1️⃣ Checking Vercel CLI...${NC}"
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi
echo -e "${GREEN}✅ Vercel CLI ready${NC}"
echo ""

echo -e "${BLUE}2️⃣ Authenticating with Vercel...${NC}"
if vercel whoami > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Already logged in to Vercel${NC}"
else
    echo -e "${YELLOW}⚠️  Please login to Vercel${NC}"
    vercel login
fi
echo ""

echo -e "${BLUE}3️⃣ Building frontend...${NC}"
npm run build:frontend
echo -e "${GREEN}✅ Frontend built successfully${NC}"
echo ""

echo -e "${BLUE}4️⃣ Deploying to Vercel...${NC}"
echo ""
echo "Choose deployment option:"
echo "  1) Production (recommended for first deploy)"
echo "  2) Preview (for testing)"
echo ""
read -p "Enter choice (1 or 2): " deploy_choice

if [ "$deploy_choice" = "1" ]; then
    echo ""
    echo "Deploying to PRODUCTION..."
    vercel deploy --prod
    echo ""
    echo -e "${GREEN}✅ Production deployment complete!${NC}"
    echo ""
    echo "Your app is now live at:"
    vercel list --meta | grep -i "gps-dashboard"
elif [ "$deploy_choice" = "2" ]; then
    echo ""
    echo "Deploying to PREVIEW..."
    vercel deploy
    echo ""
    echo -e "${GREEN}✅ Preview deployment complete!${NC}"
else
    echo -e "${RED}Invalid choice${NC}"
    exit 1
fi

echo ""
echo "📋 Next steps:"
echo "  1. Visit your deployment URL"
echo "  2. Update API endpoint in code if needed"
echo "  3. Monitor logs: vercel logs"
echo ""
echo "🔗 Useful commands:"
echo "  vercel list           - List deployments"
echo "  vercel logs           - View logs"
echo "  vercel env            - Manage environment variables"
echo "  vercel remove         - Remove a deployment"
echo ""
