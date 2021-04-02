import { Maybe } from "graphql/jsutils/Maybe";
import { Port } from "../shared/types";

type Spaceport = Port;
type Airport = Port;

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

export const spaceportOverlap = (
  newSpaceport: Spaceport,
  spaceports: Spaceport[],
  airports: Airport[]
): Maybe<string> => {
  const spaceportOverlapChecker = overlapCheck(newSpaceport);
  const spaceportOverlaps = spaceports.reduce(spaceportOverlapChecker, []);
  const airportOverlaps = airports.reduce(spaceportOverlapChecker, []);

  return getOverlapError(spaceportOverlaps, airportOverlaps);
};
