import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { d } from './test';

const app = createApp(App);
app.use(router).mount('#app');
console.log(process.env);
console.log(process.env.NODE_ENV);
