import { gql } from "apollo-server";

export default gql`
  extend type Query {
    airports: [Port]
    airport(code: String, name: String, location: String): [Port]
  }
`;
