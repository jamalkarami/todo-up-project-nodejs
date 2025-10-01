# API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication

Most endpoints require a JWT token to be included in the request headers:
```
Authorization: <your-jwt-token>
```

Tokens expire after 2 hours and are obtained through the signin/signup endpoints.

---

## 👤 User Endpoints

### 1. User Registration (Signup)

**Endpoint:** `POST /api/v1/signup`

**Description:** Register a new user account.

**Authentication Required:** No

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Validation Rules:**
- `email`: Must be a valid email address
- `password`: Minimum 4 characters (recommended: use stronger password requirements)

**Success Response:**
- **Status Code:** 201 Created
- **Response Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
}
```

**Error Responses:**
- **Status Code:** 400 Bad Request
  ```json
  {
    "message": "You have to enter a valid email and a password with at least 4 character !"
  }
  ```
- **Status Code:** 400 Bad Request
  ```json
  {
    "message": "A user with the same email allready exist!"
  }
  ```

---

### 2. User Login (Signin)

**Endpoint:** `POST /api/v1/signin`

**Description:** Authenticate a user and receive a JWT token.

**Authentication Required:** No

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Success Response:**
- **Status Code:** 201 Created
- **Response Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "63f1234567890abcdef12345",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "$2a$10$..."
  }
}
```

**Error Responses:**
- **Status Code:** 400 Bad Request
  ```json
  {
    "message": "the email and password are required!"
  }
  ```
- **Status Code:** 400 Bad Request
  ```json
  {
    "message": "Email or password is wrong"
  }
  ```

---

## 📝 Task Endpoints

### 3. Create Task

**Endpoint:** `POST /api/v1/users/tasks`

**Description:** Create a new task for the authenticated user.

**Authentication Required:** Yes

**Headers:**
```
Authorization: <jwt-token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation for the todo app",
  "scheduledTaskDate": "2024-01-15T10:00:00.000Z",
  "user_id": "63f1234567890abcdef12345"
}
```

**Field Descriptions:**
- `title` (required): Title of the task
- `description` (required): Detailed description of the task
- `scheduledTaskDate` (required): ISO 8601 date format for when the task is scheduled
- `user_id` (required): ID of the user creating the task

**Success Response:**
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "_id": "63f9876543210abcdef67890",
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation for the todo app",
  "scheduledTaskDate": "2024-01-15T10:00:00.000Z",
  "user_id": "63f1234567890abcdef12345",
  "__v": 0
}
```

**Error Responses:**
- **Status Code:** 400 Bad Request
  ```json
  {
    "message": "Task to insert can't be empty!"
  }
  ```
- **Status Code:** 400 Bad Request
  ```json
  {
    "message": "Error while saving the task!"
  }
  ```
- **Status Code:** 403 Forbidden
  ```json
  "A token is required to access this resource"
  ```
- **Status Code:** 401 Unauthorized
  ```json
  "Invalid Token"
  ```

---

### 4. List User Tasks

**Endpoint:** `GET /api/v1/users/:id/tasks`

**Description:** Retrieve all tasks for a specific user.

**Authentication Required:** Yes

**Headers:**
```
Authorization: <jwt-token>
```

**URL Parameters:**
- `id`: User ID (string, required)

**Example Request:**
```
GET /api/v1/users/63f1234567890abcdef12345/tasks
```

**Success Response:**
- **Status Code:** 200 OK
- **Response Body:**
```json
[
  {
    "_id": "63f9876543210abcdef67890",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "scheduledTaskDate": "2024-01-15T10:00:00.000Z",
    "user_id": "63f1234567890abcdef12345",
    "__v": 0
  },
  {
    "_id": "63f9876543210abcdef67891",
    "title": "Review pull requests",
    "description": "Review and merge pending PRs",
    "scheduledTaskDate": "2024-01-16T14:00:00.000Z",
    "user_id": "63f1234567890abcdef12345",
    "__v": 0
  }
]
```

**Error Responses:**
- **Status Code:** 400 Bad Request
  ```json
  {
    "message": "The id of the user is required to get his todo tasks"
  }
  ```
- **Status Code:** 403 Forbidden
  ```json
  "A token is required to access this resource"
  ```
- **Status Code:** 401 Unauthorized
  ```json
  "Invalid Token"
  ```

---

### 5. Update Task

**Endpoint:** `PUT /api/v1/users/tasks/:id`

**Description:** Update an existing task.

**Authentication Required:** Yes

**Headers:**
```
Authorization: <jwt-token>
```

**URL Parameters:**
- `id`: Task ID (string, required)

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated task description",
  "scheduledTaskDate": "2024-01-20T10:00:00.000Z"
}
```

**Example Request:**
```
PUT /api/v1/users/tasks/63f9876543210abcdef67890
```

**Success Response:**
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "message": "Task updated successfully"
}
```

**Error Responses:**
- **Status Code:** 403 Forbidden
  ```json
  "A token is required to access this resource"
  ```
- **Status Code:** 401 Unauthorized
  ```json
  "Invalid Token"
  ```

---

### 6. Delete Task

**Endpoint:** `DELETE /api/v1/users/tasks/:id`

**Description:** Delete a specific task.

**Authentication Required:** Yes

**Headers:**
```
Authorization: <jwt-token>
```

**URL Parameters:**
- `id`: Task ID (string, required)

**Example Request:**
```
DELETE /api/v1/users/tasks/63f9876543210abcdef67890
```

**Success Response:**
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses:**
- **Status Code:** 400 Bad Request
  ```json
  {
    "message": "The id of the task to delete is required!"
  }
  ```
- **Status Code:** 403 Forbidden
  ```json
  "A token is required to access this resource"
  ```
- **Status Code:** 401 Unauthorized
  ```json
  "Invalid Token"
  ```

---

## 🔐 Authentication Flow

### Step-by-Step Guide

1. **Register a new user:**
   ```bash
   curl -X POST http://localhost:3000/api/v1/signup \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "John",
       "lastName": "Doe",
       "email": "john@example.com",
       "password": "password123"
     }'
   ```

2. **Save the token from the response:**
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {...}
   }
   ```

3. **Use the token for authenticated requests:**
   ```bash
   curl -X GET http://localhost:3000/api/v1/users/USER_ID/tasks \
     -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   ```

---

## 📋 Data Models

### User Model
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  scheduledTaskDate: Date (required),
  user_id: String (required),
  __v: Number (version key)
}
```

---

## ⚠️ Error Handling

All endpoints use consistent error handling:

### Common Error Responses

**Validation Errors (400 Bad Request):**
```json
{
  "message": "Specific validation error message"
}
```

**Authentication Errors (401 Unauthorized):**
```json
"Invalid Token"
```

**Authorization Errors (403 Forbidden):**
```json
"A token is required to access this resource"
```

**Server Errors (500 Internal Server Error):**
```json
{
  "message": "Internal server error message"
}
```

---

## 📝 Notes

### Best Practices

1. **Token Management:**
   - Store tokens securely (e.g., httpOnly cookies, secure storage)
   - Tokens expire after 2 hours - implement refresh logic
   - Never expose tokens in URLs

2. **Request Headers:**
   - Always include `Content-Type: application/json` for POST/PUT requests
   - Include the Authorization token for protected endpoints

3. **Date Formats:**
   - Use ISO 8601 format for dates: `YYYY-MM-DDTHH:mm:ss.sssZ`
   - Example: `2024-01-15T10:00:00.000Z`

4. **Error Handling:**
   - Always check response status codes
   - Handle error messages appropriately in your client application

### Current Limitations

- No pagination on list endpoints
- No filtering or sorting options
- No rate limiting
- Tokens cannot be revoked before expiration
- No refresh token mechanism

### Future Improvements

See [ROADMAP.md](./ROADMAP.md) for planned API enhancements.

---

## 🧪 Testing Examples

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:3000/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "password": "test1234"
  }'
```

**Login User:**
```bash
curl -X POST http://localhost:3000/api/v1/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "test1234"
  }'
```

**Create Task:**
```bash
curl -X POST http://localhost:3000/api/v1/users/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_TOKEN_HERE" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "scheduledTaskDate": "2024-01-15T18:00:00.000Z",
    "user_id": "YOUR_USER_ID"
  }'
```

**Get Tasks:**
```bash
curl -X GET http://localhost:3000/api/v1/users/YOUR_USER_ID/tasks \
  -H "Authorization: YOUR_TOKEN_HERE"
```

**Update Task:**
```bash
curl -X PUT http://localhost:3000/api/v1/users/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_TOKEN_HERE" \
  -d '{
    "title": "Buy groceries - Updated",
    "description": "Milk, eggs, bread, cheese",
    "scheduledTaskDate": "2024-01-15T19:00:00.000Z"
  }'
```

**Delete Task:**
```bash
curl -X DELETE http://localhost:3000/api/v1/users/tasks/TASK_ID \
  -H "Authorization: YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the API endpoints into Postman
2. Create an environment variable for the token
3. Set up a Pre-request Script to automatically include the token:
   ```javascript
   pm.request.headers.add({
     key: 'Authorization',
     value: pm.environment.get('token')
   });
   ```

---

**Last Updated**: January 2024
