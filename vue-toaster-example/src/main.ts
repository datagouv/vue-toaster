import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Toaster from "../../src/";

createApp(App).use(Toaster).mount('#app')
