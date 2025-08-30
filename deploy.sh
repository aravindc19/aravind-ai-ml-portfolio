#!/bin/bash

echo "🚀 Aravind's Portfolio - Deployment Script"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the portfolio directory"
    exit 1
fi

echo "✅ Portfolio directory found"
echo ""

# Build the project
echo "🔨 Building portfolio for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Check if dist folder exists
    if [ -d "dist" ]; then
        echo "📁 Production files ready in 'dist' folder"
        echo ""
        echo "🌐 Deployment Options:"
        echo "1. GitHub Pages (FREE)"
        echo "2. Vercel (FREE)"
        echo "3. Netlify (FREE)"
        echo "4. Manual upload"
        echo ""
        
        echo "📋 Next Steps:"
        echo "1. Create a GitHub repository: aravind-ai-ml-portfolio"
        echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/aravind-ai-ml-portfolio.git"
        echo "3. Run: git push -u origin main"
        echo "4. Enable GitHub Pages in repository settings"
        echo ""
        
        echo "🎯 Quick Deploy Commands:"
        echo "- Vercel: vercel --prod"
        echo "- Netlify: Drag 'dist' folder to netlify.com"
        echo ""
        
        echo "🎉 Your portfolio is ready for deployment!"
        echo "📖 See DEPLOYMENT.md for detailed instructions"
        
    else
        echo "❌ Error: dist folder not found after build"
        exit 1
    fi
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi
