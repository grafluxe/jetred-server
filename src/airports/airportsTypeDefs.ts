import { gql } from "apollo-server";

export default gql`
  extend type Query {
    airports: [Port]
    airport(code: ID, name: ID, location: ID): Port
  }
`;
