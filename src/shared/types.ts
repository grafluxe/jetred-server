export type Port = {
  code: string;
  name: string;
  location: string;
};

export type QueryStore = {
  select: (port: Partial<Port>) => Promise<Port[]>;
  selectAll: () => Promise<Port[]>;
  insert?: () => void;
};
