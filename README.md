# AltSchool Africa Assignment - Assessment 3

## Todo App API

A simple RESTful API for managing tasks with authentication, built using Node.js, Express, and MongoDB.

### Features

- User authentication (Sign-Up, Login, Logout)
- Task management (CRUD operations)
- Status tracking for tasks (pending, completed)
- Middleware for authentication and authorization
- Error handling for consistent API responses

### ERD (Entity-Relationship Diagram)

[View the ERD here](https://dbdiagram.io/d/todo-app-6752c8d0e9daa85acae1a217)

### API Endpoints

#### Authentication

| Endpoint     | Method | Description     | Body                                                  | Requires Auth |
| ------------ | ------ | --------------- | ----------------------------------------------------- | ------------- |
| /auth/signup | POST   | Register a user | `{ "username": "git", "password": "pass123" }` | No            |
| /auth/login  | POST   | User login      | `{ "username": "github", "password": "pass123" }` | No            |
| /auth/logout | POST   | User logout     |                                                       | Yes           |

#### Tasks

| Endpoint          | Method | Description              | Body                                                                       | Requires Auth |
| ----------------- | ------ | ------------------------ | -------------------------------------------------------------------------- | ------------- |
| /tasks            | POST   | Create a new task        | `{ "title": "Task Title", "description": "Details", "status": "pending" }` | Yes           |
| /tasks/:id        | GET    | Get a specific task      | N/A                                                                        | Yes           |
| /tasks/:id        | PUT    | Update a task            | `{ "title": "", "description": "", "status": "pending/completed" }`        | Yes           |
| /tasks            | GET    | Get all tasks for a user | N/A                                                                        | Yes           |
| /tasks/:id        | DELETE | Delete a task            | N/A                                                                        | Yes           |

### Installation and Setup

Clone the repository:

```bash
git clone <repository-url>
cd todo-app
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
```

Start the development server:

```bash
npm run dev
```

### Testing the API

You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API endpoints.

1. **User Registration**:
    - Endpoint: `POST /auth/signup`
    - Body: `{ "username": "test", "password": "pass123" }`

2. **User Login**:
    - Endpoint: `POST /auth/login`
    - Body: `{ "username": "test", "password": "pass123" }`

3. **Create a Task**:
    - Endpoint: `POST /tasks`
    - Body: `{ "title": "Task Title", "description": "Details", "status": "pending" }`
    - Requires Auth: Yes (Include the token in the headers)

4. **Get All Tasks by user id**:
    - Endpoint: `GET /tasks`
    - Requires Auth: Yes (Include the token in the headers)

5. **Get a Specific Task by a task id**:
    - Endpoint: `GET /tasks/:id`
    - Requires Auth: Yes (Include the token in the headers)

6. **Update a Task by a task id**:
    - Endpoint: `PUT /tasks/:id`
    - Body: `{ "title": "", "description": "", "status": "pending/completed" }`
    - Requires Auth: Yes (Include the token in the headers)

7. **Delete a Task**:
    - Endpoint: `DELETE /tasks/:id`
    - Requires Auth: Yes (Include the token in the headers)

### Hosting Link

Access the live application [here](#)
