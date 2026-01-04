# Docker

- [What is Docker?](#what-is-docker)
- [Core Docker Concepts?](#-core-docker-concepts-big-picture)
- [Docker Lesson 1](#-docker-lesson-1)
- [Docker Lesson 2](#-docker-lesson-2)
- [Docker Lesson 3](#-docker-lesson-3)

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
