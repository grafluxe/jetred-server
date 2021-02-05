import { Maybe } from "graphql/jsutils/Maybe";
import { UserInputError } from "apollo-server";
import spaceports from "./spaceports.json";
import { Port as Spaceport } from "../shared/types";
import { findPort, getPortOverlaps } from "../shared/portsAction";

const findSpaceport = findPort(spaceports);

export const getSpaceports = (): Spaceport[] => spaceports;

export const getSpaceport = (search: Partial<Spaceport>): Maybe<Spaceport> =>
  findSpaceport(search);

export const addSpaceport = (spaceport: Spaceport): Spaceport => {
  const getSpaceportOverlaps = getPortOverlaps(spaceport);
  const spaceportOverlaps = spaceports.reduce(getSpaceportOverlaps, []);

  if (spaceportOverlaps.length > 0) {
    const fields = spaceportOverlaps.join(" & ");

    throw new UserInputError(
      `The ${fields} you've entered has already been assigned to a spaceport`
    );
  }

  // eslint-disable-next-line fp/no-mutating-methods
  spaceports.push(spaceport);
  return spaceport;
};
