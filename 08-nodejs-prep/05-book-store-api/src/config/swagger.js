// import {
//   OpenAPIRegistry,
//   OpenApiGeneratorV3,
// } from "@asteasolutions/zod-to-openapi";
// import swaggerUi from "swagger-ui-express";
// import { registerSchema } from "../modules/auth/auth.schema.js";

// const registry = new OpenAPIRegistry();

// registry.registerPath({
//   method: "post",
//   path: "/api/v1/auth/register",
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: registerSchema.shape.body,
//         },
//       },
//     },
//   },
//   responses: {
//     201: {
//       description: "User registered successfully",
//     },
//   },
// });

// const generator = new OpenApiGeneratorV3(registry.definitions);

// const openApiSpec = generator.generateDocument({
//   openapi: "3.0.0",
//   info: {
//     title: "Book Store API",
//     version: "1.0.0",
//   },
// });

// export const setupSwagger = (app) => {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
// };
