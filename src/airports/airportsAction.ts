import { Maybe } from "graphql/jsutils/Maybe";
import airports from "./airports.json";
import { Port as Airport } from "../shared/types";
import { findPort } from "../shared/portsAction";

const findAirport = findPort(airports);

export const getAirports = (): Airport[] => airports;

export const getAirport = (search: Partial<Airport>): Maybe<Airport> =>
  findAirport(search);
