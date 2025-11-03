# TutorLink - Quick Deployment Reference

## 🚀 Quick Start

### Backend (Render)
1. Push code to GitHub
2. Connect repo on Render
3. Set root directory: `backend`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables (see below)
7. Deploy and copy URL

### Frontend (Vercel)
1. Connect repo on Vercel
2. Set root directory: `frontend`
3. Add environment variable: `REACT_APP_API_URL=<your-render-url>`
4. Deploy and copy URL
5. Update Render's `FRONTEND_URL` with Vercel URL

---

## 🔑 Environment Variables

### Render (Backend)
```bash
NODE_ENV=production
MONGO_URI=mongodb+srv://...
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MPESA_SHORTCODE=...
MPESA_PASSKEY=...
NGROK_URL=https://your-backend.onrender.com
FRONTEND_URL=https://your-frontend.vercel.app
```

### Vercel (Frontend)
```bash
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## 📝 Deployment Checklist

### Before Deployment
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas configured (Network Access: 0.0.0.0/0)
- [ ] All sensitive data in environment variables
- [ ] Test locally with environment variables

### Backend Deployment (Render)
- [ ] Create Web Service on Render
- [ ] Connect GitHub repository
- [ ] Configure build and start commands
- [ ] Add all environment variables
- [ ] Deploy and wait for success
- [ ] Test backend API endpoint
- [ ] Copy backend URL

### Frontend Deployment (Vercel)
- [ ] Import project on Vercel
- [ ] Set root directory to `frontend`
- [ ] Add `REACT_APP_API_URL` environment variable
- [ ] Deploy
- [ ] Test frontend loads
- [ ] Copy frontend URL

### Post-Deployment
- [ ] Update Render's `FRONTEND_URL` with Vercel URL
- [ ] Update Render's `NGROK_URL` with Render URL
- [ ] Test full application flow:
  - [ ] Register/Login
  - [ ] View tutors
  - [ ] Book session
  - [ ] View bookings
  - [ ] Payment flow
  - [ ] Contact form

---

## 🔧 Common Issues & Fixes

### CORS Error
**Problem**: Frontend can't reach backend  
**Fix**: 
- Verify `REACT_APP_API_URL` in Vercel
- Verify `FRONTEND_URL` in Render
- Redeploy both if changed

### MongoDB Connection Failed
**Problem**: Backend can't connect to database  
**Fix**:
- Check MongoDB Atlas Network Access (allow 0.0.0.0/0)
- Verify `MONGO_URI` format and credentials
- Check Render logs for specific error

### Payment Not Working
**Problem**: M-Pesa STK push fails  
**Fix**:
- Verify all M-Pesa credentials in Render
- Ensure `NGROK_URL` points to Render backend
- Check Render logs for API response

### Build Failed
**Problem**: Deployment fails during build  
**Fix**:
- Check Render/Vercel logs for specific error
- Verify build commands are correct
- Ensure all dependencies are in package.json

---

## 🔄 Making Updates

### Code Changes
1. Make changes locally
2. Test locally
3. Commit and push to GitHub
4. Both platforms auto-deploy from `main` branch

### Environment Variable Changes
- **Render**: Dashboard → Environment → Add/Edit → Save → Manual Deploy
- **Vercel**: Project Settings → Environment Variables → Add/Edit → Redeploy

---

## 📞 Platform-Specific Help

### Render
- Dashboard: https://dashboard.render.com
- Docs: https://render.com/docs
- Logs: Service → Logs tab

### Vercel
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Logs: Project → Deployments → Click deployment → View Function Logs

---

## 🌐 URLs to Remember

After deployment, save these URLs:

```
Backend (Render): https://__________________.onrender.com
Frontend (Vercel): https://__________________.vercel.app
MongoDB Atlas: https://cloud.mongodb.com
```

---

**Need detailed steps?** See `DEPLOYMENT.md` for the complete guide.
