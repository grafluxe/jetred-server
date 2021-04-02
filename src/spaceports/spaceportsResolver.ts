import { ApolloError } from "apollo-server";
import { Port as Spaceport } from "../shared/types";
import { airportsStore } from "../airports/airportsStore";
import { spaceportsStore } from "./spaceportsStore";
import { spaceportOverlap } from "./spaceportOverlap";

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

const createSpaceport = async (
  parent: {},
  newSpaceport: Spaceport
): Promise<Spaceport | ApolloError> => {
  try {
    const allSpaceports = await spaceportsStore.selectAll();
    const allAirports = await airportsStore.selectAll();
    const invalidAddition = spaceportOverlap(
      newSpaceport,
      allSpaceports,
      allAirports
    );

    if (invalidAddition) return new ApolloError(invalidAddition);

    const inserted = await spaceportsStore.insert!(newSpaceport);

    /*   if (!inserted) {
      return new ApolloError("ERRRRRR");
    } */

    return newSpaceport;
  } catch (err) {
    return new ApolloError(
      "A database error occured when adding a new spaceport"
    );
  }
};

export default {
  Query: {
    spaceports,
  },
  Mutation: {
    createSpaceport,
  },
};
