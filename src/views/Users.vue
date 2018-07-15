<template>
    <layout-main row wrap>
        <v-flex xs12 class="my-3">
            <user-table
                ref="table"
                @edit="onEdit"
                @add="onAdd"
            />
        </v-flex>
        <v-flex v-if="showForm" xs12>
            <user-form
                ref="form"
                v-model="form"
                @cancel="onCancel"
                @stored="onStored"
            />
        </v-flex>
    </layout-main>
</template>

<script>
import UserTable from '@/components/users/Table';
import _cloneDeep from 'lodash/cloneDeep';
export default {
    components: {
        UserTable,
        UserForm: () => import('@/components/users/Form')
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
            item.password = '';
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
