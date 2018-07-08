import api from '@/store/helpers/api';
import _pick from 'lodash/pick';
const API_PATH = 'users';

export const state = {};
export const getters = {};
export const mutations = {};

export const actions = {
    fetchAllUsers({ rootGetters }, params = {}) {
        return api(rootGetters).get(API_PATH, { params });
    },
    deleteUser({ rootGetters }, id) {
        return api(rootGetters).delete(`${API_PATH}/${id}`);
    },
    saveUser({ rootGetters }, user) {
        const id = user._id;
        user = _pick(user, ['name', 'email', 'password', 'all']);

        if (id) {
            return api(rootGetters).put(`${API_PATH}/${id}`, user);
        }
        return api(rootGetters).post(`${API_PATH}`, user);
    }
};
