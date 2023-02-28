import { expect, test, vi } from "vitest";
import Timer from "../../src/helpers/timer";

const callback = () => {};
const delay = 1000;

test("it can be constructed", () => {
    const timer = new Timer(callback, delay);
    expect(timer).toBeInstanceOf(Timer);
});


test("constructor calls setTimeout", () => {
    const spy = vi.spyOn(window, "setTimeout");
    new Timer(callback, delay);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(callback, delay);
});

test("can be paused", () => {
    const spy = vi.spyOn(window, "clearTimeout");
    const timer = new Timer(callback, delay);

    expect(timer.pause).toBeDefined();
    timer.pause();
    expect(spy).toHaveBeenCalled();
});

test("can be resumed after pause", () => {
    const spy = vi.spyOn(window, "clearTimeout");
    const spySet = vi.spyOn(window, "setTimeout");
    const timer = new Timer(callback, delay);

    expect(timer.pause).toBeDefined();
    timer.pause();
    timer.resume();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spySet).toHaveBeenCalledTimes(2);
});

test("can be resumed without pause", () => {
    const spy = vi.spyOn(window, "clearTimeout");
    const timer = new Timer(callback, delay);
    const spyPause = vi.spyOn(timer, "pause");

    expect(timer.resume).toBeDefined();
    timer.resume();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyPause).not.toHaveBeenCalled();
});

test("can be stopped", () => {
    const spy = vi.spyOn(window, "clearTimeout");
    const timer = new Timer(callback, delay);

    expect(timer.stop).toBeDefined();
    timer.stop();
    expect(spy).toHaveBeenCalled();
});