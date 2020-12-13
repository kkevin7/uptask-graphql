const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

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
          // Hashear password
          const salt = await bcryptjs.genSalt(10);
          input.password = await bcryptjs.hash(password, salt);

          //Registrar nuevo usuario
          const nuevoUsuario = new Usuario(input);
          nuevoUsuario.save();

          return "Usuario Creado Correctamente";
        } catch (error) {
          console.log("Error Crear Usuario: ",error)
        }
      },
      autenticarUsuario: async (_, {input}) => {
        const {email, password} = input;

        //Si el usuario existe
        const existeUsuario = await Usuario.findOne({email});

        //Si el password es correcto
        if(!existeUsuario){
          throw new Error('El usuario no existe');
        }

        //Si el passoword es correcto
        const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);

        if(!passwordCorrecto){
          throw new Error('Password Incorrecto');
        }

        //Dar acceso a la app
        return "Has iniciado sesión";

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