import { createApp } from "vue";
import { createPinia } from "pinia";
import App from '@/app.vue';
import router from '@/router';
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');