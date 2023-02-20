import { render, h } from 'vue';
import type { App, Component, VNode } from "vue";

const createElement = () =>
  typeof document !== 'undefined' && document.createElement('div');

const mount = (component: Component, { props, children, element, app } :{props?: object, children?: undefined, element?: Element, app?: App} = {}) => {
  let el : Element | false | null = element ? element : createElement();

  let vNode : VNode | null = h(component, props, children);
  if (app && app._context) {
    vNode.appContext = app._context;
  }

  if(el) {
    render(vNode, el);
  }

  const destroy = () => {
    if (el) {
      render(null, el);
    }
    el = null;
    vNode = null;
  };

  return { vNode, destroy, el };
};

export default mount;
