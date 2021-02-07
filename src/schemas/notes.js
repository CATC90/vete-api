module.exports = `

    enum mediaType {
        gif
        mp4
        png
        jpeg
    }

    input MediaInput {
        type: mediaType!
        link: String!
    }

    type Media {
        type: mediaType!
        link: String!
    }

    input NoteInput {
        name: String!
        text: String
        medias: MediaInput
    }

    type Note {
        _id: ID!
        name: String!
        text: String
        medias: Media
        createdBy: Veterinary!
        _enabled: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`