import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import $ from "jquery";
window.$ = window.jQuery = $;
createApp(App).mount('#app')
