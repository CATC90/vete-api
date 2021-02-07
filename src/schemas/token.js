module.exports = `
    type Token {
        token: String!
        user: Veterinary!
    }

    extend type Query {
        login(email: String!, password: String!): Token!
    }
`