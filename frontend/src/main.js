import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import $ from "jquery";
window.$ = window.jQuery = $;
createApp(App).use(router).mount("#app");
