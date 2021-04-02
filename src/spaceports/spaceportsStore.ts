import { execute, query } from "../store";
import { Port as Spaceport, QueryStore } from "../shared/types";

export const spaceportsStore: QueryStore = {
  select: ({ code, name, location }): Promise<Spaceport[]> =>
    execute(
      `SELECT * FROM spaceports
        WHERE code = ?
        OR name = ?
        OR location = ?`,
      [code, name, location]
    ),
  selectAll: (): Promise<Spaceport[]> => query("SELECT * FROM spaceports"),
  insert: ({ code, name, location }: Spaceport): Promise<any> =>
    execute(
      `INSERT INTO spaceports (code, name, location)
    VALUES (?, ?, ?)`,
      [code, name, location]
    ),
};
