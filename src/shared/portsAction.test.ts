import { findPort, getPortOverlaps } from "./portsAction";
import { Port } from "./types";

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

describe("getPortOverlaps", () => {
  test("Should overlap code and name", () => {
    const portA: Port = {
      code: "CC",
      name: "Hello",
      location: "here",
    };

    const portB: Port = {
      code: "CC",
      name: "Hello",
      location: "there",
    };

    const getPortAOverlaps = getPortOverlaps(portA);

    expect(getPortAOverlaps([], portB)).toEqual(["code", "name"]);
  });

  test("Should have no overlaps", () => {
    const portA: Port = {
      code: "PA",
      name: "a",
      location: "here",
    };

    const portB: Port = {
      code: "PB",
      name: "b",
      location: "there",
    };

    const getPortAOverlaps = getPortOverlaps(portA);

    expect(getPortAOverlaps([], portB)).toEqual([]);
  });
});
