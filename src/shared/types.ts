import { Maybe } from "graphql/jsutils/Maybe";

export type Port = {
  code: string;
  name: string;
  location: string;
};

export type QueryStore = {
  selectOne: (port: Partial<Port>) => Promise<Maybe<Port>>;
  selectAll: () => Promise<Port[]>;
  insert?: () => void;
};
