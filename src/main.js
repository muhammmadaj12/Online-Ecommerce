/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import store from "@/store/store.js";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

// Use Vuex store
// app.use(store);

app.use(store);

registerPlugins(app);

app.mount("#app");
