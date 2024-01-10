/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store/store.js";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

// Use Vuex store
app.use(store);

registerPlugins(app);

app.mount("#app");
