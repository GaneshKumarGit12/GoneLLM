# GoneLLM 🤖

A modern AI chatbot application powered by LLaMA models with user authentication, premium features, and payment integration.

## Features

- **AI Chat**: Interact with LLaMA AI models (7B-70B) for intelligent conversations
- **User Authentication**: Secure login and registration with JWT
- **Premium Features**: Unlock advanced features with premium subscription
- **Payment Integration**: Razorpay integration for premium upgrades
- **Modern UI**: Beautiful React frontend with Material UI
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Material UI (MUI)
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Razorpay
- LLaMA API Integration

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (free tier available)
- Razorpay account (for payment integration)
- LLaMA API key (or local LLaMA instance)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gonellm.git
cd gonellm
```

### 2. Backend Setup

```bash
cd gonellm-backend
npm install
```

Create a `.env` file in the `gonellm-backend` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/gonellm?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
LLAMA_API_URL=https://api.llama-api.com/chat/completions
LLAMA_API_KEY=your_llama_api_key
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd gonellm-frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB Atlas connection string | Yes |
| `JWT_SECRET` | Secret key for JWT token generation | Yes |
| `RAZORPAY_KEY_ID` | Razorpay key ID for payments | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret for payments | Yes |
| `PORT` | Server port (default: 5000) | No |
| `LLAMA_API_URL` | LLaMA API endpoint URL | Yes |
| `LLAMA_API_KEY` | LLaMA API authentication key | Yes |

## Getting MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Get your connection string from the "Connect" button
6. Replace `<username>` and `<password>` in the connection string

## Getting LLaMA API Key

Option 1: Use LLaMA API (cloud)
- Sign up at [llama-api.com](https://llama-api.com)
- Get your API key from the dashboard

Option 2: Use local LLaMA instance
- Install and run LLaMA locally using [llama.cpp](https://github.com/ggerganov/llama.cpp)
- Update `LLAMA_API_URL` to point to your local instance

## Project Structure

```
gonellm/
├── gonellm-backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── chatController.js
│   │   │   ├── paymentController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   └── User.js
│   │   └── routes/
│   │       ├── auth.js
│   │       ├── chat.js
│   │       ├── payment.js
│   │       └── user.js
│   ├── server.js
│   └── package.json
├── gonellm-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── PremiumBanner.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user and get JWT token

### User
- `GET /api/user-status` - Get user premium status (requires auth)
- `POST /update-password` - Update user password (requires auth)
- `DELETE /delete-account` - Delete user account (requires auth)

### Chat
- `POST /chat` - Send message to LLaMA AI (requires auth, premium)

### Payment
- `POST /create-order` - Create Razorpay order (requires auth)
- `POST /payment-success` - Payment webhook handler

## Usage

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Upgrade to Premium**: Use the payment integration to unlock chat features
4. **Chat**: Interact with the LLaMA AI model

## Development

### Backend Development

```bash
cd gonellm-backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development

```bash
cd gonellm-frontend
npm run dev  # Uses Vite for hot-reload
```

### Build for Production

```bash
# Frontend
cd gonellm-frontend
npm run build

# Backend (no build needed, it's Node.js)
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas IP whitelist includes your IP address
- Check that your username and password are correct in the connection string
- Verify your cluster is running in MongoDB Atlas

### LLaMA API Issues
- Ensure your API key is valid and has credits
- Check the API URL is correct
- If using local LLaMA, ensure the local server is running

### CORS Issues
- The backend is configured to allow CORS from all origins for development
- For production, update the CORS configuration to your frontend domain

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Ganesh - GoneLLM Project

## Acknowledgments

- LLaMA by Meta
- MongoDB
- Razorpay
- Material UI
