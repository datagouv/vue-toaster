import { expect, test, vi } from "vitest";
import { Toaster } from "../src";
import createToaster from "../src/api";
import bus from '../src/helpers/event-bus';
import mount from '../src/helpers/mount-component';

vi.mock("../src/helpers/event-bus");
vi.mock("../src/helpers/mount-component");

test("createToaster is a function", () => {
    expect(createToaster).toBeDefined();
    expect(createToaster).toBeInstanceOf(Function);
});

test("createToaster return an object of function", () => {
    const object = createToaster();
    expect(object).toBeDefined();
    expect(object).toBeInstanceOf(Object);
});

test("show mounts toaster with default options", () => {
    const api = createToaster();
    const message = "some message";
    api.show(message);
    expect(mount).toHaveBeenCalled();
    expect(mount).toHaveBeenCalledTimes(1);
    expect(mount).toHaveBeenCalledWith(Toaster, {
        props: {message}
    });
});

test("show mounts toaster with options", () => {
    const message = "some message";
    const duration = 500;
    const position = "bottom";
    const api = createToaster({duration});
    api.show(message, {position});
    expect(mount).toHaveBeenCalled();
    expect(mount).toHaveBeenCalledTimes(1);
    expect(mount).toHaveBeenCalledWith(Toaster, {
        props: {duration, message, position}
    });
});

test("clear calls emitter", () => {
    const api = createToaster();
    api.clear();
    expect(bus.emit).toHaveBeenCalled();
    expect(bus.emit).toHaveBeenCalledTimes(1);
    expect(bus.emit).toHaveBeenCalledWith('toast-clear');
});

test("success passes options to show", () => {
    const message = "some message";
    const duration = 500;
    const position = "bottom";
    const api = createToaster({duration});
    const spy = vi.spyOn(api, "show");
    api.success(message, {position})
    expect(spy).toHaveBeenCalledWith(message, {position, type: "success"});
});

test("error passes options to show", () => {
    const message = "some message";
    const position = "bottom";
    const api = createToaster();
    const spy = vi.spyOn(api, "show");
    api.error(message, {position})
    expect(spy).toHaveBeenCalledWith(message, {position, type: "error"});
});

test("info passes options to show", () => {
    const message = "some message";
    const position = "bottom";
    const api = createToaster();
    const spy = vi.spyOn(api, "show");
    api.info(message, {position})
    expect(spy).toHaveBeenCalledWith(message, {position, type: "info"});
});

test("warning passes options to show", () => {
    const message = "some message";
    const position = "bottom";
    const api = createToaster();
    const spy = vi.spyOn(api, "show");
    api.warning(message, {position})
    expect(spy).toHaveBeenCalledWith(message, {position, type: "warning"});
});