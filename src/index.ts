import Toaster from './Toaster.vue';
import createToaster from './api.js';
import Positions from './defaults/positions.js';
import type { App } from 'vue';

import './themes/default/index.css';
import './themes/default/colors.css';
import './themes/default/toast.css';

export default {
  install: (app : App, options = {}) => {
    let methods = createToaster(options);
    app.config.globalProperties.$toast = methods;
    app.provide('toast', methods);
  }
};

export { Toaster, Positions, createToaster };
