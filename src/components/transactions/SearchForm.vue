<template>
    <v-card-text>
        <v-form>
            <v-select
                v-model="form.userId"
                :items="users"
                label="Users"
                item-text="name"
                item-value="_id"
                clearable
            />
            <v-select
                v-model="form.accountId"
                :items="accounts"
                label="Accounts"
                item-text="name"
                item-value="_id"
                clearable
            />
            <v-menu
                v-model="datepickerMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
            >
                <v-text-field
                    slot="activator"
                    :value="formattedDate"
                    label="Date"
                    readonly
                    clearable
                />
                <v-date-picker 
                    v-model="form.date" 
                    no-title 
                    @input="datepickerMenu = false"
                />
            </v-menu>
            <v-select
                v-model="form.type"
                :items="types"
                label="Type"
                item-text="name"
                item-value="value"
                clearable
            />
            <v-text-field
                v-model="form.description"
                label="Description"
                clearable
            />
            <v-text-field
                v-model="form.amount"
                label="Amount"
                type="number"
                :min="1"
                :step="0.01"
                clearable
            />
            <v-combobox
                v-model="form.tags"
                :items="tags"
                label="Tags"
                multiple
                clearable
            />
            <v-btn @click="onReset">Reset</v-btn>
            <v-btn color="success" @click="onSubmit">Submit</v-btn>
        </v-form>
    </v-card-text>
</template>

<script>
import { accountsMethods } from '@/store/helpers/accounts';
import { usersMethods } from '@/store/helpers/users';
import { transactionsMethods } from '@/store/helpers/transactions';
import dfParse from 'date-fns/parse';
import _cloneDeep from 'lodash/cloneDeep';

const defaultSearch = {
    accountId: '',
    userId: '',
    date: '',
    describtion: '',
    amount: '',
    type: '',
    tags: []
};

export default {
    data() {
        return {
            form: _cloneDeep(defaultSearch),
            users: [],
            accounts: [],
            tags: [],
            datepickerMenu: false,
            types: [
                { name: 'Expense', value: 'expense' },
                { name: 'Income', value: 'income' }
            ],
        };
    },
    computed: {
        formattedDate() {
            if (this.form.date === '') {
                return '';
            }

            const date = dfParse(this.form.date);
            return date.toLocaleDateString('de-DE', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    },
    methods: {
        ...accountsMethods,
        ...usersMethods,
        ...transactionsMethods,
        onReset() {
            this.form = _cloneDeep(defaultSearch);
            this.onSubmit();
        },
        onSubmit() {
            this.$emit('search', this.form);
        },
        prepare() {
            this.loading = true;
            Promise.all([
                this.fetchAllUsers(),
                this.fetchAllAccounts(),
                this.fetchAllTags()
            ]).then(([users, accounts, tags]) => {
                this.users = users.data.rows;
                this.accounts = accounts.data.rows;
                this.tags = tags.data;
            });
        }
    },
    created() {
        this.prepare();
    }
};
</script>
