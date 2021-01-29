import { gql } from "apollo-server";

export default gql`
  extend type Query {
    spaceports: [Port]
    spaceport(code: ID, name: ID, location: ID): Port
  }

  type Mutation {
    createSpaceport(code: ID, name: ID, location: ID): Port
  }
`;
