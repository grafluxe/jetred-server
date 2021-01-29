import { Maybe } from "graphql/jsutils/Maybe";
import spaceports from "./spaceports.json";
import { Port as Spaceport } from "../shared/types";
import { findPort } from "../shared/portsAction";

const findSpaceport = findPort(spaceports);

export const getSpaceports = (): Spaceport[] => spaceports;

export const getSpaceport = (search: Partial<Spaceport>): Maybe<Spaceport> =>
  findSpaceport(search);

export const addSpaceport = (spaceport: Spaceport): Spaceport => {
  // eslint-disable-next-line fp/no-mutating-methods
  spaceports.push(spaceport);
  return spaceport;
};
