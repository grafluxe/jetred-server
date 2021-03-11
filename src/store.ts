import mysql from "mysql2";
import { Connection } from "mysql2/promise";

const { DB_HOST, DB_USER, DB_PWD, DB_NAME } = process.env;

const conn: Connection = mysql
  .createConnection({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PWD,
  })
  .promise();

export const query = async <T>(stmt: string): Promise<T[]> => {
  const [rows] = await conn.query(stmt);

  return rows as T[];
};

export const execute = async <T>(
  stmt: string,
  values: any | any[]
): Promise<T[]> => {
  const definedValues = values.map((el: string) => el || "");

  const [rows] = await conn.execute(stmt, definedValues);

  return rows as T[];
};
