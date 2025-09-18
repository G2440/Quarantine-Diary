# Quarantine Diary

Quarantine Diary is a MongoDB-backed journaling app built with Node.js, Express, and EJS. It lets you capture moments from life in quarantine, keep them organized, and revisit them later through a friendly web interface.

## Features
- Create, read, update, and delete diary entries with titles, rich text blurbs, author, and image URLs
- Responsive Bootstrap layout with EJS templates and custom styling
- Human-friendly dates and entry previews on the landing page
- REST-style routing powered by Express and method-override for HTML form support

## Tech Stack
- Node.js with Express for the HTTP server and routing
- MongoDB and Mongoose for data modeling and persistence
- EJS for server-rendered views
- Bootstrap 4 and custom CSS for styling

## Prerequisites
- Node.js 12+ and npm
- Access to a MongoDB instance (local or hosted Atlas cluster)

## Getting Started
1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/Quarantine-Diary.git
   cd Quarantine-Diary
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure MongoDB
   - Open `app.js` and replace the `mongoose.connect(...)` string with your own MongoDB connection URI
   - Keep credentials out of version control. A common approach is to load the URI from an environment variable (for example `process.env.MONGODB_URI`) and set that variable locally or in deployment configuration

## Running the App
- Start the server
  ```bash
  node app.js
  ```
  The server listens on `process.env.PORT` when provided, otherwise on port 8080.
- If you prefer to use `npm start`, update the `scripts.start` entry in `package.json` to `"node app.js"` first.
- Visit `http://localhost:8080` in your browser.

## Project Structure
```
app.js               // Express app, routes, and MongoDB connection
public/              // Static assets (CSS, background images)
views/               // EJS templates for pages and partials
  index.ejs          // Landing page showing diary previews
  new.ejs            // Form to create entries
  edit.ejs           // Form to update entries via method-override
  show.ejs           // Detail view per entry
  delete.ejs         // Delete confirmation screen
  partials/          // Shared header and footer
README.md            // Project overview and instructions
```

## Data Model
The `Diary` Mongoose schema lives in `app.js`. Each entry stores:
- `title` (String)
- `content` (String)
- `pic` (String URL to an image)
- `author` (String)
- `date` (Date, defaults to creation time)

## Development Notes
- HTTP verbs beyond GET/POST are enabled via method-override and `?_method=PUT` / `DELETE` form submissions
- Static assets are served from `public/`; update `public/stylesheets/app.css` to tweak the look and feel
- `seeds.js` is included for optional seeding logic if you want to pre-populate the database

## Deployment Tips
- Use environment variables for secrets and adjust the MongoDB connection string accordingly
- Configure your hosting environment to forward the desired port to the app (Heroku, Render, etc.)
- Ensure the build step installs dependencies with `npm install` and starts the service with `node app.js`

## License
This project is licensed under the ISC License. See `package.json` for details.
