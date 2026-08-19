# Task Management App Frontend

A responsive task management frontend built with React, Vite, and Tailwind CSS. It connects to the Task Management REST API backend to create, view, search, filter, update, complete, and delete tasks.

## Features

* Create new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed or incomplete
* Search tasks by title
* Filter tasks by:

  * All Tasks
  * Incomplete
  * Completed
* Expand tasks to view descriptions and timestamps
* Responsive layout for desktop and mobile devices
* Search input with debounce
* Confirmation dialogs for create, update, cancel, and delete actions
* Loading state while retrieving tasks
* Axios API integration
* Tailwind CSS styling
* Lucide icons

## Technologies

* React 19
* Vite
* Tailwind CSS
* Axios
* Lucide React
* JavaScript
* ESLint

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── SearchAndFilter.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Requirements

Before running the frontend, make sure the following are installed:

* Node.js
* npm
* Task Management backend

The backend should be running on:

```text
http://localhost:5000
```

## Installation

Open the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

## Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

The Vite configuration automatically opens the browser when the development server starts.

## Backend Connection

The frontend communicates with the backend through Axios.

The API configuration is located in:

```text
src/services/api.js
```

The frontend uses:

```javascript
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

The Vite development server proxies `/api` requests to:

```text
http://localhost:5000
```

This configuration is located in:

```text
vite.config.js
```

The proxy allows the frontend to make requests such as:

```text
/api/tasks
```

instead of directly using:

```text
http://localhost:5000/api/tasks
```

## API Operations

The frontend uses the following backend endpoints:

| Operation   | Method | Endpoint         |
| ----------- | ------ | ---------------- |
| Get tasks   | GET    | `/api/tasks`     |
| Create task | POST   | `/api/tasks`     |
| Update task | PUT    | `/api/tasks/:id` |
| Delete task | DELETE | `/api/tasks/:id` |

## Components

### App.jsx

`App.jsx` is the main component of the application.

It manages the application's main state, including:

* Tasks
* Search value
* Selected filter
* Loading state
* Current task being edited
* Task form visibility
* Expanded task
* Debounced search value
* Responsive layout state

It also handles the main task operations:

```text
Create
Update
Delete
Toggle Complete
Search
Filter
Expand Task
```

### SearchAndFilter.jsx

Provides the task search and filtering interface.

It contains:

* Search input
* Clear search button
* Task status dropdown
* Add Task button

Available filters:

```text
All Tasks
Incomplete
Completed
```

The Add Task button is displayed on mobile when the task form is not currently open.

### TaskForm.jsx

Handles both creating and editing tasks.

The form contains:

```text
Task Title
Description
Submit button
Cancel button
```

The same component is reused for:

```text
New Task
Edit Task
```

When editing an existing task, the form is populated with the task's current information.

### TaskList.jsx

Responsible for displaying the collection of tasks.

It handles three states:

```text
Loading
No tasks found
Tasks available
```

Each task is rendered using the `TaskItem` component.

### TaskItem.jsx

Displays an individual task.

Users can:

* Mark the task as completed
* Mark the task as incomplete
* Expand the task
* View the description
* View creation time
* View update time
* Edit the task
* Delete the task

Completed tasks display their titles with a strikethrough.

## Search

Search requests are debounced by 500 milliseconds.

This means the application waits 500 milliseconds after the user stops typing before requesting filtered tasks from the backend.

For example:

```text
User types:
backend

Request:
GET /api/tasks?search=backend
```

This prevents an API request from being sent for every individual keystroke.

## Filtering

The frontend supports three filter states:

```text
all
incomplete
completed
```

For example:

```text
GET /api/tasks?status=completed
```

or:

```text
GET /api/tasks?status=incomplete
```

Search and filtering can also be combined:

```text
GET /api/tasks?search=backend&status=incomplete
```

## Task Creation

When the user creates a task, the frontend sends a POST request:

```json
{
  "title": "Finish backend",
  "description": "Complete the API"
}
```

After the backend successfully creates the task, the task list is refreshed.

## Task Updating

When editing a task, the frontend sends:

```json
{
  "title": "Updated task",
  "description": "Updated description",
  "completed": false
}
```

The existing completion status is preserved when editing the title or description.

## Completing Tasks

Clicking the completion icon updates the task's `completed` value.

For an incomplete task:

```json
{
  "completed": true
}
```

For a completed task:

```json
{
  "completed": false
}
```

## Task Deletion

When the delete button is clicked, the application displays a confirmation dialog.

If confirmed, the frontend sends:

```text
DELETE /api/tasks/:id
```

After successful deletion, the task list is refreshed.

## Responsive Design

The application changes its layout based on the browser width.

The application considers screens below `1024px` as mobile/tablet layout:

```javascript
window.innerWidth < 1024
```

### Desktop

The task form and task list are displayed side by side.

### Mobile

The task form can be opened using the Add Task button and displayed separately from the task list.

The form can also be closed using the close button.

## Styling

The application uses Tailwind CSS.

The main styling file is:

```text
src/index.css
```

The UI primarily uses neutral colors such as:

```text
White
Light Gray
Gray
Dark Gray
Black
```

The application also includes custom scrollbar styling and basic animation utilities.

## Icons

The application uses Lucide React for interface icons.

Examples include:

```text
Search
ChevronDown
ChevronUp
X
Plus
CheckCircle
Circle
Edit2
Trash2
```

## Development Scripts

Start the development server:

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

## Production Build

Create a production build with:

```bash
npm run build
```

The generated files will be placed in:

```text
dist/
```

The `dist` directory is excluded from Git through `.gitignore`.

## Running the Full Application

The application consists of two parts:

```text
task-management-app/
├── backend/
└── frontend/
```

### 1. Start PostgreSQL

Make sure your PostgreSQL database is running.

### 2. Start the Backend

From the backend directory:

```bash
npm run dev
```

The backend should run on:

```text
http://localhost:5000
```

### 3. Start the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm run dev
```

The frontend should run on:

```text
http://localhost:5173
```

### 4. Open the Application

Open:

```text
http://localhost:5173
```

The frontend communicates with the backend through the Vite API proxy.

## Application Flow

```text
User
  |
  v
React Frontend
  |
  v
Axios API Service
  |
  v
Vite Proxy
  |
  v
Express Backend
  |
  v
PostgreSQL
```

For example, when creating a task:

```text
User enters task
        |
        v
TaskForm.jsx
        |
        v
App.jsx
        |
        v
taskService.createTask()
        |
        v
POST /api/tasks
        |
        v
Express Backend
        |
        v
PostgreSQL
        |
        v
Created Task
        |
        v
Frontend refreshes task list
```

## Notes

The frontend expects the backend API to be available at:

```text
http://localhost:5000
```