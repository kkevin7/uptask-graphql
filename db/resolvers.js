const Usuario = require('../models/Usuario');

const resolvers = {
    Query: {
      obtenerCursos: () => cursos,
      obtenerTecnologia: () => cursos
    },
    Mutation: {
      crearUsuario: async (_, {input}, context) => { 
        const {nombre, email, password} = input;

        const existeUsuario = await Usuario.findOne({email});
        if(existeUsuario){
          throw new Error('El usuario ya esta registrado')
        }

        try {
          const nuevoUsuario = new Usuario(input);
          console.log("Nuevo Usuario: ", nuevoUsuario);
          nuevoUsuario.save();
          return "Usuario Creado Correctamente";
        } catch (error) {
          console.log("Error Crear Usuario: ",error)
        }
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