# Deploying Ladventure to Railway

This guide will help you deploy the Ladventure Next.js application to Railway.

## Prerequisites

1.  A GitHub account with this repository pushed (already done).
2.  A [Railway](https://railway.app/) account.

## Step-by-Step Deployment

1.  **Login to Railway**: Go to [railway.app](https://railway.app/) and log in with your GitHub account.
2.  **New Project**: Click the "New Project" button (usually big and purple) on your dashboard.
3.  **Deploy from GitHub**: Select "Deploy from GitHub repo".
4.  **Select Repository**: Search for `ladventure` (or `simonhayes51/ladventure`) and select it.
5.  **Configure Access**: If you haven't given Railway access to your repositories yet, click "Configure GitHub App" and select the repository.
6.  **Deploy Now**: Click "Deploy Now". Railway will automatically detect that this is a Next.js application.

## Configuration (Optional but Recommended)

Railway usually auto-detects the build settings, but if you need to configure them manually:

*   **Build Command**: `npm run build`
*   **Start Command**: `npm start`
*   **Root Directory**: `/` (Leave empty)

## Environment Variables

If you add Google Analytics or other secrets later, you'll need to add them in Railway:

1.  Go to your project in Railway.
2.  Click on the "Variables" tab.
3.  Add your keys (e.g., `NEXT_PUBLIC_GA_ID` if you make analytics dynamic).

## Custom Domain

To set up `ladventure.co.uk`:

1.  Go to the "Settings" tab in your Railway project service.
2.  Scroll down to "Networking" -> "Custom Domains".
3.  Click "Connect Domain".
4.  Enter `ladventure.co.uk`.
5.  Railway will provide DNS records (CNAME/A records).
6.  Login to your domain registrar (GoDaddy, Namecheap, etc.) and add these records.
7.  Wait for propagation (usually 15-60 mins).

## Updates

Whenever you push code to the `main` branch on GitHub, Railway will automatically trigger a new deployment.
