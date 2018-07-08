import Vue from 'vue';
import VueNotifications from 'vue-notifications';
import iziToast from 'izitoast';

function toast({ title, message, type, timeout, cb }) {
    if (type === VueNotifications.types.warn) {
        type = 'warning';
    }
    return iziToast[type]({ title, message, timeout });
}

Vue.use(VueNotifications, {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
});
