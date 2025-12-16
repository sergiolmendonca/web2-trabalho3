import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Enquetes",
      version: "1.0.0",
      description: "Documentação da API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://web2-trabalho3.onrender.com",
      },
    ],
  },
  apis: [
    "./src/presentation/routes/noauth/*.js",
    "./src/presentation/routes/auth/*.js",
  ],
};

export const swaggerDocument = swaggerJSDoc(options);