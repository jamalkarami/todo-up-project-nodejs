# Architecture Documentation

## 🏛️ Overview

The Todo-Up project follows a layered architecture pattern, separating concerns into distinct layers for maintainability, scalability, and testability.

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│                    (Web/Mobile/API Clients)                  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ HTTP/HTTPS
                             │
┌────────────────────────────▼────────────────────────────────┐
│                      Express.js Server                       │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    Middleware Layer                    │  │
│  │  • CORS             • Body Parser    • Morgan         │  │
│  │  • Auth Middleware  • Error Handler  • Validation     │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                     Routes Layer                       │  │
│  │  • User Routes      • Task Routes                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   Controllers Layer                    │  │
│  │  • UserController   • TaskController                  │  │
│  │  (Request/Response Handling)                          │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    Services Layer                      │  │
│  │  • UserService      • TaskService                     │  │
│  │  (Business Logic)                                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                     Models Layer                       │  │
│  │  • User Model       • Task Model                      │  │
│  │  (Mongoose Schemas)                                   │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ MongoDB Driver
                             │
┌────────────────────────────▼────────────────────────────────┐
│                      MongoDB Database                        │
│  • Users Collection         • Tasks Collection              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Architectural Layers

### 1. **Entry Point (app.js)**

**Responsibilities:**
- Initialize Express application
- Load environment configuration
- Configure middleware
- Register routes
- Establish database connection
- Start HTTP server

**Key Components:**
```javascript
- Express app initialization
- Middleware setup (CORS, body parser, logging)
- Route registration
- MongoDB connection
- Error handling
- Server startup
```

### 2. **Routes Layer**

**Location:** `/routes`

**Responsibilities:**
- Define API endpoints
- Map HTTP methods to controller actions
- Apply route-specific middleware
- Input validation setup

**Files:**
- `users.js`: User authentication routes (signin, signup)
- `tasks.js`: Task management routes (CRUD operations)

**Pattern:**
```javascript
router.METHOD('/path', [middleware], controller.action)
```

### 3. **Middleware Layer**

**Location:** `/middleware`

**Responsibilities:**
- Cross-cutting concerns
- Request/response transformation
- Authentication/authorization
- Error handling

**Components:**

#### a) Authentication Middleware (`auth.js`)
- Validates JWT tokens
- Extracts user information from tokens
- Protects routes requiring authentication

#### b) Error Handler (`errorHandler.js`)
- Centralized error handling
- Consistent error response format
- Error logging

#### c) Try-Catch Wrapper (`utils/tryCatch.js`)
- Wraps async controllers
- Catches async errors
- Forwards errors to error handler

### 4. **Controllers Layer**

**Location:** `/controllers`

**Responsibilities:**
- Handle HTTP requests
- Validate request data
- Call appropriate service methods
- Format and send responses
- Handle controller-level errors

**Files:**

#### a) User Controller (`users.js`)
```javascript
- signup(): Register new users
- signin(): Authenticate users
```

#### b) Task Controller (`tasks.js`)
```javascript
- save_task(): Create new tasks
- list_tasks(): Retrieve user tasks
- update_task(): Update existing tasks
- delete_task(): Delete tasks
```

### 5. **Services Layer**

**Location:** `/services`

**Responsibilities:**
- Business logic implementation
- Data manipulation
- Database operations
- Transaction management

**Files:**

#### a) User Service (`user-service.js`)
```javascript
- signup(): Create user in database
- signin(): Find user for authentication
- isAllreadyExist(): Check user existence
```

#### b) Task Service (`task-service.js`)
```javascript
- save_task(): Create task in database
- list_tasks(): Query user tasks
- update_task(): Update task data
- delete_task(): Remove task
```

### 6. **Models Layer**

**Location:** `/model`

**Responsibilities:**
- Define data schemas
- Database field validation
- Data structure definitions
- Mongoose model creation

**Files:**

#### a) User Model (`user.js`)
```javascript
Schema: {
  firstName: String,
  lastName: String,
  email: String (required),
  password: String (required)
}
```

#### b) Task Model (`task.js`)
```javascript
Schema: {
  title: String (required),
  description: String (required),
  scheduledTaskDate: Date (required),
  user_id: String (required)
}
```

---

## 🔄 Request Flow

### Example: Create a Task

```
1. Client sends POST request to /api/v1/users/tasks
   ↓
2. Express receives request
   ↓
3. Middleware chain executes:
   - CORS middleware (cross-origin handling)
   - Body parser (parse JSON)
   - Auth middleware (verify JWT token)
   ↓
4. Route matches and forwards to TaskController.save_task
   ↓
5. tryCatch wrapper catches any async errors
   ↓
6. Controller validates request body
   ↓
7. Controller creates Task model instance
   ↓
8. Controller calls TaskService.save_task()
   ↓
9. Service interacts with Task model
   ↓
10. Mongoose executes MongoDB operation
    ↓
11. Database returns saved document
    ↓
12. Service returns data to controller
    ↓
13. Controller sends HTTP 200 response with task data
    ↓
14. If error occurs, errorHandler middleware catches and formats it
```

---

## 🔐 Security Architecture

### Authentication Flow

```
┌──────────┐          ┌──────────┐          ┌──────────┐
│  Client  │          │  Server  │          │ Database │
└────┬─────┘          └────┬─────┘          └────┬─────┘
     │                     │                      │
     │  1. POST /signup    │                      │
     │────────────────────>│                      │
     │                     │  2. Hash password    │
     │                     │                      │
     │                     │  3. Save user        │
     │                     │─────────────────────>│
     │                     │                      │
     │                     │  4. User created     │
     │                     │<─────────────────────│
     │                     │                      │
     │                     │  5. Generate JWT     │
     │                     │                      │
     │  6. Return token    │                      │
     │<────────────────────│                      │
     │                     │                      │
     │  7. Request with    │                      │
     │     Authorization   │                      │
     │────────────────────>│                      │
     │                     │  8. Verify JWT       │
     │                     │                      │
     │                     │  9. Process request  │
     │                     │─────────────────────>│
     │                     │                      │
     │  10. Response       │                      │
     │<────────────────────│                      │
```

### Security Measures

1. **Password Security:**
   - bcryptjs with 10 salt rounds
   - Passwords never stored in plain text
   - Password hashing before database storage

2. **Token-Based Authentication:**
   - JWT for stateless authentication
   - 2-hour token expiration
   - Token includes user_id and email
   - Signed with secret key (TOKEN_KEY)

3. **Input Validation:**
   - express-validator for email and password
   - Mongoose schema validation
   - Request body validation in controllers

4. **CORS Configuration:**
   - Cross-Origin Resource Sharing enabled
   - Configurable for production environments

---

## 💾 Database Design

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "$2a$10$...", // hashed
  __v: 0
}
```

#### Tasks Collection
```javascript
{
  _id: ObjectId("507f191e810c19729de860ea"),
  title: "Complete documentation",
  description: "Write comprehensive docs",
  scheduledTaskDate: ISODate("2024-01-15T10:00:00Z"),
  user_id: "507f1f77bcf86cd799439011",
  __v: 0
}
```

### Relationships

- **One-to-Many:** User → Tasks
  - One user can have multiple tasks
  - Tasks reference user via `user_id` field
  - No foreign key constraints (MongoDB)

### Indexes (Recommended)

```javascript
Users:
  - email (unique, ascending)
  
Tasks:
  - user_id (ascending) - for efficient user task queries
  - scheduledTaskDate (ascending) - for date-based queries
  - compound: [user_id, scheduledTaskDate]
```

---

## 🔌 Design Patterns

### 1. **Layered Architecture**
- Separation of concerns
- Each layer has specific responsibilities
- Dependencies flow downward

### 2. **Dependency Injection**
- Services injected into controllers
- Models injected into services
- Loose coupling between components

### 3. **Repository Pattern** (Implicit)
- Services act as repositories
- Abstract database operations
- Encapsulate data access logic

### 4. **Middleware Pattern**
- Chain of responsibility
- Cross-cutting concerns
- Request/response pipeline

### 5. **Error Handling Pattern**
- Try-catch wrapper for async functions
- Centralized error handler
- Consistent error responses

---

## 📦 Technology Stack

### Backend Framework
- **Express.js**: Web application framework
- **Node.js**: JavaScript runtime

### Database
- **MongoDB**: NoSQL database
- **Mongoose**: ODM (Object Data Modeling)

### Authentication
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing

### Validation
- **express-validator**: Request validation

### Utilities
- **dotenv**: Environment variable management
- **cors**: Cross-origin resource sharing
- **morgan**: HTTP request logging

---

## 🚀 Scalability Considerations

### Current Architecture Strengths
1. **Stateless Design:** JWT tokens enable horizontal scaling
2. **Modular Structure:** Easy to add new features
3. **Separation of Concerns:** Independent layer scaling

### Future Scalability Improvements

#### 1. Caching Layer
```
┌─────────┐     ┌───────┐     ┌──────────┐
│ Client  │────>│ Redis │────>│ Database │
└─────────┘     └───────┘     └──────────┘
```

#### 2. Microservices Architecture
```
┌──────────────┐
│   API Gateway │
└───────┬───────┘
        │
   ┌────┴────┐
   │         │
┌──▼──┐   ┌─▼───┐
│User │   │Task │
│Svc  │   │Svc  │
└─────┘   └─────┘
```

#### 3. Database Optimization
- Read replicas for read-heavy operations
- Sharding for large datasets
- Connection pooling

#### 4. Load Balancing
```
       ┌───────────┐
       │   Nginx   │
       └─────┬─────┘
   ┌─────────┼─────────┐
   │         │         │
┌──▼──┐   ┌─▼───┐   ┌─▼───┐
│App 1│   │App 2│   │App 3│
└─────┘   └─────┘   └─────┘
```

---

## 🛠️ Development Guidelines

### Code Organization
```
/project-root
  /controllers    - Request handlers
  /services       - Business logic
  /models         - Data schemas
  /routes         - API endpoints
  /middleware     - Cross-cutting concerns
  /utils          - Helper functions
  /config         - Configuration files
  app.js          - Application entry point
```

### Best Practices

1. **Controller Guidelines:**
   - Keep controllers thin
   - Delegate business logic to services
   - Handle HTTP concerns only

2. **Service Guidelines:**
   - Pure business logic
   - No HTTP concerns
   - Reusable across controllers

3. **Model Guidelines:**
   - Define clear schemas
   - Use validation
   - Keep models simple

4. **Error Handling:**
   - Use try-catch for async operations
   - Throw errors, don't return them
   - Let middleware handle error responses

---

## 🔍 Monitoring & Logging

### Current Logging
- **Morgan**: HTTP request logging
- **Console logs**: Development debugging

### Recommended Additions
- Application Performance Monitoring (APM)
- Error tracking (e.g., Sentry)
- Structured logging (e.g., Winston)
- Request tracing

---

## 🧪 Testing Strategy

### Unit Testing
- Test individual functions
- Mock dependencies
- Focus on business logic

### Integration Testing
- Test API endpoints
- Use test database
- Test middleware chain

### E2E Testing
- Test complete user flows
- Automated browser testing
- API contract testing

---

## 📚 Further Reading

- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [MongoDB Schema Design Patterns](https://www.mongodb.com/blog/post/building-with-patterns-a-summary)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [REST API Design Guidelines](https://restfulapi.net/)

---

**Last Updated**: January 2024  
**Version**: 1.0
