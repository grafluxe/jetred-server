export type Port = {
  code: string;
  name: string;
  location: string;
};

export type QueryStore = {
  select: (port: Partial<Port>) => Promise<Port[]>;
  selectAll: () => Promise<Port[]>;
  insert?: (port: Port) => Promise<number>;
};

/*

const withLogging = (port: QueryFunction): QueryFunction => {
  const withLog = <T>(fn: T) => {
    conn.query("INSERT INTO ... `logs`");
    return fn();
  };

  return Object.entries(port).reduce(
    (withLogs, [name, fn]) => ({
      ...withLogs,
      [name]: withLog<ReturnType<typeof fn>>(fn!),
    }),
    {} as QueryFunction
  );
};

export const spaceportQueryNoLogs = spaceport;
export const spaceportQuery = withLogging(spaceport);

*/
