import { gql } from "apollo-server";

export default gql`
  type Query

  type Port {
    code: String!
    name: String!
    location: String!
  }
`;
