# TutorLink - Connect with Expert Tutors

A full-stack web application that connects students with qualified tutors for personalized learning sessions. Built with React (frontend) and Node.js/Express (backend), featuring M-Pesa payment integration.

## 🌟 Features

- **User Authentication**: Secure registration and login
- **Tutor Management**: Browse, search, and filter tutors by subject and price
- **Session Booking**: Book tutoring sessions with your preferred tutor
- **Payment Integration**: M-Pesa STK Push for secure payments
- **Booking Management**: View and manage your bookings
- **Contact Form**: Get in touch with support
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router
- Axios
- Bootstrap 5
- AOS (Animate On Scroll)
- React Icons

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- M-Pesa Daraja API
- CORS

## 📁 Project Structure

```
Tutor_link/
├── backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── server.js        # Entry point
│   └── package.json
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json
├── DEPLOYMENT.md        # Detailed deployment guide
└── DEPLOYMENT_QUICK_REFERENCE.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- M-Pesa Developer account (for payments)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/eula254-beep/Tutor_link.git
cd Tutor_link
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
NGROK_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
```

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

The default `.env` should work for local development:
```
REACT_APP_API_URL=http://localhost:5000
```

### Running Locally

1. **Start Backend** (from backend directory)
```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on http://localhost:5000

2. **Start Frontend** (from frontend directory)
```bash
npm start
```

Frontend will run on http://localhost:3000

## 📦 Deployment

See detailed deployment guides:
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete step-by-step guide
- **[DEPLOYMENT_QUICK_REFERENCE.md](./DEPLOYMENT_QUICK_REFERENCE.md)** - Quick reference

### Quick Deployment Summary

**Backend → Render**
1. Connect GitHub repo
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && npm start`
4. Add environment variables
5. Deploy

**Frontend → Vercel**
1. Connect GitHub repo
2. Set root directory: `frontend`
3. Add `REACT_APP_API_URL` environment variable
4. Deploy

## 🔐 Environment Variables

### Backend
| Variable | Description | Required |
|----------|-------------|----------|
| NODE_ENV | Environment (development/production) | Yes |
| PORT | Server port | Yes |
| MONGO_URI | MongoDB connection string | Yes |
| MPESA_CONSUMER_KEY | M-Pesa API consumer key | Yes |
| MPESA_CONSUMER_SECRET | M-Pesa API consumer secret | Yes |
| MPESA_SHORTCODE | M-Pesa shortcode | Yes |
| MPESA_PASSKEY | M-Pesa passkey | Yes |
| NGROK_URL | Backend callback URL | Yes |
| FRONTEND_URL | Frontend URL for CORS | Yes |

### Frontend
| Variable | Description | Required |
|----------|-------------|----------|
| REACT_APP_API_URL | Backend API URL | Yes |

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Tutors
- `GET /api/tutors` - Get all tutors
- `GET /api/tutors/:id` - Get single tutor
- `POST /api/tutors` - Create tutor (auth required)
- `PUT /api/tutors/:id` - Update tutor (auth required)
- `DELETE /api/tutors/:id` - Delete tutor (auth required)

### Bookings
- `GET /api/bookings/my` - Get user's bookings (auth required)
- `POST /api/bookings` - Create booking (auth required)
- `DELETE /api/bookings/:id` - Cancel booking (auth required)

### Payments
- `POST /api/payments/stkpush` - Initiate M-Pesa payment (auth required)

### Contact
- `POST /api/contact` - Submit contact form

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- GitHub: [@eula254-beep](https://github.com/eula254-beep)

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render for backend hosting
- Vercel for frontend hosting
- M-Pesa Daraja API for payment integration

## 📞 Support

For support, email support@tutorlink.com or open an issue in the repository.

---

**Made with ❤️ for learners and educators**
