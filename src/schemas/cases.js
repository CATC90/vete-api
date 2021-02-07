module.exports = `
    enum caseStatus {
        finished
        inProgress
    }

    input CasesInput {
        name: String
        description: String
        veterinary: [VeterinaryInput!]
        diagnosis: String
        status: caseStatus
        result: String
        notes: [NoteInput!]
     }

    type Cases {
       name: String!
       description: String!
       veterinary: [Veterinary!]
       diagnosis: String
       status: caseStatus!
       result: String
       notes: [Note!]
    }

    extend type Query {
        findCasesByStatus(status: String!): [Cases!]
        findCasesBetween(from: String!, to: String!): [Cases!]
    }

    extend type Mutation {
        createCase(petID: ID!, case: CasesInput!): Pet!
        updateCase(caseID: ID!, update: CasesInput!): Cases!
        addNote(caseID: ID!, note: NoteInput!): Cases!
        deleteCase(caseID: ID!): Boolean!
    }
`

/**
 * Falta agregar notes y probar el flujo completo
 */