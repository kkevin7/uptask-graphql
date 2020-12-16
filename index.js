const { ApolloServer, gql } = require("apollo-server");
//Envirment
require("dotenv").config("variables.env");
//config
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const conectarDB = require("./config/db");
//Dependences
const jwt = require("jsonwebtoken");

//Coenctar a la DB
conectarDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const usuario = jwt.verify(token.replace('Bearer ',''), process.env.SECRET);
        return {
          usuario,
        };
      } catch (error) {
        console.log("Error Token: ", error);
      }
    }
  },
});

server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`Servidor listo en la URL ${url}`);
});
