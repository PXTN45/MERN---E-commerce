const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = express.Router();
const productRouter = require("./routes/product.router");
const cartItemRouter = require("./routes/cartItem.router");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "RESTful API for SE Shop",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  externalDocs: {
    description: "Download Swagger.json",
    url: "/swagger.json",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

dotenv.config();
const PORT = process.env.PORT;
//creat server
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
  res.header("Content-Type", "application/swagger.json");
  res.send(swaggerSpec)
});
app.use("/products", productRouter);
app.use("/cartItem", cartItemRouter);

app.get("/", (req, res) => {
  res.send("<h1> this is a restaurant API </h1>");
});

app.listen(PORT, () => {
  console.log("server is runing on http://localhost:" + PORT);
});
