const { gql } = require("apollo-server");

const resolvers = {
    Query: {
      obtenerCursos: () => cursos,
      obtenerTecnologia: () => cursos
    },
    Mutation: {
      crearUsuario: (root, {input}, context) => { 
        const {nombre, password} = input;
        console.log(`User Created ${nombre}`);
        console.log("args: ", input);
      }
    }
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
      tecnologia: "Node.js",
    },
    {
      titulo: "ReacJS Avanzado - FullStack React GraphQL y Apollo",
      tecnologia: "React",
    },
  ];

module.exports = resolvers;