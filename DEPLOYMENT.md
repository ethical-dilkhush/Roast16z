# Deployment Checklist for Roast16z

## ✅ Build Status
- **Build Command**: `npm run build` ✅ WORKING
- **Build Size**: 51.13 kB (main.js) + 4.45 kB (main.css) ✅ OPTIMIZED
- **Assets**: roast.jpeg, background.mp4 ✅ INCLUDED

## 🔧 Environment Variables Required
**CRITICAL**: These must be set in your deployment platform:

```env
REACT_APP_WEBHOOK_URL=https://roast16z.app.n8n.cloud/webhook-test/bb64b83c-3e96-46de-9df8-9599473bfadf
REACT_APP_NAME=Roast16z
REACT_APP_VERSION=1.0.0
REACT_APP_DEBUG=false
```

## 🚀 Deployment Platform Setup

### For Vercel:
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy from main branch

### For Netlify:
1. Connect GitHub repository  
2. Build command: `npm run build`
3. Publish directory: `build`
4. Set environment variables in Netlify dashboard

### For Other Platforms:
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Node Version**: 18+ recommended

## ⚠️ Common Deployment Issues

### 1. "npm run build exited with 1"
**Causes:**
- Missing environment variables
- Node version mismatch
- Memory issues during build

**Solutions:**
- Set all REACT_APP_* environment variables
- Use Node 18+
- Increase build memory if needed

### 2. "Webhook URL not configured"
**Cause**: Missing REACT_APP_WEBHOOK_URL
**Solution**: Set environment variable in deployment platform

### 3. CORS Issues
**Cause**: Different domain for webhook calls
**Solution**: Webhook endpoint must allow CORS from your domain

## 🔍 Testing Deployment
After deployment:
1. Open browser developer tools
2. Check console for environment variable loading
3. Send a test message
4. Verify webhook calls in network tab

## 📁 Build Output
```
build/
├── index.html          # Main HTML file
├── roast.jpeg         # Logo/favicon
├── background.mp4     # Video background
└── static/
    ├── css/main.*.css # Styles
    └── js/main.*.js   # JavaScript bundle
```

---
**Status**: ✅ Ready for deployment
