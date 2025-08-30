#!/bin/bash

echo "🚀 Deploying Aravind's Portfolio to GitHub Pages!"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the portfolio directory"
    exit 1
fi

echo "✅ Portfolio directory found"
echo ""

# Build the project first
echo "🔨 Building portfolio for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Check if dist folder exists
    if [ -d "dist" ]; then
        echo "📁 Production files ready in 'dist' folder"
        echo ""
        
        echo "🌐 Setting up GitHub Pages deployment..."
        echo ""
        
        # Check if remote origin exists
        if git remote get-url origin > /dev/null 2>&1; then
            echo "✅ Git remote origin found"
        else
            echo "⚠️  No Git remote origin found"
            echo "Please create a GitHub repository first:"
            echo "1. Go to github.com and create: aravind-ai-ml-portfolio"
            echo "2. Then run: git remote add origin https://github.com/YOUR_USERNAME/aravind-ai-ml-portfolio.git"
            echo ""
            exit 1
        fi
        
        echo ""
        echo "🚀 Deploying to GitHub Pages..."
        npm run deploy:github
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 SUCCESS! Portfolio deployed to GitHub Pages!"
            echo ""
            echo "🌐 Your portfolio is now live at:"
            echo "   https://saimuralimarisetty.github.io/aravind-ai-ml-portfolio"
            echo ""
            echo "📋 Next steps:"
            echo "1. Go to your GitHub repository"
            echo "2. Go to Settings → Pages"
            echo "3. Source: Deploy from a branch"
            echo "4. Branch: gh-pages"
            echo "5. Folder: / (root)"
            echo "6. Click Save"
            echo ""
            echo "🎯 Your portfolio will be available in a few minutes!"
            
        else
            echo "❌ Deployment failed. Please check for errors."
            exit 1
        fi
        
    else
        echo "❌ Error: dist folder not found after build"
        exit 1
    fi
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi
