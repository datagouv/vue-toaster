<template>
  <transition :enter-active-class="transition.enter" :leave-active-class="transition.leave" ref="el">
    <div 
      v-show="isActive"
      :class="['c-toast', `c-toast--${type}`, `c-toast--${position}`]"
      @mouseover="toggleTimer(true)"
      @mouseleave="toggleTimer(false)"
      @click="click"
      role="alert"
      v-html="message"
    ></div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
import Positions, { definePosition } from './defaults/positions';
import { removeElement } from './helpers/remove-element';
import Timer from './helpers/timer';
import emitter from './helpers/event-bus';
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'default',
  },
  position: {
    type: String,
    default: Positions.BOTTOM_RIGHT,
    validator(value: string) {
      return Object.values(Positions).includes(value);
    },
  },
  maxToasts: {
    type: [Number, Boolean],
    default: false,
  },
  duration: {
    type: [Number, Boolean],
    default: 4000,
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
  queue: {
    type: Boolean,
    default: false,
  },
  props: {
    type: Boolean,
    default: true,
  },
  useDefaultCss: {
    type: Boolean,
    default: true,
  },
  onClose: {
    type: Function,
    default: () => { },
  },
  onClick: {
    type: Function,
    default: () => { },
  }
})
let parentTop : Element | null = null;
let parentBottom : Element | null = null;
let timer : Timer | null = null;
let queueTimer : number | undefined;
const el = ref(null);
const isActive = ref(false);
const isHovered = ref(false);

onBeforeMount(() => {
  createParents();
  setDefaultCss();
  setupContainer();
});

onMounted(() => {
  showNotice();
  emitter.on('toast-clear', close);
});

function createParents() {
  parentTop = document.querySelector('.c-toast-container--top');
  parentBottom = document.querySelector('.c-toast-container--bottom');
  if (parentTop && parentBottom) return;

  if (!parentTop) {
    parentTop = document.createElement('div');
    parentTop.className = 'c-toast-container c-toast-container--top';
  }

  if (!parentBottom) {
    parentBottom = document.createElement('div');
    parentBottom.className = 'c-toast-container c-toast-container--bottom';
  }
}

function setDefaultCss() {
  const type = props.useDefaultCss ? 'add' : 'remove';
  if(parentTop) {
    parentTop.classList[type]('v--default-css');
  }
  if(parentBottom) {
    parentBottom.classList[type]('v--default-css');
  }
}

function setupContainer() {
  const container = document.body;
  if(parentTop) {
    container.appendChild(parentTop);
  }
  if(parentBottom) {
    container.appendChild(parentBottom);
  }
}

function shouldQueue() {
  if (!props.queue && props.maxToasts === false) {
    return false;
  }
  let parentTopChildElementCount = 0;
  if(parentTop) {
    parentTopChildElementCount = parentTop.childElementCount;
  }
  let parentBottomChildElementCount = 0;
  if(parentBottom) {
    parentBottomChildElementCount = parentBottom.childElementCount;
  }
  if (props.maxToasts !== false) {
    return (
      props.maxToasts <=
      parentTopChildElementCount + parentBottomChildElementCount
    );
  }
  return (
    parentTopChildElementCount > 0 ||
    parentBottomChildElementCount > 0
  );
}

function showNotice() {
  if (shouldQueue()) {
    queueTimer = window.setTimeout(showNotice, 250);
    return;
  }
  correctParent().insertAdjacentElement('afterbegin', el.value);
  isActive.value = true;
  timer = props.duration !== false ? new Timer(close, props.duration) : null;
}

function click() {
  props.onClick.apply(null, arguments);
  if (props.dismissible) {
    close();
  }
}

function toggleTimer(newVal: boolean) {
  if (timer) {
    newVal ? timer.pause() : timer.resume();
  }
}

function stopTimer() {
  timer && timer.stop();
  clearTimeout(queueTimer);
}

function close() {
  stopTimer();
  isActive.value = false;
  setTimeout(() => {
    props.onClose.apply(null, arguments);
    removeElement(el.value);
  }, 150);
}

function correctParent() {
  return definePosition(props.position, parentTop, parentBottom);
}

const transition = computed(() => {
  return definePosition(
    props.position,
    {
      enter: 'fadeInDown',
      leave: 'fadeOut',
    },
    {
      enter: 'fadeInUp',
      leave: 'fadeOut',
    }
  );
});

onBeforeUnmount(() => {
  emitter.off('toast-clear', close);
});
</script>
