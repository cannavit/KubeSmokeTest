// Create ingress with express and swagger-jsdoc
// import dependencies
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

// define swagger options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "KubeSomkeTest API",
      description: "Api Documentation",
      // servers: ['http://localhost:3000'],
      version: "1.0.0"
    }
    // schemes: ["http"],
    // basePath: "/api/v1",
  },
  // ['.routes/*.js']
  apis: ["./src/routes/*"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Create Swagger documentation declaration

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/cluster-coverage", require("./routes/cluster-coverage"));

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});
