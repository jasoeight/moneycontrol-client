import { mapActions } from 'vuex';
/**
 * export all helpers for transactions
 */
export const transactionsMethods = mapActions('transactions', [
    'saveTransaction',
    'deleteTransaction',
    'fetchAllTransactions',
    'fetchOneTransaction',
    'fetchAllTags',
    'fetchStatsAccount',
    'fetchStatsOwner'
]);
