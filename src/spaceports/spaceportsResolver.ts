import { ApolloError } from "apollo-server";
import { Port as Spaceport } from "../shared/types";
import { spaceportsStore } from "./spaceportsStore";
import { addSpaceport } from "./spaceportsAction";

const spaceports = async (): Promise<Spaceport[] | ApolloError> => {
  try {
    return await spaceportsStore.selectAll();
  } catch (err) {
    return new ApolloError("An error occured when querying spaceports");
  }
};

const spaceport = async (
  parent: {},
  search: Partial<Spaceport>
): Promise<Spaceport[] | ApolloError> => {
  try {
    return await spaceportsStore.select(search);
  } catch (err) {
    return new ApolloError("An error occured when querying spaceports");
  }
};

const createSpaceport = (parent: {}, newSpaceport: Spaceport): Spaceport =>
  addSpaceport(newSpaceport);

export default {
  Query: {
    spaceports,
    spaceport,
  },
  Mutation: {
    createSpaceport,
  },
};
