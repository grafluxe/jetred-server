import { gql } from "apollo-server";

export default gql`
  extend type Query {
    airports(code: String, name: String, location: String): [Port]
  }
`;
