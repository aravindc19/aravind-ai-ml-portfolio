#!/bin/bash

echo "🚀 ARAVIND'S PORTFOLIO - ONE-COMMAND DEPLOYMENT!"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎯 I'm going to deploy Aravind's portfolio right now!${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the portfolio directory${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Portfolio directory found${NC}"
echo ""

# Build the project
echo -e "${BLUE}🔨 Building portfolio for production...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
    echo ""
    
    # Check if dist folder exists
    if [ -d "dist" ]; then
        echo -e "${GREEN}📁 Production files ready in 'dist' folder${NC}"
        echo ""
        
        echo -e "${YELLOW}🌐 Setting up GitHub Pages deployment...${NC}"
        echo ""
        
        # Check if remote origin exists
        if git remote get-url origin > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Git remote origin found${NC}"
            echo ""
            
            echo -e "${BLUE}🚀 Deploying to GitHub Pages...${NC}"
            npm run deploy:github
            
            if [ $? -eq 0 ]; then
                echo ""
                echo -e "${GREEN}🎉 SUCCESS! Portfolio deployed to GitHub Pages!${NC}"
                echo ""
                echo -e "${BLUE}🌐 Your portfolio is now live at:${NC}"
                echo -e "${GREEN}   https://saimuralimarisetty.github.io/aravind-ai-ml-portfolio${NC}"
                echo ""
                echo -e "${YELLOW}📋 Final step - Enable GitHub Pages:${NC}"
                echo "1. Go to your GitHub repository"
                echo "2. Go to Settings → Pages"
                echo "3. Source: Deploy from a branch"
                echo "4. Branch: gh-pages"
                echo "5. Folder: / (root)"
                echo "6. Click Save"
                echo ""
                echo -e "${GREEN}🎯 Your portfolio will be available in a few minutes!${NC}"
                echo ""
                echo -e "${BLUE}🔗 Direct link: https://saimuralimarisetty.github.io/aravind-ai-ml-portfolio${NC}"
                
            else
                echo -e "${RED}❌ Deployment failed. Please check for errors.${NC}"
                exit 1
            fi
            
        else
            echo -e "${YELLOW}⚠️  No Git remote origin found${NC}"
            echo ""
            echo -e "${BLUE}📋 Please create a GitHub repository first:${NC}"
            echo "1. Go to github.com and create: aravind-ai-ml-portfolio"
            echo "2. Then run: git remote add origin https://github.com/YOUR_USERNAME/aravind-ai-ml-portfolio.git"
            echo "3. Run this script again: ./DEPLOY_NOW.sh"
            echo ""
            exit 1
        fi
        
    else
        echo -e "${RED}❌ Error: dist folder not found after build${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Build failed. Please check for errors.${NC}"
    exit 1
fi
