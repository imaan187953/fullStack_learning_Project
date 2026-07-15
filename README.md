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

---

# 📋 CRUD Operations Summary

| Module | Create | Read | Update | Delete |
|---------|:------:|:----:|:------:|:------:|
| 👤 User | ✅ | ✅ | ✅ | ✅ |
| 📚 Lists | ✅ | ✅ | ✅ | ✅ |
| 🔗 List Items | ✅ | ✅ | — | ✅ |
| 🎬 Media | Cache | ✅ | — | — |
| ⭐ Ratings | ✅ | ✅ | ✅ | ✅ |
| ✍️ Reviews | ✅ | ✅ | ✅ | ✅ |

> **Note:** The **List Items** module only supports **Create**, **Read**, and **Delete** operations. An update operation is not applicable because a `ListItem` only represents the relationship between a **List** and a **Media** item.

---

# 🌐 External API Integration

## 🎬 TMDB API

The backend integrates with **The Movie Database (TMDB)** to retrieve:

- Movies
- TV Shows
- Seasons
- Posters
- Genres
- Ratings
- Popularity
- Runtime

Frequently accessed media is cached in **MongoDB** to reduce API requests and improve performance.

# 🤖 AI Recommendation Module (RAG + Ollama + Qdrant)

## Overview

CineTrack uses a **fully local AI recommendation system** built with **Retrieval-Augmented Generation (RAG)**. The system analyzes user behavior, retrieves semantically similar movies from a vector database, and generates personalized recommendations using a locally hosted LLM.

The architecture avoids external AI APIs, providing a **private, cost-effective, and offline recommendation engine**.

---

# 🏗️ AI Architecture

```
User Library
(Ratings, Reviews, Lists)
        │
        ▼
Preference Builder
        │
        ▼
Embedding Generation
(nomic-embed-text)
        │
        ▼
Qdrant Vector Database
        │
        ▼
Semantic Retrieval
        │
        ▼
Prompt Builder
        │
        ▼
Ollama (Qwen2.5)
        │
        ▼
AI Recommendations
```

---

# 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Ollama | Local LLM runtime |
| Qwen2.5:3B | Recommendation generation |
| nomic-embed-text | Text embeddings |
| Qdrant | Vector similarity search |
| Docker | Qdrant deployment |
| TMDB API | Movie & TV metadata |
| Node.js / Express | Backend API |
| MongoDB | User data storage |

---

# 🔍 How RAG Works

Instead of generating recommendations only from the model's knowledge, CineTrack retrieves relevant movie information first and then uses the LLM to generate recommendations from that context.

Benefits:

- Personalized recommendations
- Reduced hallucinations
- Explainable results
- No external API dependency
- Works with updated TMDB data

---

# 👤 User Preference Analysis

The system creates a semantic profile from:

- Ratings
- Reviews
- Custom lists
- Favorite genres
- Watching behavior

Example:

```
User enjoys psychological thrillers,
science fiction, mystery, and mind-bending stories.

Favorite titles:
- Interstellar
- Arrival
- Dark
- Blade Runner 2049
```

This profile is converted into an embedding vector for semantic search.

---

# 🧠 Vector Knowledge Base

CineTrack uses TMDB as the movie data source.

An ingestion process:

1. Fetches movie metadata from TMDB.
2. Generates embeddings using `nomic-embed-text`.
3. Stores vectors in Qdrant.

Each vector contains:

- TMDB ID
- Title
- Media Type
- Genres
- Overview
- Rating
- Popularity
- Poster Path

Currently, **900+ movie vectors** are indexed.

---

# 🔎 Semantic Retrieval Flow

When a user requests recommendations:

1. User preferences are converted into embeddings.
2. Qdrant performs similarity search.
3. Relevant movie candidates are retrieved.
4. Candidates are passed to the LLM.
5. Qwen2.5 generates structured recommendations.

---

# ✨ Prompt Engineering

The recommendation prompt ensures that the AI:

- Uses only retrieved movies
- Does not invent titles
- Explains recommendation reasons
- Returns structured JSON output

---

# 🤖 Local AI Model

**LLM:** Qwen2.5:3B  
**Runtime:** Ollama

Advantages:

- No API costs
- No rate limits
- Offline execution
- Improved privacy

---

# 🔌 API Endpoint

### Get Recommendations

```
GET /api/recommendations
```

Authentication:

```
Authorization: Bearer <JWT Token>
```

Example Response:

```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "title": "Blade Runner 2049",
        "mediaType": "movie",
        "reason": "Matches your interest in science fiction and psychological storytelling.",
        "confidence": 0.96
      }
    ]
  }
}
```

---

# 🚀 Key Features

✅ Fully local AI recommendation engine  
✅ Retrieval-Augmented Generation (RAG)  
✅ Semantic vector search using Qdrant  
✅ Local LLM with Ollama  
✅ Personalized recommendations  
✅ Explainable AI responses  
✅ Docker-based vector database setup  
✅ Structured JSON output  

---

# 🔮 Future Improvements

- Hybrid search (semantic + metadata filtering)
- TV season-specific recommendations
- Recommendation history tracking
- User feedback learning loop
- Larger local models
- Personalized ranking algorithms

---

# 🔒 Security Features

The backend incorporates several security practices:

- 🔐 Password hashing using **bcrypt.js**
- 🔑 JWT-based authentication
- 🛡️ Protected API endpoints using authentication middleware
- ✅ Unique username and email validation
- 🗑️ Cascade deletion of user-related data during account deletion
- ⚙️ Environment variables for sensitive configuration values

---

# 🧪 API Testing

All backend APIs were tested using **Thunder Client**.

The following functionalities were verified:

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ CRUD Operations
- ✅ TMDB API Integration
- ✅ Protected Routes
- ✅ MongoDB Data Storage
- ✅ AI Recommendation Endpoint

---

# 📝 Conclusion

The CineTrack backend was successfully developed using a modular RESTful architecture. It provides secure authentication, cloud database integration, movie and TV show management, personalized user libraries, ratings, reviews, TMDB integration, and AI-powered recommendations.

The project emphasizes scalability, maintainability, and clean software design principles. It is fully prepared for frontend integration using **React**, enabling the development of a complete full-stack application.