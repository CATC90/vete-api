module.exports = `
    type Tag {
        _id: ID!
        name: String!
    }

    extend type Query {
        getAllTags: [Tag!]!
    }

    extend type Mutation {
        createTag(name: String!): Tag!
        deleteTag(name: String!): Boolean!
        updateTag(name: String!, update: String!): Tag!
    }
`;