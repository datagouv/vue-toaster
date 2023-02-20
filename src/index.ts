import Toaster from './Toaster.vue';
import createToaster from './api.js';
import Positions from './defaults/positions.js';

import './themes/default/index.css';
import './themes/default/colors.css';
import './themes/default/toast.css';

export default {
  install: (app, options = {}) => {
    let methods = createToaster(options);
    app.config.globalProperties.$toast = methods;
    app.provide('toast', methods);
  }
};

export { Toaster, Positions, createToaster };
