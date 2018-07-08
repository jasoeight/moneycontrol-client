<template>
    <v-card>
        <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
            >
                <v-text-field
                    v-model="value.name"
                    label="name"
                    :rules="rules.name"
                />
                <v-btn @click="onCancel">Cancel</v-btn>
                <v-btn color="success" @click="onSubmit">Submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import VueNotifications from 'vue-notifications';
import { accountsMethods } from '@/store/helpers/accounts';
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
            valid: true,
            rules: {
                name: [
                    v => !!v || 'Name is required'
                ],
            }
        };
    },
    methods: {
        ...accountsMethods,
        onCancel() {
            this.$emit('cancel');
        },
        onSubmit() {
            if (!this.$refs.form.validate()) {
                return;
            }

            this.saveAccount(this.value)
                .then(() => {
                    this.$emit('stored');
                    this.showSuccessMsg();
                })
                .catch(this.showErrorMsg);
        },
        prepare() {
            this.loading = true;
            this.prepareNew();
        },
        prepareNew() {
            if (!_isEmpty(this.value)) {
                return;
            }

            this.$emit('input', {
                name: ''
            });
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
            message: 'Account successfully saved.'
        },
        showErrorMsg: {
            type: VueNotifications.types.error,
            title: '',
            message: 'Could not save account.'
        }
    }
};
</script>
