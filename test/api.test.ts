import { expect, test, vi } from "vitest";
import { createApp } from "vue";
import api from "../src/api";

test("api is a function", () => {
    expect(api).toBeDefined();
    expect(api).toBeInstanceOf(Function);
});

test("api return an object of function", () => {
    vi.mock("../src/helpers/mount-component");
    const object = api();
    expect(object).toBeDefined();
    expect(object).toBeInstanceOf(Object);
});