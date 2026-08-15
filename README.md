# 🎬 CineTrack

### A Full-Stack Movie & TV Tracking Platform with Local AI-Powered Recommendations

CineTrack is a full-stack movie and TV discovery platform built to give
users a more personal way to **discover, track, organize, rate, review,
and share** the content they love.

Users can search for movies and TV shows, create custom lists, rate and
review titles, manage their personal library, and **share their lists
with friends through shareable links**.

At the heart of CineTrack is a local AI recommendation system that
combines **user behavior, semantic search, vector embeddings,
Retrieval-Augmented Generation (RAG), and a locally running LLM** to
produce recommendations tailored to each user's taste.

>  **CineTrack doesn't just ask what's popular --- it learns what you
> like.**

------------------------------------------------------------------------

##  Why CineTrack?

Most movie platforms focus heavily on popularity, ratings, or simple
genre matching.

CineTrack takes a more personalized approach.

It uses signals from a user's:

-   Ratings
-   Reviews
-   Custom lists
-   Favorite genres
-   Semantic relationships between preferences and media

These signals are transformed into a user preference profile and passed
through a semantic retrieval and local AI pipeline.

``` text
User Activity
     ↓
Preference Profile
     ↓
Embeddings
     ↓
Qdrant Vector Search
     ↓
Relevant Media
     ↓
RAG Prompt
     ↓
Local LLM
     ↓
Personalized Recommendations
```

This allows CineTrack to recommend content based on the **context and
meaning of a user's interests**, rather than relying only on predefined
categories.

------------------------------------------------------------------------

#  Core Features

## 🎥 Movie & TV Discovery

CineTrack integrates with **The Movie Database (TMDB)** to provide rich
movie and TV information.

Users can:

-   Search movies
-   Search TV shows
-   Browse trending movies
-   Browse trending TV shows
-   View movie details
-   View TV show details
-   View posters and backdrops
-   Explore genres, ratings, release dates, and overviews

------------------------------------------------------------------------

## 📚 Personal Lists & Library

Users can organize their media into custom lists.

Examples:

``` text
Favorite Movies
Watch Later
Best TV Shows
Feel-Good Movies
Sci-Fi Collection
```

Users can:

-   Create custom lists
-   Add movies and TV shows to lists
-   View and manage their lists
-   Organize content around their own interests
-   Share lists with friends using shareable links

This makes CineTrack more than a recommendation application --- it also
acts as a personal movie and TV library.

------------------------------------------------------------------------

## ⭐ Ratings & Reviews

Users can interact with media through:

-   Personal ratings
-   Reviews
-   Review editing
-   Review management
-   Personal viewing preferences

These interactions are stored as part of the user's profile and also
provide important signals for the AI recommendation system.

------------------------------------------------------------------------

## 👤 User Profiles

Each user has a personal profile containing:

-   Profile information
-   Personal lists
-   Reviews
-   Ratings
-   Media preferences

The profile acts as the foundation for understanding a user's taste.

------------------------------------------------------------------------

# 🤖 Local AI Recommendation System

The most distinctive part of CineTrack is its **local AI recommendation
architecture**.

Instead of depending entirely on a cloud AI provider, CineTrack uses
locally running AI components:

-   **Ollama** --- local model runtime
-   **Qwen2.5** --- local LLM for recommendations and AI chat
-   **nomic-embed-text** --- embedding model
-   **Qdrant** --- vector database
-   **RAG** --- context-aware retrieval and generation

### AI Pipeline

``` text
                    ┌─────────────────────┐
                    │        User         │
                    └──────────┬──────────┘
                               │
                               ▼
                 ┌─────────────────────────┐
                 │ Ratings / Reviews /     │
                 │ Lists / User Activity   │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Preference Builder      │
                 │                         │
                 │ User Taste Profile      │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Ollama Embeddings       │
                 │                         │
                 │ nomic-embed-text        │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Qdrant                  │
                 │                         │
                 │ Semantic Vector Search  │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Relevant Media          │
                 │ Retrieval               │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Prompt Builder          │
                 │                         │
                 │ Profile + RAG Context   │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Local LLM               │
                 │                         │
                 │ Qwen2.5                 │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Personalized            │
                 │ Recommendations         │
                 └─────────────────────────┘
```

------------------------------------------------------------------------

# CineTrack AI Chat

CineTrack also provides an AI chat interface where users can ask
natural-language questions about movies and TV shows.

Example prompts:

``` text
Movies like Interstellar
Dark psychological thrillers
Best TV shows under 3 seasons
Hidden sci-fi gems
Feel-good comedies
```

The chat system uses the same general preference and retrieval
architecture to provide context-aware responses.

Users can interact with the AI without first generating a recommendation
list.

------------------------------------------------------------------------

# Why RAG?

A traditional LLM recommendation approach might simply ask:

``` text
Recommend movies for this user.
```

CineTrack instead retrieves relevant media before asking the LLM to
generate recommendations.

``` text
User Preferences
       +
Retrieved Media
       +
Recommendation Prompt
       ↓
     Local LLM
       ↓
Relevant Recommendations
```

This gives the model access to a focused set of candidate titles instead
of asking it to generate recommendations from general model knowledge
alone.

The result is a recommendation pipeline that combines:

**Personalization + Semantic Retrieval + Generative AI**

------------------------------------------------------------------------

#  Recommendation Generation Workflow

When a user requests new recommendations:

``` text
1. User clicks "Generate Recommendations"
                    ↓
2. CineTrack loads user activity
                    ↓
3. Ratings / Reviews / Lists
   are converted into a preference profile
                    ↓
4. Preference profile is embedded
                    ↓
5. Qdrant performs semantic retrieval
                    ↓
6. Relevant media are retrieved
                    ↓
7. Recommendation prompt is constructed
                    ↓
8. Qwen2.5 generates recommendations
                    ↓
9. Structured recommendations are returned
                    ↓
10. React displays personalized results
```

The generated recommendations include information such as:

-   Title
-   Media type
-   Genre
-   Match confidence
-   Explanation of why the title may suit the user
-   Poster

------------------------------------------------------------------------

# Frontend Modules

## Landing Page

Introduces CineTrack and highlights the platform's main capabilities.

## Authentication

-   Login
-   Registration
-   Authentication state management
-   Protected application areas

## Home

Provides a central discovery experience with:

-   Personalized hero section
-   User lists
-   Trending movies
-   Trending TV shows

## Search

Users can search for:

-   Movies
-   TV shows

Search results are displayed using reusable media cards and remain
available when navigating back from a media details page.

## Movie Details

Provides detailed movie information together with user interactions such
as lists, ratings, and reviews.

## TV Details

Provides detailed TV show information and related user interactions.

## Lists

Allows users to create and manage personal media collections and share
lists with friends.

## Profile

Contains:

-   User information
-   Personal lists
-   Reviews
-   Ratings

## AI Recommendations

Provides:

-   Personalized recommendation generation
-   AI insights
-   Semantic match information
-   Recommendation confidence
-   Explanations for recommendations
-   AI chat

------------------------------------------------------------------------

#  System Architecture

At a high level, CineTrack follows a modular full-stack architecture:

``` text
                         ┌───────────────────┐
                         │      React        │
                         │     Frontend      │
                         └─────────┬─────────┘
                                   │
                              REST API
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Node.js + Express │
                         │      Backend      │
                         └─────────┬─────────┘
                                   │
             ┌─────────────────────┼─────────────────────┐
             │                     │                     │
             ▼                     ▼                     ▼
      ┌────────────┐        ┌────────────┐       ┌──────────────┐
      │  MongoDB   │        │    TMDB    │       │  AI Module   │
      │ Application│        │    API     │       │              │
      │    Data    │        │            │       │              │
      └────────────┘        └────────────┘       └──────┬───────┘
                                                        │
                                                 ┌──────┴──────┐
                                                 │             │
                                                 ▼             ▼
                                           ┌──────────┐  ┌──────────┐
                                           │  Qdrant  │  │  Ollama  │
                                           │  Vector  │  │  Local   │
                                           │    DB    │  │   AI     │
                                           └──────────┘  └──────────┘
```

The architecture separates:

-   Presentation
-   API communication
-   Authentication
-   Application data
-   External media data
-   Recommendation logic
-   Vector retrieval
-   Local AI generation

This keeps the project modular and easier to maintain and extend.

------------------------------------------------------------------------

#  Technology Stack

## Frontend

  Technology     Purpose
  -------------- ---------------------
  React          User interface
  React Router   Client-side routing
  Tailwind CSS   Responsive styling
  Axios          API communication
  Lucide React   UI icons

## Backend

  Technology   Purpose
  ------------ ----------------------------
  Node.js      Backend runtime
  Express.js   REST API framework
  MongoDB      Application database
  Mongoose     MongoDB object modeling
  JWT          Authentication
  bcrypt       Password hashing
  Axios        External API communication
  dotenv       Environment configuration

## AI / Recommendation

  Technology         Purpose
  ------------------ ----------------------------------------
  Ollama             Local AI model runtime
  Qwen2.5            Local recommendation and chat LLM
  nomic-embed-text   Text embeddings
  Qdrant             Vector database
  RAG                Context-aware retrieval and generation

## External Data

### TMDB

CineTrack uses **The Movie Database (TMDB)** as its primary source for
movie and TV media information.

TMDB provides data including:

-   Titles
-   Posters
-   Backdrops
-   Genres
-   Release dates
-   Ratings
-   Overviews
-   TV information

------------------------------------------------------------------------

#  Database Design

CineTrack uses **MongoDB with Mongoose** for application data.

The primary entities include:

``` text
User
Media
Library
Rating
Review
```

The AI system uses Qdrant separately for semantic media retrieval.

This separation allows MongoDB to handle application and user data while
Qdrant handles vector-based similarity search.

------------------------------------------------------------------------

# Authentication & Security

CineTrack implements authentication using:

-   JWT-based authentication
-   Password hashing with bcrypt
-   Protected backend routes
-   Frontend authentication state
-   Environment-based configuration

Sensitive configuration such as database credentials, JWT secrets, TMDB
credentials, and AI configuration is kept outside the source code
through environment variables.

------------------------------------------------------------------------

#  Project Structure

A simplified high-level structure:

``` text
CineTrack/
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── ai/
│       │   ├── common/
│       │   ├── home/
│       │   ├── layout/
│       │   ├── lists/
│       │   ├── media/
│       │   ├── profile/
│       │   ├── ratings/
│       │   ├── reviews/
│       │   └── search/
│       │
│       ├── contexts/
│       ├── pages/
│       ├── services/
│       └── utils/
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    │   ├── preference.service.js
    │   ├── rag.service.js
    │   ├── ollama.service.js
    │   ├── recommendation.service.js
    │   └── tmdbRetriever.service.js
    ├── utils/
    └── server.js
```

------------------------------------------------------------------------

#  Backend Architecture

The backend follows a modular, service-oriented structure.

Major responsibilities are separated into:

-   **Controllers** --- handle incoming requests and responses
-   **Routes** --- define API endpoints
-   **Models** --- represent MongoDB data
-   **Services** --- contain business and AI logic
-   **Middleware** --- authentication and request processing
-   **Utils** --- reusable helper functionality

The AI functionality is further separated into services for:

-   Building user preferences
-   Retrieving relevant media
-   Generating embeddings
-   Building prompts
-   Running the local LLM
-   Generating recommendations
-   AI chat

------------------------------------------------------------------------

#  Project Goals

CineTrack was designed around several engineering and product goals.

### 1. Personalized Discovery

Move beyond generic "trending" recommendations and build recommendations
around individual taste.

### 2. User-Centric Tracking

Give users control over their ratings, reviews, lists, and personal
media organization.

### 3. Explainable Recommendations

Show not only what was recommended, but also **why the user may like
it**.

### 4. Local AI

Explore a locally running AI architecture instead of depending entirely
on external AI APIs.

### 5. Semantic Retrieval

Use embeddings and vector similarity to discover meaningful
relationships between user preferences and media.

### 6. Modular Architecture

Separate frontend, backend, database, external APIs, and AI services to
keep the system maintainable.

### 7. Responsive User Experience

Provide a clean, minimal interface that works across desktop, tablet,
and mobile devices.

------------------------------------------------------------------------

# Current Project Status

CineTrack currently includes the core full-stack functionality:

-   ✅ Authentication
-   ✅ TMDB integration
-   ✅ Movie search
-   ✅ TV search
-   ✅ Movie details
-   ✅ TV details
-   ✅ User profiles
-   ✅ Custom lists
-   ✅ Shareable lists
-   ✅ Ratings
-   ✅ Reviews
-   ✅ Trending content
-   ✅ Responsive React interface
-   ✅ Local Ollama integration
-   ✅ Embedding generation
-   ✅ Qdrant semantic retrieval
-   ✅ RAG recommendation pipeline
-   ✅ AI recommendation interface
-   ✅ AI chat interface

------------------------------------------------------------------------

#  Future Improvements

Potential future improvements include:

-   More advanced recommendation ranking
-   Improved cold-start recommendations
-   More sophisticated preference weighting
-   Better AI conversation memory
-   Recommendation feedback loops
-   Watch history tracking
-   Social features
-   More advanced public/shared list functionality
-   Recommendation evaluation metrics
-   Improved vector retrieval strategies
-   More advanced personalization

------------------------------------------------------------------------

#  Technical Highlights

CineTrack demonstrates practical implementation of several modern
software engineering concepts:

``` text
Full-Stack Development
│
├── React
├── Node.js
├── Express
└── MongoDB

API Integration
│
└── TMDB

Authentication
│
├── JWT
└── bcrypt

AI Engineering
│
├── Ollama
├── Embeddings
├── Qdrant
├── Vector Search
└── RAG

Software Architecture
│
├── Service Layer
├── REST APIs
├── Modular Components
└── Separation of Concerns
```

------------------------------------------------------------------------

#  Example User Journey

A typical CineTrack experience can look like:

``` text
Sign Up
   ↓
Explore Trending Movies / TV
   ↓
Search for a Title
   ↓
Open Media Details
   ↓
Rate / Review the Title
   ↓
Add It to a Personal List
   ↓
Share the List with Friends
   ↓
Continue Building Viewing Preferences
   ↓
Generate AI Recommendations
   ↓
Receive Personalized Titles + Explanations
   ↓
Ask CineTrack AI for More Recommendations
```

This creates a continuous loop where user interaction contributes to a
richer understanding of their preferences.

------------------------------------------------------------------------

# Getting Started

## Prerequisites

Make sure the following are installed:

-   Node.js
-   npm
-   MongoDB / MongoDB Atlas
-   Ollama
-   Qdrant
-   A TMDB API access token

The local AI environment should have the required models available
through Ollama.

Example:

``` bash
ollama pull qwen2.5:3b
ollama pull nomic-embed-text
```

## 1. Clone the Repository

``` bash
git clone <your-repository-url>
cd CineTrack
```

## 2. Install Frontend Dependencies

``` bash
cd frontend
npm install
```

## 3. Install Backend Dependencies

``` bash
cd ../backend
npm install
```

## 4. Configure Environment Variables

Create the required `.env` files for the backend and provide your own
configuration values for:

``` text
MONGODB_URI=
JWT_SECRET=
TMDB_ACCESS_TOKEN=
OLLAMA_URL=
QDRANT_URL=
```

Do not commit secrets or credentials to the repository.

## 5. Start Qdrant

Run Qdrant locally or connect to an existing Qdrant instance.

## 6. Start Ollama

Make sure Ollama is running and the required models are available.

## 7. Start the Backend

``` bash
cd backend
npm run dev
```

## 8. Start the Frontend

In another terminal:

``` bash
cd frontend
npm run dev
```

The exact scripts may vary depending on the project's current
`package.json` configuration.

------------------------------------------------------------------------

#  What This Project Demonstrates

CineTrack brings together several areas of modern application
development in a single project:

**Frontend Engineering**

React, routing, reusable components, responsive UI, state management,
and API integration.

**Backend Engineering**

Node.js, Express, REST APIs, authentication, MongoDB, service-oriented
architecture, and external API integration.

**AI Engineering**

Embeddings, vector databases, semantic retrieval, RAG, local LLM
inference, prompt construction, and AI-powered recommendations.

**Product Thinking**

Personal libraries, ratings, reviews, social list sharing, explainable
recommendations, and a user-centered discovery experience.

------------------------------------------------------------------------

# Project

**CineTrack** is an ongoing full-stack project focused on combining
modern web development with practical local AI engineering.

> **Discover. Track. Rate. Review. Share. Get recommendations that
> actually feel personal.**

------------------------------------------------------------------------

##  License

This project is currently intended for educational and development
purposes.
