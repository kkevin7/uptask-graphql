const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`

type Curso{
    titulo: String,
    tecnologia: String
}

type Query{
    obtenerCursos : [Curso]
}
`;

const resolvers = {
  Query: {
    obtenerCursos: () => cursos,
  },
};

const cursos = [
  {
    titulo: "Javascript Moderno Guía Definitiva Construye +10 Proyectos",
    tecnologia: "Javascript ES6",
  },
  {
    titulo: "React - La Guía Completa: Hooks Context Redux MERN +15 Apps",
    tecnologia: "React",
  },
  {
    titulo: "Node.js - Bootcamp Desarrollo Web inc. MVC y RESR API´s",
    tecnología: "Node.js",
  },
  {
    titulo: "ReacJS Avanzado - FullStack React GraphQL y Apollo",
    tecnologia: "React",
  },
];

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`Servidor listo en la URL ${url}`);
});
