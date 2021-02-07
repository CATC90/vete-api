module.exports = `
    enum PRODUCT_TYPES {
        supplies 
        services 
    }

    input ProductInput {
        name: String
        type: PRODUCT_TYPES
        price: Int
        discount: Int
        tags: [String!]
    }

    type Product {
        _id: ID!
        _enabled: Boolean!
        createdAt: String!
        updatedAt: String!
        name: String!
        type: PRODUCT_TYPES!
        price: Int!
        discount: Int!
        tags: [Tag!]
    }

    extend type Query {
        findProductById(id: ID!): Product!
        findProduct(field: String!, value: String!): [Product!]
        findProductByTag(tag: String!): [Product!] 
    }

    extend type Mutation {
        createProduct(product: ProductInput!): Product!
        updateProduct(id: ID!, update: ProductInput!): Product!
        deleteProduct(id: ID!): Boolean!
    }
`;
