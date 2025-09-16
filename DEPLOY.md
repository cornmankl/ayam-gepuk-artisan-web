# Deployment Guide for Vercel

This project is now ready to be deployed to Vercel. Here's how to deploy it:

## Prerequisites

1. Have a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI (optional): `npm i -g vercel`

## Deployment Options

### Option 1: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "New Project"
3. Import your GitHub repository: `cornmankl/ayam-gepuk-artisan-web`
4. Vercel will automatically detect it's a Vite project
5. Use these settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm ci` (auto-detected)
6. Click "Deploy"

### Option 2: Using Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. In your project directory: `vercel`
4. Follow the prompts

## Configuration Files

The project includes these Vercel configuration files:

- `vercel.json` - Main Vercel configuration
- `.vercelignore` - Files to exclude from deployment
- `index.html` - Entry point for the application

## Custom Domain

The project includes a `CNAME` file pointing to `ayamgepukartisan.thefmsmkt.com`. 
If you want to use this custom domain:

1. In Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add the custom domain: `ayamgepukartisan.thefmsmkt.com`
4. Follow Vercel's DNS configuration instructions

## Build Information

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS

## Environment Variables

Currently, the project uses:
- `NODE_ENV=production` (set in vercel.json)

Add any additional environment variables in the Vercel dashboard under Project Settings > Environment Variables.

## Troubleshooting

If deployment fails:

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are listed in `package.json`
3. Verify the build works locally: `npm run build`
4. Check for any missing files or broken imports

The project is configured with proper routing for a Single Page Application (SPA), so all routes will be handled by React Router.