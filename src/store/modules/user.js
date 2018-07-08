import api from '@/store/helpers/api';
import _isEmpty from 'lodash/isEmpty';
const API_PATH = 'auth';

export const state = {
    currentUser: {}
};

export const mutations = {
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
        return user;
    }
};

export const getters = {
    isLoggedIn: state => !_isEmpty(state.currentUser),
    currentUser: state => state.currentUser,
    userToken: state => state.currentUser.token
};

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    init({ state }) {},

    logIn({ commit }, payload) {
        return api()
            .post(API_PATH, payload)
            .then(({ data }) => {
                commit('SET_CURRENT_USER', data);
                return true;
            });
    },

    refresh({ commit }, user) {
        return commit('SET_CURRENT_USER', user);
    },

    logOut({ commit }) {
        return commit('SET_CURRENT_USER', {});
    }
};
