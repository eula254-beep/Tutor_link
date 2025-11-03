# Deployment Guide: TutorLink

This guide walks you through deploying the TutorLink application with:
- **Backend** on Render
- **Frontend** on Vercel

---

## Prerequisites

1. GitHub account with your code pushed to a repository
2. Render account (https://render.com)
3. Vercel account (https://vercel.com)
4. MongoDB Atlas account with a database set up

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Your Backend

Your backend is already configured with the necessary files:
- ✅ `render.yaml` - Render deployment configuration
- ✅ `.env.example` - Environment variable template

### Step 2: Push to GitHub

Make sure all your changes are committed and pushed:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 3: Deploy on Render

1. **Sign in to Render** at https://render.com

2. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your `Tutor_link` repository

3. **Configure the Service**:
   - **Name**: `tutorlink-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   
   Alternatively, Render will auto-detect settings from `render.yaml` if present in the root.

4. **Set Environment Variables**:
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   MPESA_CONSUMER_KEY=your_mpesa_consumer_key
   MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
   MPESA_SHORTCODE=your_mpesa_shortcode
   MPESA_PASSKEY=your_mpesa_passkey
   NGROK_URL=your_deployed_backend_url (add after first deploy)
   FRONTEND_URL=your_vercel_frontend_url (add after frontend deploy)
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for the build and deployment to complete
   - Copy your backend URL (e.g., `https://tutorlink-backend.onrender.com`)

### Step 4: Update Environment Variables

After deployment, go back and update:
- `NGROK_URL` → Set to your Render backend URL
- `FRONTEND_URL` → Set this after deploying the frontend

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Your Frontend

Your frontend is already configured with:
- ✅ `vercel.json` - Vercel configuration
- ✅ `.env.example` - Environment variable template
- ✅ All API calls updated to use environment variables

### Step 2: Deploy on Vercel

1. **Sign in to Vercel** at https://vercel.com

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the `Tutor_link` repository

3. **Configure Project**:
   - **Framework Preset**: Create React App (should auto-detect)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `build` (default)

4. **Set Environment Variables**:
   Click "Environment Variables" and add:
   
   ```
   REACT_APP_API_URL=https://tutorlink-backend.onrender.com
   ```
   
   (Replace with your actual Render backend URL from Part 1)

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Copy your frontend URL (e.g., `https://tutorlink.vercel.app`)

### Step 3: Update Backend CORS

Go back to Render and update the `FRONTEND_URL` environment variable:
- Set it to your Vercel frontend URL
- This allows the backend to accept requests from your frontend

---

## Part 3: Testing Your Deployment

1. **Visit your frontend URL** (e.g., `https://tutorlink.vercel.app`)

2. **Test the following**:
   - ✅ Homepage loads correctly
   - ✅ View tutors list
   - ✅ Register a new account
   - ✅ Login
   - ✅ Book a session
   - ✅ View bookings
   - ✅ Contact form submission

3. **Check browser console** for any errors

4. **Check Render logs** if backend issues occur:
   - Go to your Render dashboard
   - Click on your service
   - View logs in real-time

---

## Part 4: MongoDB Atlas Configuration

Ensure your MongoDB Atlas is properly configured:

1. **Network Access**:
   - Go to MongoDB Atlas → Network Access
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - This is required for Render to connect

2. **Database User**:
   - Ensure you have a database user with read/write permissions
   - Use this user's credentials in your `MONGO_URI`

---

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tutorlink?retryWrites=true&w=majority
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
NGROK_URL=https://tutorlink-backend.onrender.com
FRONTEND_URL=https://tutorlink.vercel.app
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://tutorlink-backend.onrender.com
```

---

## Troubleshooting

### Frontend can't connect to backend
- Check that `REACT_APP_API_URL` is set correctly in Vercel
- Verify `FRONTEND_URL` is set correctly in Render
- Check browser console for CORS errors

### Backend not starting
- Check Render logs for errors
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### MongoDB connection issues
- Verify Network Access allows `0.0.0.0/0`
- Check database user credentials
- Ensure connection string format is correct

### M-Pesa payment issues
- Verify all M-Pesa credentials are correct
- Check that `NGROK_URL` points to your Render backend
- Review M-Pesa API logs in Render

---

## Continuous Deployment

Both Render and Vercel support automatic deployments:

- **Push to GitHub** → Automatically triggers new deployments
- **Vercel** deploys on every push to `main` branch
- **Render** deploys on every push to `main` branch

To disable auto-deploy, go to each platform's settings.

---

## Custom Domains (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to Service Settings → Custom Domains
2. Add your custom domain
3. Update DNS records as instructed

Remember to update `FRONTEND_URL` in Render and `REACT_APP_API_URL` in Vercel if you use custom domains.

---

## Support

If you encounter issues:
1. Check the logs on Render and Vercel
2. Review browser console errors
3. Verify all environment variables
4. Ensure MongoDB Atlas is accessible

---

**Congratulations! Your TutorLink application is now deployed! 🎉**
