import api from '@/store/helpers/api';
import _pick from 'lodash/pick';
const API_PATH = 'accounts';

export const state = {};
export const getters = {};
export const mutations = {};

export const actions = {
    fetchAllAccounts(context, params = {}) {
        return api().get(API_PATH, { params });
    },
    fetchOneAccount(context, id) {
        return api().get(`${API_PATH}/${id}`);
    },
    deleteAccount(context, id) {
        return api().delete(`${API_PATH}/${id}`);
    },
    saveAccount(context, account) {
        const id = account._id;
        account = _pick(account, ['name']);

        if (id) {
            return api().put(`${API_PATH}/${id}`, account);
        }
        return api().post(`${API_PATH}`, account);
    }
};
