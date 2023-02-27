import Toaster from './Toaster.vue';
import mount from './helpers/mount-component';
import emitter from './helpers/event-bus';
import type { Position } from './defaults/positions';

type type = "success" | "info" | "warning" | "error";

type options = {
  message?: string,
  type?: type,
  position?: Position,
  duration?: number | false,
}

function api(globalOptions : options = {}) {
  return {
    show(message: string, options : options = {}) {
      let localOptions = { message, ...options };
      const c = mount(Toaster, {
        props: { ...globalOptions, ...localOptions },
      });
      return c;
    },
    clear() {
      emitter.emit('toast-clear');
    },
    success(message: string, options : options = {}) {
      options.type = 'success';
      return this.show(message, options);
    },
    error(message: string, options : options = {}) {
      options.type = 'error';
      return this.show(message, options);
    },
    info(message: string, options : options = {}) {
      options.type = 'info';
      return this.show(message, options);
    },
    warning(message: string, options : options = {}) {
      options.type = 'warning';
      return this.show(message, options);
    }
  }
}

export default api;