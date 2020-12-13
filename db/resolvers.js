const Usuario = require("../models/Usuario");
const Proyecto = require("../models/Proyecto");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

//Crea y firma un JWT
const crearToken = (user, secret, expiresIn) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    obtenerProyectos: async (_, {}, ctx) => {
      const proyectos = await Proyecto.find({creador: ctx.usuario.id});
      return proyectos;
    } 
  },
  Mutation: {
    crearUsuario: async (_, { input }, context) => {
      const { nombre, email, password } = input;

      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
        throw new Error("El usuario ya esta registrado");
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
        console.log("Error Crear Usuario: ", error);
      }
    },
    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;

      //Si el usuario existe
      const existeUsuario = await Usuario.findOne({ email });

      //Si el password es correcto
      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }

      //Si el passoword es correcto
      const passwordCorrecto = await bcryptjs.compare(
        password,
        existeUsuario.password
      );

      if (!passwordCorrecto) {
        throw new Error("Password Incorrecto");
      }

      //Dar acceso a la app
      return {
        token: crearToken(existeUsuario, process.env.SECRET, "2hr"),
      };
    },
    nuevoProyecto: async (_, {input}, context) => {
      try {
        const proyecto = new Proyecto(input);

        //asocuar el creador 
        proyecto.creador = context.usuario.id;

        //almacenarlo en la DB
        const resultado = await proyecto.save();

        return resultado;
      } catch (error) {
        console.log("Error nuevoProyecto: ",error)
      }
    },
    actualizarProyecto: async (_, {id, input}, context) => {
      //Reivisar si el poryecto existe o no
      let proyecto = await Proyecto.findById(id);

      if(!proyecto){
        throw new Error("Proyecto no encontrado");
      }

      //Revisar que si la persona que trata de editarlo, es el creador
      if(proyecto.creador.toString() !== context.usuario.id){
        throw new Error('No tienes las credenciales para editar');
      }

      //Guardar el proyecto
      proyecto = await Proyecto.findOneAndUpdate({_id: id}, input, {new: true});
      return proyecto;
    },
    eliminarProyecto: async (_, {id}, context) => {
      //Reivisar si el poryecto existe o no
      let proyecto = await Proyecto.findById(id);

      if(!proyecto){
        throw new Error("Proyecto no encontrado");
      }

      //Revisar que si la persona que trata de editarlo, es el creador
      if(proyecto.creador.toString() !== context.usuario.id){
        throw new Error('No tienes las credenciales para editar');
      }

      //Eliminar proyecto
      proyecto = await Proyecto.findOneAndDelete({_id: id});
      return "Proyecto Eliminado";
    },
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
    tecnologia: "Node.js",
  },
  {
    titulo: "ReacJS Avanzado - FullStack React GraphQL y Apollo",
    tecnologia: "React",
  },
];

module.exports = resolvers;
