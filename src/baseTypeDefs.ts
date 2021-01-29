import { gql } from "apollo-server";

export default gql`
  type Query

  type Port {
    code: ID!
    name: ID!
    location: ID!
  }
`;
