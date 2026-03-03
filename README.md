# UVCE HEIHA Website

Official website for the **UVCE HEIHA (Northeast India Students Association)** at the University Visvesvaraya College of Engineering, Bangalore.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

---

## ▶️ Running the Project

The project has two parts: a **React frontend** (`client/`) and an **Express backend** (`server/`).

### 1. Start the Backend Server

```bash
cd server
npm install
npm start
```

The server runs on **http://localhost:5000**.

> **Tip:** Use `npm run dev` instead of `npm start` if you have `nodemon` installed for auto-restart on changes.

### 2. Start the Frontend (in a new terminal)

```bash
cd client
npm install
npm start
```

The React app opens automatically at **http://localhost:3000** and proxies API calls to the server.

---

## 🔧 Admin Portal

The Admin Portal lets you manage all website content — **no coding skills needed!**

### Accessing the Portal

1. Make sure both the server and client are running (see above).
2. Navigate to **http://localhost:3000/admin** — or click the **⚙️ Admin** link in the top navigation bar.

### Logging In

Enter the admin password when prompted.

> **Default password:** `heiha2024admin`
>
> To change the password, set the `ADMIN_PASSWORD` environment variable before starting the server:
> ```bash
> ADMIN_PASSWORD=yourNewPassword npm start
> ```

### What You Can Manage

| Section | What you can do |
|---------|----------------|
| **Alumni** | Add, edit, or remove alumni profiles and their messages to current students |
| **Gallery** | Add new event entries, update titles/descriptions/categories, or remove old items |
| **Events** | Create upcoming events, update dates and descriptions, or delete past events |

### Step-by-Step: Adding New Content

1. Log in to the Admin Portal.
2. Click the relevant section in the **left sidebar** (Alumni, Gallery, or Events).
3. Click the **+ Add** button at the top right of the section.
4. Fill in the form — all fields marked with a red asterisk (`*`) are required.
5. Click **Add** to save. The change is **immediately live** on the website.

### Step-by-Step: Editing Existing Content

1. Find the item you want to change in the list.
2. Click the **✏️ Edit** button next to it.
3. Update the fields in the form that appears.
4. Click **Save Changes**.

### Step-by-Step: Deleting Content

1. Find the item you want to remove.
2. Click the **🗑️ Delete** button.
3. Confirm the deletion in the dialog that appears.

> ⚠️ **Note:** Deletions are permanent. The data is stored in memory, so all changes are reset when the server restarts. For permanent storage, a database (e.g., MongoDB or PostgreSQL) would need to be integrated.

---

## 🗂️ Project Structure

```
uvce-heiha/
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/   # Navbar, Footer, MarqueeBar
│       ├── pages/        # Home, About, Alumni, Gallery, StudentCorner, Admin
│       ├── App.js
│       └── index.css
└── server/               # Express backend
    ├── index.js          # API routes + data
    └── package.json
```

---

## 🛠️ Available Scripts

### Client (`cd client`)

| Command | Description |
|---------|-------------|
| `npm start` | Run the app in development mode |
| `npm run build` | Build the app for production |
| `npm test` | Run the test suite |

### Server (`cd server`)

| Command | Description |
|---------|-------------|
| `npm start` | Start the server with Node |
| `npm run dev` | Start with nodemon (auto-restart) |

---

## 🌐 API Endpoints

| Method | Route | Auth Required | Description |
|--------|-------|--------------|-------------|
| GET | `/api/health` | No | Server health check |
| GET | `/api/alumni` | No | Fetch all alumni |
| POST | `/api/alumni` | Yes | Add a new alumni |
| PUT | `/api/alumni/:id` | Yes | Update an alumni |
| DELETE | `/api/alumni/:id` | Yes | Delete an alumni |
| GET | `/api/gallery` | No | Fetch all gallery items |
| POST | `/api/gallery` | Yes | Add a gallery item |
| PUT | `/api/gallery/:id` | Yes | Update a gallery item |
| DELETE | `/api/gallery/:id` | Yes | Delete a gallery item |
| GET | `/api/events` | No | Fetch all events |
| POST | `/api/events` | Yes | Add an event |
| PUT | `/api/events/:id` | Yes | Update an event |
| DELETE | `/api/events/:id` | Yes | Delete an event |
| POST | `/api/admin/login` | No | Admin login |

---

## 📬 Contact

For questions or to report issues, contact the HEIHA executive committee at **heiha.uvce@gmail.com**.

