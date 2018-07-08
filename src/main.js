import '@babel/polyfill';
import Vue from 'vue';
import Dialog from 'vuejs-dialog';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins';
import './layouts';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Dialog);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
