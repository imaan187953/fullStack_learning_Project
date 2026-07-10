# 🎬 CineTrack Backend

> A Full Stack RESTful Backend for Managing Movies and TV Shows with AI-Powered Recommendations.

## 📖 Introduction

The backend of **CineTrack** was developed using a modern RESTful architecture with **Node.js**, **Express.js**, and **MongoDB Atlas**.

It provides:

- 🔐 Secure JWT Authentication
- 🎬 Movie & TV Show Management
- ⭐ Ratings & Reviews
- 📚 Custom User Lists
- 🤖 AI-Powered Recommendations using Google Gemini
- 🎥 TMDB API Integration
- ☁️ MongoDB Atlas Cloud Database

The project follows a modular architecture by separating **Models**, **Controllers**, **Routes**, **Services**, **Middleware**, and **Configuration** files to improve maintainability and scalability.

---

# 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Backend Runtime |
| Express.js | REST API Framework |
| MongoDB Atlas | Cloud Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt.js | Password Hashing |
| Axios | API Requests |
| TMDB API | Movie & TV Data |
| Google Gemini API | AI Recommendations |
| Thunder Client | API Testing |

---

# 📂 Project Structure

```text
src/
│
├── config/
│   ├── db.js
│   └── gemini.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── list.controller.js
│   ├── media.controller.js
│   ├── listItem.controller.js
│   ├── rating.controller.js
│   ├── review.controller.js
│   └── aiRecommendation.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── list.model.js
│   ├── listItem.model.js
│   ├── media.model.js
│   ├── rating.model.js
│   └── review.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── list.routes.js
│   ├── media.routes.js
│   ├── listItem.routes.js
│   ├── rating.routes.js
│   ├── review.routes.js
│   └── aiRecommendation.routes.js
│
├── services/
│   ├── tmdb.service.js
│   └── aiRecommendation.service.js
│
├── utils/
│   └── generateToken.js
│
├── app.js
└── server.js
```

---

# 🗄️ Database Models

## 👤 User

Stores registered user information.

**Fields**

- Username
- Email
- Password (Hashed)
- Display Name
- Profile Picture
- Bio
- Email Verification Status

---

## 📚 List

Stores custom lists created by users.

Examples:

- Favorites
- Watch Later
- Nolan Collection
- Horror Movies

Each list belongs to one user.

---

## 🎬 Media

Stores cached information retrieved from TMDB.

Supports:

- Movies
- TV Shows
- Seasons

The Media collection acts as a local cache to reduce unnecessary TMDB API requests.

---

## 🔗 ListItem

Acts as a junction table between **Lists** and **Media**.

A single movie or TV show can belong to multiple lists.

---

## ⭐ Rating

Stores user ratings.

- User
- Media
- Rating Value

---

## ✍️ Review

Stores written reviews.

- User
- Media
- Review Text

---

# 🔐 Authentication Flow

```text
User Login
     │
     ▼
Verify Email
     │
     ▼
Compare Password (bcrypt)
     │
     ▼
Generate JWT
     │
     ▼
Return Token
```

Protected routes use authentication middleware that:

- Verifies JWT
- Decodes the User ID
- Retrieves the User
- Attaches the User to `req.user`

---

# 📡 REST APIs

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| GET | `/api/auth/profile` | Get Profile |
| PUT | `/api/auth/profile` | Update Profile |
| DELETE | `/api/auth/profile` | Delete Account |

## Lists

| Method | Endpoint |
|--------|----------|
| POST | `/api/lists` |
| GET | `/api/lists` |
| PUT | `/api/lists/:id` |
| DELETE | `/api/lists/:id` |

## List Items

| Method | Endpoint |
|--------|----------|
| POST | `/api/list-items` |
| GET | `/api/list-items/:listId` |
| DELETE | `/api/list-items/:id` |

## Media

| Method | Endpoint |
|--------|----------|
| GET | `/api/media/search/movie?q=` |
| GET | `/api/media/search/tv?q=` |
| GET | `/api/media/movie/:id` |
| GET | `/api/media/tv/:id` |
| GET | `/api/media/tv/:tvId/season/:seasonNumber` |
| GET | `/api/media/trending` |

## Ratings

| Method | Endpoint |
|--------|----------|
| POST | `/api/ratings` |
| GET | `/api/ratings/:mediaId` |
| PATCH | `/api/ratings/:ratingId` |
| DELETE | `/api/ratings/:ratingId` |

## Reviews

| Method | Endpoint |
|--------|----------|
| POST | `/api/reviews` |
| GET | `/api/reviews/media/:mediaId` |
| GET | `/api/reviews/my/:mediaId` |
| PATCH | `/api/reviews/:reviewId` |
| DELETE | `/api/reviews/:reviewId` |

## AI Recommendation

| Method | Endpoint |
|--------|----------|
| GET | `/api/ai` |

The AI analyzes:

- User Lists
- Ratings
- Reviews

and generates personalized movie and TV show recommendations.

---