import api from '@/store/helpers/api';
import _pick from 'lodash/pick';
const API_PATH = 'accounts';

export const state = {};
export const getters = {};
export const mutations = {};

export const actions = {
    fetchAllAccounts({ rootGetters }, params = {}) {
        return api(rootGetters).get(API_PATH, { params });
    },
    fetchOneAccount({ rootGetters }, id) {
        return api(rootGetters).get(`${API_PATH}/${id}`);
    },
    deleteAccount({ rootGetters }, id) {
        return api(rootGetters).delete(`${API_PATH}/${id}`);
    },
    saveAccount({ rootGetters }, account) {
        const id = account._id;
        account = _pick(account, ['name']);

        if (id) {
            return api(rootGetters).put(`${API_PATH}/${id}`, account);
        }
        return api(rootGetters).post(`${API_PATH}`, account);
    }
};
