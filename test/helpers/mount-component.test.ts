import { expect, test, vi } from "vitest";
import { render } from "vue";
import mount from "../../src/helpers/mount-component";
import { Toaster } from "../../src/index";

test("mount mounts a Vue component", () => {
    expect(mount(Toaster, {
        props: {message: "some message"}
    })).toBeDefined();
});

test("mount return a destroy function", () => {
    const {destroy} = mount(Toaster, {
        props: {message: "some message"}
    });
    expect(destroy).toBeDefined();
    expect(destroy).toBeInstanceOf(Function);
});

test("mount return a vnode", () => {
    const props = {message: "some message"};
    const {vNode} = mount(Toaster, {
        props
    });
    expect(vNode).toBeDefined();
    expect(vNode.props).toHaveProperty("message", props.message);
});

test("destroy call render with null to empty element", () => {
    const mounted = mount(Toaster, {
        props: {message: "some message"}
    });
    vi.mock('vue', async (importOriginal: () => Promise<object>) => {
        const mod = await importOriginal();
        return {
          ...mod,
          // replace some exports
          render: vi.fn(),
        };
      })
    expect(mounted.destroy()).toBeUndefined();
    expect(render).toHaveBeenCalled();
    expect(render).toHaveBeenCalledWith(null, mounted.el);
});