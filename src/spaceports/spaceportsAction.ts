import { Maybe } from "graphql/jsutils/Maybe";
import { UserInputError } from "apollo-server";
import spaceports from "./spaceports.json";
import { Port } from "../shared/types";
import { findPort } from "../shared/portsAction";

type Spaceport = Port;

export const getSpaceports = (): Spaceport[] => spaceports;

export const getSpaceport = (search: Partial<Spaceport>): Maybe<Spaceport> =>
  findPort(spaceports)(search);

const getPortOverlaps = (portA: Port) => (
  prepend: string[],
  portB: Port
): string[] =>
  [
    prepend,
    portA.code === portB.code ? "code" : [],
    portA.name === portB.name ? "name" : [],
    portA.location === portB.location ? "location" : [],
  ].flat();

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
