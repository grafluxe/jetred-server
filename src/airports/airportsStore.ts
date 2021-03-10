import { Maybe } from "graphql/jsutils/Maybe";
import { execute, query } from "../store";
import { Port as Airport, QueryStore } from "../shared/types";

export const airportsStore: QueryStore = {
  selectOne: ({ code, name, location }): Promise<Maybe<Airport>> =>
    execute(
      `SELECT * FROM airports
        WHERE code = ?
        OR name = ?
        OR location = ?`,
      [code, name, location]
    ),
  selectAll: (): Promise<Airport[]> => query("SELECT * FROM airports"),
};
