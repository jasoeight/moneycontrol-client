import api from '@/store/helpers/api';
import _pick from 'lodash/pick';
const API_PATH = 'transactions';

export const state = {};
export const getters = {};
export const mutations = {};

export const actions = {
    fetchAllTags({ rootGetters }) {
        return api(rootGetters).get(`${API_PATH}/tags`);
    },
    fetchStatsAccount({ rootGetters }) {
        return api(rootGetters).get(`${API_PATH}/stats/account`);
    },
    fetchStatsUser({ rootGetters }) {
        return api(rootGetters).get(`${API_PATH}/stats/user`);
    },
    fetchAllTransactions({ rootGetters }, params = {}) {
        return api(rootGetters).get(API_PATH, { params });
    },
    fetchOneTransaction({ rootGetters }, id) {
        return api(rootGetters).get(`${API_PATH}/${id}`);
    },
    deleteTransaction({ rootGetters }, id) {
        return api(rootGetters).delete(`${API_PATH}/${id}`);
    },
    saveTransaction({ rootGetters }, transaction) {
        const id = transaction._id;
        transaction = _pick(transaction, [
            'accountId',
            'userId',
            'description',
            'amount',
            'date',
            'tags',
            'type'
        ]);

        if (id) {
            return api(rootGetters).put(`${API_PATH}/${id}`, transaction);
        }

        return api(rootGetters).post(`${API_PATH}`, transaction);
    }
};
