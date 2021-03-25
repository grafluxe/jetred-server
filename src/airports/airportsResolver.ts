import { ApolloError } from "apollo-server";
import { Port as Airport } from "../shared/types";
import { airportsStore } from "./airportsStore";

const airports = async (
  parent: {},
  search: Partial<Airport>
): Promise<Airport[] | ApolloError> => {
  try {
    return Object.keys(search).length === 0
      ? await airportsStore.selectAll()
      : await airportsStore.select(search);
  } catch (err) {
    return new ApolloError("An error occured when querying airports");
  }
};

export default {
  Query: {
    airports,
  },
};
