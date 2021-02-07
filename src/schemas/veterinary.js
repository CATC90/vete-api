module.exports = `
    enum networks {
        twitter
        facebook
        instagram
        youtube
    }

    type socialNetwork {
        type: networks!
        link: String!
    }

    input socialNetworkInput {
        type: networks!
        link: String!
    }


    input VeterinaryInput {
        name: String
        lastName: String
        secondLastName: String
        rut: String
        phone: String
        email: String
        password: String
        age: Int
        socialNetworks: [socialNetworkInput!]
    }

    type Veterinary {
        _id: ID!
        _enabled: Boolean!
        createdAt: String!
        updatedAt: String!
        name: String!
        lastName: String!
        secondLastName: String
        fullName: String
        rut: String!
        phone: String!
        email: String!
        password: String!
        age: Int
        socialNetworks: [socialNetwork!]
    }

    extend type Query {
        findVeterinaryBy(field: String!, value: String!): Veterinary!
    }

    extend type Mutation {
        createVeterinary(veterinary: VeterinaryInput!): Veterinary!
        updateVeterinary(id: ID!, update: VeterinaryInput!): Veterinary!
        deleteVeterinary(id: ID!): Boolean!
    }
`