# Task Management API Backend

A RESTful backend API for a Task Management application built with Node.js, Express, and PostgreSQL.

## Features

* Create tasks
* Retrieve all tasks
* Search tasks by title
* Filter tasks by completion status
* Update tasks
* Delete tasks
* Automatic database table initialization
* PostgreSQL connection using the `pg` package
* CORS support
* JSON request body parsing

## Technologies

* Node.js
* Express.js
* PostgreSQL
* `pg`
* `dotenv`
* `cors`
* Nodemon

## Project Structure

```text
backend/
├── src/
│   ├── controllers/
│   │   ├── createTask.js
│   │   ├── deleteTask.js
│   │   ├── getTask.js
│   │   └── updateTask.js
│   │
│   ├── db/
│   │   ├── db.js
│   │   └── init.js
│   │
│   └── routes/
│       └── taskRoutes.js
│
├── server.js
├── package.json
└── .env
```

## Requirements

Before running the backend, install the following:

* Node.js
* PostgreSQL
* npm

## Installation

Clone or download the project, then open the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_management
DB_PASSWORD=your_password
DB_PORT=5432
```

Replace the database username, password, and database name with your PostgreSQL configuration.

## Database Setup

First, create the PostgreSQL database.

For example:

```sql
CREATE DATABASE task_management;
```

The application automatically creates the `tasks` table when the backend starts.

The table contains the following columns:

| Column      | Type         | Description            |
| ----------- | ------------ | ---------------------- |
| id          | SERIAL       | Unique task ID         |
| title       | VARCHAR(255) | Task title             |
| description | TEXT         | Task description       |
| completed   | BOOLEAN      | Task completion status |
| created_at  | TIMESTAMP    | Task creation time     |
| updated_at  | TIMESTAMP    | Last update time       |

The database initialization is handled by `src/db/init.js`.

## Running the Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server runs by default at:

```text
http://localhost:5000
```

## API Endpoints

### Get All Tasks

```http
GET /api/tasks
```

Returns all tasks ordered by the newest creation date.

Example response:

```json
[
  {
    "id": 1,
    "title": "Finish backend",
    "description": "Complete the task management API",
    "completed": false,
    "created_at": "2026-08-19T10:00:00.000Z",
    "updated_at": "2026-08-19T10:00:00.000Z"
  }
]
```

### Search Tasks

```http
GET /api/tasks?search=backend
```

Searches tasks by their title.

The search uses PostgreSQL `ILIKE`, making the search case-insensitive.

### Filter Completed Tasks

```http
GET /api/tasks?status=completed
```

Returns only completed tasks.

### Filter Incomplete Tasks

```http
GET /api/tasks?status=incomplete
```

Returns only incomplete tasks.

### Search and Filter

Search and status filtering can be combined:

```http
GET /api/tasks?search=backend&status=incomplete
```

### Create a Task

```http
POST /api/tasks
```

Request body:

```json
{
  "title": "Finish backend",
  "description": "Complete the task management API"
}
```

Example response:

```json
{
  "id": 1,
  "title": "Finish backend",
  "description": "Complete the task management API",
  "completed": false,
  "created_at": "2026-08-19T10:00:00.000Z",
  "updated_at": "2026-08-19T10:00:00.000Z"
}
```

The title is required.

### Update a Task

```http
PUT /api/tasks/:id
```

Example:

```http
PUT /api/tasks/1
```

Request body:

```json
{
  "title": "Finish backend API",
  "description": "Complete and test the backend",
  "completed": true
}
```

The `updated_at` value is automatically updated whenever the task is modified.

### Delete a Task

```http
DELETE /api/tasks/:id
```

Example:

```http
DELETE /api/tasks/1
```

If the task exists, it is permanently removed from the database.

Example response:

```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 1,
    "title": "Finish backend API",
    "description": "Complete and test the backend",
    "completed": true,
    "created_at": "2026-08-19T10:00:00.000Z",
    "updated_at": "2026-08-19T10:30:00.000Z"
  }
}
```

## Root Endpoint

You can check whether the API is running by opening:

```http
GET /
```

Response:

```json
{
  "message": "Task Management API is running"
}
```

## Error Responses

The API returns appropriate HTTP status codes.

### 400 Bad Request

Used when required information is missing.

Example:

```json
{
  "message": "Title is required"
}
```

### 404 Not Found

Used when the requested task does not exist.

Example:

```json
{
  "message": "Task not found"
}
```

### 500 Internal Server Error

Used when an unexpected server or database error occurs.

Example:

```json
{
  "message": "Failed to create task"
}
```

## Database Connection

The PostgreSQL connection is configured in:

```text
src/db/db.js
```

The application uses PostgreSQL's connection pool through the `pg` package.

The database credentials are loaded from environment variables using `dotenv`.

## Database Initialization

The database initialization is handled by:

```text
src/db/init.js
```

When the server starts, `initDatabase()` executes:

```sql
CREATE TABLE IF NOT EXISTS tasks (...)
```

This means the application will create the `tasks` table if it does not already exist.

The PostgreSQL database itself must still be created manually.

## Development

Use Nodemon during development:

```bash
npm run dev
```

Nodemon automatically restarts the server when changes are detected.

## API Base URL

```text
http://localhost:5000/api/tasks
```

Available operations:

```text
GET     /api/tasks
POST    /api/tasks
PUT     /api/tasks/:id
DELETE  /api/tasks/:id
```

## Testing

The API can be tested using tools such as Postman, Insomnia, or a frontend application.

Example request flow:

```text
1. Start PostgreSQL
2. Start the backend
3. Create a task using POST /api/tasks
4. Retrieve tasks using GET /api/tasks
5. Update a task using PUT /api/tasks/:id
6. Delete a task using DELETE /api/tasks/:id
```