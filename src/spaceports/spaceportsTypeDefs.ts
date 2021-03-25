import { gql } from "apollo-server";

export default gql`
  extend type Query {
    spaceports(code: String, name: String, location: String): [Port]
  }

  type Mutation {
    createSpaceport(code: String, name: String, location: String): Port
  }
`;
