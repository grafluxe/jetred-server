import { ApolloError } from "apollo-server";
import { Port as Spaceport } from "../shared/types";
import { spaceportsStore } from "./spaceportsStore";
import { addSpaceport } from "./spaceportsAction";

const spaceports = async (
  parent: {},
  search: Partial<Spaceport>
): Promise<Spaceport[] | ApolloError> => {
  try {
    return Object.keys(search).length === 0
      ? await spaceportsStore.selectAll()
      : await spaceportsStore.select(search);
  } catch (err) {
    return new ApolloError("An error occured when querying spaceports");
  }
};

const createSpaceport = (parent: {}, newSpaceport: Spaceport): Spaceport =>
  addSpaceport(newSpaceport);

export default {
  Query: {
    spaceports,
  },
  Mutation: {
    createSpaceport,
  },
};
