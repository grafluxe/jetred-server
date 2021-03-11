import { ApolloError } from "apollo-server";
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
  parent: {},
  search: Partial<Airport>
): Promise<Airport[] | ApolloError> => {
  try {
    return await airportsStore.select(search);
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
