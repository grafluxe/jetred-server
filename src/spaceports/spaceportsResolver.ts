import { Maybe } from "graphql/jsutils/Maybe";
import { Port as Spaceport } from "../shared/types";
import { getSpaceports, getSpaceport, addSpaceport } from "./spaceportsAction";

const spaceports = (): Spaceport[] => getSpaceports();

const spaceport = (prev: {}, search: Spaceport): Maybe<Spaceport> =>
  getSpaceport(search);

const createSpaceport = (prev: {}, newSpaceport: Spaceport): Spaceport =>
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
