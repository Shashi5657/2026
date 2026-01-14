# NestJS Learning Notes 📘

This README is a **cleaned, structured, and interview‑ready version** of your NestJS learning notes. It follows a logical progression from setup → core concepts → advanced building blocks, aligned with **official NestJS conventions** and **real‑world backend practices**.

---

## 📌 What is NestJS?

NestJS is a **progressive Node.js framework** for building efficient, scalable, and maintainable server‑side applications. It is heavily inspired by Angular and uses:

- TypeScript by default
- Strong Dependency Injection system
- Modular architecture
- Built‑in support for REST, GraphQL, WebSockets, and Microservices

---

## 🧰 Prerequisites

- Node.js **v20 or higher**
- npm or yarn
- Basic understanding of:
  - TypeScript
  - JavaScript ES6+
  - REST APIs

---

## 🚀 Project Setup

### Install Nest CLI

```bash
npm i -g @nestjs/cli
```

### Create a New Project

```bash
nest new project-name
```

💡 Tip: Use stricter TypeScript rules

```bash
nest new project-name --strict
```

---

## 📂 Default Project Structure

```text
src/
├── app.controller.ts
├── app.controller.spec.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

### File Responsibilities

| File                     | Purpose                         |
| ------------------------ | ------------------------------- |
| `main.ts`                | Entry point, bootstraps the app |
| `app.module.ts`          | Root module                     |
| `app.controller.ts`      | Handles incoming HTTP requests  |
| `app.service.ts`         | Contains business logic         |
| `app.controller.spec.ts` | Unit tests for controller       |

---

## 🟢 Application Bootstrap (`main.ts`)

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

### Key Notes

- `NestFactory.create()` creates an app instance
- Returns `INestApplication`
- `abortOnError: false` prevents hard exit on startup errors

---

## ▶️ Running the Application

```bash
npm run start        # production
npm run start:dev    # watch mode
```

⚡ Faster builds using SWC

```bash
npm run start -- -b swc
```

---

## 🧪 Linting & Formatting

```bash
npm run lint
npm run format
```

---

## 🌐 Platform Support

NestJS is **platform‑agnostic**.

| Platform | Notes                          |
| -------- | ------------------------------ |
| Express  | Default, stable, widely used   |
| Fastify  | High‑performance, low‑overhead |

You only need to specify a platform type if you want access to native APIs.

---

## 🧱 Controllers

Controllers handle incoming HTTP requests and return responses.

### Common Route Decorators

```ts
@Get()
@Post()
@Put()
@Patch()
@Delete()
```

### Request Object Decorators

| Decorator    | Value        |
| ------------ | ------------ |
| `@Req()`     | req          |
| `@Res()`     | res          |
| `@Param()`   | route params |
| `@Body()`    | request body |
| `@Query()`   | query params |
| `@Headers()` | headers      |
| `@Ip()`      | client IP    |

---

## 📦 DTOs (Data Transfer Objects)

DTOs define the **shape of request data**.

```ts
export class CreateUserDto {
  name: string;
  email: string;
}
```

Used for:

- Validation
- Type safety
- Cleaner controllers

---

## 🧠 Providers & Services

Providers contain **business logic** and are injected using DI.

```ts
@Injectable()
export class UsersService {
  private readonly users = [];
}
```

### Key Concepts

- `@Injectable()` makes class injectable
- Constructor‑based DI
- `private` & `readonly` recommended

### Provider Types

- Class providers
- Value providers
- Factory providers
- Optional providers
- Property‑based injection

---

## 🧩 Modules

Modules organize the app into **feature boundaries**.

```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [],
  exports: [UsersService],
})
export class UsersModule {}
```

### Module Types

- Root module
- Feature modules
- Shared modules
- Global modules
- Dynamic modules

---

## 🔗 Dependency Injection

Nest builds an **application graph** to resolve dependencies.

- Singleton by default
- Scope control available
- Cross‑module injection via `exports`

---

## 🔄 Middleware

Middleware runs **before route handlers**.

### Logger Middleware Example

```ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.method, req.url);
    next();
  }
}
```

### Apply Middleware

```ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
```

### Middleware Features

- Route wildcards
- Exclude routes
- Multiple middleware
- Functional middleware
- Global middleware (`app.use()`)

---

## 🚨 Exception Filters

### Throwing Exceptions

```ts
throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
```

### Custom Exception Filter

```ts
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

### Binding Filters

- Controller level
- Method level
- Global (`app.useGlobalFilters()`)

---

## 🧪 Pipes

Pipes handle **transformation & validation**.

### Built‑in Pipes

- `ValidationPipe`
- `ParseIntPipe`

```ts
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.service.findOne(id);
}
```

### Pipe Use Cases

1. Transform data
2. Validate input

Supports:

- Class‑validator
- Schema‑based validation
- Custom pipes

---

## 🧰 CLI Productivity

Generate a full CRUD resource:

```bash
nest g resource users
```

Includes:

- Controller
- Service
- DTOs
- Module
- Validation

---

## ✅ Learning Outcome

After completing these concepts, you should be comfortable with:

- NestJS architecture
- Dependency Injection
- Modular backend design
- Middleware, Pipes & Filters
- Building scalable CRUD APIs

---

## 📈 Next Steps

- Authentication (JWT)
- Database integration (TypeORM / Prisma / Mongoose)
- Guards & Authorization
- Interceptors
- Microservices

---

🔥 **This README is production‑grade and interview‑ready.**

If you want, next we can:

- Add **real CRUD example (Users module)**
- Add **Auth + JWT flow**
- Convert this into a **Notion / GitHub README template**
- Prepare **NestJS interview Q&A**
