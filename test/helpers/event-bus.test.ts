import { expect, test } from "vitest";
import eventBus from "../../src/helpers/event-bus";

test("it returns an event bus", () => {
    expect(eventBus).toBeDefined();
});