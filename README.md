# Task Management App

A full-stack Task Management application built with **React, Vite, Tailwind CSS, Node.js, Express, and PostgreSQL**.

The application allows users to create, view, search, filter, update, complete, and delete tasks through a responsive web interface.

## Features

* Create tasks
* View all tasks
* Search tasks by title
* Filter tasks by completion status
* Edit existing tasks
* Mark tasks as completed or incomplete
* Delete tasks
* Expand tasks to view additional information
* Responsive desktop and mobile layouts
* Debounced task search
* Confirmation dialogs for important actions
* RESTful API
* PostgreSQL database
* Automatic database table initialization
* Axios API integration
* Vite development proxy
* ESLint support

## Technologies

### Frontend

* React 19
* Vite
* Tailwind CSS
* Axios
* Lucide React
* JavaScript
* ESLint

### Backend

* Node.js
* Express.js
* PostgreSQL
* `pg`
* `dotenv`
* `cors`
* Nodemon

## Project Structure

```text
task-management-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── createTask.js
│   │   │   ├── deleteTask.js
│   │   │   ├── getTask.js
│   │   │   └── updateTask.js
│   │   │
│   │   ├── db/
│   │   │   ├── db.js
│   │   │   └── init.js
│   │   │
│   │   └── routes/
│   │       └── taskRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchAndFilter.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
│
└── README.md
```

## Application Architecture

The application follows a client-server architecture:

```text
┌─────────────────────┐
│       User          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   React Frontend    │
│   Vite + Tailwind   │
└──────────┬──────────┘
           │
           │ Axios
           ▼
┌─────────────────────┐
│     Vite Proxy      │
│    /api requests    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Express Backend   │
│    REST API         │
└──────────┬──────────┘
           │
           │ pg
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│     Database        │
└─────────────────────┘
```

## Requirements

Before running the application, install:

* [Node.js](https://nodejs.org/)
* npm
* PostgreSQL
* Git (optional, for cloning the repository)

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd task-management-app
```

The frontend and backend have separate dependencies, so `npm install` must be run in both directories.

### Backend

```bash
cd backend
npm install
```

### Frontend

Open another terminal and run:

```bash
cd frontend
npm install
```

## Database Setup

Make sure PostgreSQL is installed and running.

Create the database:

```sql
CREATE DATABASE task_management;
```

The backend automatically creates the `tasks` table when the server starts.

The table contains:

| Column        | Type         | Description            |
| ------------- | ------------ | ---------------------- |
| `id`          | SERIAL       | Unique task ID         |
| `title`       | VARCHAR(255) | Task title             |
| `description` | TEXT         | Task description       |
| `completed`   | BOOLEAN      | Task completion status |
| `created_at`  | TIMESTAMP    | Task creation time     |
| `updated_at`  | TIMESTAMP    | Last update time       |

### Backend Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_management
DB_PASSWORD=your_password
DB_PORT=5432
```

Replace `your_password` with your PostgreSQL password.

## Running the Application

The application requires both the backend and frontend servers to be running.

### 1. Start the Backend

From the `backend` directory:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

You can verify that the backend is running by opening:

```text
http://localhost:5000/
```

Expected response:

```json
{
  "message": "Task Management API is running"
}
```

### 2. Start the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

Open the application in your browser:

```text
http://localhost:5173
```

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint                                      | Description               |
| ------ | --------------------------------------------- | ------------------------- |
| GET    | `/api/tasks`                                  | Retrieve all tasks        |
| GET    | `/api/tasks?search=backend`                   | Search tasks by title     |
| GET    | `/api/tasks?status=completed`                 | Retrieve completed tasks  |
| GET    | `/api/tasks?status=incomplete`                | Retrieve incomplete tasks |
| GET    | `/api/tasks?search=backend&status=incomplete` | Search and filter tasks   |
| POST   | `/api/tasks`                                  | Create a task             |
| PUT    | `/api/tasks/:id`                              | Update a task             |
| DELETE | `/api/tasks/:id`                              | Delete a task             |

## Example API Requests

### Create a Task

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Finish backend",
  "description": "Complete the task management API"
}
```

### Update a Task

```http
PUT /api/tasks/1
Content-Type: application/json
```

```json
{
  "title": "Finish backend API",
  "description": "Complete and test the backend",
  "completed": true
}
```

### Delete a Task

```http
DELETE /api/tasks/1
```

## Frontend Task Management

The frontend provides a user interface for interacting with the API.

Users can:

1. Create a task
2. View tasks
3. Search tasks
4. Filter tasks
5. Expand a task
6. Edit a task
7. Mark a task as completed
8. Mark a task as incomplete
9. Delete a task

The frontend uses Axios to communicate with the backend.

Requests are made through:

```text
/api/tasks
```

The Vite development server proxies these requests to:

```text
http://localhost:5000
```

## Search and Filtering

Task searches are debounced by 500 milliseconds to prevent unnecessary API requests while the user is typing.

Example:

```text
User types:
backend

After 500ms:

GET /api/tasks?search=backend
```

Tasks can also be filtered by completion status:

```text
/api/tasks?status=completed
```

or:

```text
/api/tasks?status=incomplete
```

Search and filtering can be combined:

```text
/api/tasks?search=backend&status=incomplete
```

## Development Scripts

### Backend

Start development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

### Frontend

Start development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Testing the API

The backend API can be tested using:

* Postman
* Thunder Client
* Insomnia
* Frontend application

Recommended testing flow:

```text
1. Start PostgreSQL
       ↓
2. Start backend
       ↓
3. Test GET /api/tasks
       ↓
4. Test POST /api/tasks
       ↓
5. Test PUT /api/tasks/:id
       ↓
6. Test DELETE /api/tasks/:id
       ↓
7. Start frontend
       ↓
8. Test the complete application
```

## Error Handling

The backend returns appropriate HTTP status codes.

### 400 — Bad Request

Returned when required information is missing.

```json
{
  "message": "Title is required"
}
```

### 404 — Not Found

Returned when a task does not exist.

```json
{
  "message": "Task not found"
}
```

### 500 — Internal Server Error

Returned when an unexpected server or database error occurs.

```json
{
  "message": "Failed to create task"
}
```

## Detailed Documentation

For more information about each part of the application, see:

* [Backend README](./backend/README.md)
* [Frontend README](./frontend/README.md)

## Application Flow

When a user creates a task:

```text
User
  ↓
TaskForm.jsx
  ↓
App.jsx
  ↓
Axios API Service
  ↓
POST /api/tasks
  ↓
Express Controller
  ↓
PostgreSQL
  ↓
Created Task
  ↓
Frontend refreshes task list
```

When retrieving tasks:

```text
User
  ↓
React Frontend
  ↓
GET /api/tasks
  ↓
Express Backend
  ↓
PostgreSQL
  ↓
Tasks returned as JSON
  ↓
React renders task list
```

## Environment

### Development

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
Database: PostgreSQL
```

## License

This project was created as a full-stack development project for practical assessment purposes.
