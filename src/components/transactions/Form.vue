<template>
    <v-card>
        <v-card-text>
            <div
                v-if="loading"
                class="text-xs-center"
            >
                <v-progress-circular
                    indeterminate
                    color="primary"
                />
            </div>
            <v-form
                v-else
                ref="form"
                v-model="valid"
            >
                <v-select
                    v-model="value.userId"
                    :items="users"
                    label="Users"
                    item-text="name"
                    item-value="_id"
                />
                <v-select
                    v-model="value.accountId"
                    :items="accounts"
                    label="Accounts"
                    item-text="name"
                    item-value="_id"
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
                        v-model="formattedDate"
                        label="Date"
                        readonly
                        required
                    />
                    <v-date-picker 
                        v-model="value.date" 
                        no-title 
                        @input="datepickerMenu = false"
                    />
                </v-menu>
                <v-select
                    v-model="value.type"
                    :items="types"
                    label="Type"
                    item-text="name"
                    item-value="value"
                    required
                />
                <v-text-field
                    v-model="value.description"
                    label="Description"
                    :rules="rules.description"
                />
                <v-text-field
                    v-model="value.amount"
                    label="Amount"
                    type="number"
                    :min="1"
                    :step="0.01"
                    :rules="rules.amount"
                />
                <v-combobox
                    v-model="value.tags"
                    :items="tags"
                    label="Tags"
                    multiple
                />
                <v-btn @click="onCancel">Cancel</v-btn>
                <v-btn color="success" @click="onSubmit">Submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import VueNotifications from 'vue-notifications';
import { transactionsMethods } from '@/store/helpers/transactions';
import { accountsMethods } from '@/store/helpers/accounts';
import { usersMethods } from '@/store/helpers/users';
import dfParse from 'date-fns/parse';
import dfFormat from 'date-fns/format'
import _isEmpty from 'lodash/isEmpty';
export default {
    props: {
        value: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            loading: true,
            valid: true,
            users: [],
            accounts: [],
            tags: [],
            datepickerMenu: false,
            types: [
                { name: 'Expense', value: 'expense' },
                { name: 'Income', value: 'income' }
            ],
            rules: {
                description: [
                    v => !!v || 'Description is required'
                ],
                amount: [
                    v => !!v || 'Amount is required',
                    v => (v && v > 0) || 'Amount must be greater than 0'
                ],
            }
        };
    },
    computed: {
        formattedDate() {
            const date = dfParse(this.value.date);
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
        ...transactionsMethods,
        ...usersMethods,
        onCancel() {
            this.$emit('cancel');
        },
        onSubmit() {
            if (!this.$refs.form.validate()) {
                return;
            }

            this.saveTransaction(this.value)
                .then(() => {
                    this.$emit('stored');
                    this.showSuccessMsg();
                })
                .catch(this.showErrorMsg);
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
                this.loading = false;
                this.prepareNew();
            });
        },
        prepareNew() {
            if (!_isEmpty(this.value)) {
                return;
            }

            this.$emit('input', {
                userId: this.users[0]._id,
                accountId: this.accounts[0]._id,
                date: dfFormat(new Date()),
                type: 'expense',
                tags: [],
                description: '',
                amount: ''
            });
        },
        resetForm() {
            if (this.$refs.form) {
                this.$refs.form.reset();
            }
        }
    },
    watch: {
        value: 'prepareNew'
    },
    created() {
        this.prepare();
    },
    notifications: {
        showSuccessMsg: {
            type: VueNotifications.types.success,
            title: '',
            message: 'Transaction successfully saved.'
        },
        showErrorMsg: {
            type: VueNotifications.types.error,
            title: '',
            message: 'Could not save transaction.'
        }
    }
};
</script>
