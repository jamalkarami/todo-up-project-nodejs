# Todo-Up Project (Node.js)

A comprehensive task management REST API built with Node.js, Express, and MongoDB. This application provides user authentication and task management capabilities with JWT-based security.

## 📋 Features

- **User Authentication**
  - User registration (signup)
  - User login (signin)
  - JWT token-based authentication
  - Password encryption with bcrypt

- **Task Management**
  - Create tasks
  - Read/List user tasks
  - Update tasks
  - Delete tasks
  - Task scheduling with dates

## 🏗️ Technology Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Development**: Nodemon for hot-reloading
- **Logging**: Morgan for HTTP request logging

## 📁 Project Structure

```
todo-up-project-nodejs/
├── app.js                  # Main application entry point
├── config.env             # Environment configuration
├── controllers/           # Request handlers
│   ├── tasks.js          # Task controller
│   └── users.js          # User controller
├── middleware/            # Custom middleware
│   ├── auth.js           # JWT authentication middleware
│   └── errorHandler.js   # Global error handler
├── model/                 # Mongoose schemas
│   ├── task.js           # Task model
│   └── user.js           # User model
├── routes/                # API routes
│   ├── tasks.js          # Task routes
│   └── users.js          # User routes
├── services/              # Business logic
│   ├── task-service.js   # Task service
│   └── user-service.js   # User service
└── utils/                 # Utility functions
    └── tryCatch.js       # Async error wrapper
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jamalkarami/todo-up-project-nodejs.git
cd todo-up-project-nodejs
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `config.env` file in the root directory with the following variables:
```env
PORT=3000
DB_URL=mongodb://localhost:27017/todo-up
TOKEN_KEY=your_jwt_secret_key_here
```

4. Start MongoDB:
```bash
# If using local MongoDB
mongod
```

5. Run the application:
```bash
# Development mode with auto-reload
npm start

# Production mode
node app.js
```

## 📚 API Documentation

See [API.md](./API.md) for detailed API documentation.

## 🏛️ Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## 🗺️ Roadmap

See [ROADMAP.md](./ROADMAP.md) for the project roadmap and future plans.

## 🔐 Security

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens expire after 2 hours
- Authentication required for all task operations
- Input validation on user registration and login

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Jamal Karami

## 📧 Support

For support, please open an issue in the GitHub repository.
