import { Maybe } from "graphql/jsutils/Maybe";
import { Port } from "./types";

type FindPort = (p: Port[]) => (s: Partial<Port>) => Maybe<Port>;

export const findPort: FindPort = (ports) => (search) => {
  const { code, name, location } = search;

  return ports.find(
    (port: Port) =>
      code === port.code || name === port.name || location === port.location
  );
};
