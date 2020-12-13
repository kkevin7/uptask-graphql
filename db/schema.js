const { gql } = require("apollo-server");

const typeDefs = gql`
  type Curso {
    titulo: String
    tecnologia: String
  }

  type Tecnologia {
    tecnologia: String
  }

  type Token {
      token: String
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

#  ----------------- Queries -----------------

  type Query {
    obtenerCursos: [Curso]
    obtenerTecnologia: [Tecnologia]
  }

#  ------------------  Mutation ------------------

  type Mutation {
    crearUsuario(input: UsuarioInput): String
    autenticarUsuario(input: AutenticarInput): Token
  }
`;

module.exports = typeDefs;
