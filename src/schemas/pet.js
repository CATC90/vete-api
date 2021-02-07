module.exports = `
    enum animalType {
        dog
        cat
    }
    input PetInput {
        name: String!
        age: Int!
        description: String
        cases: [Cases!]
        type: animalType!
    }

    type Pet {
        _id: ID!
        name: String!
        age: Int!
        type: animalType!
        description: String
        createdAt: String!
        updatedAt: String!
        _enabled: Boolean!
        cases: [Cases!]
    }

    extend type Query {
        findPetById(id: ID!): Pet!
        findPet(field: String!, value: String!): Pet!
    }

    extend type Mutation {
        createPet(pet: PetInput!): Pet!
    }
`;