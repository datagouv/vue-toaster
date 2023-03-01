<template>
  <div class="hello">
    <Spacing :bottom="0.25">
      <h1>{{ title }}</h1>
      <p>Click a button to show a Toast</p>
    </Spacing>
    <div class="c-grid">
      <Button class="v--default" @click="toast">Default</Button>
      <Button class="v--success" @click="toast('success')">Success</Button>
      <Button class="v--info" @click="toast('info')">Info</Button>
      <Button class="v--warning" @click="toast('warning')">Warning</Button>
      <Button class="v--error" @click="toast('error')">Error</Button>
    </div>
    <Spacing :vertical="0.25">
      <h2>Do your changes</h2>
      <Spacing :vertical="0.125">
        <div class="c-two-columns">
          <div>
            <fieldset>
              <label class="c-label" for="message">Message</label>
              <input id="message" v-model="message" type="text" />
            </fieldset>
            <fieldset>
              <label class="c-label">Position</label>
              <label
                v-for="position in positions"
                :key="position.key"
                class="c-label"
              >
                <input
                  name="position"
                  type="radio"
                  :value="position.value"
                  v-model="options.position"
                  @change="() => toast()"
                />{{ position.name }}
              </label>
            </fieldset>
            <fieldset>
              <label class="c-label">
                Duration: {{ options.duration
                }}{{ options.duration ? 'ms' : '' }}
              </label>
              <input
                type="range"
                min="1000"
                max="10000"
                v-model="options.duration"
                :disabled="options.duration === false"
              />
              <label class="c-label">
                <input type="checkbox" @change="changeDuration" />
                Disable duration
              </label>
            </fieldset>
            <fieldset>
              <label class="c-label">
                <input
                  type="checkbox"
                  checked
                  @change="options.dismissible = (<HTMLInputElement>$event.target).checked"
                />
                Dismissible on click
              </label>
            </fieldset>
            <fieldset>
              <label class="c-label">
                <input
                  type="checkbox"
                  @change="options.queue = (<HTMLInputElement>$event.target).checked"
                />
                Enqueue
              </label>
            </fieldset>
            <fieldset>
              <label class="c-label"> Max Toasts</label>
              <input
                type="number"
                v-model="options.maxToasts"
                placeholder="false"
              />
            </fieldset>
            <fieldset>
              <label class="c-label">
                <input
                  type="checkbox"
                  checked
                  @change="options.pauseOnHover = (<HTMLInputElement>$event.target).checked"
                />
                Pause on hover
              </label>
            </fieldset>
            <fieldset>
              <label class="c-label">
                <input
                  type="checkbox"
                  checked
                  @change="options.useDefaultCss = (<HTMLInputElement>$event.target).checked"
                />
                Use default CSS
              </label>
            </fieldset>
          </div>
          <div class="c-column-right">
            <div class="c-code">
              <code>this.$toast(</code>
              <Spacing :left="0.125">
                <code class="c-code--string">"{{ message }}"</code>
                <code v-if="hasOptions">,</code>
              </Spacing>
              <Spacing v-if="hasOptions" :left="0.125">
                <code>{</code>
                <Spacing :left="0.25">
                  <span class="c-code--object-line" v-if="options.type">
                    <code>type:</code>
                    <code class="c-code--string">{{ options.type }}</code>
                  </span>
                  <span class="c-code--object-line" v-if="options.position">
                    <code>position:</code>
                    <code class="c-code--string">"{{ options.position }}"</code>
                  </span>
                  <span
                    class="c-code--object-line"
                    v-if="options.duration !== 4000"
                  >
                    <code>duration:</code>
                    <code class="c-code--number">{{ options.duration }}</code>
                  </span>

                  <span
                    class="c-code--object-line"
                    v-if="options.dismissible === false"
                  >
                    <code>dismissible:</code>
                    <code class="c-code--number">{{
                      options.dismissible
                    }}</code>
                  </span>

                  <span class="c-code--object-line" v-if="options.queue">
                    <code>queue:</code>
                    <code class="c-code--number">{{ options.queue }}</code>
                  </span>

                  <span
                    class="c-code--object-line"
                    v-if="options.maxToasts || options.maxToasts === 0"
                  >
                    <code>max:</code>
                    <code class="c-code--number">{{ options.maxToasts }}</code>
                  </span>

                  <span
                    class="c-code--object-line"
                    v-if="options.pauseOnHover === false"
                  >
                    <code>pauseOnHover:</code>
                    <code class="c-code--number">{{
                      options.pauseOnHover
                    }}</code>
                  </span>

                  <span
                    class="c-code--object-line"
                    v-if="options.useDefaultCss === false"
                  >
                    <code>useDefaultCss:</code>
                    <code class="c-code--number">{{
                      options.useDefaultCss
                    }}</code>
                  </span>
                </Spacing>
                <code>}</code>
              </Spacing>
              <code>)</code>
            </div>
            <Button @click="toast" class="v--default">Show it</Button>
            <Button @click="clear" class="v--error">Clear toasts</Button>
          </div>
        </div>
      </Spacing>
    </Spacing>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import Spacing from './Spacing.vue';
import { createToaster, Positions } from '../../../src/index';
import type { Options, Type } from '../../../src/index';
import { computed, reactive, ref } from 'vue';

const props = defineProps<{
  title?: string,
}>();

const message = ref(`Hi! I'm a Toast`);

const options = reactive<Options>({
  duration: 4000,
});

const toaster = createToaster();

const positions = computed(() => {
  return Object.keys(Positions).map((key) => {
    return {
      key,
      value: Positions[key],
      name: Positions[key].replace(/-/, ' ')
    }
  })
});

const hasOptions = computed(() => {
  return (Object.keys(options).length > 1 || options.duration !== 4000)
});

function clear() {
  toaster.clear();
}

function toast(type: Type = 'default', dismissible = true) {
  const localOptions: Options = {
    dismissible,
    onClick,
  };

  typeof type === 'string' && (localOptions.type = type);

  typeof options.maxToasts === 'string' &&
    (options.maxToasts = parseInt(options.maxToasts));

  toaster.show(message.value, {
    ...localOptions,
    ...options
  });
}

function changeDuration(e: Event) {
  const target = (<HTMLInputElement>e.target)
  options.duration = !target.checked ? 4000 : false
}

function onClick(e: string) {
  console.log(e);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 2.5rem 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 0.2rem ;
}
a {
  color: #42b983;
}
.c-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  max-width: 50rem;
  width: 100%;
  margin: 0 auto;
}

input {
  border: 1px solid transparent;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  outline: none;
  border-radius: 0.5rem;
  background-color: #f3f3f4;
  width: 100%;
}

input[type='range'] {
  padding: 0;
}
input[type='radio'],
input[type='checkbox'] {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
}

.c-two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
  max-width: 53rem;
  margin: 0 auto;
}

fieldset {
  text-align: left;
  border: none;
  padding: 0;
}

fieldset:not(:last-child) {
  margin-bottom: 1.2rem;
}

.c-label {
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  text-transform: capitalize;
}

.c-code {
  background-color: #252526;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1.2rem;
  padding: 1rem;
  text-align: left;
  width: 350px;
  overflow: auto;
}

.c-code--string {
  color: #ce9178;
}

.c-code--object-line {
  display: flex;
}
.c-code--object-line:not(:last-child)::after {
  content: ',';
  font-family: monospace;
  display: inline-block;
}
.c-code--object-line > code:last-child {
  margin-left: 0.5rem;
}

.c-code--number {
  color: #b5cea8;
}

.c-column-right {
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;
  margin-left: 2rem;
}
</style>
