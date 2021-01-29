import { ApolloServer } from "apollo-server";
import merge from "lodash.merge";
import baseTypeDefs from "./baseTypeDefs";
import spaceportsTypeDefs from "./spaceports/spaceportsTypeDefs";
import spaceportsResolver from "./spaceports/spaceportsResolver";

const server = new ApolloServer({
  typeDefs: [baseTypeDefs, spaceportsTypeDefs],
  resolvers: merge({}, spaceportsResolver),
});

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 ${url}`);
});
