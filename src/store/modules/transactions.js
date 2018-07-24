import api from '@/store/helpers/api';
import _pick from 'lodash/pick';
const API_PATH = 'transactions';

export const state = {};
export const getters = {};
export const mutations = {};

export const actions = {
    fetchAllTags() {
        return api().get(`${API_PATH}/tags`);
    },
    fetchStatsAccount() {
        return api().get(`${API_PATH}/stats/account`);
    },
    fetchStatsUser() {
        return api().get(`${API_PATH}/stats/user`);
    },
    fetchAllTransactions(context, params = {}) {
        return api().get(API_PATH, { params });
    },
    fetchOneTransaction(context, id) {
        return api().get(`${API_PATH}/${id}`);
    },
    deleteTransaction(context, id) {
        return api().delete(`${API_PATH}/${id}`);
    },
    saveTransaction(context, transaction) {
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
            return api().put(`${API_PATH}/${id}`, transaction);
        }

        return api().post(`${API_PATH}`, transaction);
    }
};
