module.exports = `

  input CustomerInput {
    rut: String
    name: String
    lastName: String
    secondLastName: String
    age: Int
    email: String
    pets: [PetInput!]
  }

  type Customer {
    _id: ID!
    rut: String!
    name: String!
    lastName: String
    secondLastName: String
    fullName: String
    age: Int
    email: String!
    pets: [Pet!]
    createdAt: String!
    updatedAt: String!
    _enabled: Boolean!
  }

  extend type Query {
    findCustomerById(id: ID!): Customer!
    findCustomerByPet(id: ID!): Customer!
    findCustomer(field: String!, value: String!): Customer!
  }

  extend type Mutation {
    createCustomer(customer: CustomerInput!): Customer!
    updateCustomer(id: ID!, update: CustomerInput!): Customer!
    deleteCustomer(id: ID!): Boolean!
    addPet(pet: PetInput!): Customer!
  }
`;