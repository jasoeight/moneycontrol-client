import axios from 'axios';
import store from '@/store';

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

export default function(options = {}) {
    let params = {
        baseURL: process.env.VUE_APP_MONEY_CONTROL_API,
        timeout: options.timout || 10000
    };

    function onAccessTokenFetched(accessToken) {
        subscribers = subscribers.filter(callback => callback(accessToken));
    }

    function addSubscriber(callback) {
        subscribers.push(callback);
    }

    if (store.getters['user/isLoggedIn']) {
        params.headers = {
            'x-auth-token': store.getters['user/userToken']
        };
    }

    const instance = axios.create(params);

    instance.interceptors.response.use(function(response) {
        return response;
    }, function(error) {
        const { config, response: { status } } = error;
        const originalRequest = config;

        if (status === 401) {
            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true;
                store.dispatch('user/refreshToken').then(data => {
                    isAlreadyFetchingAccessToken = false;
                    onAccessTokenFetched(data.token);
                });
            }

            const retryOriginalRequest = new Promise((resolve) => {
                addSubscriber(accessToken => {
                    originalRequest.headers['x-auth-token'] = accessToken;
                    resolve(axios(originalRequest));
                });
            });

            return retryOriginalRequest;
        }
        return Promise.reject(error);
    });

    return instance;
};
