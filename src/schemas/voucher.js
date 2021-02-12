module.exports = `

    enum paidMethods {
        credit
        debit
        cash
    }

    type transactedProduct {
       quantity: Int! 
       product: Product! 
    }

    input transactedProductInput {
        quantity: Int! 
        product: ID! 
     }

    input VoucherInput {
        customer: ID!
        description: String!
        paidWith: paidMethods!
        products: [transactedProductInput!]
    }

    type Voucher {
        veterinary: Veterinary!
        customer: Customer!
        description: String!
        paidWith: paidMethods!
        products: [transactedProduct!]
    }

    extend type Query {
        findVoucherByCustomer(id: ID!): [Voucher!]
        findVoucherByVeterinary(id: ID!): [Voucher!]
        findAllVoucherBetween(from: String!, to: String!): [Voucher!]
    }

    extend type Mutation {
        createVoucher(voucher: VoucherInput!): Voucher!
    }
`;