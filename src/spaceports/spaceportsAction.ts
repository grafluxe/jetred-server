import { Maybe } from "graphql/jsutils/Maybe";
import { UserInputError } from "apollo-server";
import spaceports from "./spaceports.json";
import airports from "../airports/airports.json";
import { Port } from "../shared/types";
import { findPort } from "../shared/portsAction";

type Spaceport = Port;

export const getSpaceports = (): Spaceport[] => spaceports;

export const getSpaceport = (search: Partial<Spaceport>): Maybe<Spaceport> =>
  findPort(spaceports)(search);

const overlapCheck = (withPort: Port) => (
  initialValue: string[],
  againstPort: Port
): string[] =>
  [
    initialValue,
    withPort.code === againstPort.code ? "code" : [],
    withPort.name === againstPort.name ? "name" : [],
    withPort.location === againstPort.location ? "location" : [],
  ].flat();

const checkOverlaps = (
  overlaps: string[],
  portType: string,
  solo: boolean
): string => {
  const firstLetter = solo ? "T" : "t";
  return `${firstLetter}he ${overlaps.join(
    " & "
  )} you've entered has already been assigned to ${
    portType === "space" ? "a" : "an"
  } ${portType}port`;
};

export const addSpaceport = (spaceport: Spaceport): Spaceport => {
  const getSpaceportOverlaps = overlapCheck(spaceport);
  const spaceportOverlaps: string[] = spaceports.reduce(
    getSpaceportOverlaps,
    []
  );
  const airportOverlaps: string[] = airports.reduce(getSpaceportOverlaps, []);

  const spaceErrorMessage =
    spaceportOverlaps.length > 0
      ? checkOverlaps(spaceportOverlaps, "space", true)
      : [];

  const airErrorMessage =
    airportOverlaps.length > 0
      ? checkOverlaps(airportOverlaps, "air", spaceErrorMessage.length === 0)
      : [];

  if (spaceErrorMessage || airErrorMessage) {
    const errorMessages = [spaceErrorMessage, airErrorMessage];
    throw new UserInputError(errorMessages.flat().join(" & "));
  }

  // eslint-disable-next-line fp/no-mutating-methods
  spaceports.push(spaceport);
  return spaceport;
};
