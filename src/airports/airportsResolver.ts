import { Maybe } from "graphql/jsutils/Maybe";
import { Port as Airport } from "../shared/types";
import { getAirports, getAirport } from "./airportsAction";

const airports = (): Airport[] => getAirports();

const airport = (prev: {}, search: Airport): Maybe<Airport> =>
  getAirport(search);

export default {
  Query: {
    airports,
    airport,
  },
};
