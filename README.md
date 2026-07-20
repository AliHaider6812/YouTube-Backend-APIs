<<<<<<< HEAD
# 🎬 YouTube Backend API

A RESTful, YouTube-inspired backend built with **Node.js**, **Express.js**, **Prisma ORM**, and **PostgreSQL**. This project demonstrates a clean layered architecture, secure authentication, full CRUD operations, and backend best practices.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Professional Practices](#professional-practices)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [API Testing](#api-testing)
- [Learning Objectives](#learning-objectives)
- [Author](#author)

---

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT, Bcrypt |
| File Uploads | Multer, Cloudinary |
| Validation | Zod |

---

## Features

### 🔐 Authentication
- User Registration, Login & Logout
- Refresh Access Token
- Change Password
- Update Account Details
- Update Avatar & Cover Image
- Get Current User

### 🎥 Video
- Upload, Update & Delete Video
- Get All Videos / Get Video by ID
- Toggle Publish Status

### 📃 Playlist
- Create, Update & Delete Playlist
- Get User Playlists
- Add / Remove Videos from Playlist

### 💬 Comment
- Create, Update & Delete Comment
- Get Video Comments

### 🐦 Tweet
- Create, Update & Delete Tweet
- Get All Tweets

### ❤️ Like
- Toggle Video / Comment / Tweet Like
- Get Liked Videos

### 🔔 Subscription
- Subscribe / Unsubscribe to Channel
- Get Channel Subscribers
- Get My Subscriptions

### 🕘 Watch History
- Add / Remove from Watch History
- Get Watch History
- Update Watch Progress

---

## Project Structure

```
youtube-backend/
├── prisma/            # Prisma schema & migrations
├── public/            # Static/public assets
├── src/
│   ├── config/         # App & DB configuration
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Auth, error handling, uploads
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic
│   ├── utils/          # Helpers (ApiError, ApiResponse, asyncHandler)
│   ├── validations/    # Zod schemas
│   ├── app.js          # Express app setup
│   └── server.js       # Entry point
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Professional Practices

- Layered Architecture — **Route → Controller → Service → Prisma**
- Centralized Error Handling
- Async Handler Wrapper
- Custom `ApiError` & `ApiResponse` Classes
- Zod-based Request Validation
- JWT Authentication & Route Authorization
- Pagination & Filtering
- Cloudinary File Uploads
- Clean, Modular, Scalable Code

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL instance (local or hosted, e.g. Supabase/Neon/Railway)
- Cloudinary account (for media uploads)

### Installation

```bash
git clone <repository-url>
cd youtube-backend
npm install
```

Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) below).

Run database migrations:
```bash
npx prisma migrate dev
```

Generate Prisma Client:
```bash
npx prisma generate
```

Start the development server:
```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file with the following keys:

```env
# Server
PORT=8000
CORS_ORIGIN=*

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/youtube_db

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ Never commit your `.env` file. Add it to `.gitignore`.

---

## API Overview

| Module | Base Route |
|---|---|
| Auth / Users | `/api/v1/users` |
| Video | `/api/v1/videos` |
| Playlist | `/api/v1/playlists` |
| Comment | `/api/v1/comments` |
| Like | `/api/v1/likes` |
| Tweet | `/api/v1/tweets` |
| Subscription | `/api/v1/subscriptions` |
| Watch History | `/api/v1/watch-history` |

---

## API Testing

All endpoints were tested using **Postman**. A Postman collection can be added at `/postman/youtube-backend.postman_collection.json` for quick import and testing.

---

## Learning Objectives

This project was built to practice:
- Express.js & REST API design
- Prisma ORM with PostgreSQL
- Authentication & Authorization (JWT, Bcrypt)
- Database relationships & schema design
- File uploads with Multer & Cloudinary
- Backend architecture best practices

---

## Author

**Ali Haider**
=======
# YouTube-Backend-APIs
Clone of YouTube Backend APIs
>>>>>>> 0a3cf9977a1cb056d9a90b4e858db8197d1132ac
