# Todo List App

A full-stack **Todo List** application built with **React**, **Node.js**, **TypeScript**, and **MongoDB**. Create, read, update, and delete tasks — with data that persists live in the cloud via MongoDB Atlas.

---

## Screenshots

| Home | View All | Detail / Edit |
|------|----------|---------------|
| Shows latest 4 todos with status badges | Responsive 4-column grid of all todos | Edit title, description, toggle completion, delete |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, React Router v6 |
| HTTP Client | Axios |
| Backend | Node.js, Express 4, TypeScript |
| Database | MongoDB Atlas via Mongoose |
| Dev tooling | ts-node-dev, Vite HMR |

---

## Project Structure

```
To-doApp/
├── client/                     # React frontend (Vite)
│   ├── index.html
│   ├── vite.config.ts           # Dev proxy → localhost:5000
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx             # App entry point
│       ├── App.tsx              # Router setup
│       ├── index.css            # Global dark-theme styles
│       ├── types/
│       │   └── index.ts         # Shared TypeScript interfaces
│       ├── api/
│       │   └── todos.ts         # Axios CRUD helpers
│       ├── components/
│       │   ├── Header.tsx       # "TODO LIST" header + back button
│       │   ├── TodoCard.tsx     # Row card used on Home page
│       │   └── TodoGridCard.tsx # Grid card used on View All page
│       └── pages/
│           ├── Home.tsx         # / — 4 most recent todos
│           ├── ViewAll.tsx      # /all — full grid of todos
│           ├── AddTodo.tsx      # /add — create new todo
│           └── TodoDetail.tsx   # /todo/:id — edit + delete
│
└── server/                     # Express API (Node.js)
    ├── .env                     # Environment variables (git-ignored)
    ├── tsconfig.json
    └── src/
        ├── index.ts             # Entry point — connects DB, starts server
        ├── db/
        │   └── connect.ts       # Mongoose connection helper
        ├── models/
        │   └── Todo.ts          # Mongoose schema & model
        ├── routes/
        │   └── todos.ts         # All CRUD route handlers
        └── types/
            └── index.ts         # DTO interfaces
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (free tier works fine)

---

## Getting Started

### 1 — Clone the repository

```bash
git clone https://github.com/Anujyadav911/To-doApp.git
cd To-doApp
```

### 2 — Configure environment variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todoDB?appName=Cluster0
```

> Replace `<username>`, `<password>`, and the cluster hostname with your own Atlas credentials.

### 3 — Whitelist your IP in MongoDB Atlas

1. Log in to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Go to **Network Access** → **+ Add IP Address**
3. Add your current IP, or use `0.0.0.0/0` to allow all IPs during development
4. Click **Confirm**

### 4 — Install dependencies

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 5 — Run the app (two terminals)

**Terminal 1 — API server** (port 5000):
```bash
cd server
npm run dev
```

You should see:
```
MongoDB connected
Server running at http://localhost:5000
```

**Terminal 2 — React frontend** (port 3000):
```bash
cd client
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Available Scripts

### Server (`/server`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot-reload (ts-node-dev) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production build |

### Client (`/client`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + build for production |
| `npm run preview` | Preview the production build locally |

---

## REST API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/todos` | Fetch all todos (newest first) |
| `GET` | `/todos/:id` | Fetch a single todo by ID |
| `POST` | `/todos` | Create a new todo |
| `PUT` | `/todos/:id` | Update an existing todo |
| `DELETE` | `/todos/:id` | Delete a todo |

### Request body — `POST /todos`

```json
{
  "title": "Fix the login bug",
  "description": "Users are getting 401 on valid tokens. Check JWT expiry logic.",
  "completed": false
}
```

### Request body — `PUT /todos/:id`

All fields are optional:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### Example response

```json
{
  "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
  "title": "Fix the login bug",
  "description": "Users are getting 401 on valid tokens. Check JWT expiry logic.",
  "completed": false,
  "createdAt": "2026-03-10T09:24:18.154Z",
  "updatedAt": "2026-03-10T09:24:18.154Z"
}
```

---

## Pages & Features

### `/` — Home
- Displays the 4 most recent todos as row cards
- Green check = completed, dark check = incomplete
- **VIEW** button navigates to the detail page
- **View All** link goes to the full grid
- **Add Todo** button navigates to the create form

### `/all` — View All
- Responsive grid (4 columns → 2 → 1 on smaller screens)
- All todos fetched from the API, sorted newest first
- Empty state with a prompt to add the first todo

### `/add` — Add Todo
- Form with Title input, Description textarea, and a toggle for completion status
- Submits via `POST /api/todos` and redirects to Home on success

### `/todo/:id` — Detail / Edit
- Pre-filled form loaded from `GET /api/todos/:id`
- Toggle the finish status by clicking the circular check button
- **UPDATE** — saves changes via `PUT /api/todos/:id`
- **DELETE** — removes the todo via `DELETE /api/todos/:id` with a confirmation prompt

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: `5000`) |
| `MONGO_URI` | **Yes** | Full MongoDB Atlas connection string |

---

## License

MIT