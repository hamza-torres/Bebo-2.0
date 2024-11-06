# Bebo 2.0 🌟

A modern reimagining of the classic social media platform, built with cutting-edge technologies. Bebo 2.0 combines powerful features like AI-powered content moderation, sentiment analysis, and real-time interactions in a sleek, user-friendly interface.

[![Apache License 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-9.x-orange.svg)](https://firebase.google.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-green.svg)](https://www.python.org/)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### User Management
- **Advanced Authentication**: Secure user registration and login via Firebase
- **Custom Profiles**: Rich user profiles with customizable elements
- **Social Connections**: Follow/unfollow system with friend recommendations

### Content Creation & Interaction
- **Multimedia Posts**: Support for images, text, and rich media content
- **Interactive Feed**: Real-time personalized content feed
- **Social Engagement**: Likes, comments, and sharing capabilities

### AI-Powered Features
- **Content Moderation**: Automatic detection of inappropriate content
- **Sentiment Analysis**: Real-time analysis of post sentiments
- **Safe Search**: Image analysis for content safety

### Platform Features
- **Responsive Design**: Full mobile and desktop support
- **Real-time Updates**: Live content updates and notifications
- **Performance Optimized**: Fast loading and efficient data handling

## 🛠 Technology Stack

### Frontend
- React 18
- Redux Toolkit
- Vite
- Material-UI
- Firebase SDK

### Backend
- Python 3.8+
- Flask
- Firebase Admin SDK
- Google Cloud Vision API

### Infrastructure
- Firebase (Auth, Firestore, Storage)
- Google Cloud Platform
- Cloud Functions

## 📁 Project Structure

```
bebo-2.0/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ChipTags.jsx
│   │   │   ├── FlexBetween.jsx
│   │   │   ├── Friend.jsx
│   │   │   ├── UserImage.jsx
│   │   │   └── WidgetWrapper.jsx
│   │   ├── pages/              # Main application pages
│   │   │   ├── auth/
│   │   │   ├── home/
│   │   │   ├── profile/
│   │   │   └── widgets/
│   │   ├── store/              # Redux state management
│   │   ├── theme.js            # Theme configuration
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static assets
│   └── vite.config.js
└── server/
    ├── moderation/             # Content moderation services
    │   └── explicit.py
    ├── firebase.py             # Firebase configuration
    ├── server.py               # Main server application
    └── tests.py                # Server tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js (≥ 14.18.0)
- pnpm (≥ 6.0.0)
- Python (≥ 3.8)
- Firebase account
- Google Cloud account

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
pnpm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend Setup

1. Set up Python environment:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Configure Firebase Admin SDK:
```bash
# Place your serviceAccountKey.json in the server directory
```

## ⚙️ Configuration

### Firebase Configuration

```json
{
  "apiKey": "your-api-key",
  "authDomain": "your-auth-domain",
  "projectId": "your-project-id",
  "storageBucket": "your-storage-bucket",
  "messagingSenderId": "your-messaging-sender-id",
  "appId": "your-app-id"
}
```

## 💻 Usage

### Development

Start frontend development server:
```bash
cd frontend
pnpm dev
```

Start backend server:
```bash
cd server
python server.py
```

### Production

Build frontend:
```bash
cd frontend
pnpm build
```

Deploy backend:
```bash
# Deploy to your preferred hosting platform
```

