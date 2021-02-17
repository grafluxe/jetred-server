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

const overlapMessage = (
  overlaps: string[],
  port: string,
  append: boolean = false
): string => {
  const fields = overlaps.join(" and ");
  const the = !append ? "The" : " and the";
  const verb = overlaps.length === 1 ? "has" : "have";
  const portType = `${port === "spaceport" ? "a" : "an"} ${port}`;

  return `${the} ${fields} you've entered ${verb} already been assigned to ${portType}`;
};

const getOverlapError = (
  spaceportOverlaps: string[],
  airportOverlaps: string[]
): Maybe<string> => {
  const hasSpaceportOverlap = spaceportOverlaps.length > 0;
  const hasAirportOverlap = airportOverlaps.length > 0;

  if (hasSpaceportOverlap && !hasAirportOverlap) {
    return overlapMessage(spaceportOverlaps, "spaceport");
  }

  if (!hasSpaceportOverlap && hasAirportOverlap) {
    return overlapMessage(airportOverlaps, "airport");
  }

  if (hasSpaceportOverlap && hasAirportOverlap) {
    return (
      overlapMessage(spaceportOverlaps, "spaceport") +
      overlapMessage(airportOverlaps, "airport", true)
    );
  }

  return null;
};

export const addSpaceport = (spaceport: Spaceport): Spaceport => {
  const spaceportOverlapChecker = overlapCheck(spaceport);
  const spaceportOverlaps = spaceports.reduce(spaceportOverlapChecker, []);
  const airportOverlaps = airports.reduce(spaceportOverlapChecker, []);
  const overlapError = getOverlapError(spaceportOverlaps, airportOverlaps);

  if (overlapError) {
    throw new UserInputError(overlapError);
  }

  // eslint-disable-next-line fp/no-mutating-methods
  spaceports.push(spaceport);
  return spaceport;
};
