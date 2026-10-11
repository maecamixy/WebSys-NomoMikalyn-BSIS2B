# Week 7 Mini Full-Stack Starter

A student laboratory project using Node.js, Express, MongoDB Atlas, Mongoose, Bootstrap, and Fetch API.

## Project structure

- `server.js` - Express server and MongoDB connection
- `models/User.js` - Mongoose user model
- `routes/users.js` - CRUD API routes
- `public/index.html` - Bootstrap frontend
- `public/css/styles.css` - custom styling
- `public/js/app.js` - frontend requests to the API
- `.env` - local database connection settings (never commit this file)

## Setup

1. Install Node.js LTS and Git.
2. Open this folder in VS Code.
3. In the VS Code terminal, run `npm install`.
4. Create a free MongoDB Atlas database and database user.
5. Put your connection string in `.env` as `MONGO_URI=...`.
6. Replace the placeholder username/password in the URI with your own database credentials. If your password contains special characters, URL-encode them.
7. In MongoDB Atlas Network Access, allow your current IP for local testing.
8. Run `npm run dev`.
9. Open `http://localhost:3000`.
10. Test the health endpoint at `http://localhost:3000/api/health`.

## API routes

- `GET /api/users` - read all users
- `POST /api/users` - create a user
- `PUT /api/users/:id` - update a user
- `DELETE /api/users/:id` - delete a user

For POST/PUT requests, send JSON with fields such as `name`, `email`, and optional `age`.

## Before pushing to GitHub

- Keep `.env` private. `.gitignore` excludes it from Git.
- Never put real database passwords in source code or README.
- Use only test data in this class project.

## Render deployment

- Build command: `npm install`
- Start command: `npm start`
- Add `MONGO_URI` in Render's Environment settings using your Atlas connection string.
- Render supplies its own `PORT`; the server uses `process.env.PORT`.
- After deployment, test `/`, `/api/health`, and `/api/users`.

## Personalization

Update the page title, portfolio label, accent colors, and footer text to match your own portfolio before submitting.
