import { findPort } from "./portsAction";

test("findPort", () => {
  const mockPorts = [
    {
      code: "ABC",
      name: "L Airport",
      location: "Miami",
    },
    {
      code: "DEF",
      name: "K Airport",
      location: "LA",
    },
  ];

  const findMockPort = findPort(mockPorts);

  expect(findMockPort({ code: "x" })).toEqual(undefined);

  expect(findMockPort({ code: "ABC" })).toEqual(mockPorts[0]);
  expect(findMockPort({ name: "L Airport" })).toEqual(mockPorts[0]);
  expect(findMockPort({ location: "Miami" })).toEqual(mockPorts[0]);

  expect(findMockPort({ code: "DEF" })).toEqual(mockPorts[1]);
});
