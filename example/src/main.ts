import { createApp } from 'vue';
import App from './App.vue';

import Toaster from '@conciergerie.dev/vue-toaster';

createApp(App).use(Toaster).mount('#app');
