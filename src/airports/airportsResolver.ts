import { ApolloError } from "apollo-server";
import { Maybe } from "graphql/jsutils/Maybe";
import { Port as Airport } from "../shared/types";
import { airportsStore } from "./airportsStore";

const airports = async (): Promise<Airport[] | ApolloError> => {
  try {
    return await airportsStore.selectAll();
  } catch (err) {
    return new ApolloError("An error occured when querying airports");
  }
};

const airport = async (
  prev: {},
  search: Airport
): Promise<Maybe<Airport> | ApolloError> => {
  try {
    return await airportsStore.selectOne(search);
  } catch (err) {
    return new ApolloError("An error occured when querying airports");
  }
};

export default {
  Query: {
    airports,
    airport,
  },
};
