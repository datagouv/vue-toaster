import { expect, test, vi } from "vitest";
import { createApp } from "vue";
import Plugin, { Toaster } from "../src/index";

test("Plugin has install method", () => {
    expect(Plugin.install).toBeDefined();
    expect(Plugin.install).toBeInstanceOf(Function);
});

test("Plugin can be installed", () => {
    vi.mock("../src/api");
    const app = createApp(Toaster);
    Plugin.install(app);
    expect(Plugin.install).toBeDefined();
    expect(Plugin.install).toBeInstanceOf(Function);
});