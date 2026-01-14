# Clean Architecture in Node.js

## Table of Contents
- [What is Clean Architecture?](#what-is-clean-architecture)
- [Why Use Clean Architecture?](#why-use-clean-architecture)
- [Core Principles](#core-principles)
- [Project Structure](#project-structure)
- [Implementation Steps](#implementation-steps)
- [Data Flow & Request Journey](#data-flow--request-journey)
- [Folder Responsibilities](#folder-responsibilities)
- [How to Use This Project](#how-to-use-this-project)

---

## What is Clean Architecture?

Clean Architecture is a software design pattern that emphasizes **separation of concerns** and **independence of frameworks**. It organizes code into layers where each layer has a specific responsibility and depends only on inner layers (not on outer layers).

The core idea: **Business logic should be independent of implementation details like databases, web frameworks, or authentication libraries.**

---

## Why Use Clean Architecture?

✅ **Testability** - Business logic can be tested without mocking frameworks  
✅ **Maintainability** - Easy to locate and modify specific functionality  
✅ **Scalability** - Add new features without affecting existing code  
✅ **Flexibility** - Swap out databases, APIs, or frameworks easily  
✅ **Reusability** - Business logic can be reused across different applications  

---

## Core Principles

### 1. **Single Responsibility Principle (SRP)**
Each module, function, or class should have ONE reason to change.

### 2. **Dependency Inversion**
High-level modules shouldn't depend on low-level modules. Both should depend on abstractions.

### 3. **Abstraction Over Concrete Implementation**
Code should depend on interfaces/abstractions, not concrete implementations.

### 4. **Layers Should Flow Inward**
- Outer layers depend on inner layers
- Inner layers NEVER know about outer layers
- Dependencies point toward the center

---

## Project Structure

```
src/
├── entities/              # Pure business logic (no frameworks)
├── usecases/             # Business rules & orchestration
├── services/             # Reusable utilities & helpers
├── repository/           # Data access layer abstraction
├── controllers/          # HTTP request handlers
├── frameworks/           # External frameworks (Express, MongoDB, etc.)
├── middlewares/          # Express middleware
└── routes/              # Route definitions
```

---

## Implementation Steps

### Step 1: Create Entities (Business Logic Layer)
**Location:** `src/entities/`

Entities contain **pure business logic** with NO external dependencies (no Express, no JWT, no Database).

```javascript
// user.entity.js
const createUser = async ({ email, password }) => {
  // Pure business logic - validation rules
  if (!email.includes("@")) {
    throw new Error("Invalid email");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  return {
    email,
    password,
    createdAt: Date.now(),
  };
};

export { createUser };
```

**Key Points:**
- No framework imports
- Contains business rules and validation
- Can be tested without any external setup

---

### Step 2: Create Services (Utility Layer)
**Location:** `src/services/`

Services are **reusable utilities** that handle specific technical concerns like:
- Password hashing/comparison
- JWT token generation/verification
- Email sending
- File operations

```javascript
// password.service.js
import * as bcrypt from "bcrypt";

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };
```

**Key Points:**
- Services are isolated and can be used anywhere
- Handle external library interactions
- Parameterized for easy testing

---

### Step 3: Create Repository (Data Access Layer)
**Location:** `src/repository/`

Repository provides an **abstraction over database operations**. It doesn't care if you use MongoDB, PostgreSQL, or any database.

```javascript
// user.repository.js
const createUserRepository = (UserModel) => {
  return {
    findByEmail: async (email) => UserModel.findOne({ email }),
    save: async (user) => await UserModel.create(user),
  };
};

export { createUserRepository };
```

**Key Points:**
- Abstracts database implementation
- Can swap databases without changing usecase/controller code
- Takes the database model as dependency

---

### Step 4: Create Use Cases (Business Logic Orchestration)
**Location:** `src/usecases/`

Use Cases **orchestrate** entities, services, and repositories to implement business workflows.

```javascript
// register.usecase.js
import { createUser } from "../entities/user.entity.js";

const registerUser = ({ userRepo, hashPassword }) => {
  return async function ({ email, password }) {
    // Check if user already exists
    const exist = await userRepo.findByEmail(email);
    if (exist) {
      throw new Error("User already exists, Please login to continue.");
    }

    // Hash password using service
    const hashedPassword = await hashPassword(password);

    // Create user entity (pure business logic)
    const user = await createUser({
      email,
      password: hashedPassword,
    });

    // Save to database
    return await userRepo.save(user);
  };
};

export { registerUser };
```

**Key Points:**
- Receives dependencies (repo, services) as parameters (Dependency Injection)
- Contains business workflow logic
- Returns a function (curried function pattern)
- Can be tested by mocking injected dependencies

---

### Step 5: Create Controllers (HTTP Handling)
**Location:** `src/controllers/`

Controllers handle **HTTP requests and responses**. They should be thin - just transform data between HTTP and use cases.

```javascript
// register.controller.js
const registerUserController = async (registerUser) => {
  return async function (req, res) {
    try {
      const user = await registerUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error?.message });
    }
  };
};

export { registerUserController };
```

**Key Points:**
- Receives use case as dependency
- Extracts data from HTTP request
- Calls use case with extracted data
- Formats response for HTTP client
- Handles errors with appropriate HTTP status codes

---

### Step 6: Create Routes
**Location:** `src/routes/`

Routes wire together all layers - injecting dependencies and defining endpoints.

```javascript
// auth.route.js
import express from "express";
import { registerUserController } from "../controllers/register.controller.js";
import { registerUser } from "../usecases/register.usecase.js";
import { createUserRepository } from "../repository/user.repository.js";
import { UserModel } from "../frameworks/mongo.js";
import { hashPassword } from "../services/password.service.js";
import { signJWT } from "../services/token.service.js";

const router = express.Router();
const userRepo = createUserRepository(UserModel);

// Dependency Injection: Pass all dependencies down the chain
router.post(
  "/register",
  registerUserController(registerUser({ userRepo, hashPassword }))
);

export { router };
```

**Key Points:**
- This is where all dependencies are injected
- Represents the "composition root" of the application
- Controllers are instantiated with their dependencies

---

### Step 7: Setup Frameworks
**Location:** `src/frameworks/`

Frameworks layer contains **external dependencies** (databases, ORMs, APIs).

```javascript
// mongo.js - Database Models
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const UserModel = mongoose.model("User", userSchema);
```

```javascript
// db.js - Database Connection
import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("DB Error: ", error);
  }
};

export { connectToDB };
```

---

### Step 8: Create Middlewares
**Location:** `src/middlewares/`

Middlewares handle cross-cutting concerns like authentication, logging, error handling.

```javascript
// auth.middleware.js
const authMiddleware = (tokenService) => {
  return function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    try {
      req.user = tokenService.verify(token);
      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};

export { authMiddleware };
```

---

## Data Flow & Request Journey

### User Registration Flow

```
HTTP Request: POST /api/auth/register
  ↓
┌─────────────────────────────────────────────────┐
│ Route Layer (auth.route.js)                     │
│ - Receives request                              │
│ - Passes to controller                          │
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│ Controller (register.controller.js)             │
│ - Extracts req.body (email, password)           │
│ - Calls registerUser use case                   │
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│ Use Case (register.usecase.js)                  │
│ - Calls userRepo.findByEmail()                  │
│ - If exists: throw error                        │
│ - Calls hashPassword(password)                  │
│ - Calls createUser entity                       │
│ - Calls userRepo.save()                         │
└────────────────┬────────────────────────────────┘
                 ├────────────┬──────────────┐
                 ↓            ↓              ↓
        ┌──────────────┐ ┌──────────┐ ┌────────────┐
        │ Repository   │ │ Service  │ │ Entity     │
        │ (DB access)  │ │ (utility)│ │(pure logic)│
        └──────────────┘ └──────────┘ └────────────┘
                 │            │              │
                 └────────────┴──────────────┘
                 ↓
            Return saved user
                 ↓
┌─────────────────────────────────────────────────┐
│ Controller (register.controller.js)             │
│ - Formats response                              │
│ - Sends HTTP 201 + JSON                         │
└────────────────┬────────────────────────────────┘
                 ↓
         HTTP Response: 201 Created
                 ↓
           User Registration Complete
```

---

## Folder Responsibilities

| Folder | Responsibility | Dependencies | Framework Independent |
|--------|-----------------|--------------|----------------------|
| **entities/** | Pure business logic, rules, validation | None | ✅ Yes |
| **usecases/** | Business workflows orchestration | Entities, Services, Repo | ✅ Yes |
| **services/** | Reusable utilities & helpers | External libs (bcrypt, jwt) | ⚠️ Partial |
| **repository/** | Data access abstraction | Database models | ✅ Yes |
| **controllers/** | HTTP request/response handling | Use cases | ❌ No (HTTP specific) |
| **frameworks/** | External frameworks & libraries | Dependencies | ❌ No |
| **middlewares/** | Cross-cutting concerns | Services, Tokens | ❌ No |
| **routes/** | Dependency injection & routing | All layers | ❌ No |

---

## How to Use This Project

### 1. Setup Environment
```bash
# Create .env file
MONGO_URI=mongodb://localhost:27017/clean-arch-db
SECRET_KEY=your-secret-key
EXPIRES_IN=7d
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test Endpoints

**Register a new user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

---

## Key Takeaways

1. **Start from the center (Entities)** - Pure business logic first
2. **Build outward** - Add services, repositories, use cases
3. **Dependencies flow inward** - Controllers depend on use cases, not vice versa
4. **Inject dependencies** - Pass dependencies as parameters
5. **Keep layers thin** - Controllers and routes should be minimal
6. **Test the center** - Business logic is easiest to test
7. **Swap outer layers easily** - Change database, API, framework without touching business logic

---

## Testing Example

Because of clean architecture, testing is straightforward:

```javascript
// register.usecase.test.js
import { registerUser } from "./register.usecase.js";

describe("Register User Use Case", () => {
  it("should register a new user", async () => {
    // Mock dependencies
    const mockRepo = {
      findByEmail: jest.fn().mockResolvedValue(null),
      save: jest.fn().mockResolvedValue({ id: 1, email: "user@test.com" }),
    };
    
    const mockHashPassword = jest.fn().mockResolvedValue("hashed_pwd");

    const registerUserCase = registerUser({
      userRepo: mockRepo,
      hashPassword: mockHashPassword,
    });

    const result = await registerUserCase({
      email: "user@test.com",
      password: "password123",
    });

    expect(mockRepo.findByEmail).toHaveBeenCalledWith("user@test.com");
    expect(mockHashPassword).toHaveBeenCalledWith("password123");
    expect(mockRepo.save).toHaveBeenCalled();
    expect(result.email).toBe("user@test.com");
  });
});
```

---

**Remember:** Clean architecture is about making code that's easy to understand, test, and modify years from now. This structure ensures you can return to this project anytime and quickly understand what each layer does!
