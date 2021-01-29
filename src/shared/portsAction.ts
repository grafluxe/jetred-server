import { Maybe } from "graphql/jsutils/Maybe";
import { Port } from "./types";

type FindPort = (p: Port[]) => (s: Partial<Port>) => Maybe<Port>;

export const findPort: FindPort = (ports) => (search) => {
  const { code, name, location } = search;

  return ports.find(
    (p: Port) => code === p.code || name === p.name || location === p.location
  );
};
