import { ApolloServer } from "apollo-server";
import merge from "lodash.merge";
import baseTypeDefs from "./baseTypeDefs";
import spaceportsTypeDefs from "./spaceports/spaceportsTypeDefs";
import spaceportsResolver from "./spaceports/spaceportsResolver";
import airportsTypeDefs from "./airports/airportsTypeDefs";
import airportsResolver from "./airports/airportsResolver";

const server = new ApolloServer({
  typeDefs: [baseTypeDefs, spaceportsTypeDefs, airportsTypeDefs],
  resolvers: merge({}, spaceportsResolver, airportsResolver),
});

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 ${url}`);
});
