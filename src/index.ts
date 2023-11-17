import Toaster from './Toaster.vue';
import createToaster from './api';
import Positions from './defaults/positions';
import type { App, Plugin } from 'vue';
import type { Position } from './defaults/positions';
import type { Options, Type } from './api';

import './themes/default/index.css';
import './themes/default/colors.css';
import './themes/default/toast.css';

export const plugin: Plugin = {
  install: (app: App, options: Options = {}) => {
    let methods = createToaster(options);
    app.config.globalProperties.$toast = methods;
    app.provide('toast', methods);
  }
};

export default plugin;

export { Toaster, Positions, createToaster };
export type { Options, Position, Type };