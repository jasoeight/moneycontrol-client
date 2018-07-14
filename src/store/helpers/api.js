import axios from 'axios';

export default function(getters, options = {}) {
    let params = {
        baseURL: process.env.VUE_APP_MONEY_CONTROL_API,
        timeout: options.timout || 10000
    };

    if (getters) {
        params.headers = {
            'x-auth-token': getters['user/userToken']
        };
    }

    return axios.create(params);
};
