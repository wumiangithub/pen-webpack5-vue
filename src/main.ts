import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { d } from './test';

const app = createApp(App);
app.use(router).mount('#app'); //注释都没了吗  extractComments不识别
/* 
我是一个小注释  extractComments不识别
*/

/*!
 * 注释     extractComments识别
 * @license MIT
 */
console.log(process.env);
console.log(process.env.NODE_ENV);
