# LTalk — Video Conferencing Web Application

## Description

LTalk is a real-time video conferencing web app that lets users sign up, log in, create or join meetings using a code, and communicate through live video/audio, screen sharing, and chat. It uses WebRTC for peer connections and Socket.IO for signaling and live updates, backed by a Node.js/Express API with MongoDB for user and meeting history.

## Features

- User authentication (register/login)
- Join meetings via a shareable meeting code
- Real-time video and audio conferencing
- Screen sharing
- In-meeting chat
- Participant list with media state updates
- Meeting history tracking

## Tech Stack

**Frontend**

- React 18 + Vite
- Material UI (MUI)
- React Router
- Axios
- Socket.IO Client

**Backend**

- Node.js + Express
- Socket.IO
- MongoDB + Mongoose
- bcrypt (password hashing)
- dotenv (environment config)

## Installation Steps

**Prerequisites**

- Node.js 18+
- MongoDB (local or hosted)

**1) Clone the repo**

```bash
git clone https://github.com/sagarkumarpatel/LTalk.git
cd LTalk
```

**2) Backend setup**

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/videocall
```

Run the server:

```bash
npm run dev
```

**3) Frontend setup**

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

## Environment Variables

**Backend (`backend/.env`)**

```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/videocall
```

**Frontend (`frontend/.env`)**

```env
VITE_API_URL=http://localhost:8000
```

## Usage Instructions

1. Start MongoDB.
2. Run backend (`npm run dev` in `backend/`).
3. Run frontend (`npm run dev` in `frontend/`).
4. Open the app at the Vite dev URL (usually `http://localhost:5173`).
5. Register or log in.
6. Enter a meeting code to join or share it with others.
7. Use in-call controls to toggle video/audio, share screen, and chat.

## API Endpoints

Base URL: `/api/v1/users`

| Method | Endpoint            | Description                  |
| -----: | ------------------- | ---------------------------- |
|   POST | `/login`            | Login and receive a token    |
|   POST | `/register`         | Register a new user          |
|   POST | `/add_to_activity`  | Save meeting code to history |
|    GET | `/get_all_activity` | Fetch user meeting history   |

## Folder Structure

```
backend/
  src/
    app.js               # Express app + Socket.IO
    controllers/
      socketManager.js   # Real-time signaling + chat
      user.controller.js # Auth + history APIs
    models/
      userModel.js
      meeting.model.js
    routes/
      usersRoutes.js

frontend/
  src/
    pages/               # UI pages (auth, home, video)
    contexts/            # Auth context
    styles/              # CSS modules
    utils/               # Helpers (e.g., route protection)
```

## Future Improvements

- Meeting recording and playback
- Scheduled meetings with reminders
- Admin controls and moderation tools
- Better UI for participant grid and layouts

## Contributing Guidelines

1. Fork the repo and create a feature branch.
2. Commit changes with clear messages.
3. Open a pull request with a concise description.
4. Ensure the app runs without errors before submitting.
