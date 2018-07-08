<template>
    <v-card>
        <v-card-title>
            <v-spacer />
            <v-btn
                small
                color="primary"
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
                <td>{{ props.item.name }}</td>
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
import { accountsMethods } from '@/store/helpers/accounts';
import { transactionsMethods } from '@/store/helpers/transactions';
export default {
    data () {
        return {
            totalItems: 0,
            items: [],
            loading: true,
            pagination: {
                sortBy: 'name',
                descending: true,
                page: 1,
                rowsPerPage: 10
            },
            headers: [
                {
                    text: 'Name',
                    sortable: true,
                    value: 'name'
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
        ...accountsMethods,
        ...transactionsMethods,
        load() {
            this.loading = true;
            const { sortBy, descending, page, rowsPerPage } = this.pagination;
            this.fetchAllAccounts({
                sortBy,
                sortDir: descending ? 'desc' : 'asc',
                page,
                limit: rowsPerPage
            })
                .then(({ data }) => {
                    this.loadFinished(data.docs, data.total);
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
        onEdit(item) {
            this.$emit('edit', item);
        },
        onDelete({ _id }) {
            this.hasNoTransactions(_id)
                .then(() => {
                    this.deleteAccount(_id).then(this.load);
                })
                .catch(() => {
                    this.$dialog.alert(
                        'Cannot remove account because of existing references in some transactions.',
                        {
                            okText: 'Ok'
                        }
                    );
                });
        },
        hasNoTransactions(id) {
            return new Promise((resolve, reject) => {
                this.fetchAllTransactions({ account: id, limit: 1, noPopulate: 1 })
                    .then(({ data }) => {
                        if (data.total === 0) {
                            resolve();
                            return;
                        }
                        reject();
                    })
                    .catch(e => {
                        reject();
                    });
            });
        }
    }
};
</script>
