import { mapActions } from 'vuex';
/**
 * export all helpers for accounts
 */
export const accountsMethods = mapActions('accounts', [
    'saveAccount',
    'deleteAccount',
    'fetchAllAccounts',
    'fetchOneAccount'
]);
