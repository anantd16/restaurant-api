# Restaurant Management API

A RESTful API to manage Restaurants, Menu Items, and User Authentication, built with Node.js, Express, JWT, Bcrypt, and MongoDB.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:
   ```
   cp .env.example .env
   ```
   - `MONGO_URI` — your MongoDB connection string (local or Atlas)
   - `JWT_SECRET` — any long random string
   - `PORT` — defaults to 5000

3. Run the server:
   ```
   npm start
   ```
   or with auto-reload during development:
   ```
   npm run dev
   ```

## Project Structure

```
restaurant-api/
├── config/db.js           # MongoDB connection
├── controllers/           # Business logic
├── middleware/             # auth, logger, error handler
├── models/                 # Mongoose schemas
├── routes/                 # Express routers
├── server.js                # App entry point
└── .env                    # Environment variables (not committed)
```

## Auth Flow (JWT)

1. `POST /register` → password hashed with bcrypt → user saved to MongoDB.
2. `POST /login` → verifies password → returns a JWT.
3. For protected routes, send the token in headers:
   `Authorization: Bearer <token>`
4. Middleware verifies the token before allowing access.

## Endpoints

| Method | Endpoint                  | Auth | Description                          |
|--------|----------------------------|------|---------------------------------------|
| POST   | /register                  | No   | Register a new user                  |
| POST   | /login                     | No   | Login, returns JWT                    |
| GET    | /                           | No   | Welcome route                         |
| GET    | /restaurants                | No   | List all restaurants                  |
| GET    | /restaurants/top            | No   | Top 5 restaurants by rating (extra)   |
| GET    | /restaurants/:id            | No   | Get restaurant by ID                  |
| POST   | /restaurants                | Yes  | Add a new restaurant                  |
| PUT    | /restaurants/:id            | Yes  | Update a restaurant                   |
| DELETE | /restaurants/:id            | Yes  | Delete a restaurant                   |
| GET    | /restaurants/:id/menu       | No   | Get all menu items for a restaurant   |
| POST   | /restaurants/:id/menu       | Yes  | Add menu item to a restaurant         |
| PUT    | /menu/:id                   | Yes  | Update a menu item                    |
| DELETE | /menu/:id                   | Yes  | Delete a menu item                    |

## Testing with Postman

1. Register a user via `POST /register`.
2. Log in via `POST /login` to get a token.
3. For protected routes, add header `Authorization: Bearer <token>`.

## Extra Tasks Implemented

- ✅ `/restaurants/top` — top 5 restaurants by rating
- ✅ Request logging middleware (method, path, timestamp)
- ✅ async/await used for all MongoDB CRUD operations
- ✅ Proper status codes (201, 400, 401, 404, 500) with meaningful messages
- ✅ Separated routes / models / controllers for clean code
- ✅ Validation for required fields via Mongoose schemas + controller checks
- ✅ Secure password storage (bcrypt) and token generation (JWT)
