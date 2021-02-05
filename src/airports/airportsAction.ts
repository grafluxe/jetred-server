import { Maybe } from "graphql/jsutils/Maybe";
import airports from "./airports.json";
import { Port as Airport } from "../shared/types";
import { findPort } from "../shared/portsAction";

export const getAirports = (): Airport[] => airports;

export const getAirport = (search: Partial<Airport>): Maybe<Airport> =>
  findPort(airports)(search);
