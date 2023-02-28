import {definePosition, Position} from "../../src/defaults/positions";
import { describe, expect, test } from 'vitest'

describe.each([
  { position: "top", expected: "p1" },
  { position: "top-right", expected: "p1" },
  { position: "top-left", expected: "p1" },
  { position: "bottom", expected: "p2" },
  { position: "bottom-right", expected: "p2" },
  { position: "bottom-left", expected: "p2" },
])('definePosition($a, $b)', ({ position, expected }) => {
  test(`returns ${expected}`, () => {
    expect(definePosition(position as Position, "p1", "p2")).toBe(expected);
  });
});