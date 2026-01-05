# Docker

- [What is Docker?](#what-is-docker)
- [Core Docker Concepts?](#-core-docker-concepts-big-picture)
- [Docker Lesson 1](#-docker-lesson-1)
- [Docker Lesson 2](#-docker-lesson-2)
- [Docker Lesson 3](#-docker-lesson-3)
- [Docker Lesson 4](#-docker-lesson-4)
- [Docker Lesson 5](#-docker-lesson-5)
- [Multi-Stage Builds](#multi-stage-builds-advanced--professional)
- [Docker Networking Deep](#-docker-networking-deep)
- [Docker + CI/CD](#-docker--cicd)

## What is Docker?

Docker is a tool that lets you package an application along with everything it needs to run (code, libraries, dependencies, settings) into a **single unit** — and run it anywhere without issues.

> 👉 “Runs on my machine” problems → SOLVED.
> Docker standardizes the environment, not just the code.

---

## 🏠 Real-Life Analogy (Most Important)

### ❌ Without Docker

You send someone:

- Ingredients list 🍅🧄
- Recipe 📜
- Stove instructions 🔥

They cook it their way → Taste differs ❌

### ✅ With Docker

You send:

- Ready-made sealed lunch box 🍱
  They just open & eat → Same taste everywhere ✅

## 🧱 Core Docker Concepts (BIG PICTURE)

```
Docker
 ├── Image (Blueprint)
 ├── Container (Running app)
 └── Docker Engine (Kitchen)

```

### 1️⃣ What is a Docker Image?

A Docker Image is a read-only blueprint of your application.

It contains:

- OS (lightweight Linux)
- Runtime (Node / Java / Python)
- Dependencies
- App code
- Configs

**🏗 Real-Life Example**

Image = Cake Recipe

- Ingredients
- Measurements
- Steps
  But not baked yet

### 2️⃣ What is a Docker Container?

A Docker Container is a running instance of an image.

> Image + Run = Container

**🏗 Real-Life Example**
Container = Baked Cake

- Ready to eat
- Running
- Temporary

You can:

- Start it
- Stop it
- Delete it
- Recreate it anytime

### 3️⃣ Image vs Container (Must Remember)

| Image 🧱     | Container 🚀    |
| ------------ | --------------- |
| Blueprint    | Running app     |
| Read-only    | Read + write    |
| Created once | Can create many |
| Stored       | Executed        |

### 4️⃣ What is Docker Engine?

Docker Engine is the software that runs Docker on your system.

It:

- Builds images
- Runs containers
- Manages networking & storage

🧠 Think of it as:

- **The kitchen that cooks your recipe**

### 5️⃣ Why Do We Need Docker ?

🔥 Real Problems Docker Solves

**✅ 1. No “Works on My Machine” Issues**
Same environment everywhere:
Dev
QA
Production

**✅ 2. Easy Setup (Minutes not Days)**
Without Docker:
Install Node
Install Mongo
Configure paths

With Docker:
docker run mongo
💥 Done.

**✅ 3. Perfect for Microservices**

Each service runs in its own container:
Auth service
Job service
Notification service
No conflicts.

**✅ 4. CI/CD Friendly**

Docker works perfectly with:
GitHub Actions
Jenkins
GitLab CI

---

## 🐳 Docker Lesson 1

**Install Docker + Run Your First Container**

🖥 Step 1: Install Docker Desktop
👉 Download Docker

Go to:
https://www.docker.com/products/docker-desktop/

Choose based on your OS:
Windows (most likely for you)
macOS
Linux

🧩 During Installation (IMPORTANT)

- ✔ Enable WSL 2 (Windows Subsystem for Linux)
- ✔ Allow required permissions
- ✔ Restart if asked

✅ Verify Installation
Open Terminal / Command Prompt / PowerShell and run:

```
docker --version
```

Expected output:

```
Docker version 26.x.x, build xxxx\
```

### 🧠 What is Docker Desktop?

Docker Desktop gives you:

- Visual dashboard
- Containers list
- Images list
- Logs
- Start / Stop containers with UI

Think of it as:

> Control panel for Docker

### 🚀 Step 2: Your First Docker Command (Hello Docker)

Run this command:

```
docker run hello-world
```

**🤯 What Just Happened? (VERY IMPORTANT)**

Docker did all of this automatically:

1️⃣ Checked if hello-world image exists locally
2️⃣ Not found → downloaded from Docker Hub
3️⃣ Created a container from it
4️⃣ Ran it
5️⃣ Printed message
6️⃣ Container exited

**✔ Docker is working perfectly**

### 🧠 Docker Hub (Quick Intro)

Docker Hub = **App Store for Docker Images**

Examples:

- node
- mongo
- nginx
- redis

You don’t build everything from scratch — you **reuse trusted images.**

### 🧪 Step 3: Run a REAL Container (Nginx Web Server)

Now let’s run an actual server 🔥

```
docker run -p 8080:80 nginx
```

🌐 Open Browser

Go to:
👉 http://localhost:8080

You should see:

> **🎉 Welcome to nginx!**

Congrats — **a web server is running without installing anything.**

**🧠 Understand This Command (Line by Line)**

```
docker run -p 8080:80 nginx
```

| Part         | Meaning           |
| ------------ | ----------------- |
| `docker run` | Run a container   |
| `-p`         | Port mapping      |
| `8080`       | Your machine port |
| `80`         | Container port    |
| `nginx`      | Image name        |

🧠 Translation:

> “Run nginx inside a container and expose it to my laptop”

### 🛑 Step 4: Stop the Container

Press:

> CTRL + C

Container stops ❌

### 📋 Step 5: See Containers

```
docker ps
```

➡ Shows running containers

```
docker ps -a
```

### 🧱 Step 6: See Images

```
docker images
```

🧠 Key Concepts You Learned (Recap)

- ✔ Docker installed
- ✔ Docker Desktop understood
- ✔ Image vs Container (in action)
- ✔ Ran a real web server
- ✔ Used basic Docker commands

🔥 VERY IMPORTANT MINDSET (Docker Rule #1)

> ❌ Don’t treat containers like permanent servers
> ✅ Treat them as temporary, replaceable units

If broken → delete → recreate

🧪 Bonus: Run Container in Background (Detached Mode)

```
docker run -d -p 8080:80 nginx
```

> -d → Detached mode (runs in background)

Check:

```
docker ps
```

Stop it:

```
docker stop <container_id>
```

**📌 Lesson 1 Cheat Sheet**

```
docker --version
docker run hello-world
docker run -p 8080:80 nginx
docker ps
docker ps -a
docker images
docker stop <id>
```

---

## 🐳 Docker Lesson 2

**Core Docker Commands + Container Lifecycle (Deep but Simple)**

> 🎯 Goal of Lesson 2
> By the end, you will:

- Understand container lifecycle
- Know what happens internally
- Use Docker commands confidently
- Avoid common beginner mistakes

**🧠 First: Container Lifecycle (MOST IMPORTANT)**
A container goes through these states:

```
Image
  ↓ docker create / run
Created
  ↓ docker start
Running
  ↓ docker stop
Stopped
  ↓ docker rm
Removed
```

🔥 Containers are NOT permanent — this mindset is critical.

**1️⃣ docker run (Most Powerful Command)**
What docker run REALLY does internally

```
docker run nginx
```

Docker secretly runs:

```
docker pull nginx        # if not present
docker create nginx
docker start <container>
```

🧠 run = create + start

**2️⃣ docker create vs docker start**
🔹 Create (no execution)

> docker create nginx

✔ Container exists
❌ App NOT running

🔹 Start (run existing container)

> docker start <container_id>

✔ App runs
✔ Same container resumes

🧠 When to use what?
| Command | Use case |
| -------- | ------------------------- |
| `run` | First time |
| `start` | Restart stopped container |
| `create` | Rare (advanced usage) |

**3️⃣ List Containers Properly**
Running containers

> docker ps

All containers (important!)

> docker ps -a

💡 Beginners mistake:

> “Why is my container not showing?”
> Because it’s stopped.

**4️⃣ Stop vs Kill (IMPORTANT)**
Graceful stop

> docker stop <container_id>

✔ Allows cleanup
✔ Safe

Force kill

> docker kill <container_id>

❌ Immediate termination
❌ No cleanup

🧠 Use stop 99% of the time

**5️⃣ Remove Containers (Clean System)**
Remove stopped container

> docker rm <container_id>

Remove multiple containers

> docker rm id1 id2 id3

Remove ALL stopped containers

> docker container prune

⚠ This deletes containers permanently

**6️⃣ Remove Images**
Remove image

> docker rmi nginx

❌ If container exists → fails
✔ Remove containers first

Remove unused images

> docker image prune

**7️⃣ Naming Containers (VERY USEFUL)**
Instead of random names:

> docker run --name my-nginx -d -p 8080:80 nginx

Now you can:

- docker stop my-nginx
- docker start my-nginx
- docker rm my-nginx

💡 Always name important containers

**8️⃣ Inspect Containers (Debug Like a Pro)**

> docker inspect my-nginx

You’ll see:

- IP address
- Volumes
- Ports
- Environment variables

**9️⃣ Logs (Extremely Important)**

> docker logs my-nginx

Follow logs live:

> docker logs -f my-nginx

🧠 Logs = first place to debug container issues

**🔟 Enter Inside a Running Container (Mind-Blowing 🤯)**

> docker exec -it my-nginx bash

Now you are inside the container 🔥

Try:

> ls
> pwd

Exit:

> exit

**🧪 Mini Practice Task (DO THIS)**

1️⃣ Run nginx with name web-server
2️⃣ Open it in browser
3️⃣ Check logs
4️⃣ Stop it
5️⃣ Start it again
6️⃣ Remove it

Commands:

```
docker run -d --name web-server -p 8080:80 nginx
docker logs web-server
docker stop web-server
docker start web-server
docker rm web-server
```

📌 Lesson 2 Cheat Sheet

```
docker run
docker create
docker start
docker stop
docker kill
docker ps
docker ps -a
docker rm
docker rmi
docker logs
docker exec -it
```

🔥 Golden Rule (Tattoo This)

> ❌ Don’t fix containers
> ✅ Fix images

---

## 🐳 Docker Lesson 3

**Dockerfile → Build Your Own Image (From Scratch)**

🎯 Goal of Lesson 3
By the end, you will:

- Understand what a Dockerfile is
- Learn each Dockerfile instruction
- Build your own Docker image
- Run your own container
- Truly understand how Docker works internally

### 🧠 First: Where Dockerfile Fits (Big Picture)

```
Dockerfile  →  Docker Image  →  Docker Container
 (recipe)        (cake)           (eating)
```

- Dockerfile = Instructions
- Image = Built package
- Container = Running app
  🔥 You fix problems in Dockerfile, NOT inside container

**1️⃣ What is a Dockerfile?**
Simple Definition

A **Dockerfile** is a text file that contains **step-by-step instructions** to build a Docker image.

🧠 Think of it as:

> “How to create my app environment from zero”
> Real-Life Analogy
> | Real Life | Docker |
> | ----------- | ------------ |
> | Recipe | Dockerfile |
> | Ingredients | Base image |
> | Cooking | docker build |
> | Food | Image |
> | Eating | Container |

**2️⃣ Let’s Build a Real Example (Node.js App)**
📁 Project Structure

```
my-docker-app/
 ├── app.js
 ├── package.json
 └── Dockerfile
```

📄 app.js

```
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 Hello from Docker!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

📄 package.json

```
{
  "name": "docker-demo",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**3️⃣ Writing Your First Dockerfile (Line by Line)**
📄 Dockerfile

```
# 1️⃣ Base Image
FROM node:18

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy app source code
COPY . .

# 6️⃣ Expose app port
EXPOSE 3000

# 7️⃣ Start the app
CMD ["node", "app.js"]
```

**4️⃣ Understand Each Dockerfile Instruction (CRITICAL)**
🔹 FROM

> FROM node:18

- ✔ Base OS + Node runtime
- ✔ Every image starts from another image

🔹 WORKDIR

> WORKDIR /app

- ✔ Sets default directory
- ✔ Avoids messy paths

🔹 COPY

> COPY package\*.json ./

- ✔ Copies files from host → container

🧠 Optimization trick
Copy package.json first → better caching

🔹 RUN

> RUN npm install

✔ Executes at build time
✔ Creates image layer

🔹 EXPOSE

> EXPOSE 3000

✔ Documentation for container port
❌ Does NOT publish port

🔹 CMD

> CMD ["node", "app.js"]

✔ Runs when container starts
✔ Only ONE CMD allowed

**5️⃣ Build the Image**

Run this in project folder:

> docker build -t my-node-app .
> Explanation:
> | Part | Meaning |
> | ------------- | ----------------- |
> | `-t` | Tag (name) |
> | `my-node-app` | Image name |
> | `.` | Current directory |

Check image

> docker images

You’ll see:

> my-node-app

**6️⃣ Run Your Own Container 🎉**

> docker run -d -p 3000:3000 my-node-app

Open browser:
👉 http://localhost:3000

You should see:
🚀 Hello from Docker!

🔥 You just Dockerized an application

**7️⃣ Docker Build Layers (Why Docker is FAST)**

Each Dockerfile line = layer
If you change only app.js:

- Docker reuses cached layers
- Rebuild is super fast ⚡

**🧪 Mini Practice Task (DO THIS)**

1️⃣ Change message in app.js
2️⃣ Rebuild image
3️⃣ Re-run container
4️⃣ Verify change

Commands:

```
docker build -t my-node-app .
docker run -p 3000:3000 my-node-ap
```

📌 Lesson 3 Cheat Sheet

```
docker build
docker run
dockerfile instructions
FROM
WORKDIR
COPY
RUN
CMD
EXPOSE
```

---

## 🐳 Docker Lesson 4

**Docker Compose – Multi-Container Applications (Node + MongoDB)**

> 🎯 Goal of Lesson 4
> By the end, you will:

- Understand why Docker Compose exists
- Learn docker-compose.yml line by line
- Run Node.js + MongoDB together
- Use environment variables
- Think like a backend / DevOps engineer

> Docker Compose lets you define and run multiple containers using ONE file and ONE command.

🧠 Think of it as:

> “Blueprint for your entire backend system”

```
Browser
  ↓
Node.js App (Container)
  ↓
MongoDB (Container)
```

### 1️⃣ What is docker-compose.yml?

Simple Definition:-

A YAML file that defines:

- Services (containers)
- Images / builds
- Ports
- Environment variables
- Networks
- Volumes

📄 File name must be:

> docker-compose.yml

### 2️⃣ Project Structure (IMPORTANT)

```
docker-compose-demo/
 ├── backend/
 │    ├── app.js
 │    ├── package.json
 │    └── Dockerfile
 └── docker-compose.yml
```

### 3️⃣ Backend App (Node + MongoDB)

📄 backend/app.js

```
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("🚀 Docker Compose + MongoDB Working!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

📄 backend/package.json

```
{
  "name": "compose-demo",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.0"
  }
}
```

📄 backend/Dockerfile

```
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

### 4️⃣ Docker Compose File (CORE OF THIS LESSON)

📄 docker-compose.yml

```
version: "3.9"

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/mydb
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### 5️⃣ Understand docker-compose.yml Line by Line

🔹 services
Defines containers

🔹 backend

> build: ./backend

✔ Builds image using Dockerfile
✔ Same as docker build

🔹 ports

- "3000:3000"

✔ Host → Container mapping

🔹 environment
MONGO_URL=mongodb://mongo:27017/mydb

🧠 Important magic here
mongo is the service name
Docker creates internal DNS
Containers talk using service names
❌ NOT localhost

🔹 depends_on
depends_on:

- mongo

✔ Starts Mongo first
❌ Does NOT wait until Mongo is ready

🔹 mongo service
image: mongo:7

✔ Pulls Mongo image
✔ No Dockerfile needed

🔹 volumes
mongo-data:/data/db

✔ Persist data even if container is removed
✔ Database safety 🔐

### 6️⃣ Run Everything (ONE COMMAND 🔥)

From root folder:

> docker compose up

Or detached:

> docker compose up -d

🌐 Test

Open:
👉 http://localhost:3000

Expected:
🚀 Docker Compose + MongoDB Working!

### 7️⃣ See What Docker Compose Created

> docker compose ps

You’ll see:
backend container
mongo container
shared network
shared volume

### 8️⃣ Stop Everything Cleanly

> docker compose down

❌ Containers removed
✅ Volume preserved

🔥 MOST IMPORTANT RULE (Tattoo This)

> Containers talk to containers using SERVICE NAMES, not localhost

📌 Lesson 4 Cheat Sheet

```
docker compose up
docker compose up -d
docker compose down
docker compose ps
```

---

## 🐳 Docker Lesson 5

**Volumes, Bind Mounts, .env, Dev vs Prod & Best Practices**

> 🎯 Goal of Lesson 5
> By the end, you will:

- Understand where container data lives
- Master Volumes vs Bind Mounts
- Use .env files properly
- Set up Dev vs Production Docker
- Learn real-world Docker best practices (interview-ready)

🧠 Big Question First: Where Does Data Go?
Important Truth

Containers are temporary
If a container is deleted:

- ❌ Files inside container → GONE
- ❌ DB data → GONE

💥 This is dangerous unless handled correctly.

### 1️⃣ Docker Volumes (DATA SAFETY 🔐)

Simple Definition

**A Docker Volume is a safe storage location managed by Docker, outside the container lifecycle.**

🧠 Real-Life Analogy
| Real Life | Docker |
| ------------- | ------------ |
| Locker | Volume |
| Person | Container |
| Person leaves | Locker stays |

Example (MongoDB Volume)

```
volumes:
  mongo-data:
```

```
mongo:
  image: mongo
  volumes:
    - mongo-data:/data/db
```

✔ Data survives container removal
✔ Best for databases

Useful Commands

> docker volume ls
> docker volume inspect mongo-data
> docker volume prune

### 2️⃣ Bind Mounts (LIVE CODE 🔥)

Simple Definition
A Bind Mount links:
**Your local folder ↔ container folder**

Any change on your laptop → instantly reflected inside container.

🧠 Real-Life Analogy
| Real Life | Docker |
| ----------- | ---------- |
| Google Docs | Bind Mount |
| Notebook | Container |

Example (Node.js Dev Setup)

```
backend:
  volumes:
    - ./backend:/app
```

✔ No rebuild needed
✔ Perfect for development
❌ Dangerous for production

### 3️⃣ Volumes vs Bind Mounts (VERY IMPORTANT)

| Feature           | Volume | Bind Mount |
| ----------------- | ------ | ---------- |
| Managed by Docker | ✅     | ❌         |
| Best for DB       | ✅     | ❌         |
| Live code reload  | ❌     | ✅         |
| Production safe   | ✅     | ❌         |

🧠 Rule

- DB → Volume
- Code (Dev) → Bind Mount

### 4️⃣ Environment Variables & .env Files

❌ Bad Practice
Hardcoding secrets:

> mongoose.connect("mongodb://user:pass@...");

✅ Correct Way
Use environment variables.

📄 .env

```
PORT=3000
MONGO_URL=mongodb://mongo:27017/mydb
```

📄 docker-compose.yml

```
services:
  backend:
    env_file:
      - .env
```

### 5️⃣ Dev vs Production Docker Setup (CRITICAL)

🧪 Development Mode
✔ Bind mounts
✔ Hot reload
✔ Debug-friendly

```
volumes:
  - ./backend:/app
command: npm run dev
```

🚀 Production Mode
✔ No bind mounts
✔ Optimized image
✔ Smaller & faster

> RUN npm install --only=production

### 6️⃣ .dockerignore (Performance Booster ⚡)

Why?
Without it:

node_modules
.git
logs

❌ Copied into image → SLOW builds

📄 .dockerignore

```
node_modules
.git
.env
Dockerfile
```

✔ Faster builds
✔ Smaller images

### 7️⃣ Docker Best Practices (INTERVIEW GOLD 🥇)

✅ Always do this
✔ Use specific image versions

> FROM node:18-alpine

✔ Use multi-stage builds (advanced)
✔ One app per container
✔ Rebuild image — don’t patch container
✔ Use volumes for DB
✔ Use .env files

❌ Avoid this

❌ FROM node:latest
❌ Storing secrets in Dockerfile
❌ Running DB without volumes
❌ Huge images

### 8️⃣ Production-Ready Node Dockerfile (Clean)

```
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
```

✔ Small
✔ Secure
✔ Fast

### 9️⃣ Complete Professional docker-compose.yml

```
version: "3.9"

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - mongo
    volumes:
      - ./backend:/app

  mongo:
    image: mongo:7
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

📌 Lesson 5 Cheat Sheet

```
docker volume ls
docker compose up -d
docker compose down
.env
.dockerignore
```

---

## Multi-Stage Builds (Advanced & Professional)

> 🎯 Goal of this lesson
> By the end, you will:

- Understand why multi-stage builds exist
- See how Dockerfile stages work
- Convert a normal Dockerfile → professional multi-stage Dockerfile
- Reduce image size drastically
- Answer interview questions confidently

🧠 The Core Problem (Without Multi-Stage)
Traditional Dockerfile (Problematic)

```
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "app.js"]
```

❌ What’s wrong here?

- Includes:

  - npm
  - build tools
  - dev dependencies
  - source files

- Image size: 300–600 MB
- Security risk
- Slower startup
  🧠 We only need Node + compiled app in production!

💡 Solution: Multi-Stage Build

> Build everything in one stage → copy only what’s needed to final image

```
Stage 1 (Builder)
 - Full Node
 - Dev dependencies
 - Build app

Stage 2 (Runner)
 - Minimal Node
 - Only built output
```

### 1️⃣ Multi-Stage Syntax (Key Concept)

```
FROM node:18 AS builder
...
FROM node:18-alpine
```

🧠
AS builder → names the stage
Later we can copy from it

### 2️⃣ Example: Node.js Multi-Stage Dockerfile

🛠 Stage 1 – Builder

```
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
```

✔ Dev dependencies allowed
✔ Heavy tools allowed

🚀 Stage 2 – Production Runner

```
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "app.js"]
```

✔ Small image
✔ No npm install here
✔ Only final app files

### 3️⃣ Full Professional Multi-Stage Dockerfile

```
# 🔹 Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 🔹 Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "app.js"]
```

### 4️⃣ Image Size Comparison (REAL WORLD)

| Type              | Image Size |
| ----------------- | ---------- |
| Normal Dockerfile | 350–600 MB |
| Multi-Stage       | 60–120 MB  |

🔥 Huge performance + security win

### 5️⃣ Why node:alpine?

**Alpine Linux** - Extremely small - Minimal attack surface - Fast startup

🧠 Golden Rule

> Use full image for build, alpine for runtime

### 6️⃣ Real-World Example: React / Next.js Build

React Multi-Stage (Classic Interview Example)

```
# Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
```

### 7️⃣ Common Interview Questions (WITH ANSWERS)

❓ Why use multi-stage builds?
✔ Smaller images
✔ More secure
✔ Faster deployments

❓ Can we have more than 2 stages?
✔ Yes
Example:

- lint
- test
- build
- runtime

### 8️⃣ Best Practices (MEMORIZE THIS)

✔ Name build stages (AS builder)
✔ Use alpine for runtime
✔ Never copy node_modules blindly
✔ Combine with .dockerignore
✔ One process per container

---

## 🐳 Docker Networking (Deep)

**How Containers Talk to Each Other (For Real)**

🎯 Goal of this lesson
By the end, you will:

- Understand why localhost breaks in Docker
- Learn Docker network types
- Know how containers discover each other
- Debug real networking issues
- Think like a backend + DevOps engineer

**🧠 First: The Biggest Docker Networking Confusion**
❓ “Why doesn’t localhost work inside containers?”
Let’s kill this confusion forever.

🧠 Rule #1 (Tattoo This)
**Each container has its own network namespace**

Meaning:

- Each container has its own localhost
- localhost ≠ your laptop
- localhost ≠ another container

🏠 Real-Life Analogy (CRITICAL)
Think of containers as apartments 🏢

Each apartment has:

- Its own kitchen (localhost)
- Its own address (IP)

Shouting inside your apartment ❌ doesn’t reach neighbors
👉 You need the apartment number (IP / name) to talk

### 1️⃣ Docker Network Types (High Level)

Docker provides network drivers:
| Network | Use Case |
| ----------- | ---------------------- |
| **bridge** | Default, local dev |
| **host** | High-performance |
| **none** | Isolated |
| **overlay** | Multi-host (Swarm/K8s) |
🧠 We’ll focus on bridge (99% real-world use).

### 2️⃣ Bridge Network (Default & Most Important)

What is a Bridge Network?
**A private internal network created by Docker.**

Containers on same bridge:
✔ Can talk to each other

Containers on different bridges:
❌ Cannot talk

Default Bridge (Auto-created)

> docker network ls

You’ll see:

```
bridge
host
none
```

### 3️⃣ Why Docker Compose “Just Works”

MAGIC EXPLAINED ✨
When you run:

> docker compose up

Docker automatically:
1️⃣ Creates a new bridge network
2️⃣ Connects all services to it
3️⃣ Enables DNS resolution
4️⃣ Uses service names as hostnames

🔥 This is HUGE.

### 4️⃣ Container → Container Communication (Real Example)

```
docker-compose.yml
services:
  backend:
    environment:
      - MONGO_URL=mongodb://mongo:27017/mydb

  mongo:
    image: mongo
```

🧠 Why this works:
mongo = service name
Docker DNS resolves mongo → container IP

❌ mongodb://localhost:27017 → FAIL
✅ mongodb://mongo:27017 → WORKS

### 5️⃣ Visual Flow (Understand This)

```
backend container
   |
   |  mongodb://mongo:27017
   |
mongo container
```

No ports required internally 🔥

### 6️⃣ Ports vs Expose (VERY IMPORTANT)

❓ What does ports really do?

```
ports:
  - "3000:3000"
```

🧠 Meaning:

Left → Host (Laptop)
Right → Container

❗ Key Truth

Ports are ONLY for host ↔ container communication
Containers talking internally:

❌ Do NOT need ports
❌ Do NOT use localhost

### 7️⃣ EXPOSE vs ports (Interview Favorite)

| EXPOSE        | ports                |
| ------------- | -------------------- |
| Documentation | Actual mapping       |
| Internal use  | External access      |
| Optional      | Required for browser |

> EXPOSE 3000
> ❌ Does NOT expose to host
> ✔ Just tells Docker “this app listens here”

### 8️⃣ Custom Bridge Network (Manual Way)

**Create network**

> docker network create my-network

**Run containers on same network**

```
docker run -d --name app --network my-network node
docker run -d --name db --network my-network mongo
```

Now:

> app → db (by name)

### 9️⃣ Inspect Network (Debug Like a Pro)

> docker network inspect my-network

You’ll see:

- Container IPs
- Connected containers
- Subnet
  🔥 This is how seniors debug networking.

🧠 FINAL MENTAL MODEL (LOCK THIS IN)

```
Host ↔ Container → ports
Container ↔ Container → service name
Each container → its own localhost
Docker Compose → private DNS
```

## 🐳 Docker + CI/CD

**GitHub Actions – Build, Test & Push Docker Images Automatically**

> 🎯 Goal of this lesson
> By the end, you will:

- Understand what CI/CD really means
- Know how GitHub Actions works
- Automatically build Docker images
- Push images to Docker Hub
- Think like a professional backend + DevOps engineer

**🧠 First: What is CI/CD? (Very Simple)**

> CI — Continuous Integration
> Automatically build & test code whenever you push changes.

> CD — Continuous Delivery / Deployment
> Automatically package & deliver your app (Docker image).

🏭 Real-Life Analogy (CRITICAL)
Without CI/CD ❌

You build locally
Push code
Manually run Docker
Manually deploy

Human errors everywhere 😵

With CI/CD ✅

```
git push
   ↓
GitHub Actions
   ↓
Build Docker Image
   ↓
Push to Docker Hub
```

🔥 Fully automated

**🧱 Big Picture Flow (Memorize This)**

> Developer → GitHub → GitHub Actions → Docker Image → Docker Hub

### 1️⃣ What is GitHub Actions?

Simple Definition
GitHub Actions is GitHub’s built-in CI/CD system.

It lets you:

- Run workflows on push, pull_request
- Use Docker
- Deploy automatically

### 2️⃣ Folder Structure (MANDATORY)

```
your-project/
 ├── Dockerfile
 ├── package.json
 ├── app.js
 └── .github/
     └── workflows/
         └── docker.yml
```

⚠ Folder name must be exact

### 3️⃣ Docker Hub Setup (One-Time)
Step 1: Create Docker Hub Account

👉 https://hub.docker.com/

Step 2: Create a Repository

Example:
username/my-node-app

### 4️⃣ GitHub Secrets (VERY IMPORTANT 🔐)
Why?
Never hardcode credentials in code.

Add Secrets in GitHub Repo

Go to:
> Repo → Settings → Secrets → Actions

Add:
| Secret Name       | Value                    |
| ----------------- | ------------------------ |
| `DOCKER_USERNAME` | your Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub access token  |
