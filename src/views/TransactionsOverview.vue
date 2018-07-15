<template>
    <layout-main row wrap>
        <v-flex xs12 class="my-3">
            <transaction-table
                ref="table"
                @edit="onEdit"
                @add="onAdd"
            />
        </v-flex>
        <v-flex v-if="showForm" xs12>
            <transaction-form
                ref="form"
                v-model="form"
                @cancel="onCancel"
                @stored="onStored"
            />
        </v-flex>
    </layout-main>
</template>

<script>
import TransactionTable from '@/components/transactions/Table';
import _cloneDeep from 'lodash/cloneDeep';
export default {
    components: {
        TransactionTable,
        TransactionForm: () => import('@/components/transactions/Form')
    },
    data() {
        return {
            showForm: false,
            form: {}
        };
    },
    methods: {
        onAdd() {
            this.form = {};
            this.showForm = true;
        },
        onCancel() {
            this.showForm = false;
            this.form = {};
        },
        onEdit(item) {
            item = _cloneDeep(item);
            item.userId = item.user._id;
            item.accountId = item.account._id;
            this.form = item;
            this.showForm = true;
        },
        onStored() {
            this.showForm = false;
            this.form = {};
            this.$refs.table.load();
        }
    }
};
</script>
