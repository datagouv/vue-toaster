import { expect, test, vi } from "vitest";
import { removeElement } from "../../src/helpers/remove-element";

test("it calls remove function on element", () => {
    expect(removeElement).toBeDefined();
    const el = document.createElement("div");
    const spy = vi.spyOn(el, "remove");
    removeElement(el);
    expect(spy).toBeCalled();
});

test("it calls removeChild from parent when remove function is undefined", () => {
    expect(removeElement).toBeDefined();
    const el = document.createElement("div");
    // @ts-expect-error
    el.remove = undefined;
    const parent = document.createElement("div");
    parent.appendChild(el);
    const spy = vi.spyOn(parent, "removeChild");
    removeElement(el);
    expect(spy).toBeCalled();
});