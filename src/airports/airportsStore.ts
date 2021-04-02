import { execute, query } from "../store";
import { Port as Airport, QueryStore } from "../shared/types";

export const airportsStore: QueryStore = {
  select: ({ code, name, location }: Partial<Airport>): Promise<Airport[]> =>
    execute(
      `SELECT * FROM airports
        WHERE code = ?
        OR name = ?
        OR location = ?`,
      [code, name, location]
    ),
  selectAll: (): Promise<Airport[]> => query("SELECT * FROM airports"),
};
