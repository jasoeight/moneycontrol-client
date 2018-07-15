<template>
    <v-card>
        <v-card-title class="primary white--text py-1 px-2">
            <h2>Search</h2>
            <v-spacer />
            <v-btn
                small
                @click="showSearchForm = !showSearchForm"
            >
                <v-icon>{{ showSearchForm ? 'expand_less' : 'expand_more' }}</v-icon>
            </v-btn>
        </v-card-title>
        <transaction-search-form
            v-if="showSearchForm"
            @search="onSearch"
        />
        <v-card-title class="primary white--text py-1 px-2">
            <h2>Results</h2>
            <v-spacer />
            <v-btn
                small
                @click="$emit('add')"
            >
                <v-icon>add</v-icon> Add
            </v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="items"
            :pagination.sync="pagination"
            :total-items="totalItems"
            :loading="loading"
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.user.name }}</td>
                <td>{{ props.item.account.name }}</td>
                <td>{{ formattedDate(props.item.date) }}</td>
                <td>{{ formattedType(props.item.type) }}</td>
                <td>{{ props.item.description }}</td>
                <td class="text-xs-right">{{ formattedAmount(props.item.amount) }}</td>
                <td>{{ formattedTags(props.item.tags) }}</td>
                <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="onEdit(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="onDelete(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
            <template slot="no-data">
                <v-alert :value="!loading" color="error" icon="warning">
                    Sorry, nothing to display here
                </v-alert>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { transactionsMethods } from '@/store/helpers/transactions';
import dfParse from 'date-fns/parse';
import _upperFirst from 'lodash/upperFirst';
export default {
    components: {
        TransactionSearchForm: () => import('./SearchForm.vue')
    },
    data () {
        return {
            showSearchForm: false,
            search: {},
            totalItems: 0,
            items: [],
            loading: true,
            pagination: {
                sortBy: 'date',
                descending: true,
                page: 1,
                rowsPerPage: 10
            },
            headers: [
                {
                    text: 'User',
                    sortable: true,
                    value: 'user'
                },
                {
                    text: 'Account',
                    sortable: true,
                    value: 'account'
                },
                {
                    text: 'Date',
                    sortable: true,
                    value: 'date'
                },
                {
                    text: 'Type',
                    sortable: true,
                    value: 'type'
                },
                {
                    text: 'Description',
                    sortable: true,
                    value: 'description'
                },
                {
                    text: 'Amount',
                    sortable: true,
                    value: 'amount'
                },
                {
                    text: 'Tags',
                    sortable: false,
                    value: 'tags'
                },
                {
                    text: 'Actions',
                    sortable: false,
                    value: '_id'
                }
            ]
        }
    },
    watch: {
        pagination: {
            handler: 'load',
            deep: true
        }
    },
    methods: {
        ...transactionsMethods,
        onSearch(searchForm) {
            let search = {};
            Object.keys(searchForm).forEach(key => {
                if (
                    searchForm[key] === '' ||
                    (searchForm[key] instanceof Array && searchForm[key].length === 0)
                 ) {
                    return;
                }

                search[key] = searchForm[key];
            });
            this.search = search;
            this.pagination.page = 1;
            this.load();
        },
        load() {
            this.loading = true;
            const { sortBy, descending, page, rowsPerPage } = this.pagination;
            this.fetchAllTransactions({
                sortBy,
                sortDir: descending ? 'desc' : 'asc',
                page,
                limit: rowsPerPage,
                search: this.search
            })
                .then(({ data }) => {
                    this.loadFinished(data.rows, data.count);
                })
                .catch(() => {
                    this.loadFinished([], 0);
                });
        },
        loadFinished(data, total) {
            this.items = data;
            this.totalItems = total;
            this.loading = false;
        },
        formattedDate(date) {
            date = dfParse(date);
            return date.toLocaleDateString('de-DE', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        formattedType(type) {
            return _upperFirst(type);
        },
        formattedAmount(amount) {
            return new Intl.NumberFormat('de-DE', { 
                style: 'currency',
                currency: 'EUR'
            }).format(amount);
        },
        formattedTags(tags) {
            return tags.join(', ');
        },
        onEdit(item) {
            this.$emit('edit', item);
        },
        onDelete({ _id }) {
            this.deleteTransaction(_id).then(this.load);
        }
    }
};
</script>
