import express from "express";
import cors from "cors";

const app = express(); //create an express app

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

app.use(cors());
//we parse the  json req we get from the users
app.use(express.json());

// swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Node.js API",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  // Path to the API docs (files containing @swagger annotations)
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes will be here
import userRouter from "./routes/user.routes.ts";
import internRouter from "./routes/internship.routes.ts"


//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/internships", internRouter )


//example route http://localhost:4000/api/v1/users/register

export default app;
