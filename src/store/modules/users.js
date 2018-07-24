import api from '@/store/helpers/api';
import _pick from 'lodash/pick';
const API_PATH = 'users';

export const state = {};
export const getters = {};
export const mutations = {};

export const actions = {
    fetchAllUsers(context, params = {}) {
        return api().get(API_PATH, { params });
    },
    deleteUser(context, id) {
        return api().delete(`${API_PATH}/${id}`);
    },
    saveUser(context, user) {
        const id = user._id;
        user = _pick(user, ['name', 'email', 'password', 'all']);

        if (id) {
            return api().put(`${API_PATH}/${id}`, user);
        }
        return api().post(`${API_PATH}`, user);
    }
};
