const { buildSchema } = require('graphql')

const typeDefs = buildSchema(`

  type Event {
    id: String
    name: String
    dateActualFrom: String
    availability: String
  }

  type Query {
    allEvents: [Event!]!
  }
`)



module.exports = typeDefs