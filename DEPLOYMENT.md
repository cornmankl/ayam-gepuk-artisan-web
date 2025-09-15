# Deployment Guide - Ayam Gepuk Artisan Web

This guide explains how to deploy the Ayam Gepuk Artisan web application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Integration**: Connect your GitHub account to Vercel
3. **Domain Setup**: The project is configured for custom domain `ayamgepukartisan.thefmsmkt.com`

## Deployment Methods

### Method 1: GitHub Integration (Recommended)

1. **Connect Repository to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository `cornmankl/ayam-gepuk-artisan-web`

2. **Configure Project Settings**:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: Leave as default (.)
   - **Build Command**: `npm run build` (pre-configured in vercel.json)
   - **Output Directory**: `dist` (pre-configured in vercel.json)
   - **Install Command**: `npm ci` (pre-configured in vercel.json)

3. **Environment Variables** (Optional):
   - Add any required environment variables in Vercel dashboard
   - Reference `.env.example` for available variables
   - All environment variables for Vite must be prefixed with `VITE_`

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application
   - Every push to the main branch will trigger automatic deployments

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   cd /path/to/ayam-gepuk-artisan-web
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new one
   - Choose settings (pre-configured in vercel.json)

## Custom Domain Configuration

The project is configured for custom domain: `ayamgepukartisan.thefmsmkt.com`

### Setting up Custom Domain:

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Domains" tab
   - Add domain: `ayamgepukartisan.thefmsmkt.com`

2. **DNS Configuration**:
   - Add CNAME record in your DNS provider:
     ```
     CNAME ayamgepukartisan.thefmsmkt.com cname.vercel-dns.com
     ```
   - Or add A record pointing to Vercel's IP: `76.76.19.61`

3. **SSL Certificate**:
   - Vercel automatically provides SSL certificates
   - Certificate will be issued once domain verification is complete

## Build Configuration

The project uses the following build configuration (defined in `vercel.json`):

```json
{
  "version": 2,
  "name": "ayam-gepuk-artisan-web",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci",
  "framework": "vite",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    // Security headers and caching rules
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Key Features:
- **SPA Routing**: All routes redirect to `index.html` for client-side routing
- **Security Headers**: X-Frame-Options, CSP, etc.
- **Asset Caching**: Static assets cached for 1 year
- **Framework Optimization**: Vite-specific optimizations

## Environment Variables

### Required Variables:
Currently, no environment variables are required for basic functionality.

### Optional Variables:
- `VITE_APP_NAME`: Application name (default: "Ayam Gepuk Artisan")
- `VITE_APP_URL`: Application URL
- `VITE_GA_TRACKING_ID`: Google Analytics tracking ID
- `VITE_API_BASE_URL`: API base URL (if using external API)

### Setting Environment Variables in Vercel:
1. Go to Project Settings > Environment Variables
2. Add variables with `VITE_` prefix for client-side access
3. Choose appropriate environments (Production, Preview, Development)

## Build Process

### Local Build Test:
```bash
npm install
npm run build
npm run preview
```

### Production Build Features:
- TypeScript compilation
- Asset optimization and minification
- Static asset hashing for cache busting
- Tree shaking for bundle size optimization

## Monitoring and Analytics

### Build Analytics:
- Check build logs in Vercel dashboard
- Monitor build performance and bundle size
- Review deployment frequency and success rate

### Performance Monitoring:
- Vercel provides built-in analytics
- Core Web Vitals monitoring
- Real User Monitoring (RUM)

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Routing Issues**:
   - Ensure all routes redirect to `/index.html`
   - Check React Router configuration
   - Verify SPA routing in `vercel.json`

3. **Environment Variables**:
   - Ensure variables are prefixed with `VITE_`
   - Check variable names and values in Vercel dashboard
   - Verify variables are set for correct environment

4. **Domain Issues**:
   - Verify DNS configuration
   - Check SSL certificate status
   - Ensure domain is properly added in Vercel

### Support Resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [React Router Documentation](https://reactrouter.com/)

## Continuous Deployment

### Automatic Deployments:
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from feature branches and PRs
- **Branch Protection**: Configure branch protection rules in GitHub

### Deployment Environments:
- **Production**: Live site at custom domain
- **Preview**: Unique URL for each deployment
- **Development**: Local development server

## Performance Optimization

### Bundle Analysis:
```bash
npm run build:analyze
```

### Optimization Features:
- Code splitting with React.lazy()
- Image optimization
- Asset preloading
- Service worker (if implemented)

## Security

### Security Headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Best Practices:
- Regular dependency updates
- Security audits with `npm audit`
- Environment variable security
- HTTPS enforcement

---

For additional support or questions about deployment, please refer to the project documentation or contact the development team.