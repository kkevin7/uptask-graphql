const { gql } = require("apollo-server");

const typeDefs = gql`
  type Token {
    token: String
  }

  type Proyecto {
    nombre: String
    id: ID
  }

  type Tarea {
    nombre: String
    id: ID
    proyecto: String
    estado: Boolean
  }

  #  ------------------- inputs -------------------

  input UsuarioInput {
    nombre: String!
    email: String!
    password: String!
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  input ProyectoInput {
    nombre: String!
  }

  input TareaInput {
    nombre: String!
    proyecto: String!
  }

  #  ----------------- Queries -----------------

  type Query {
    obtenerProyectos: [Proyecto]
  }

  #  ------------------  Mutation ------------------

  type Mutation {
    #Proyectos
    crearUsuario(input: UsuarioInput): String
    autenticarUsuario(input: AutenticarInput): Token
    nuevoProyecto(input: ProyectoInput): Proyecto
    actualizarProyecto(id: ID!, input: ProyectoInput): Proyecto
    eliminarProyecto(id: ID!): String

    #Tareas
    nuevaTarea(input: TareaInput): Tarea
  }
`;

module.exports = typeDefs;
